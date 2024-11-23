import React, { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";
import { BiChevronRight } from "react-icons/bi";
import { classNames } from "@/lib/helpers";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  subTitle: string;
}

const ButtonWithHeadingAndTitle = forwardRef<HTMLDivElement, Props>(
  ({ title, subTitle, className, ...props }: Props, ref) => {
    return (
      <div
        className={classNames(
          `flex justify-between items-center border border-gray-300 rounded-xl py-2 px-4 cursor-pointer`,
          className
        )}
        {...props}
        ref={ref}
      >
        <div>
          <p className={"font-bold"}>{title}</p>
          <p>{subTitle}</p>
        </div>
        <div>
          <BiChevronRight className={`text-3xl`} />
        </div>
      </div>
    );
  }
);

ButtonWithHeadingAndTitle.displayName = "ButtonWithHeadingAndTitle";

export default ButtonWithHeadingAndTitle;
