"use client";

import React, { FC } from "react";
import Button from "../Button/Button";
import { classNames, formatDate } from "@/lib/helpers";
import Image from "next/image";
import moment from "moment-timezone";
import commission from "@/constants/commission";

interface IProps {
  offer: any;
  client_key: string;
}

const MultipleFlightDetail: FC<IProps> = ({ offer, client_key }) => {
  return (
    <>
      <div className="divide-y space-y-4 lg:space-y-5 w-full xl:w-auto">
        {offer.slices.map((slice: any, index: number) => {
          const segment = slice?.segments?.[0],
            departing_at = moment(segment?.departing_at).tz(segment?.time_zone),
            arriving_at = moment(segment?.arriving_at).tz(segment?.time_zone);

          return (
            <div
              key={index}
              className={classNames(
                index > 0 ? "pt-4 lg:pt-5" : "",
                "flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-4 md:gap-5 xl:gap-8"
              )}
            >
              <div className="flex flex-col justify-center items-center sm:w-40 2xl:w-44">
                <div className="w-20 lg:w-24 h-20 lg:h-24 overflow-hidden mb-3 sm:mb-4">
                  {slice?.segments?.[0]?.airline_logo ? (
                    <Image
                      width={96}
                      height={96}
                      src={slice?.segments?.[0]?.airline_logo}
                      alt="flight logo"
                      className="object-contain object-center h-full w-full"
                    />
                  ) : null}
                </div>
                <div className="text-center">
                  <h4 className="text-sm sm:text-base font-medium text-brand-neutral-600 sm:leading-none leading-none mb-2">
                    {slice?.segments?.[0]?.airline_name}
                    {/* Qatar Airways */}
                  </h4>
                  <h6 className="text-green-500 text-xs sm:text-sm leading-none sm:leading-none">
                    {/* Aircraft (157) */}
                    {slice?.segments?.[0]?.aircraft?.name}
                  </h6>
                </div>
              </div>
              <div
                className={classNames(
                  offer?.flight_type === "round-trip" && index === 1
                    ? "flex-col-reverse md:flex-row-reverse"
                    : "flex-col md:flex-row",
                  "flex-1 flex  items-center gap-3 md:gap-4 xl:gap-6 justify-between"
                )}
              >
                <div className="flex justify-between w-full md:w-auto">
                  <div>
                    <div className="mb-2 md:mb-3 sm:leading-none leading-none text-xs sm:text-sm text-brand-neutral-600">
                      Depart
                    </div>
                    <div className="leading-none text-brand-neutral-800 font-medium mb-2 hidden md:block">
                      {departing_at.format("hh:mm A")}
                    </div>
                    <div className="leading-none text-sm text-brand-neutral-600 mb-4 hidden md:block">
                      {arriving_at.format("DD MMM YYYY")}
                    </div>
                    <div className="leading-none text-sm sm:text-base text-brand-neutral-800 font-medium">
                      {slice?.origin} ({slice?.origin_code})
                    </div>
                  </div>
                  <div className="block md:hidden text-right">
                    <div className="leading-none text-xs sm:text-sm text-brand-neutral-600 mb-2">
                      {formatDate(departing_at, "ddd, DD MMM YYYY")}
                    </div>
                    <div className="leading-none text-sm sm:text-base text-brand-neutral-800 font-medium">
                      {formatDate(departing_at, "hh:mm A")}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-auto text-center md:space-y-1">
                  <p className="text-xs sm:text-sm text-brand-neutral-600 leading-none -mb-1 md:mb-1">
                    {/* {getDifference(departing_at,arriving_at)} */}
                  </p>
                  {offer?.flight_type === "round-trip" && index === 1 ? (
                    <div className="flex flex-col items-start">
                      <div className="h-4 w-px bg-red-500 rotate-[40deg] origin-bottom-left"></div>
                      <div className="w-full md:w-32 h-px bg-red-500"></div>
                      <div className="h-4 w-px bg-red-500 rotate-[40deg] origin-top-right opacity-0"></div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-end">
                      <div className="h-4 w-px bg-red-500 -rotate-[40deg] origin-bottom-right"></div>
                      <div className="w-full md:w-32 h-px bg-red-500"></div>
                      <div className="h-4 w-px bg-red-500 rotate-[40deg] origin-top-right opacity-0"></div>
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-brand-neutral-800 font-medium leading-none -mt-1 md:mt-0">
                    {slice?.segments?.length > 1 ? (
                      <>
                        <strong>
                          {slice.segments?.length - 1} Stop
                          {slice.segments?.length - 1 > 1 ? "s" : ""}
                        </strong>
                      </>
                    ) : (
                      "Non Stop"
                    )}
                  </p>
                </div>
                <div className="flex justify-between w-full md:w-auto">
                  <div>
                    <div className="mb-2 md:mb-3 sm:leading-none leading-none text-xs sm:text-sm text-brand-neutral-600">
                      Arrive
                    </div>
                    <div className="leading-none text-brand-neutral-800 font-medium mb-2 hidden md:block">
                      {arriving_at.format("hh:mm A")}
                    </div>
                    <div className="leading-none text-sm text-brand-neutral-600 mb-4 hidden md:block">
                      {arriving_at.format("DD MMM YYYY")}
                    </div>
                    <div className="leading-none text-sm sm:text-base text-brand-neutral-800 font-medium">
                      {slice?.destination} ({slice?.destination_code})
                    </div>
                  </div>
                  <div className="block md:hidden text-right">
                    <div className="leading-none text-xs sm:text-sm text-brand-neutral-600 mb-2">
                      {formatDate(
                        slice?.segments?.[slice?.segments?.length - 1]
                          ?.departing_at,
                        "ddd, DD MMM YYYY"
                      )}
                    </div>
                    <div className="leading-none text-sm sm:text-base text-brand-neutral-800 font-medium">
                      {formatDate(
                        slice?.segments?.[slice?.segments?.length - 1]
                          ?.arriving_at,
                        "HH:mm"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-5 sm:gap-6 justify-center w-full xl:w-auto max-w-lg">
        <div className="xl:text-right flex items-center xl:items-stretch justify-between xl:flex-col">
          <div>
            <h4 className="text-[17px] sm:text-lg md:text-xl leading-none sm:leading-none md:leading-none font-bold text-brand-neutral-800 mb-2">
              {offer?.total_currency}{" "}
              {(offer?.total_amount * commission).toFixed(2)}
            </h4>
            <p className="text-brand-neutral-600 leading-none text-sm md:text-base md:leading-none xl:mb-4">
              {offer?.slices?.length === 1 ? "Trip " : ""}
              {offer?.slices?.length === 2 ? "Round trip " : ""}
              {offer?.slices?.length >= 3 ? "Multiway trip " : ""}
              for {offer?.total_passengers} traveler
              {offer?.total_passengers > 1 ? "s" : ""}
            </p>
          </div>
          <div className="hidden xl:block">
            <Button
              href={`/flight/${offer?.id}?client_key=${client_key}`}
              className="mb-3"
            >
              View Deal
            </Button>
          </div>
        </div>
        <div className="block xl:hidden">
          <Button
            href={`/flight/${offer?.id}?client_key=${client_key}`}
            className="w-full"
          >
            View Deal
          </Button>
        </div>
      </div>
    </>
  );
};

export default MultipleFlightDetail;
