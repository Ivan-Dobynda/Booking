import { formatDate } from "@/lib/helpers";
import moment from "moment";
import Image from "next/image";
import React from "react";
import { FaClock } from "react-icons/fa6";

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

  return (
    <>
      <div>
        <h2 className="text-[17px] leading-none sm:text-lg sm:leading-none md:text-xl md:leading-none mb-2.5 md:mb-3">
          <span className="font-bold text-brand-neutral-800">
            {slice?.segments[0]?.origin} to{" "}
            {slice?.segments[slice?.segments.length - 1]?.destination}
          </span>{" "}
          <span className="text-brand-neutral-600">
            {formatDate(slice?.segments[0]?.departing_at, "ddd, DD MMM YYYY")}
          </span>
        </h2>
        <p className="text-sm leading-none sm:leading-none sm:text-base text-neutral-600 mb-5 md:mb-6">
          Travel time:{" "}
          <strong>
            {" "}
            {getDifference(
              slice?.segments?.[0]?.departing_at,
              slice?.segments?.[slice?.segments?.length - 1]?.arriving_at
            )}
          </strong>{" "}
          {slice?.segments?.length > 1 ? (
            <>
              With{" "}
              <strong>
                {slice.segments?.length - 1} Stop
                {slice.segments?.length - 1 > 1 ? "s" : ""}
              </strong>
            </>
          ) : (
            "Non Stop"
          )}
        </p>
        {slice?.segments?.map((segment: any, index: number) => (
          <div key={index}>
            {index >= 1 ? (
              <div className="text-brand-orange-700 flex items-center text-sm sm:text-base md:text-[17px] gap-2 my-3">
                <strong className="font-semibold">Stop {index}: </strong>
                {getDifference(
                  slice?.segments?.[index - 1]?.arriving_at,
                  segment?.departing_at
                )}{" "}
                in <strong className="font-semibold">{segment.origin}</strong> (
                {segment.origin_iata_city_code})
              </div>
            ) : null}

            <div className="mb-3.5 md:mb-4">
              <h4 className="text-sm leading-none sm:text-base sm:leading-none md:text-lg font-semibold text-brand-neutral-800 md:leading-none mb-2 md:mb-2.5">
                {formatDate(segment?.departing_at, "HH:mm")}
                {" - "}
                {formatDate(segment?.arriving_at, "HH:mm")}
              </h4>
              <h3 className="text-sm leading-none sm:text-base sm:leading-none md:text-[17px] font-medium text-brand-neutral-800 md:leading-none mb-2 md:mb-2.5">
                {segment?.origin}{" "}
                <span className="text-brand-neutral-600">
                  ({segment.origin_iata_city_code})
                </span>{" "}
                - {segment?.destination}{" "}
                <span className="text-brand-neutral-600">
                  ({segment?.destination_iata_city_code})
                </span>
              </h3>
              <h4 className="text-sm leading-none sm:text-base sm:leading-none md:text-[17px] font-medium text-brand-neutral-800 md:leading-none">
                Flight Time:{" "}
                <span className="text-brand-neutral-600">
                  {getDifference(segment?.departing_at, segment?.arriving_at)}
                </span>
              </h4>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 md:gap-16 lg:gap-20">
              <div className="flex items-center gap-3.5 sm:gap-5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 overflow-hidden">
                  {segment?.airline_logo ? (
                    <Image
                      width={64}
                      height={64}
                      src={segment?.airline_logo}
                      alt="flight logo"
                      className="object-contain object-center h-full w-full"
                    />
                  ) : null}
                </div>
                <div>
                  <h5 className="text-base leading-none md:text-lg text-brand-neutral-800 font-semibold md:leading-none mb-1.5">
                    {segment?.airline_name}
                  </h5>
                  <h6 className="text-sm md:text-[15px] text-brand-neutral-600">
                    Flight {segment?.flight_number} - {segment?.aircraft?.name}
                  </h6>
                </div>
              </div>
              <div>
                <h5 className="text-sm leading-none md:text-base text-brand-neutral-800 font-medium md:leading-none">
                  Cabin:{" "}
                  <span className="text-brand-neutral-600">
                    {segment?.passengers?.[0]?.cabin?.marketing_name}
                  </span>
                </h5>
                {/* <h5 className="text-sm leading-none md:text-base text-brand-neutral-800 font-medium md:leading-none">
                  Brand Name:{" "}
                  <span className="text-brand-neutral-600">Cabin Class</span>
                </h5> */}
              </div>
            </div>
          </div>
        ))}

        {slice?.segments?.length === 1 ? (
          <div className="mt-3 sm:mt-4 md:mt-5">
            <div className="text-brand-neutral-800 flex items-center text-sm sm:text-base md:text-lg gap-2">
              <FaClock />
              <span className="font-medium leading-none">Non Stop</span>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Slice;
