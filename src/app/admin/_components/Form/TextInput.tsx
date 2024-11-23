import React, { InputHTMLAttributes, forwardRef } from "react";

import InputLabel from "./InputLabel";
import ErrorMessage from "./ErrorMessage";
import { classNames } from "@/lib/helpers";

export interface TextInputTypes extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  id?: string;
  label?: string;
  error?: string;
  inputSize?: "small" | "default";
}

const TextInput = forwardRef<HTMLInputElement, TextInputTypes>(
  ({ id, className, label, error, inputSize = "default", ...props }, ref) => {
    return (
      <div className="relative">
        {label ? <InputLabel size={inputSize} id={id} label={label} /> : null}
        <div className="relative flex items-center">
          <input
            id={id}
            ref={ref}
            className={classNames(
              "text-sm text-app-text-dark placeholder:text-neutral-400 rounded-lg border w-full inline-block focus:outline-none focus:ring-0",
              inputSize === "default" ? "pl-[26px] pr-5 py-4 " : "",
              inputSize === "small" ? "pl-5 pr-4 py-3" : "",
              error
                ? "border-red-500 focus:border-red-600"
                : " border-gray-200 focus:border-gray-300"
            )}
            type="text"
            {...props}
          />
        </div>
        <ErrorMessage size={inputSize} error={error} />
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
