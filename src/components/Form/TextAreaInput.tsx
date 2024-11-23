import { classNames } from "@/lib/helpers";
import { forwardRef, TextareaHTMLAttributes} from "react";
import InputLabel from "./InputLabel";
import ErrorMessage from "./ErrorMessage";

export interface TextAreaInputTypes extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    id?: string;
    label?: string;
    error?: string;
}

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputTypes>(
    ({ id, className, label, error, ...props }, ref) => {
        return (
            <div>
                {label ? <InputLabel id={id} label={label} /> : null}
                <div>
                    <textarea
                        id={id}
                        ref={ref}
                        className={classNames(
                            "block w-full rounded-lg border-0 py-2.5 px-5 text-sm sm:text-base text-brand-black ring-1 ring-inset ring-gray-300 placeholder:text-brand-black/50 focus:ring-inset focus:ring-gray-300 leading-none",
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

TextAreaInput.displayName = "TextAreaInput";

export default TextAreaInput;
