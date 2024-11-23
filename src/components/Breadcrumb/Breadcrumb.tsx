import React from "react";

import { GoChevronRight } from "react-icons/go";

import { classNames } from "@/lib/helpers";

const Breadcrumb = ({ title, pages }: { title: string; pages: string[] }) => {
  return (
    <header className="bg-white py-11 sm:py-12 md:py-16 lg:py-20">
      <div className="base-container text-center">
        <h1 className="text-[32px] sm:text-4xl md:text-[44px] lg:text-5xl font-bold sm:mb-3 lg:mb-4 text-brand-neutral-900">
          {title}
        </h1>
        <div className="hidden sm:inline-flex items-center text-base md:text-lg text-brand-neutral-900 gap-2">
          {pages.map((page, index) => {
            const isCurrent = index === pages.length - 1;
            return (
              <React.Fragment key={index}>
                <span
                  className={classNames(
                    "capitalize",
                    isCurrent ? "text-brand-neutral-600" : ""
                  )}
                >
                  {page}
                </span>
                {!isCurrent ? <GoChevronRight /> : null}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Breadcrumb;
