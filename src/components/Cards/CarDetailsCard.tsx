import React from "react";
import Image from "next/image";

import { FaRoute, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { TbManualGearbox } from "react-icons/tb";
import { BsSpeedometer2 } from "react-icons/bs";
import { IoSnowOutline } from "react-icons/io5";
import { MdLuggage } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { GiCarDoor } from "react-icons/gi";
import { IoMdCheckmark } from "react-icons/io";

import CompanyLogo from "@/assets/logos/rent-a-car-1.png";
import HotelImage from "@/assets/images/hotel.png";

import Button from "../Button/Button";

const CarDetailsCard = () => {
  return (
    <div className="p-4 card-shadow rounded-2xl flex flex-col md:flex-row gap-3 md:gap-5 flex-wrap relative">
      <div className="w-full md:w-2/5 xl:w-[34%] flex items-center">
        <div className="w-full">
          <Image
            className="object-cover object-center rounded-xl w-full mb-2"
            src={HotelImage}
            alt="Marina Bay Sands Resort"
          />
          <div className="flex gap-4 items-center justify-between md:justify-start">
            <div>
              <Image
                src={CompanyLogo}
                alt="Rent a car company"
                className="w-24 object-contain"
              />
            </div>
            <div>
              <div className="text-white p-1.5  bg-amber-500 text-base md:text-lg leading-none rounded font-medium">
                8.6
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex-1 flex"> */}
      <div className="flex-1">
        <div className="rounded-lg bg-orange-300 py-[11px] px-[18px] text-xs leading-none font-medium text-brand-neutral-800 text-center inline-block mb-1.5 absolute top-3 right-3 md:top-0 md:right-0 md:relative">
          Best Deals
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-brand-neutral-800 mb-1">
          Economy
        </h3>
        <p className="text-sm leading-none text-brand-neutral-600 mb-2.5">
          Nissan Sunny or similar
        </p>
        <div className="space-y-2.5 mb-3">
          <div className="flex gap-3.5 2xl:gap-5">
            <ul className="space-y-2.5">
              <li className="flex items-center text-brand-neutral-700 gap-1.5">
                <span className="text-base">
                  <FaUser />
                </span>
                <span className="text-sm text-brand-neutral-700 leading-none">
                  5
                </span>
              </li>
              <li className="flex items-center text-brand-neutral-700 gap-1.5">
                <span className="text-base">
                  <TbManualGearbox />
                </span>
                <span className="text-sm text-brand-neutral-700 leading-none">
                  Automatic
                </span>
              </li>

              <li className="flex items-center text-brand-neutral-700 gap-1.5">
                <span className="text-base">
                  <BsSpeedometer2 />
                </span>
                <span className="text-sm text-brand-neutral-700 leading-none">
                  Limited mileage
                </span>
              </li>
            </ul>
            <ul className="space-y-2.5">
              <li className="flex items-center text-brand-neutral-700 gap-1.5">
                <span className="text-base">
                  <IoSnowOutline />
                </span>
                <span className="text-sm text-brand-neutral-700 leading-none">
                  Aircon
                </span>
              </li>
              <li className="flex items-center text-brand-neutral-700 gap-1.5">
                <span className="text-base">
                  <MdLuggage />
                </span>
                <span className="text-sm text-brand-neutral-700 leading-none">
                  2 Small bags
                </span>
              </li>

              <li className="flex items-center text-brand-neutral-700 gap-1.5">
                <span className="text-base">
                  <GiCarDoor />
                </span>
                <span className="text-sm text-brand-neutral-700 leading-none">
                  2 Doors
                </span>
              </li>
            </ul>
          </div>
          <ul className="space-y-2">
            <li className="flex items-start text-brand-neutral-700 gap-1.5">
              <span className="text-base">
                <FaRoute />
              </span>
              <span className="text-[13px] text-brand-neutral-700 leading-4">
                0.08 mi from Cairo, Egypt (CAI-Cairo Intl.)
              </span>
            </li>
            <li className="flex items-start text-brand-neutral-700 gap-1.5">
              <span className="text-base">
                <FaLocationDot />
              </span>
              <span className="text-[13px] text-brand-neutral-700 leading-4">
                Pick-up: Arrival Hall, Terminal 2
              </span>
            </li>
          </ul>
        </div>

        <div className="mb-2">
          <ul className="flex flex-wrap gap-1.5">
            <li className="flex items-center">
              <span className="text-[13px] text-brand-neutral-600">
                199 Reviews
              </span>
            </li>
            <li className="flex items-center gap-0.5">
              <span className="text-sm text-gray-300">
                <GoDotFill />
              </span>
              <span className="text-[13px] text-brand-neutral-600">
                86 Trips
              </span>
            </li>
            <li className="flex items-center gap-0.5">
              <span className="text-sm text-gray-300">
                <GoDotFill />
              </span>
              <span className="text-[13px] text-brand-neutral-600">
                58% Positive ratings
              </span>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium leading-none text-brand-neutral-700 mb-2">
            Included in the price:
          </div>
          <ul className="flex gap-1.5 flex-wrap">
            <li className="inline-flex text-xs items-center gap-1">
              <span className="inline-block text-sm text-green-500">
                <IoMdCheckmark />
              </span>
              <span className="text-brand-neutral-700">Changes</span>
            </li>
            <li className="inline-flex text-xs items-center gap-1">
              <span className="inline-block text-sm text-green-500">
                <IoMdCheckmark />
              </span>
              <span className="text-brand-neutral-700">Theft protection</span>
            </li>
            <li className="inline-flex text-xs items-center gap-1">
              <span className="inline-block text-sm text-green-500">
                <IoMdCheckmark />
              </span>
              <span className="text-brand-neutral-700">
                Fully comprehensive protection
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="basis-full xl:basis-auto flex xl:items-end whitespace-nowrap xl:border-l border-black/10 border-t xl:pt-0 pt-3 xl:border-t-0 xl:ml-3 xl:pl-3 relative">
        {/* <span className="absolute top-0 right-0 rounded-lg bg-brand-orange text-brand-neutral-800 py-2.5 px-4 leading-none text-sm font-semibold">
            14% Off
          </span> */}
        <div className="text-right w-full">
          <div className="space-y-0.5 mb-4 flex justify-between flex-row-reverse xl:flex-col">
            <div>
              <div className="text-[13px] text-brand-neutral-600 leading-none">
                Price for 7 days
              </div>
              <h4>
                <span className="text-[22px] font-semibold text-brand-neutral-800">
                  $680.60
                </span>
              </h4>
            </div>
            <div className=" text-left xl:text-right space-y-0.5">
              <div className="text-sm text-red-600">Cancellation Policy</div>
              <div className="text-xs text-brand-neutral-600">
                (Free cancellation within 24h - 36h)
              </div>
            </div>
          </div>
          <div className="w-full sm:w-auto text-center sm:text-right">
            <Button className="w-full sm:w-auto">View Details</Button>
            <div className="text-xs text-brand-neutral-600 mt-2">
              <div>(including taxes & fees) </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default CarDetailsCard;
