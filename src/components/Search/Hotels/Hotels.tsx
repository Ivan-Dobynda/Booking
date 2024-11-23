import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaAngleDown, FaPlaneDeparture } from "react-icons/fa6";
import LocationSearch from "./LocationSearch";
import DateSelection from "../Flights/DateSelection";
import PassengersCount from "../Flights/PassengersCount";
import RoomsCount from "./RoomsCount";
import { useRouter, useSearchParams } from "next/navigation";
// import { fetchHotels } from "@/lib/services/hotelService";

const Hotels = () => {
  // const searchParams = useSearchParams();
  const router = useRouter()

  // const [hotelsData, setHotelsData] = useState<[]>([])
  // const fetchHotels = () => {
  //   fetch('/hotelsData.json'
  //     , {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //       }
  //     }
  //   )
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (data) {
  //       // setTemps(myJson)
  //       console.log(data)
  //       setHotelsData(data.hotels)
  //       return data
  //     });
  // }
  const onSearch = () => {
    const searchParams: any = {};
    searchParams.checkIn = '2024-01-17'
    searchParams.checkOut = '2024-01-20'
    searchParams.rooms = 1
    searchParams.adults = 2
    searchParams.children = 0
    searchParams.hotelCode = 1433
    const queryParams = new URLSearchParams(searchParams);
    const queryString = queryParams.toString();

    router.push(`/hotel?${queryString}`, { scroll: false });
  };
  // useEffect(() => {
  //   fetchHotels()
  // }, [])
  return (
    <>
      <div className="flex gap-3.5">
        <LocationSearch
          label="Where do you want to stay?"
          className="flex-1 flex-grow-[3]"
        />
        {/* <button className="text-left rounded-lg border border-gray-300 bg-gray-200 bg-opacity-30 hover:bg-opacity-60 transition px-3.5 pt-2 pb-2.5 flex-1 flex-grow-[3]">
          <div className="text-brand-neutral-600 mb-1.5">
            <span className="text-sm leading-none">
              Where do you want to stay?
            </span>
          </div>
          <div className="text-brand-neutral-700 text-[15px] leading-none font-medium">
            Singapore
          </div>
        </button> */}
        <DateSelection label="Check-in" className="flex-1 flex-grow-[2]" />
        <DateSelection label="Check-out" className="flex-1 flex-grow-[2]" />
        {/* <button className="text-left rounded-lg border border-gray-300 bg-gray-200 bg-opacity-30 hover:bg-opacity-60 transition px-3.5 pt-2 pb-2.5 flex-1 flex-grow-[1]">
          <div className="text-brand-neutral-600 mb-1.5">
            <span className="text-sm leading-none">Check-in</span>
          </div>
          <div className="text-brand-neutral-700 text-[15px] leading-none font-medium">
            19/08/23
          </div>
        </button>
        <button className="text-left rounded-lg border border-gray-300 bg-gray-200 bg-opacity-30 hover:bg-opacity-60 transition px-3.5 pt-2 pb-2.5 flex-1 flex-grow-[1]">
          <div className="text-brand-neutral-600 mb-1.5">
            <span className="text-sm leading-none">Check-out</span>
          </div>
          <div className="text-brand-neutral-700 text-[15px] leading-none font-medium">
            26/08/23
          </div>
        </button> */}
        {/* <button className="text-left rounded-lg border border-gray-300 bg-gray-200 bg-opacity-30 hover:bg-opacity-60 transition px-3.5 pt-2 pb-2.5 flex-1 flex-grow-[1.5]">
          <div className="text-brand-neutral-600 mb-1.5">
            <span className="text-sm leading-none">Room</span>
          </div>
          <div className="text-brand-neutral-700 text-[15px] leading-none font-medium">
            1 room
          </div>
        </button> */}
        <RoomsCount label="Room" className="flex-1 flex-grow-[1.5]" />
        {/* <PassengersCount label="Travelers" className="flex-1 flex-grow-[1.5]" /> */}
        {/* <button className="text-left rounded-lg border border-gray-300 bg-gray-200 bg-opacity-30 hover:bg-opacity-60 transition px-3.5 pt-2 pb-2.5 flex-1 flex-grow-[1]">
          <div className="text-brand-neutral-600 mb-1.5">
            <span className="text-sm leading-none">Travelers</span>
          </div>
          <div className="text-brand-neutral-700 text-[15px] leading-none font-medium">
            3 Passenger
          </div>
        </button> */}
        <button onClick={onSearch}
          className="p-4 text-center inline-flex items-center justify-center gap-2 rounded-lg bg-brand-blue hover:bg-brand-blue-400 transition duration-200 text-white">
          <span className="text-2xl">
            <CiSearch />
          </span>
          <span className="text-base leading-none font-medium">Search</span>
        </button>
      </div>
    </>
  );
};

export default Hotels;
