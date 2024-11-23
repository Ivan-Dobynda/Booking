import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaCaretDown } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { classNames } from "@/lib/helpers";

function generateTimeArray() {
  const timesArray = [];
  const hoursInDay = 12;

  for (let hour = 1; hour <= hoursInDay; hour++) {
    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;

    timesArray.push({
      name: `${formattedHour}:00 AM`,
      value: `${formattedHour}:00 AM`,
    });

    timesArray.push({
      name: `${formattedHour}:30 AM`,
      value: `${formattedHour}:30 AM`,
    });
  }

  for (let hour = 1; hour <= hoursInDay; hour++) {
    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;

    timesArray.push({
      name: `${formattedHour}:00 PM`,
      value: `${formattedHour}:00 PM`,
    });

    timesArray.push({
      name: `${formattedHour}:30 PM`,
      value: `${formattedHour}:30 PM`,
    });
  }

  return timesArray;
}

export const options = generateTimeArray();

interface IOption {
  name: string;
  value: string;
}

interface SelectTimeProps {
  value?: IOption | null;
  onChange?: (value: any) => void;
  className?: string;
}

export default function SelectTime({
  value,
  onChange,
  className,
}: SelectTimeProps) {
  return (
    <Listbox value={value} defaultValue={value} onChange={onChange}>
      {({ open }) => (
        <>
          <div className={classNames(className, "relative")}>
            <Listbox.Button className="flex w-full flex-col text-left rounded-lg border border-gray-300 bg-gray-200 bg-opacity-30 hover:bg-opacity-60 transition pl-3.5 pr-8 py-3.5 h-[68px] relative">
              <div className="flex w-full justify-between items-center text-brand-neutral-600 mb-auto">
                <span className="text-sm leading-none -mt-0.5">Time</span>
              </div>
              <div className="text-brand-neutral-700 text-sm leading-none font-medium">
                {value?.value || "Select Time"}
              </div>
              <span className="absolute bottom-3.5 right-3 text-brand-neutral-700">
                <FaCaretDown />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-20 mt-2 w-56 h-80 overflow-auto rounded-md bg-white py-1 text-[15px] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
