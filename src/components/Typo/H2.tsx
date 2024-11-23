import { classNames } from "@/lib/helpers";
import React, { ReactNode } from "react";

const H2 = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={classNames(
        "text-brand-neutral-800 font-bold text-[26px] sm:text-4xl md:text-[40px] lg:text-[44px]",
        className
      )}
      style={{ lineHeight: 1.24 }}
    >
      {children}
    </h2>
  );
};

export default H2;
