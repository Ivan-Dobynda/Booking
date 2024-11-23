"use client";
import React, { useState } from "react";

import PriceRangeFilter from "@/components/Filters/PriceRangeFilter";
import SortFlights from "@/components/Filters/SortFlights";
import StopsFilter from "@/components/Filters/StopsFilter";
import { useFlightsContext } from "@/context/FlightsContext";
import TimeFilters from "@/components/Filters/TimeFilters";
import RadioFilter from "@/components/Filters/RadioFilter";
import SelectFilter from "@/components/Filters/SelectFilter";
import CheckboxFilter from "@/components/Filters/CheckboxFilter";
import { useRouter, useSearchParams } from "next/navigation";

const Filters = () => {
  const { state } = useFlightsContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [range, setRange] = useState(searchParams.get("price_range") ?? "2000");

  const handleChange = (e: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("price_range", e);
    setRange(e);
    router.push(`/flight?${params}`, { scroll: false });
  };

  if (!state?.flights) return null;

  return (
    <div className="space-y-7">
      <SortFlights />
      <StopsFilter />
      <PriceRangeFilter value={range} onChange={handleChange} />
      {state.airlines && (
        <CheckboxFilter
          title="Airlines"
          name="airline_name"
          options={state.airlines.map((airline: string) => ({
            value: airline,
            label: airline,
          }))}
        />
      )}
      <SelectFilter
        title="Cabin"
        name="cabin_class"
        options={[
          { label: "Economy", value: "economy" },
          { label: "Premium Economy", value: "premium_economy" },
          { label: "Business", value: "business" },
          { label: "First Class", value: "first" },
        ]}
        defaultValue="economy"
      />
      <TimeFilters />
    </div>
  );
};

export default Filters;
