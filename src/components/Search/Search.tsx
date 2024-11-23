"use client";
import React, { useState } from "react";
import { FaPlaneDeparture, FaCar } from "react-icons/fa";
import { FaHotel } from "react-icons/fa6";
import { classNames } from "@/lib/helpers";
import { IconType } from "react-icons";
import Flights from "./Flights/Flights";
import Hotels from "./Hotels/Hotels";
import Cars from "./Cars/Cars";

interface ISearchProps {
  activeTab?: "flights" | "hotels" | "cars";
}

const tabs: {
  name: ISearchProps["activeTab"];
  icon: IconType;
}[] = [
  { name: "flights", icon: FaPlaneDeparture },
  { name: "hotels", icon: FaHotel },
  { name: "cars", icon: FaCar },
];

const Search = ({ activeTab = "flights" }: ISearchProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  return (
    <div className="px-4 sm:px-5 lg:px-6">
      <div className="search-card relative z-40 w-full shadow-2xl shadow-[rgba(0,0,0,0.15)] max-w-screen-xl mx-auto bg-gray-50 rounded-2xl ">
        <div className="p-4 lg:p-5 xl:p-6">
          <div className="flex justify-center gap-2.5 sm:gap-3 lg:gap-4 border-b-2 pb-4 mb-3 sm:mb-4 lg:mb-5">
            {/* {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => (tab.name ? setCurrentTab(tab.name) : null)}
                className={classNames(
                  currentTab === tab.name
                    ? "bg-brand-blue hover:bg-brand-blue-400 border-transparent text-white"
                    : "border-brand-blue hover:bg-brand-blue-50 text-brand-neutral-700",
                  "p-2.5 lg:p-3 text-center max-w-full w-32 inline-flex items-center justify-center gap-2.5 lg:gap-3 rounded-lg transition duration-200 border"
                )}
              >
                <span className="text-base md:text-lg lg:text-xl">
                  <tab.icon />
                </span>
                <span className="text-sm lg:text-base leading-none font-medium capitalize">
                  {tab.name}
                </span>
              </button>
            ))} */}
          </div>
          {currentTab === "flights" ? <Flights /> : null}
          {currentTab === "hotels" ? <Hotels /> : null}
          {currentTab === "cars" ? <Cars /> : null}
        </div>
      </div>
    </div>
  );
};

export default Search;
