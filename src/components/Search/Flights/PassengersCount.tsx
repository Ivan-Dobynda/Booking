import React, { ReactNode, useMemo } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FaPersonWalkingLuggage } from "react-icons/fa6";

import Button from "@/components/Button/Button";
import { classNames } from "@/lib/helpers";

interface IState {
  adult: any;
  child: any;
  infant_without_seat: any;
}
interface IPassengersCount {
  label: string;
  className?: string;
  icon?: ReactNode;
  state: IState;
  setState: (state: IState) => void;
}

export const passengerOptions = {
  adult: "Adult",
  child: "Child",
  infant_without_seat: "Infant without seat",
};

const PassengersCount = ({
  state,
  setState,
  label,
  className,
}: IPassengersCount) => {
  const handleChangeCount = (
    type: "adult" | "child" | "infant_without_seat",
    action: "+" | "-"
  ) => {
    const copyState = { ...state };

    if (action === "+") {
      copyState[type].push({ age: null });
    } else {
      copyState[type].pop();
    }
    setState(copyState);
  };

  const totalCount = Object.values(state || {}).reduce((acc, passengerType) => {
    return acc + passengerType.length;
  }, 0);

  const ageOptions = [
    { value: "2" },
    { value: "3" },
    { value: "4" },
    { value: "5" },
    { value: "6" },
    { value: "7" },
    { value: "8" },
    { value: "9" },
    { value: "10" },
    { value: "11" },
    { value: "12" },
    { value: "13" },
    { value: "15" },
  ];

  return (
    <Popover as="div" className={classNames(className, "relative")}>
      <Popover.Button className="flex w-full flex-col text-left rounded-lg border border-gray-300 bg-gray-200 bg-opacity-30 hover:bg-opacity-60 transition px-3.5 py-3.5 h-[68px]">
        <div className="flex w-full justify-between items-center text-brand-neutral-600 mb-auto">
          <span className="text-sm leading-none -mt-0.5">{label}</span>
        </div>
        <div className="text-brand-neutral-700 text-sm leading-none font-medium">
          {totalCount}
        </div>
      </Popover.Button>
      <Transition
        className="origin-top-left"
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel
          className="absolute mt-2.5 z-10 w-full sm:w-72 2xl:w-80 rounded-lg overflow-hidden bg-white"
          style={{
            boxShadow:
              "0px 4px 12px 0px rgba(24, 39, 75, 0.08), 0px -4px 12px 0px rgba(24, 39, 75, 0.08)",
          }}
        >
          <div className="p-4">
            <div className="flex items-center gap-1.5 text-brand-neutral-800 mb-3">
              <span className="text-[22px]">
                <FaPersonWalkingLuggage />
              </span>
              <span className="text-[15px] sm:text-base font-medium">
                Travelers
              </span>
            </div>
            <ul className="mb-4 space-y-2">
              {Object.keys(state || {}).map((passenger, index: number) => (
                <li key={index}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {
                        passengerOptions?.[
                          passenger as keyof typeof passengerOptions
                        ]
                      }
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        disabled={
                          state?.[passenger as keyof typeof passengerOptions] <=
                          0
                        }
                        onClick={() =>
                          handleChangeCount(
                            passenger as keyof typeof passengerOptions,
                            "-"
                          )
                        }
                        className="text-2xl text-brand-neutral-700 disabled:opacity-60"
                      >
                        <CiCircleMinus />
                      </button>
                      <span className="text-brand-neutral-800 font-medium text-base leading-none">
                        {
                          state?.[passenger as keyof typeof passengerOptions]
                            ?.length
                        }
                      </span>
                      <button
                        //because the number of infant without seat is no more then adult
                        disabled={
                          passenger === "infant_without_seat" &&
                          state?.adult?.length <=
                            state?.infant_without_seat?.length
                        }
                        onClick={() =>
                          handleChangeCount(
                            passenger as keyof typeof passengerOptions,
                            "+"
                          )
                        }
                        className="text-2xl text-green-500 disabled:opacity-60"
                      >
                        <CiCirclePlus />
                      </button>
                    </div>
                  </div>

                  {passenger === "child" &&
                  state?.[passenger as keyof typeof passengerOptions]
                    ?.length ? (
                    <div className="grid grid-cols-2 gap-2 my-2">
                      {new Array(
                        state?.[
                          passenger as keyof typeof passengerOptions
                        ]?.length
                      )
                        .fill(null)
                        .map((_, passengerAgeIndex) => (
                          <select
                            key={passengerAgeIndex}
                            value={
                              state?.[
                                passenger as keyof typeof passengerOptions
                              ]?.[passengerAgeIndex]?.age || ""
                            }
                            onChange={(e) => {
                              const prevStateCopy: IState = { ...state };

                              prevStateCopy[passenger][passengerAgeIndex].age =
                                e.target.value;

                              setState(prevStateCopy);
                            }}
                            className="py-2 text-xs rounded-lg border-gray-300"
                            name=""
                            id=""
                          >
                            <option value="">Age</option>
                            {ageOptions.map((option, index) => (
                              <option key={index} value={option.value}>
                                {option.value}
                              </option>
                            ))}
                          </select>
                        ))}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>

            <div className="flex justify-end">
              <Popover.Button
                className={classNames("button w-full", "primary")}
                style={{ minHeight: "45px" }}
              >
                Done
              </Popover.Button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default PassengersCount;
