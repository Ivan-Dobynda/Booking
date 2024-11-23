import React, { ReactNode, SelectHTMLAttributes, forwardRef } from "react";

import InputLabel from "./InputLabel";
import ErrorMessage from "./ErrorMessage";
import { classNames } from "@/lib/helpers";

interface IOption {
  value: string;
  text?: string;
  name?: string;
}

export interface SelectInputTypes
  extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  id?: string;
  label?: string;
  error?: string;
  children?: ReactNode;
  options?: IOption[];
}

const SelectInput = forwardRef<HTMLSelectElement, SelectInputTypes>(
  ({ id, className, label, error, options = [], children, ...props }, ref) => {
    return (
      <div className="relative">
        {label ? <InputLabel id={id} label={label} /> : null}
        <div className="relative flex items-center">
          <select
            id={id}
            ref={ref}
            className={classNames(
              "text-sm text-app-text-dark placeholder:text-neutral-400 rounded-lg border w-full inline-block pl-[26px] pr-10 py-4 focus:outline-none focus:ring-0",
              error
                ? "border-red-500 focus:border-red-600"
                : "border-gray-200 focus:border-gray-300"
            )}
            {...props}
          >
            {children}
            {options.map((option, index) => (
              <option key={index} value={option?.value}>
                {option?.name || option?.text}
              </option>
            ))}
          </select>
        </div>
        <ErrorMessage error={error} />
      </div>
    );
  }
);

SelectInput.displayName = "SelectInput";

export default SelectInput;
