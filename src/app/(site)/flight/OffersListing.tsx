"use client";
import React, { useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import FlightDetailsCard from "@/components/Cards/FlightDetailsCard";
import { useFlightsContext } from "@/context/FlightsContext";
import { classNames } from "@/lib/helpers";
import { TailSpin } from "react-loading-icons"
interface IOffersListing { }

const OffersListing = ({ }: IOffersListing) => {
  const { flights, isLoading, clientKey } = useFlightsContext().state;
  const [start, setStart] = useState(12);
  useEffect(() => {
    setStart(12);
  }, [flights]);

  if (!flights || !flights.length) return;

  const flight_type = flights[0].flight_type;

  return (
    <>
      <TailSpin stroke="#000" />
      <ul
        className={classNames(
          "mb-6 sm:mb-8 md:mb-10 lg:mb-12",
          flight_type === "one-way"
            ? "grid sm:grid-cols-2 grid-cols-1 gap-5"
            : "space-y-5"
        )}
      >
        {flights.slice(0, start).map((offer: any) => (
          <li key={offer.id}>
            <FlightDetailsCard offer={offer} client_key={clientKey} />
          </li>
        ))}
      </ul>
      {start < flights.length ? (
        <div className="text-center">
          <Button onClick={() => setStart(start + 12)} disabled={isLoading}>
            Show More
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default OffersListing;
