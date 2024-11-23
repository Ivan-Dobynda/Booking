"use client";
import { classNames } from "@/lib/helpers";
import { Disclosure } from "@headlessui/react";
import { Faq } from "@prisma/client";
import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

interface IFaqDisclosure {
  defaultOpen?: boolean;
  faq: Faq;
}

const FaqDisclosure = ({ defaultOpen = false, faq }: IFaqDisclosure) => {
  return (
    <Disclosure
      as="div"
      className={"faq-box opacity-0 translate-x-10"}
      defaultOpen={defaultOpen}
    >
      {({ open }) => (
        <Disclosure.Button
          className={classNames(
            "w-full py-4 md:py-5 lg:py-6 pl-5 md:pl-6 lg:pl-8 pr-5 md:pr-6 lg:pr-6 border border-[rgba(29,41,57,0.20)] rounded-[20px] text-left",
            open ? "shadow-lg shadow-[rgba(0,0,0,0.07)]" : ""
          )}
        >
          <div className="flex items-start gap-3.5 lg:gap-5">
            <span className="text-lg lg:text-xl leading-none text-brand-neutral-600">
              {open ? <FaMinus /> : <FaPlus />}
            </span>
            <div>
              <h4
                className={classNames(
                  "text-base md:text-lg lg:text-xl font-medium text-brand-neutral-700 block transform translate-y-0.5 md:translate-y-0",
                  open ? "mb-2.5 sm:mb-3 lg:mb-4" : ""
                )}
                style={{ lineHeight: 1 }}
              >
                {faq.question}
              </h4>
              <Disclosure.Panel>
                <p className="text-brand-neutral-600 text-sm leading-6 lg:text-base lg:leading-[26px]">
                  {faq.answer}
                </p>
              </Disclosure.Panel>
            </div>
          </div>
        </Disclosure.Button>
      )}
    </Disclosure>
  );
};

export default FaqDisclosure;
