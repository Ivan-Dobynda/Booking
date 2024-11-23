"use client";

import React, { useState } from "react";
import Filter from "@/components/Filters/CheckFilter";
import NumberFilter from "@/components/Filters/NumberFilter";
import PriceRangeFilter from "@/components/Filters/PriceRangeFilter";

const Filters = () => {
  const [range, setRange] = useState<string>("2000");

  return (
    <div>
      <header className="border-b pb-4 mb-4">
        <h2 className="text-lg font-semibold text-brand-neutral-800 leading-none">
          Filter by:
        </h2>
      </header>
      <div className="space-y-7">
        <PriceRangeFilter
          value={range}
          onChange={setRange}
          title="Your budget"
        />
        <Filter title="Capacity" />
        <Filter title="Traveler Ratings" />
        <Filter title="Specifications" />
        <Filter title="Cancellation policy" />
        <NumberFilter title="Bags" />
      </div>
    </div>
  );
};

export default Filters;
