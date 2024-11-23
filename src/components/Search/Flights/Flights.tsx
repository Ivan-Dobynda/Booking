import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { CiSearch } from "react-icons/ci";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

import { classNames, formatDate } from "@/lib/helpers";

import DestinationSearch from "./DestinationSearch";
import DateSelection from "./DateSelection";
import PassengersCount from "./PassengersCount";
import SelectCabinClass, { cabinOptions } from "./SelectCabinClass";
import { useFlightsContext } from "@/context/FlightsContext";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import Checkbox from "@/components/Form/Checkbox";

export interface ISlice {
  origin: IFlight | null;
  destination: IFlight | null;
  departure_date: Date | null;
}

const flightTypes = [
  { name: "One-way", value: "one-way" },
  { name: "Roundtrip", value: "round-trip" },
  { name: "Multi-way", value: "multi-way" },
];

export interface IFlight {
  city?: "";
  country?: "";
  iata?: "";
}

const Flights = () => {
  const { state } = useFlightsContext();

  const searchParams = useSearchParams();
  const [directFlight, setDirectFlight] = useState<string | null>(
    searchParams.get("max_connections")
  );

  const [flightType, setFlightType] = useState<
    "round-trip" | "one-way" | "multi-way"
  >(
    (searchParams.get("flight_type") as
      | "round-trip"
      | "one-way"
      | "multi-way") || "one-way"
  );

  const [cabinClass, setCabinClass] = useState<{
    name: string;
    value: string;
  } | null>(null);

  // const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);

  const [errors, setErrors] = useState<any[]>([]);

  useEffect(() => {
    if (state?.errors?.length) {
      setErrors([...state?.errors]);
    } else {
      setErrors([]);
    }
  }, [state?.errors]);

  const handleFlightTypeChange = (type: typeof flightType) => {
    setFlightType(type);
  };

  const [travelers, setTravelers] = useState<any>({
    adult: [1],
    child: [],
    infant_without_seat: [],
  });

  const [slices, setSlices] = useState<ISlice[]>([
    {
      origin: null,
      destination: null,
      departure_date: null,
    },
  ]);

  const onSwitchLocations = (index: number) => {
    const slice = { ...slices[index] };
    if (!slice.origin && !slice.destination) return;

    setSlices((prevSlices) => {
      const updatedSlices = [...prevSlices];

      updatedSlices[index].origin = slice.destination;
      updatedSlices[index].destination = slice.origin;

      return updatedSlices;
    });
  };

  const setFlightFrom = (flight: IFlight, index: number) => {
    setSlices((prevSlices) => {
      const slicesCopy = [...prevSlices];

      slicesCopy[index].origin = flight;

      return slicesCopy;
    });
  };

  const setFlightTo = (flight: IFlight, index: number) => {
    setSlices((prevSlices) => {
      const slicesCopy = [...prevSlices];

      slicesCopy[index].destination = flight;

      return slicesCopy;
    });
  };

  const router = useRouter();

  const onSearch = () => {
    const errorsArray: any = [];
    slices.forEach((slice) => {
      if (!slice.origin?.iata) {
        errorsArray.push("From field is required.");
      }
      if (!slice.destination?.iata) {
        errorsArray.push("To field is required.");
      }
      if (!slice.departure_date) {
        errorsArray.push("Departure date field is required.");
      }
    });

    const passengersCount = Object.values(travelers || {}).reduce(
      (acc, passengerType: any) => {
        return acc + passengerType.length;
      },
      0
    );

    if (passengersCount === 0) {
      errorsArray.push("Please select the numbers of people traveling.");
    }

    if (flightType === "round-trip" && !dateTo) {
      errorsArray.push("Return date field is required.");
    }
    const ages: number[] = [];
    for (let child of travelers.child) {
      if (+child.age) ages.push(child.age);
      else errorsArray.push("Please add child dates");
    }
    if (errorsArray.length > 0) {
      setErrors(errorsArray);
      return;
    }

    setErrors([]);

    const newSlices = slices.map((slice) => {
      return {
        origin: slice.origin,
        destination: slice.destination,
        departure_date: formatDate(slice.departure_date, "YYYY-MM-DD"),
      };
    });

    const search: any = {
      slices: JSON.stringify(newSlices),
      flight_type: flightType,
      adults: travelers.adult.length,
      ages: ages.join(","),
      after: "",
    };

    if (cabinClass?.value) search.cabin_class = cabinClass.value;
    else search.cabin_class = "economy";
    if (!searchParams.get("sort")) search.sort = "total_amount";
    if (flightType === "round-trip")
      search.return_date = formatDate(dateTo, "YYYY-MM-DD");
    if (travelers.infant_without_seat)
      search.infant_without_seat = travelers.infant_without_seat.length;

    if (directFlight && flightType !== "multi-way")
      search.max_connections = directFlight;
    const q = new URLSearchParams(search);
    router.push(`/flight?${q}`, { scroll: false });
  };

  const setDepartureDate = (date: null | Date, index: number) => {
    setSlices((prevSlices) => {
      const slicesCopy = [...prevSlices];

      slicesCopy[index].departure_date = date;

      return slicesCopy;
    });
  };

  const addSlice = () => {
    setSlices((prevSlices) => [
      ...prevSlices,
      {
        origin: prevSlices[prevSlices.length - 1].destination,
        destination: null,
        departure_date: null,
      },
    ]);
  };

  const removeSlice = (removeIndex: number) => {
    setSlices((prevSlices) =>
      prevSlices.filter((slice, index) => index !== removeIndex)
    );
  };

  useEffect(() => {
    const rawSlices = searchParams.get("slices");

    if (rawSlices) {
      const slices = JSON.parse(rawSlices);
      if (slices && Array.isArray(slices) && slices.length > 0) {
        const s = slices.map((slice) => ({
          origin: slice.origin,
          destination: slice.destination,
          departure_date: new Date(slice.departure_date),
        }));
        setSlices(s);
      }
    }
    const adults = searchParams.get("adults");
    const ages = searchParams.get("ages");
    const infant_without_seat = searchParams.get("infant_without_seat");
    const price_range = searchParams.get("price_range");
    const max_connections =
      searchParams.get("max_connections") == "0" ? "0" : null;
    setDirectFlight(max_connections);

    setTravelers({
      adult:
        adults && +adults
          ? [...new Array(+adults)].map(() => ({ age: null }))
          : [{ age: null }],
      child: ages ? ages.split(",").map((age) => ({ age })) : [],
      infant_without_seat:
        infant_without_seat && +infant_without_seat
          ? [...new Array(+infant_without_seat)].map(() => ({ age: null }))
          : [],
    });
    const cabin_class = searchParams.get("cabin_class");
    if (cabin_class)
      setCabinClass({
        value: cabin_class,
        name: cabin_class.replace("_", " "),
      });
    const return_date = searchParams.get("return_date");
    if (return_date) setDateTo(new Date(return_date));
    const flight_type = searchParams.get("flight_type");
    // @ts-ignore
    if (flight_type) setFlightType(flight_type);
  }, [searchParams]);

  return (
    <>
      <div className="flex gap-2.5 sm:gap-3 md:gap-4 lg:gap-6 items-baseline mb-4 lg:mb-6">
        {flightTypes.map((flight) => (
          <button
            onClick={() =>
              handleFlightTypeChange(flight.value as typeof flightType)
            }
            key={flight.value}
            className={classNames(
              "text-xs sm:text-sm lg:text-base leading-none pb-3 sm:pb-4 text-brand-blue border-b-2 font-medium",
              flightType === flight.value
                ? "border-brand-blue"
                : "border-transparent"
            )}
          >
            {flight.name}
          </button>
        ))}
        <SelectCabinClass
          value={cabinClass}
          onChange={(value) => setCabinClass(value as typeof cabinClass)}
        />
      </div>
      <div className="space-y-3">
        {Object.keys(errors).length > 0 ? (
          <ul className="px-4 py-3 rounded-xl border border-red-500 text-red-700 list-disc list-inside space-y-2">
            {Object.values(errors).map((err: any, index) => (
              <li key={index} className="text-sm">
                {err}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="space-y-3 divide-y">
          {slices.map((slice, index) => {
            return (
              <div
                key={index}
                style={{ zIndex: slices.length - index }}
                className={classNames(
                  index > 0 ? "pt-3" : "",
                  "relative grid md:grid-cols-4 xl:flex gap-2.5 sm:gap-2 md:gap-3 lg:gap-2.5 xl:gap-3.5"
                )}
              >
                <div className="flex flex-col sm:flex-row flex-grow-[3] xl:flex-grow-[4] sm:items-center md:col-span-full  gap-2.5 sm:gap-2 md:gap-3 lg:gap-2.5 xl:gap-3.5">
                  <DestinationSearch
                    onSelect={(flight) => setFlightFrom(flight, index)}
                    value={slice.origin}
                    label="From"
                    icon={<FaPlaneDeparture />}
                    className="flex-1 z-[10]"
                  />

                  <HiOutlineSwitchHorizontal
                    className="mx-auto sm:rotate-0 rotate-90 cursor-pointer"
                    onClick={() => onSwitchLocations(index)}
                  />

                  <DestinationSearch
                    onSelect={(flight) => setFlightTo(flight, index)}
                    value={slice.destination}
                    label="To"
                    icon={<FaPlaneArrival />}
                    className="flex-1 z-[9]"
                  />
                </div>
                <DateSelection
                  label="Depart"
                  startDate={slice.departure_date}
                  endDate={flightType === "round-trip" ? dateTo : null}
                  setStartDate={(date) => setDepartureDate(date, index)}
                  setEndDate={setDateTo}
                  range={flightType === "round-trip"}
                  value={slice.departure_date}
                  className={classNames(
                    "flex-1 flex-grow-[2] xl:flex-grow-[2.5] z-[8]",
                    flightType !== "round-trip" ? "md:col-span-2" : ""
                  )}
                  minDate={new Date()}
                />
                {flightType === "round-trip" ? (
                  <DateSelection
                    startDate={slice.departure_date}
                    endDate={dateTo}
                    setStartDate={(date) => setDepartureDate(date, index)}
                    setEndDate={setDateTo}
                    range={flightType === "round-trip"}
                    value={dateTo}
                    label="Return"
                    className="flex-1 flex-grow-[2] xl:flex-grow-[2.5] z-[7]"
                  />
                ) : null}
                {index === 0 ? (
                  <>
                    <PassengersCount
                      state={travelers}
                      setState={setTravelers}
                      label="Travelers"
                      className="flex-1 full-width md:col-span-2 flex-grow-[2] xl:flex-grow-[2] z-[6]"
                    />
                    {flightType !== "multi-way" ? (
                      <div className="xl:hidden flex-1 flex col-span-full items-center order-0 xl:order-last col-span-1">
                        <Checkbox
                          label="Direct flights only"
                          checked={!!directFlight}
                          onChange={() =>
                            setDirectFlight((p) => (p == "0" ? null : "0"))
                          }
                        />
                      </div>
                    ) : null}

                    <button
                      onClick={onSearch}
                      className={classNames(
                        flightType === "multi-way"
                          ? "hidden xl:inline-flex"
                          : "inline-flex",
                        "col-span-full p-3 sm:p-4 text-center z-[5]  items-center justify-center gap-1.5 sm:gap-2 rounded-lg bg-brand-blue hover:bg-brand-blue-400 transition duration-200 text-white"
                      )}
                    >
                      <span className="text-xl sm:text-2xl">
                        <CiSearch />
                      </span>
                      <span className="text-sm sm:text-base leading-none font-medium">
                        Search
                      </span>
                    </button>
                  </>
                ) : (
                  <div className="flex-1 md:col-span-2 flex-grow-[2] xl:flex-grow-[2] flex items-center justify-start">
                    <button
                      onClick={() => removeSlice(index)}
                      className="p-1 text-3xl text-brand-blue hover:text-opacity-70 transition"
                    >
                      <IoMdClose />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="relative grid md:grid-cols-4 xl:flex gap-2.5 sm:gap-2 md:gap-3 lg:gap-2.5 xl:gap-3.5">
          {flightType !== "multi-way" ? (
            <div className="hidden xl:inline-flex flex-1 flex col-span-full items-center order-0 xl:order-last col-span-1">
              <Checkbox
                label="Direct flights only"
                checked={!!directFlight}
                onChange={() => setDirectFlight((p) => (p == "0" ? null : "0"))}
              />
            </div>
          ) : null}

          {flightType === "multi-way" ? (
            <>
              {slices.length <= 6 ? (
                <div>
                  <button
                    onClick={addSlice}
                    className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-blue-400 font-medium"
                  >
                    <span className="text-xl">
                      <FiPlus />
                    </span>
                    <span>Add Flight</span>
                  </button>
                </div>
              ) : null}
              <button
                onClick={onSearch}
                className={classNames(
                  "xl:hidden inline-flex inline-flex col-span-full p-3 sm:p-4 text-center items-center justify-center gap-1.5 sm:gap-2 rounded-lg bg-brand-blue hover:bg-brand-blue-400 transition duration-200 text-white"
                )}
              >
                <span className="text-xl sm:text-2xl">
                  <CiSearch />
                </span>
                <span className="text-sm sm:text-base leading-none font-medium">
                  Search
                </span>
              </button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Flights;
