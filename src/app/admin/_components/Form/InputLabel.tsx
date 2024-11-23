import React from "react";
import { classNames } from "@/lib/helpers";

const InputLabel = ({
  id,
  label,
  size = "default",
  className,
}: {
  id?: string;
  label?: string;
  size?: "default" | "small";
  className?: string;
}) => {
  return (
    <label
      htmlFor={id}
      className={classNames(
        "text-neutral-800 leading-none bg-white inline-block absolute top-0 transform -translate-y-1/2 z-10",
        size === "default" ? "py-1.5 px-2.5 text-base left-4" : "",
        size === "small" ? "py-1 px-2 text-sm left-3" : "",
        className
      )}
    >
      {label}
    </label>
  );
};

export default InputLabel;
