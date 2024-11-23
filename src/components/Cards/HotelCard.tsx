import React from "react";
// import HotelImage from "@/assets/images/hotel.png";
import Image from "next/image";
import { FaCheck, FaLocationDot } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { FaStarHalfAlt } from "react-icons/fa";
import Button from "../Button/Button";

interface HotelCardProps  {
  hotel: any
}

const HotelCard = ({hotel}: HotelCardProps) => {
  return (
    <div className="p-4 card-shadow rounded-2xl flex gap-5">
      <div className="w-[35%]">
        <Image
          className="object-cover object-center rounded-xl h-full"
          width={303}
          height={283}
          src={`http://photos.hotelbeds.com/giata/bigger/${hotel.images[0].path}`}
          alt="Marina Bay Sands Resort"
        ></Image>
      </div>
      <div className="flex-1 flex">
        <div>
          <h3 className="text-2xl font-semibold text-brand-neutral-800 mb-2">
            {hotel.name.content}
          </h3>
          <ul className="space-y-2.5 mb-2">
            <li className="flex items-center text-brand-blue gap-1.5">
              <span className="text-base">
                <FaLocationDot />
              </span>
              <span className="text-sm text-brand-neutral-700 leading-none">
                {hotel.address.content}
              </span>
            </li>
            <li className="flex items-center text-brand-blue gap-1.5">
              <span className="text-base">
                <FaCheck />
              </span>
              <span className="text-sm text-brand-neutral-700 leading-none">
                Free Internet Access, Free Parking, Free Wi-Fi
              </span>
            </li>
            <li className="flex items-center text-brand-blue gap-1.5">
              <span className="text-sm text-brand-neutral-700 leading-none">
                Business Friendly
              </span>
            </li>
            <li className="flex items-center text-brand-blue gap-1.5">
              <span className="text-sm text-brand-neutral-700 leading-none">
                Breakfast included
              </span>
            </li>
            <li className="text-brand-blue space-y-1">
              <span className="font-medium text-sm text-brand-neutral-700 leading-none">
                Deluxe Suite
              </span>
              <ul className="flex flex-wrap gap-1.5">
                <li className="flex items-center">
                  <span className="text-[13px] text-brand-neutral-600">
                    Private Suite
                  </span>
                </li>
                <li className="flex items-center gap-0.5">
                  <span className="text-sm text-gray-300">
                    <GoDotFill />
                  </span>
                  <span className="text-[13px] text-brand-neutral-600">
                    2 bedrooms (1 king, 1 queen)
                  </span>
                </li>
                <li className="flex items-center gap-0.5">
                  <span className="text-sm text-gray-300">
                    <GoDotFill />
                  </span>
                  <span className="text-[13px] text-brand-neutral-600">
                    1 living room
                  </span>
                </li>
                <li className="flex items-center gap-0.5">
                  <span className="text-sm text-gray-300">
                    <GoDotFill />
                  </span>
                  <span className="text-[13px] text-brand-neutral-600">
                    1 bathroom
                  </span>
                </li>
              </ul>
            </li>
          </ul>
          <div className="flex items-center gap-2 mb-3">
            <div className="text-white p-1.5 bg-amber-500 text-lg rounded">
              <FaStarHalfAlt />
            </div>
            <div className="-mb-px">
              <span className="text-lg font-medium text-brand-neutral-800 leading-none">
                4.8
              </span>{" "}
              <span className="text-sm text-brand-neutral-600 leading-none">
                (1991 reviews)
              </span>
            </div>
          </div>
          <div className="text-sm font-medium text-red-500">
            Cancellation Policy{" "}
            <span className="text-xs font-normal text-brand-neutral-600">
              (Cancel within 24H)
            </span>
          </div>
        </div>
        <div className="flex items-end whitespace-nowrap border-l border-black/10 ml-3 pl-3 relative">
          <span className="absolute top-0 right-0 rounded-lg bg-brand-orange text-brand-neutral-800 py-2.5 px-4 leading-none text-sm font-semibold">
            14% Off
          </span>
          <div className="text-right">
            <div className="space-y-0.5 mb-3">
              <h4>
                <s className="text-lg text-brand-neutral-600">$720</s>{" "}
                <span className="text-[22px] font-semibold text-brand-neutral-800">
                  $680.60
                </span>
              </h4>
              <div className="text-[13px] text-brand-neutral-600">
                2 nights, 2 adults
              </div>
              <div className="text-[13px] text-brand-neutral-600">
                +USD $20 taxes and charges
              </div>
            </div>
            <Button>Book Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
