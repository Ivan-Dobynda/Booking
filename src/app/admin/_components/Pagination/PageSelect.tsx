"use client";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/lib/helpers";

interface PageSelectProps {
  totalPages: number;
  page: number;
  handlePagination: (page: number) => void;
}

export default function PageSelect({
  totalPages,
  page,
  handlePagination,
}: PageSelectProps) {
  const options = new Array(totalPages)
    .fill(null)
    .map((_, index) => ({ id: index + 1, name: index + 1 }));

  const [selected, setSelected] = useState({ id: 1, name: 1 });

  useEffect(() => {
    setSelected(
      options.find((option) => option.name == page) || { id: 1, name: 1 }
    );
  }, [page]);

  const handleChange = (option: typeof selected) => {
    setSelected(option);
    handlePagination(option.id);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-2.5 pr-8 text-left text-neutral-500 ring-1 ring-inset ring-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm leading-6">
              <span className="block truncate">Page {selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 bottom-full mb-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "bg-brand-blue text-white"
                          : "text-neutral-700",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {option.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-brand-blue",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
