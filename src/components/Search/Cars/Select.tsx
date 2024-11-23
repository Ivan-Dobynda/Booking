import { CSSProperties, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaAngleDown, FaCheck } from "react-icons/fa6";
import { classNames } from "@/lib/helpers";

interface IOption {
  name: string;
  value: string;
}

interface SelectProps {
  variant?: "outlined" | "simple";
  value?: IOption | null;
  onChange?: (value: any) => void;
  options: IOption[];
  optionsStyles?: CSSProperties;
}

export default function Select({
  value,
  onChange,
  options,
  optionsStyles,
  variant = "outlined",
}: SelectProps) {
  return (
    <Listbox value={value} defaultValue={value} onChange={onChange}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button
              className={classNames(
                variant === "outlined"
                  ? "border sm:border-2 border-brand-neutral-700 py-2 px-3"
                  : "",
                "inline-flex rounded-full gap-1.5 sm:gap-2 items-center text-brand-neutral-700 leading-none text-xs sm:text-sm md:text-base"
              )}
            >
              <span className="font-medium leading-none">{value?.name}</span>
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
              <Listbox.Options
                style={optionsStyles}
                className="absolute z-20 mt-2 w-72 overflow-auto rounded-md bg-white py-1 text-[15px] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-gray-100" : "text-brand-neutral-800",
                        "relative cursor-default select-none py-2.5 pl-5 pr-10"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames("font-normal block truncate")}
                        >
                          {option.name}
                        </span>

                        {value?.value == option.value ? (
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
