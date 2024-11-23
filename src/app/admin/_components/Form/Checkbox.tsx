import { classNames } from "@/lib/helpers";
import React, { InputHTMLAttributes } from "react";

interface CheckboxTypes extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  id?: string;
  label?: string;
  error?: string | boolean;
  labelClassName?: string;
}

const Checkbox = ({
  id,
  className,
  label,
  labelClassName,
  ...props
}: CheckboxTypes) => {
  return (
    <label className="inline-flex space-x-2 items-start">
      <input
        id={id}
        type="checkbox"
        className="h-[18px] w-[18px] rounded border-gray-300 text-[#27A376] focus:ring-0 focus:ring-transparent"
        {...props}
      />
      {label ? (
        <span
          className={classNames(
            "text-sm text-brand-neutral-600 -mt-0.5",
            labelClassName
          )}
        >
          {label}
        </span>
      ) : null}
    </label>
  );
};

export default Checkbox;
