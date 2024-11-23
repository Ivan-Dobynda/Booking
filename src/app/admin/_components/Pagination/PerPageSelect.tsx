"use client";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { classNames, objectToQueryString } from "@/lib/helpers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PerPageSelectProps {}

export default function PerPageSelect({}: PerPageSelectProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const options = [
    { id: 10, name: 10 },
    { id: 20, name: 20 },
    { id: 50, name: 50 },
    { id: 100, name: 100 },
  ];

  const [perPage, setPerPage] = useState({
    id: Number(searchParams.get("per_page") || "20"),
    name: Number(searchParams.get("per_page") || "20"),
  });

  const handleChange = (option: typeof perPage) => {
    setPerPage(option);
    const searchObject: any = {};

    searchParams.forEach((value, key) => {
      searchObject[key] = value;
    });

    searchObject.page = 1;
    searchObject.per_page = option.id;

    router.push(`${pathname}?${objectToQueryString(searchObject)}`);
  };

  return (
    <Listbox value={perPage} onChange={handleChange}>
      {({ open }) => (
        <>
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="whitespace-nowrap text-sm text-neutral-700 font-medium">
                Show:
              </div>
              <Listbox.Button className="relative w-28 cursor-default rounded-lg bg-white py-2 pl-2.5 pr-8 text-left text-neutral-500 ring-1 ring-inset ring-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm leading-6">
                <span className="block truncate">{perPage.name} rows</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 bottom-full left-auto mb-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-primary text-white" : "text-neutral-700",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={option}
                  >
                    {({ active }) => (
                      <>
                        <span
                          className={classNames(
                            perPage.id === option.id
                              ? "font-semibold"
                              : "font-normal",
                            "block truncate"
                          )}
                        >
                          {option.name}
                        </span>

                        {perPage.id === option.id ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-primary",
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
