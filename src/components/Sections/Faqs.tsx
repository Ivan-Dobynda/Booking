import React, { Suspense } from "react";
import Link from "next/link";

import { FaArrowRight } from "react-icons/fa6";

import FaqsListing from "./FaqsListing";
import H2 from "../Typo/H2";
import FaqsAnimationHandler from "./FaqsAnimationHandler";

const Faqs = () => {
  return (
    <>
      <section className="pb-12  sm:pb-16 md:pb-20 lg:pb-24 xl:pb-32">
        <div className="base-container faq-container flex flex-col lg:flex-row gap-6 md:gap-8 2xl:gap-10 items-start">
          <div className="lg:w-1/2 2xl:w-[45%]">
            <h4 className="text-sm faq-heading -translate-x-10 opacity-0 sm:text-lg md:text-xl lg:text-2xl leading-none font-semibold text-brand-blue-600 mb-2 sm:mb-3 lg:mb-4">
              Recently Asked Questions
            </h4>
            <H2 className="mb-6 md:mb-8 faq-heading -translate-x-10 opacity-0 lg:mb-10">
              People Are Frequently Asking Some Questions From Us
            </H2>
            <div>
              <div className="mb-4 sm:mb-5 md:mb-7 lg:mb-9">
                <h5
                  className="text-base faq-heading -translate-x-10 opacity-0 md:text-lg lg:text-[22px] font-medium text-brand-black-600 mb-3 lg:mb-4"
                  style={{ lineHeight: 1 }}
                >
                  Don&apos;t Get Answer?
                </h5>
                <p
                  className="text-sm faq-heading -translate-x-10 opacity-0 md:text-base lg:text-[17px]  text-brand-neutral-600"
                  style={{ lineHeight: 1 }}
                >
                  We will answer you in less than 2 hours!
                </p>
              </div>
              <Link
                href="#"
                className="text-base faq-heading -translate-x-10 opacity-0 md:text-lg inline-flex items-center gap-2 text-brand-blue hover:underline"
              >
                <span>Leave us a Message</span>
                <span className="text-lg md:text-xl">
                  <FaArrowRight />
                </span>
              </Link>
            </div>
          </div>{" "}
          <div className="flex-1 w-full lg:w-auto">
            <Suspense
              fallback={
                <div className="space-y-4 md:space-y-5 lg:space-y-6">
                  <div className="h-[70px] rounded-[20px] bg-slate-200 animate-pulse"></div>
                  <div className="h-[70px] rounded-[20px] bg-slate-200 animate-pulse"></div>
                  <div className="h-[70px] rounded-[20px] bg-slate-200 animate-pulse"></div>
                  <div className="h-[70px] rounded-[20px] bg-slate-200 animate-pulse"></div>
                </div>
              }
            >
              <FaqsListing />
            </Suspense>
          </div>
        </div>
      </section>
      <FaqsAnimationHandler></FaqsAnimationHandler>
    </>
  );
};

export default Faqs;
