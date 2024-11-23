import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

import { classNames } from "@/lib/helpers";

import PickupSearch from "./PickupSearch";
import SelectTime from "./SelectTime";
import Select from "./Select";

import DateSelection from "../Flights/DateSelection";

const serviceTypes = [
  { name: "Rental Cars", value: "rental-cars" },
  { name: "Airport Transportation", value: "airport-transportation" },
];
export const carOptions = [
  { name: "All Car Rental Companies", value: "all" },
  { name: "Ace Rent a Car", value: "ace-rent-a-car" },
  { name: "Aco Rent a Car", value: "aco-rent-a-car" },
];
export const sizeOptions = [
  { name: "All Car Sizes", value: "all" },
  { name: "Economy", value: "Economy" },
  { name: "Compact", value: "Compact" },
  { name: "Midsize", value: "Midsize" },
  { name: "Standard", value: "Standard" },
  { name: "Full-size", value: "Full-size" },
];

export const dropOfOptions = [
  { name: "Same Drop off", value: "same" },
  { name: "Different Drop off", value: "different" },
];
export const options = [
  { name: "I Don't Have a Discount Code", value: "no-discount" },
  { name: "I Have a Discount Code", value: "discount" },
  { name: "Corporate/Contract Code", value: "code" },
];

const Cars = () => {
  const [serviceType, setServiceType] = useState("rental-cars");
  const [carRentalCompany, setCarRentalCompany] = useState({
    name: "All Car Rental Companies",
    value: "all",
  });
  const [carSize, setCarSize] = useState({
    name: "All Car Sizes",
    value: "all",
  });
  const [discount, setDiscount] = useState({
    name: "I Don't Have a Discount Code",
    value: "no-discount",
  });

  const [dropOf, setDropOf] = useState({
    name: "Same Drop off",
    value: "same",
  });

  return (
    <>
      <div className="flex flex-wrap gap-2.5 sm:gap-3 md:gap-4 lg:gap-6 items-baseline mb-4 lg:mb-6">
        {serviceTypes.map((type) => (
          <button
            onClick={() => {
              setServiceType(type.value);
            }}
            key={type.value}
            className={classNames(
              "text-xs sm:text-sm lg:text-base leading-none pb-3 sm:pb-4 text-brand-blue border-b-2 font-medium",
              serviceType === type.value
                ? "border-brand-blue"
                : "border-transparent"
            )}
          >
            {type.name}
          </button>
        ))}
        <Select
          options={carOptions}
          value={carRentalCompany}
          onChange={setCarRentalCompany}
          optionsStyles={{ width: "300px" }}
        />
        <Select
          options={sizeOptions}
          value={carSize}
          onChange={setCarSize}
          optionsStyles={{ width: "180px" }}
        />
        <Select
          options={dropOfOptions}
          value={dropOf}
          onChange={setDropOf}
          optionsStyles={{ width: "220px" }}
        />
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-4 md:grid-cols-8 lg:flex flex-wrap gap-2.5 sm:gap-2 md:gap-3 lg:gap-2.5 xl:gap-3.5 mb-4 lg:mb-6">
        <PickupSearch
          label="Pick-up"
          className="flex-grow-[4] 2xl:flex-grow-[5] sm:col-span-4 z-[6]"
        />
        <DateSelection
          label="Pick-up Date"
          className="flex-grow-[1] sm:col-span-2 z-[5]"
        />
        <SelectTime className="flex-grow-[1] sm:col-span-2 z-[4]" />
        <DateSelection
          label="Drop-off Date"
          className="flex-grow-[1] sm:col-span-2 z-[3]"
        />
        <SelectTime className="flex-grow-[1] sm:col-span-2 z-[2]" />

        <button
          className={classNames(
            "inline-flex sm:col-span-4 p-3 sm:p-4 text-center z-[1] basis-full xl:basis-auto items-center justify-center gap-1.5 sm:gap-2 rounded-lg bg-brand-blue hover:bg-brand-blue-400 transition duration-200 text-white"
          )}
        >
          <span className="text-xl sm:text-2xl">
            <CiSearch />
          </span>
          <span className="text-sm sm:text-base leading-none font-medium">
            Search
          </span>
        </button>
      </div>
      <div>
        <Select
          variant="simple"
          optionsStyles={{ width: "320px" }}
          value={discount}
          options={options}
          onChange={setDiscount}
        />
      </div>
    </>
  );
};

export default Cars;
