import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaAngleDown, FaCheck } from "react-icons/fa6";
import { classNames } from "@/lib/helpers";

export const cabinOptions = [
  { name: "Economy", value: "economy" },
  { name: "Premium economy", value: "premium_economy" },
  { name: "Business class", value: "business" },
  { name: "First class", value: "first" },
];

interface IOption {
  name: string;
  value: string;
}

interface SelectCabinClassProps {
  value?: IOption | null;
  onChange?: (value: any) => void;
}

export default function SelectCabinClass({
  value,
  onChange,
}: SelectCabinClassProps) {
  const [state, setState] = useState(value);
  useEffect(() => {
    setState(value)
  }, [value])
  return (
    <Listbox value={value} onChange={value => {
      onChange ? onChange(value) : setState(value)
    }}>
      {({ open }) => (
        <>
          <div className="relative">
            <input type="hidden" value={state?.value} name="cabin_class" />
            <Listbox.Button className="inline-flex rounded-full gap-1.5 sm:gap-2 items-center border sm:border-2 border-brand-neutral-700 text-brand-neutral-700 leading-none py-2 px-3 text-xs sm:text-sm md:text-base">
              <span className="font-medium leading-none capitalize">
                {state?.name || "Cabin Class"}
              </span>
              <span>
                <FaAngleDown />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute capitalize z-20 mt-2 w-60 overflow-auto rounded-md bg-white py-1 text-[15px] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {cabinOptions.map((cabin) => (
                  <Listbox.Option
                    key={cabin.value}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-gray-100" : "text-brand-neutral-800",
                        "relative cursor-default select-none py-2.5 pl-5 pr-10"
                      )
                    }
                    value={cabin}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames("font-normal block truncate")}
                        >
                          {cabin.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              "text-green-600 absolute inset-y-0 right-0 flex items-center pr-5"
                            )}
                          >
                            <FaCheck />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
