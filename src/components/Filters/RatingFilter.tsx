"use client";
import { classNames } from "@/lib/helpers";
import { RadioGroup } from "@headlessui/react";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";

interface RatingFilterTypes {
  title: string;
}

const ratings = [1, 2, 3, 4, 5];

const RatingFilter = ({ title }: RatingFilterTypes) => {
  const [currentRating, setCurrentRating] = useState<number | null>(null);
  return (
    <div>
      <header className="pb-3 lg:pb-3.5 mb-3 lg:mb-3.5 border-b border-b-gray-200">
        <h4 className="text-sm lg:text-base leading-none font-medium text-brand-neutral-800">
          {title}
        </h4>
      </header>
      <ul className="mb-3">
        <RadioGroup value={currentRating} onChange={setCurrentRating}>
          <div className="flex gap-2.5">
            {ratings.map((rating) => (
              <RadioGroup.Option
                key={rating}
                value={rating}
                className={({ active, checked }) =>
                  classNames(
                    "border leading-none py-1.5 px-2 w-12 text-center rounded cursor-pointer hover:bg-gray-50",
                    checked ? "border-amber-400" : ""
                  )
                }
              >
                <RadioGroup.Label
                  as="div"
                  className="flex gap-1 items-center justify-center text-brand-blue"
                >
                  <span className="font-medium -mb-px">{rating}</span>
                  <span className="text-amber-500">
                    <FaStar />
                  </span>
                </RadioGroup.Label>
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </ul>
    </div>
  );
};

export default RatingFilter;
