import { classNames } from "@/lib/helpers";
import { ReactNode, SelectHTMLAttributes, forwardRef } from "react";
import InputLabel from "./InputLabel";
import ErrorMessage from "./ErrorMessage";

export interface SelectInputTypes
  extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  id?: string;
  label?: string;
  error?: string;
  children?: ReactNode;
}

const SelectInput = forwardRef<HTMLSelectElement, SelectInputTypes>(
  ({ id, className, label, error, children, ...props }, ref) => {
    return (
      <div>
        {label ? <InputLabel id={id} label={label} /> : null}
        <div>
          <select
            ref={ref}
            id={id}
            className={classNames(
              "block w-full rounded-lg border-0 py-2.5 px-5 h-12 sm:h-[52px] text-sm sm:text-base text-brand-black ring-1 ring-inset ring-gray-300 placeholder:text-brand-black/60 focus:ring-inset focus:ring-gray-300 leading-none",
              className
            )}
            {...props}
          >
            {children}
          </select>
          <ErrorMessage error={error} />
        </div>
      </div>
    );
  }
);

SelectInput.displayName = "SelectInput";

export default SelectInput;
