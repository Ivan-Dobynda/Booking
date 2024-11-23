"use client";
import React, { useState } from "react";
import { IoFilter } from "react-icons/io5";

import CarsFiltersModal from "../Modals/CarsFiltersModal";

const CarsFiltersButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CarsFiltersModal open={open} setOpen={setOpen} />
      <button
        onClick={() => setOpen(true)}
        className="text-left rounded-lg border border-gray-300 bg-opacity-30 hover:bg-opacity-60 transition px-3 py-2.5 sm:px-4 sm:py-3 bg-white inline-flex lg:hidden items-center gap-3"
      >
        <span className="text-base sm:text-lg">
          <IoFilter />
        </span>
        <span className="text-sm sm:text-base">Filters</span>
      </button>
    </>
  );
};

export default CarsFiltersButton;
