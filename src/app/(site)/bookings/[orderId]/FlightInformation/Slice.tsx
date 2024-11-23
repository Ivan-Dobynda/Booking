import React from "react";
import Image from "next/image";
import { formatDate } from "@/lib/helpers";

interface SliceProps {
  slice: any;
}

const Slice = ({ slice }: SliceProps) => {
  return (
    <>
      {slice?.segments?.map((segment: any, index: number) => (
        <li
          key={index}
          className="flex items-center gap-3.5 border rounded-md p-4 bg-white"
        >
          {segment?.marketing_carrier?.logo_symbol_url ? (
            <Image
              width={32}
              height={32}
              className="w-8 h-8 object-contain object-center shrink-0"
              src={segment?.marketing_carrier?.logo_symbol_url}
              alt={segment?.name}
            />
          ) : null}

          <div className="inline-block text-gray-700 text-[15px]">
            <strong className="font-semibold">
              {segment?.origin?.iata_code}
            </strong>{" "}
            to{" "}
            <strong className="font-semibold">
              {segment?.destination?.iata_code}
            </strong>{" "}
            on{" "}
            <strong className="font-semibold">
              {formatDate(segment?.departing_at, "ddd, DD MMM YYYY")}
            </strong>{" "}
            at{" "}
            <strong className="font-semibold">
              {formatDate(segment?.departing_at, "HH:mm")}
            </strong>
          </div>
        </li>
      ))}
    </>
  );
};

export default Slice;
