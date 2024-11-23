import commission from "@/constants/commission";
import { OfferSlice, OfferSliceSegment, Offer } from "@duffel/api/types";
import moment from "moment-timezone";

type Sort =
  | "total_amount"
  | "total_duration"
  | "-total_amount"
  | "-total_duration";

interface SearchParams {
  departure_time?: string;
  arrival_time?: string;
  airline_name?: string;
  sort?: Sort;
  flightType?: string;
  price_range?: string;
}

function parseTime(time: string) {
  return new Date(time).getTime();
}

function calculateTotalDuration(offer: any) {
  return offer.slices.reduce((total: any, slice: any) => {
    return (
      total +
      slice.segments.reduce((sliceTotal: any, segment: any) => {
        const departureTime = parseTime(segment.departing_at);
        const arrivalTime = parseTime(segment.arriving_at);
        return sliceTotal + (arrivalTime - departureTime);
      }, 0)
    );
  }, 0);
}

export default function setOffers(offers: Offer[], params: SearchParams) {
  if (!params) return { offers: [] };
  if (offers.length === 0) return { offers: [] };

  function convertToLocalTime(datetimeStr: string, time_zone: string) {
    return moment(datetimeStr).tz(time_zone).format("HH:mm:ss");
  }
  const timeToMinutes = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };
  function isTimeInRange(time: string, range?: string) {
    if (!range) return true;
    const [rangeStart, rangeEnd] = range.split("-").map(timeToMinutes),
      timeInMinutes = timeToMinutes(time);
    return timeInMinutes >= rangeStart && timeInMinutes <= rangeEnd;
  }

  const airlines: string[] = [];

  const filteredData = offers.filter((offer) => {
    // Convert strings to numbers, handling potentially undefined or empty strings
    const maxPriceRange = params.price_range
      ? parseFloat(params.price_range)
      : Number.MAX_VALUE;

    const offerTotalAmount = parseFloat(offer.total_amount) * commission;

    // Check if the offer's total amount is within the specified price range
    const priceInRange =
      !isNaN(offerTotalAmount) && offerTotalAmount <= maxPriceRange;

    return (
      priceInRange &&
      offer.slices.every((slice: OfferSlice) => {
        return slice.segments.every((segment: OfferSliceSegment) => {
          const departTime = convertToLocalTime(
            segment.departing_at,
            segment.origin.time_zone
          );
          const arriveTime = convertToLocalTime(
            segment.arriving_at,
            segment.destination.time_zone
          );
          const departInRange = isTimeInRange(
            departTime,
            params.departure_time
          );
          const arriveInRange = isTimeInRange(arriveTime, params.arrival_time);
          const airline_name = segment.marketing_carrier.name;
          if (!airlines.includes(airline_name)) airlines.push(airline_name);
          const airlineMatch =
            !params.airline_name ||
            params.airline_name.split(",").includes(airline_name);

          return departInRange && arriveInRange && airlineMatch;
        });
      })
    );
  });

  let expires_at = new Date(offers[0].expires_at);

  const finalOffers = filteredData
    .map((offer) => {
      const expiry = new Date(offer.expires_at);
      if (expiry < expires_at) expires_at = expiry;
      return {
        id: offer.id,
        flight_type: params.flightType,
        total_amount: offer.total_amount,
        total_currency: offer.total_currency,
        total_passengers: offer.passengers?.length,
        slices: offer.slices.map((slice: OfferSlice) => ({
          id: slice.id,
          origin: slice.origin.city_name,
          origin_code: slice.origin.iata_city_code,
          destination: slice.destination.city_name,
          destination_code: slice.destination.iata_city_code,
          segments: slice.segments.map((segment: OfferSliceSegment) => ({
            id: segment.id,
            flight_number: segment.marketing_carrier_flight_number,
            airline_name: segment.marketing_carrier.name,
            airline_logo: segment.marketing_carrier.logo_symbol_url,
            iata_code: segment.marketing_carrier.iata_code,
            origin: segment.origin.city_name,
            origin_iata_city_code: segment.origin.iata_city_code,
            origin_airport_name: segment.origin.name,
            destination: segment.destination.city_name,
            destination_iata_city_code: segment.destination.iata_city_code,
            destination_airport_name: segment.destination.name,
            departing_at: segment.departing_at,
            arriving_at: segment.arriving_at,
            aircraft: segment.aircraft?.name,
            stops: segment.stops?.length,
            time_zone: segment.origin.time_zone,
          })),
        })),
      };
    })
    .sort((a, b) => {
      switch (params.sort) {
        case "total_amount":
          return +a.total_amount - +b.total_amount;
        case "-total_amount":
          return +b.total_amount - +a.total_amount;
        case "total_duration":
          return calculateTotalDuration(a) - calculateTotalDuration(b);
        case "-total_duration":
          return calculateTotalDuration(b) - calculateTotalDuration(a);
        default:
          return 0;
      }
    });

  return {
    offers: finalOffers,
    airlines,
    expires_at,
  };
}
