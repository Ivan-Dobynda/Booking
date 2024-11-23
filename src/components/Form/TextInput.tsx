import { classNames } from "@/lib/helpers";
import { InputHTMLAttributes, forwardRef } from "react";
import InputLabel from "./InputLabel";
import ErrorMessage from "./ErrorMessage";

export interface TextInputTypes extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  id?: string;
  label?: string;
  error?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputTypes>(
  ({ id, className, label, error , ...props }, ref) => {
    return (
      <div>
        {label ? <InputLabel id={id} label={label} /> : null}
        <div>
          <input
            id={id}
            ref={ref}
            className={classNames(
              "block w-full rounded-lg border-0 py-2.5 px-5 h-12 sm:h-[52px] text-sm sm:text-base text-brand-black ring-1 ring-inset ring-gray-300 placeholder:text-brand-black/50 focus:ring-inset focus:ring-gray-300 leading-none",
              className
            )}
            {...props}
          />
        </div>
        <ErrorMessage error={error} />
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
