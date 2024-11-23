import React from "react";
import { FaPlaneDeparture, FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { IoIosMail, IoIosInformationCircle } from "react-icons/io";
import { GiStopwatch } from "react-icons/gi";
import Image from "next/image";
import FlightLogo from "@/assets/logos/flight-logo.png";
import commission from "@/constants/commission";

interface AsideProps {
  total_currency: string | null;
  total_amount: string | null;
  base_currency: string | null;
  base_amount: string | null;
  tax_currency: string | null;
  tax_amount: string | null;
  passengers: any[];
  owner: any | null;
  flightType: string | null;
}

const passengerOptions: {
  adult: string;
  child: string;
  infant_without_seat: string;
  [key: string]: string; // Index signature
} = {
  adult: "Adult",
  child: "Child",
  infant_without_seat: "Infant without seat",
};

const Aside = ({
  total_currency,
  total_amount,
  base_currency,
  base_amount,
  tax_currency,
  tax_amount,
  passengers,
  owner,
  flightType,
}: AsideProps) => {
  const getPassengersList = (): any => {
    const travelers: any = {};

    passengers?.forEach((passenger) => {
      travelers[passenger.type] = travelers[passenger.type]
        ? travelers[passenger.type] + 1
        : 1;
    });

    return travelers;
  };

  return (
    <aside className="lg:w-80 xl:w-96 2xl:w-[400px] space-y-6 xl:space-y-7 lg:sticky top-8 z-20">
      <div className="rounded-2xl overflow-hidden card-shadow">
        <header className="p-6 py-4 xl:py-5 bg-brand-blue">
          <h3 className="md:leading-none text-white font-semibold text-base leading-none md:text-lg">
            Need Help?
          </h3>
        </header>
        <div className="px-4 sm:px-5 md:px-6 py-3.5 sm:py-4 md:py-5">
          <ul className="space-y-3.5">
            <li>
              <a href="/flight/123" className="flex gap-3 items-center">
                <div className="flex items-center justify-center text-xl w-11 h-11 rounded-full bg-brand-blue text-white">
                  <span>
                    <BiSupport />
                  </span>
                </div>
                <span className="text-base text-brand-neutral-600 leading-none">
                  +123 2585 123 123
                </span>
              </a>
            </li>
            <li>
              <a href="/flight/123" className="flex gap-3 items-center">
                <div className="flex items-center justify-center text-xl w-11 h-11 rounded-full bg-brand-blue text-white">
                  <span>
                    <IoIosMail />
                  </span>
                </div>
                <span className="text-base text-brand-neutral-600 leading-none">
                  hello@mail.com
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="rounded-2xl overflow-hidden card-shadow">
        <div className="p-4 sm:p-5 md:p-6">
          <header className="flex items-center gap-4 border-b pb-4 md:pb-5 mb-4 md:mb-5">
            <div className="w-16 md:w-[72px] h-16 md:h-[72px] overflow-hidden">
              {owner?.logo_symbol_url ? (
                <Image
                  width={72}
                  height={72}
                  src={owner?.logo_symbol_url}
                  alt={owner?.name}
                  className="object-contain object-center h-full w-full"
                />
              ) : null}
            </div>
            <div>
              <h6 className="flex text-sm md:text-base leading-none md:leading-none text-brand-neutral-600 gap-2 md:gap-3 mb-1.5 md:mb-2">
                <FaPlaneDeparture /> <span>Flight</span>
              </h6>
              <h5 className="text-base md:text-lg md:leading-none text-brand-neutral-800 font-semibold leading-none mb-1.5 md:mb-2">
                {owner?.name}
              </h5>
              <h6 className="text-sm md:text-base leading-none md:leading-none text-brand-neutral-600 ">
                {flightType?.[0]?.toUpperCase()}
                {flightType?.slice(1)}
              </h6>
            </div>
          </header>
          <div>
            <h4 className="text-base md:text-[17px] leading-none md:leading-none text-brand-neutral-800 font-semibold mb-4">
              Fare Summary
            </h4>
            <ul className="space-y-3 text-[15px]">
              {Object.keys(getPassengersList()).map((passengerKey, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-brand-neutral-600 leading-none"
                >
                  <span>
                    {passengerOptions[passengerKey]} (
                    {getPassengersList()[passengerKey]} Traveler
                    {getPassengersList()[passengerKey] > 1 ? "s" : ""})
                  </span>
                </li>
              ))}
              <li className="flex justify-between items-center text-brand-neutral-600 leading-none">
                <span>Base Fare</span>
                <span>
                  {base_currency}{" "}
                  {(+(base_amount || 0) * commission).toFixed(2)}
                </span>
              </li>
              <li className="flex justify-between items-center text-brand-neutral-600 leading-none">
                <span>Tax</span>
                <span>
                  {tax_currency} {(+(tax_amount || 0) * commission).toFixed(2)}
                </span>
              </li>
            </ul>
            {/* <ul className="space-y-3 text-sm">
              <li className="flex justify-between items-center text-brand-neutral-600 leading-none">
                <span>Sub-Total</span>
                <span>$820.00</span>
              </li>
              <li className="flex justify-between items-center text-brand-neutral-600 leading-none">
                <div className="flex gap-2 items-center">
                  <span>Hot Deals</span>
                  <span className="rounded-lg bg-brand-orange text-brand-neutral-800 py-2 md:py-2.5 px-3 md:px-4 sm:leading-none text-xs sm:text-sm font-semibold">
                    14% Off
                  </span>
                </div>
                <div className="flex items-center gap-2 text-red-500">
                  <span>
                    <FaCircleMinus />
                  </span>
                  <span>$140.60</span>
                </div>
              </li>
              <li className="flex justify-between items-center text-brand-neutral-600 leading-none">
                <div className="flex gap-2 items-center">
                  <span>Convenience Charge</span>
                  <span className="text-xl">
                    <IoIosInformationCircle />
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">
                    <FaCirclePlus />
                  </span>
                  <span>$140.60</span>
                </div>
              </li>
            </ul> */}
          </div>
        </div>

        <div className="space-y-1 sm:space-y-1.5 md:space-y-2 py-3 sm:py-4 md:py-5 px-5 md:px-6 lg:px-8 bg-brand-blue text-white">
          <div className="flex justify-between items-center">
            <h5 className="text-sm sm:text-base">
              <strong>You Pay</strong> (for {passengers?.length} Traveler
              {passengers?.length > 1 ? "s" : ""})
            </h5>
            <strong className="font-semibold">
              {total_currency} {(+(total_amount || 0) * commission).toFixed(2)}
            </strong>
          </div>
          {/* <div className="flex justify-between items-center text-sm text-green-500">
            <h6>You Save</h6>
            <span>
              {total_currency}
              {total_amount}
            </span>
          </div> */}
        </div>
      </div>
      {/* <div className="rounded-2xl overflow-hidden card-shadow p-4 sm:p-5 md:p-6 flex gap-3 sm:gap-4 items-start">
        <div className="text-2xl p-3 rounded-full text-white bg-brand-blue">
          <GiStopwatch />
        </div>
        <div>
          <h4 className="leading-none text-base md:text-lg md:leading-none font-semibold text-brand-neutral-800 mb-2">
            Free Cancellation
          </h4>
          <p className="text-brand-neutral-600 text-sm md:text-base max-w-[256px]">
            {`There's no fee to cancel within 32 hours of booking.`}
          </p>
        </div>
      </div> */}
    </aside>
  );
};

export default Aside;
