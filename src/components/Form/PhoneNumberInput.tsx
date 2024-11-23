import 'react-phone-number-input/style.css'
import { classNames } from "@/lib/helpers";
import { forwardRef } from "react";
import InputLabel from "./InputLabel";
import ErrorMessage from "./ErrorMessage";
import PhoneInput, {DefaultInputComponentProps} from 'react-phone-number-input'

export interface PhoneNumberInput extends DefaultInputComponentProps {
    className?: string;
    id?: string;
    label?: string;
    error?: string;
}

const PhoneNumberInput = forwardRef<HTMLInputElement, PhoneNumberInput>(
    ({ id,value, onChange, className, label, error, ...props }, ref) => {
        return (
            <div>
                {label ? <InputLabel id={id} label={label} /> : null}
                <div>
                    <PhoneInput
                        id={id}
                        country="US"
                        value={value}
                        onChange={onChange}
                        className={classNames(
                            "block w-full rounded-lg [&>input]:!border-none [&>input]:focus:!shadow-none py-2.5 px-5 h-12 sm:h-[52px] text-sm sm:text-base text-brand-black ring-1 ring-inset ring-gray-300 placeholder:text-brand-black/50 focus:ring-inset focus:ring-gray-300 leading-none",
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

PhoneNumberInput.displayName = "PhoneNumberInput";

export default PhoneNumberInput;
