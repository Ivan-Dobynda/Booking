import React from "react";

import Sortby from "@/components/Filters/Sortby";
import Search from "@/components/Search/Search";

import CarsListing from "./CarsListing";
import Aside from "./Aside";
import CarsFiltersButton from "@/components/Button/CarsFiltersButton";

const CarRental = () => {
  return (
    <main className="pt-6 sm:pt-10 md:pt-14 lg:pt-16 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-32">
      <section className="mb-10 md:mb-12 lg:mb-16 xl:mb-24">
        <Search activeTab="cars" />
      </section>

      <div className="base-container">
        <div className="flex gap-6 xl:gap-8">
          <Aside />

          <section className="flex-1">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium text-brand-neutral-600 text-base leading-none">
                  40 results
                </h3>
                <div className="flex">
                  <Sortby />
                </div>
              </div>
              <div className="flex justify-end">
                <CarsFiltersButton />
              </div>
            </div>
            <CarsListing />
          </section>
        </div>
      </div>
    </main>
  );
};

export default CarRental;
