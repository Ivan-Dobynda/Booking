"use client";
import React, { ChangeEvent, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface NumberFilterTypes {
  title: string;
}

const NumberFilter = ({ title }: NumberFilterTypes) => {
  const [numberValue, setNumberValue] = useState(0);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) >= 0) {
      setNumberValue(Number(event.target.value));
    }
  };

  const handleButtonClick = (action: "plus" | "minus") => {
    if (action === "plus") {
      setNumberValue((prevNumber) => prevNumber + 1);
    } else if (numberValue !== 0) {
      setNumberValue((prevNumber) => prevNumber - 1);
    }
  };

  return (
    <div className="number-filter">
      <header className="flex pb-3 lg:pb-3.5 mb-3 lg:mb-3.5 border-b border-b-gray-200">
        <h4 className="text-sm lg:text-base leading-none font-medium text-brand-neutral-800">
          {title}
        </h4>
      </header>
      <div className="flex justify-between items-center">
        <label className="leading-none text-brand-neutral-600 text-sm">
          Number of {title}
        </label>
        <div className="relative flex items-center">
          <button
            onClick={() => handleButtonClick("minus")}
            className="absolute left-3 p-1 text-gray-700 text-[15px]"
          >
            <FaMinus />
          </button>
          <input
            className="w-[120px] border border-gray-300 rounded-lg py-1.5 text-center text-[15px] px-10 focus:outline-none ring-offset-0 focus:ring-0 focus:border-gray-300"
            type="number"
            value={numberValue}
            onChange={handleInputChange}
            minLength={1}
            min={0}
          />
          <button
            onClick={() => handleButtonClick("plus")}
            className="absolute right-3 p-1 text-gray-700 text-[15px]"
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumberFilter;
