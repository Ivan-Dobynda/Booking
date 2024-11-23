import React, { InputHTMLAttributes, forwardRef } from "react";

interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="flex items-center">
        <input
          ref={ref}
          type="radio"
          className="h-[18px] w-[18px] border-gray-300 text-green-500 focus:ring-0 focus:ring-transparent"
          {...props}
        />
        {label ? (
          <label
            htmlFor={props.id}
            className="pl-2.5 block text-[15px] leading-6 text-brand-neutral-600"
          >
            {label}
          </label>
        ) : null}
      </div>
    );
  }
);

RadioInput.displayName = "RadioInput";

export default RadioInput;
