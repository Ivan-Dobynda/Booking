"use client";
import { classNames } from "@/lib/helpers";
import { RadioGroup } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { GoSun } from "react-icons/go";
import { FiSun } from "react-icons/fi";
import { BsMoonStars } from "react-icons/bs";

interface FilterTypes {
  title: string;
  onChange?: (e: StateType) => void;
  value?: string;
}

export interface StateType {
  icon: React.JSX.Element;
  name: string;
  from: string;
  to: string;
  value: string;
}

const timings = [
  {
    icon: <GoSun />,
    name: "Morning",
    from: "5:00am",
    to: "11:59am",
    value: "05:00:00-12:00:00",
  },
  {
    icon: <FiSun />,
    name: "Afternoon",
    from: "12:00pm",
    to: "5:59pm",
    value: "12:00:00-18:00:00",
  },
  {
    icon: <BsMoonStars />,
    name: "Evening",
    from: "6:00pm",
    to: "11:59pm",
    value: "18:00:00-23:59:00",
  },
];

const TimeFilter = ({ title, onChange, value }: FilterTypes) => {
  const [selected, setSelected] = useState<StateType | null>(null);

  const onChg = (e: StateType) => {
    setSelected(e);
    onChange && onChange(e);
  };

  useEffect(() => {
    if (value && ((selected && value !== selected.value) || !selected)) {
      const newSelected = timings.find((item) => item.value === value);
      if (newSelected) setSelected(newSelected);
    }
  }, [value]);

  return (
    <div>
      <header className="pb-3 lg:pb-3.5 mb-3 lg:mb-3.5 border-b border-b-gray-200">
        <h4 className="text-sm lg:text-base leading-none font-medium text-brand-neutral-800">
          {title}
        </h4>
      </header>

      <RadioGroup value={selected} onChange={onChg}>
        <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
        <div className="grid grid-cols-2 gap-3">
          {timings.map((time) => (
            <RadioGroup.Option
              key={time.name}
              value={time}
              className={({ active }) =>
                classNames(
                  "relative block cursor-pointer bg-white hover:bg-gray-50 rounded-[10px] border px-2 xl:px-2.5 py-2 xl:py-2.5 focus:outline-none sm:flex sm:justify-between"
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <span className="flex items-center text-center w-full">
                    <span className="flex flex-col items-center w-full">
                      <span className="mt-0.5 mb-2 text-xl xl:text-2xl">
                        {time.icon}
                      </span>
                      <RadioGroup.Label
                        as="span"
                        className="font-medium text-brand-neutral-800 leading-none mb-2 text-sm xl:text-[15px]"
                      >
                        {time.name}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="span"
                        className="text-brand-neutral-600 text-xs xl:text-[13px] leading-none"
                      >
                        (<span className="inline">{time.from}</span>
                        {" - "}
                        <span className="inline">{time.to}</span>)
                      </RadioGroup.Description>
                    </span>
                  </span>
                  <span
                    className={classNames(
                      active ? "" : "",
                      "border",
                      checked ? "border-brand-blue" : "border-transparent",
                      "pointer-events-none absolute -inset-px rounded-lg"
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default TimeFilter;
