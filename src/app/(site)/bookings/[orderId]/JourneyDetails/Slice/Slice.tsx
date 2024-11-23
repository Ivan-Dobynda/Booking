import React from "react";
import moment from "moment";
import Image from "next/image";
import { formatDate } from "@/lib/helpers";

interface SliceProps {
  slice: any;
}

const Slice = ({ slice }: SliceProps) => {
  const getDifference = (from: string, to: string) => {
    const departingAt = moment(to);
    const arrivingAt = moment(from);

    const duration = moment.duration(departingAt.diff(arrivingAt));

    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();

    return `${hours} Hr ${minutes} Min`;
  };

  const firstSegment = slice?.segments?.[0];
  const lastSegment = slice?.segments?.[slice?.segments?.length - 1];

  return (
    <div>
      <header className="flex justify-between mb-6">
        <div className="flex gap-3 sm:gap-4 md:items-center">
          {firstSegment?.operating_carrier?.logo_symbol_url ? (
            <Image
              className="w-12 h-12 object-contain object-center"
              width={48}
              height={48}
              src={firstSegment?.operating_carrier?.logo_symbol_url}
              alt={firstSegment?.operating_carrier?.name}
            />
          ) : null}

          <div className="flex flex-col gap-2.5">
            <div className="font-medium leading-none">
              {formatDate(firstSegment?.departing_at, "HH:mm")}
              {" - "}
              {formatDate(lastSegment?.arriving_at, "HH:mm")}
            </div>
            <div className="text-sm text-gray-700 leading-none flex items-center gap-1.5">
              <span>{slice?.fare_brand_name}</span>
              <span className="w-[3px] h-[3px] bg-gray-600 rounded-full inline-block"></span>
              <span>{firstSegment?.operating_carrier?.name}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-5">
          <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-2.5">
            <div className="font-medium leading-none">
              {getDifference(
                firstSegment?.departing_at,
                lastSegment?.arriving_at
              )}
            </div>
            <div className="text-sm text-gray-700 leading-none">
              {firstSegment?.origin?.iata_code}
              {" - "}
              {lastSegment?.origin?.iata_code}
            </div>
          </div>
          <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-2.5">
            <div className="font-medium leading-none text-sm sm:text-base sm:leading-none">
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
            </div>
          </div>
        </div>
      </header>
      <ul className="space-y-6">
        {slice?.segments?.map((segment: any, index: number) => (
          <li key={index}>
            {index >= 1 ? (
              <div className="bg-gray-200/70 px-2.5 py-1 inline-block text-sm space-x-1.5 mb-4 rounded-full text-gray-700">
                <strong className="font-medium">Stop {index}: </strong>
                {getDifference(
                  slice?.segments?.[index - 1]?.arriving_at,
                  segment?.departing_at
                )}{" "}
                in{" "}
                <strong className="font-medium">{segment.origin?.name}</strong>{" "}
                ({segment.origin?.iata_code})
              </div>
            ) : null}
            <div>
              <div className="flex gap-5 mb-6">
                <div className="space-y-1">
                  <div className="w-4 h-4 rounded-full border border-gray-300 shrink-0"></div>
                  <div className="mx-auto h-[calc(100%)] w-px border-l-2 border-dotted border-gray-300 "></div>
                </div>
                <div className="-mt-0.5">
                  <h4 className="text-base space-x-1.5 mb-4 leading-5">
                    <span className="font-medium">
                      {formatDate(
                        segment?.departing_at,
                        "ddd, DD MMM YYYY, HH:mm"
                      )}
                    </span>
                    <span className="text-[15px] leading-none">
                      Depart from {segment?.origin?.name} (
                      {segment?.origin?.iata_code})
                    </span>
                    <span className="text-[15px] leading-none">
                      Terminal {segment?.arrival_terminal}
                    </span>
                  </h4>
                  <div className="text-sm text-gray-700 leading-none font-medium">
                    Flight duration:{" "}
                    {getDifference(segment?.departing_at, segment?.arriving_at)}
                  </div>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-gray-300 shrink-0"></div>
                </div>
                <div className="-mt-0.5">
                  <h4 className="text-base space-x-1.5 mb-4 leading-5">
                    <span className="font-medium">
                      {formatDate(
                        segment?.arriving_at,
                        "ddd, DD MMM YYYY, HH:mm"
                      )}
                    </span>
                    <span className="text-[15px] leading-none">
                      Arrive at {segment?.destination?.name} (
                      {segment?.destination?.iata_code})
                    </span>
                    <span className="text-[15px] leading-none">
                      Terminal {segment?.departure_terminal}
                    </span>
                  </h4>
                  <div className="text-sm text-gray-600 leading-none flex gap-3">
                    <span className="capitalize">
                      {segment?.passengers?.[0]?.cabin_class}
                    </span>
                    <span>{segment?.operating_carrier?.name}</span>
                    <span>{segment?.aircraft?.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Slice;
