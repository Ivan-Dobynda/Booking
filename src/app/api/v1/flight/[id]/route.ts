import { NextResponse } from "next/server";
import { duffel } from "@/lib/duffel";
import {
  OfferPassenger,
  OfferSlice,
  OfferSliceSegment,
} from "@duffel/api/types";

export const GET = async (
  req: Request,
  context: { params: { id: string } }
) => {
  try {
    const offer = await duffel.offers.get(context.params.id);

    const finalOffer: any = {
      id: offer.data.id,
      base_amount: offer.data?.base_amount,
      base_currency: offer.data?.base_currency,
      tax_amount: offer.data?.tax_amount,
      tax_currency: offer.data?.tax_currency,
      total_amount: offer.data?.total_amount,
      total_currency: offer.data?.total_currency,
      total_passengers: offer.data?.passengers?.length,
    };

    const finalSlices: any = [];

    offer.data?.slices?.map((slice: OfferSlice) => {
      const finalSegments: any = [];

      slice?.segments?.map((segment: OfferSliceSegment) => {
        finalSegments.push({
          id: segment.id,
          flight_number: segment?.marketing_carrier_flight_number,
          airline_name: segment?.marketing_carrier?.name,
          airline_logo: segment?.marketing_carrier?.logo_symbol_url,
          origin: segment?.origin?.city_name,
          origin_iata_city_code: segment?.origin?.iata_city_code,
          origin_airport_name: segment?.origin?.name,
          destination: segment?.destination?.city_name,
          destination_iata_city_code: segment?.destination?.iata_city_code,
          destination_airport_name: segment?.destination?.name,
          departing_at: segment?.departing_at,
          arriving_at: segment?.arriving_at,
          aircraft: segment?.aircraft,
          passengers: segment?.passengers,
          stops: segment?.stops?.length,
        });
      });

      finalSlices.push({
        id: slice?.id,
        origin: slice?.origin?.city_name,
        origin_code: slice?.origin?.iata_city_code,
        destination: slice?.destination?.city_name,
        destination_code: slice?.destination?.iata_city_code,
        segments: finalSegments,
        conditions: slice?.conditions,
      });
    });

    var temp_slices = offer.data?.slices;
    var flightType = "";

    if (temp_slices.length == 1) {
      flightType = "one-way";
    } else {
      if (
        temp_slices?.length == 2 &&
        temp_slices[0].destination.iata_city_code ==
          temp_slices[1].origin.iata_city_code &&
        temp_slices[0].origin.iata_city_code ==
          temp_slices[1].destination.iata_city_code
      ) {
        flightType = "round-trip";
      } else {
        flightType = "multi-way";
      }
    }

    finalOffer.flight_type = flightType;
    finalOffer.slices = finalSlices;
    finalOffer.passengers = offer.data?.passengers.map(
      (passenger: OfferPassenger) => {
        return {
          id: passenger.id,
          type: passenger.type,
        };
      }
    );
    finalOffer.baggages =
      offer.data?.slices?.[0]?.segments?.[0]?.passengers?.[0]?.baggages;
    finalOffer.owner = offer.data?.owner;
    finalOffer.payment_requirements = offer?.data?.payment_requirements;
    finalOffer.passenger_identity_documents_required =
      offer?.data?.passenger_identity_documents_required;
    finalOffer.allowed_passenger_identity_document_types =
      offer?.data?.allowed_passenger_identity_document_types;
    finalOffer.conditions = offer?.data?.conditions;

    return NextResponse.json(
      {
        status: 200,
        message: "success",
        // offer: offer,
        result: finalOffer,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: "error",
        result: error,
      },
      {
        status: 500,
      }
    );
  }
};
