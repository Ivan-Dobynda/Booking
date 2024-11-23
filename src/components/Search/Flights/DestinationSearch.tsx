import React, { ChangeEvent, ReactNode, useCallback, useEffect, useState } from "react";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { IoIosCloseCircle } from "react-icons/io";
import debounce from "lodash/debounce";
import { Popover, Transition } from "@headlessui/react";

import TextInput from "@/components/Form/TextInput";
import { classNames } from "@/lib/helpers";
import { IFlight } from "./Flights";
import { fetchAirports } from "@/lib/services/airportService";
import { useFlightsContext } from "@/context/FlightsContext";

interface IDestinationSearch {
  label: string;
  className?: string;
  icon?: ReactNode;
  onSelect?: SearchProps["onSelect"];
  value?: IFlight | null;
}

interface SearchProps {
  onSelect?: (flight: IFlight) => void;
}

const DestinationSearch = ({
  label,
  className,
  icon,
  onSelect,
  value,
}: IDestinationSearch) => {
  const { state } = useFlightsContext();

  useEffect(() => {
    console.log(state);

  }, [state])

  return (
    <Popover as="div" className={classNames(className, "relative z-10")}>
      <Popover.Button className="flex w-full flex-col text-left rounded-lg border border-gray-300 bg-gray-200 bg-opacity-30 hover:bg-opacity-60 transition px-3.5 py-3.5 h-[68px]">
        <div className="flex w-full justify-between items-center text-brand-neutral-600 mb-auto">
          <span className="text-sm leading-none -mt-0.5">{label}</span>
          <span className="text-base">{icon}</span>
        </div>
        <div className="text-brand-neutral-700 text-sm leading-none font-medium">
          {value ? (
            <>
              {value?.city ?? value?.country}, ({value?.iata})
            </>
          ) : (
            <>Search...</>
          )}
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
          className="absolute mt-2.5 z-10 w-full sm:w-[460px] rounded-lg overflow-hidden bg-white"
          style={{
            boxShadow:
              "0px 4px 12px 0px rgba(24, 39, 75, 0.08), 0px -4px 12px 0px rgba(24, 39, 75, 0.08)",
          }}
        >
          <Search onSelect={onSelect} />
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default DestinationSearch;

const Search = ({ onSelect }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const debouncedSearch = useCallback(
    debounce(async (query = ""): Promise<void> => {
      if (!query) {
        setSearchResults([]);
        return;
      }

      try {
        setLoading(true);
        const response = await fetchAirports(query);

        setSearchResults(response?.result || []);
      } catch (error) {
        console.error("Error searching for airports:", error);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  const handleClear = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  const loadingResults = new Array(6).fill(null);

  return (
    <div className="divide-y">
      <div className="relative">
        <div className="flex items-center relative">
          <div className="flex-1">
            <TextInput
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search"
              autoFocus
              className="text-lg lg:text-xl px-4 lg:px-6 h-12 lg:h-[60px] font-semibold text-brand-neutral-900 w-full"
              style={{ borderRadius: 0, boxShadow: "none" }}
            />
          </div>
          {!loading && searchTerm.length > 0 ? (
            <button
              onClick={handleClear}
              className="text-xl lg:text-2xl absolute right-4 lg:right-5 text-red-500 hover:text-red-600 transition"
            >
              <IoIosCloseCircle />
            </button>
          ) : null}
        </div>
      </div>
      {searchResults?.length > 0 && !loading ? (
        <ul className="max-h-80 overflow-auto">
          {searchResults.map((airport: any, index: number) => (
            <li key={index}>
              <Popover.Button
                onClick={() =>
                  onSelect?.({
                    city: airport.city_name || "",
                    iata: airport.iata_code || "",
                    country: "",
                  })
                }
                className="text-left flex items-center w-full gap-3 lg:gap-4 py-3 lg:py-4 px-5 lg:px-6 text-brand-neutral-800 hover:bg-gray-50 transition"
              >
                <div className="text-xl lg:text-2xl">
                  <BiSolidPlaneAlt />
                </div>
                <div>
                  <h5
                    className="text-sm md:text-base font-medium text-brand-neutral-800 leading-none mb-0.5 lg:mb-1"
                    style={{ lineHeight: 1.3 }}
                  >
                    {airport.name} - ({airport.iata_code})
                    {/* ({airport.iata_code} -All Airports) */}
                  </h5>
                  <address
                    className="text-xs md:text-sm text-brand-neutral-600 leading-none text-left not-italic"
                    style={{ lineHeight: 1 }}
                  >
                    {airport.city_name}
                    {/* , United States */}
                    {/* {airport.city_name} */}
                  </address>
                </div>
              </Popover.Button>
            </li>
          ))}
        </ul>
      ) : null}
      {loading ? (
        <ul>
          {loadingResults.map((_: null, index: number) => (
            <li key={index}>
              <div className="flex items-center w-full gap-3 lg:gap-4 py-3 lg:py-4 px-5 lg:px-6 animate-pulse">
                <div className="w-6 h-6 rounded-lg bg-slate-200"></div>
                <div className="">
                  <div className="h-3.5 md:h-4 w-52 bg-slate-200 rounded-full mb-1.5 lg:mb-2"></div>
                  <div className="h-3 md:h-3.5 w-44 bg-slate-200 rounded-full"></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
