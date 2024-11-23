import React, { ReactNode } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { PiArrowUpRightBold } from "react-icons/pi";
import { classNames } from "@/lib/helpers";

interface StatsCardProps {
  image?: string | StaticImport;
  icon?: ReactNode;
  percentage: string;
  title: string;
  numbers: string | number;
  color?: "primary" | "indigo" | "green" | "purple" | "blue";
}

const StatsCard = ({
  image,
  icon,
  percentage,
  title,
  numbers,
  color = "primary",
}: StatsCardProps) => {
  return (
    <div
      className="p-2 border border-neutral-200 bg-white rounded-lg"
      style={{ boxShadow: "0px 4px 15px 0px rgba(0, 0, 0, 0.01)" }}
    >
      <h5 className="text-sm font-medium text-neutral-700 mb-2">{title}</h5>
      <hr className="border-dashed border-brand-blue-300" />
      <div className="mt-1.5 flex items-center gap-1.5">
        <div
          className={classNames(
            "p-1 rounded",
            color === "primary"
              ? "bg-brand-blue-300/10 text-brand-blue-300"
              : "",
            color === "indigo" ? "bg-indigo-500/10 text-indigo-600" : "",
            color === "green" ? "bg-green-500/10 text-green-600" : "",
            color === "purple" ? "bg-purple-500/10 text-purple-600" : "",
            color === "blue" ? "bg-blue-500/10 text-blue-500" : ""
          )}
        >
          {image ? (
            <Image
              className="w-6 2xl:w-[26px]"
              width={26}
              height={26}
              src={image}
              alt={title}
            />
          ) : null}
          {icon ? (
            <span className="text-[23px] 2xl:text-[25px]">{icon}</span>
          ) : null}
        </div>
        <div className="flex-1">
          <h6 className="text-sm 2xl:text-base text-neutral-800 font-medium">
            {numbers}
          </h6>
          <div className="flex justify-between gap-1.5 2xl:gap-2 items-center">
            <div
              className={classNames(
                "text-sm inline-flex items-center gap-0.5 2xl:gap-1",
                color === "primary" ? "text-brand-blue-300" : "",
                color === "indigo" ? "text-indigo-600" : "",
                color === "green" ? "text-green-600" : "",
                color === "purple" ? "text-purple-600" : "",
                color === "blue" ? "text-blue-500" : ""
              )}
            >
              <PiArrowUpRightBold />
              <span className="text-[10px] font-medium">{percentage}</span>
            </div>
            <span className="text-[10px] font-medium text-neutral-500">
              last month
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
