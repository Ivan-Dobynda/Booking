import React, { TextareaHTMLAttributes, forwardRef } from "react";

import InputLabel from "./InputLabel";
import ErrorMessage from "./ErrorMessage";
import { classNames } from "@/lib/helpers";

export interface TextAreaTypes
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  id?: string;
  label?: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaTypes>(
  ({ id, className, label, error, ...props }, ref) => {
    return (
      <div className="relative">
        {label ? <InputLabel id={id} label={label} /> : null}
        <div className="relative flex items-center">
          <textarea
            id={id}
            ref={ref}
            className={classNames(
              "text-sm text-app-text-dark placeholder:text-neutral-400 rounded-lg border w-full inline-block pl-[26px] px-5 py-4 focus:outline-none focus:ring-0",
              error
                ? "border-red-500 focus:border-red-600"
                : " border-gray-200 focus:border-gray-300"
            )}
            {...props}
          />
        </div>
        <ErrorMessage error={error} />
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
