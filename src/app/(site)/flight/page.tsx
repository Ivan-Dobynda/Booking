import React from "react"

import FlightFiltersButton from "@/components/Button/FlightFiltersButton"
import Sortby from "@/components/Filters/Sortby"
import Search from "@/components/Search/Search"

import Filters from "./Filters"
import OffersListing from "./OffersListing"
import { FlightsProvider } from "@/context/FlightsContext"

interface FlightsProps {
  searchParams: any
}

const Flights = ({ searchParams }: FlightsProps) => {
  return (
    <FlightsProvider searchParams={searchParams}>
      <main className='pt-6 sm:pt-10 md:pt-14 lg:pt-16 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-32'>
        <section className='mb-10 md:mb-12 lg:mb-16 xl:mb-24'>
          <Search />
        </section>
        <div className='base-container'>
          <div className='flex gap-6 xl:gap-8'>
            <aside className='w-72 xl:w-[330px] hidden lg:block'>
              <Filters />
            </aside>
            <section className='flex-1'>
              <div className='flex lg:hidden gap-4 items-start justify-between mb-6 md:mb-8 lg:mb-10 xl:mb-12'>
                <FlightFiltersButton />
                <div className='flex md:hidden'>
                  <Sortby />
                </div>
              </div>

              <OffersListing />
            </section>
          </div>
        </div>
      </main>
    </FlightsProvider>
  )
}

export default Flights
