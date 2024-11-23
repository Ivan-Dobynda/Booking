"use client";
import React, { useEffect } from "react";
import H2 from "../Typo/H2";
import { MdAirportShuttle } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
const Services = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    gsap.to(".heading-main", {
      scrollTrigger: {
        trigger: ".heading-main",
        start: "top center",
      },
      opacity: 1,
      y: 0,
    });
    gsap.to(".subheading-1", {
      scrollTrigger: {
        trigger: ".heading-main",
        start: "top center",
      },
      opacity: 1,
      x: 0,
      delay: 0.3,
    });
    gsap.to(".service-item", {
      scrollTrigger: {
        trigger: ".heading-main",
        start: "top center",
      },
      opacity: 1,
      y: 0,
      stagger: 0.3,
      delay: 0.5,
    });
  }, []);
  return (
    <section className="pt-12 md:pt-16 lg:pt-20 xl:pt-28 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-32">
      <div className="base-container">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-16">
          <H2 className="mb-2 opacity-0 -translate-y-10 heading-main md:mb-4">
            Services You Will <br className="sm:hidden" /> Get From Us
          </H2>
          <p className="max-w-[920px] subheading-1 translate-x-10 opacity-0 mx-auto text-sm sm:text-base md:text-lg text-brand-neutral-600 md:leading-relaxed">
            Experience exceptional services with us. Enjoy top-tier customer
            support, hassle-free bookings, and curated experiences that ensure
            your satisfaction and create lasting memories.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 xl:gap-8">
          <div className="max-w-sm mx-auto translate-y-16 opacity-0 service-item sm:max-w-full service-card py-5 xl:py-7 px-6 xl:px-8 text-center rounded-2xl border border-brand-gray-100 group hover:bg-brand-blue">
            <div className="text-4xl lg:text-5xl leading-none w-16 lg:w-20 h-16 lg:h-20 rounded-2xl bg-brand-blue flex items-center justify-center text-white transition duration-200 group-hover:text-brand-blue group-hover:bg-white mb-4 lg:mb-6 mx-auto">
              <MdAirportShuttle />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-brand-blue leading-none mb-3 lg:mb-4 group-hover:text-white transition duration-200">
              Airport Transfers
            </h3>
            <p className="text-sm sm:text-[15px] lg:text-base text-brand-neutral-600 group-hover:text-white group-hover:text-opacity-90 transition duration-200">
              Arranging transportation to and from the airport, ensuring a
              smooth start and end to the trip.
            </p>
          </div>
          <div className="max-w-sm mx-auto translate-y-16 opacity-0 service-item sm:max-w-full service-card py-5 xl:py-7 px-6 xl:px-8 text-center rounded-2xl border border-brand-gray-100 group hover:bg-brand-blue">
            <div className="text-4xl lg:text-5xl leading-none w-16 lg:w-20 h-16 lg:h-20 rounded-2xl bg-brand-blue flex items-center justify-center text-white transition duration-200 group-hover:text-brand-blue group-hover:bg-white mb-4 lg:mb-6 mx-auto">
              <FaUsers />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-brand-blue leading-none mb-3 lg:mb-4 group-hover:text-white transition duration-200">
              Group Bookings
            </h3>
            <p className="text-sm sm:text-[15px] lg:text-base text-brand-neutral-600 group-hover:text-white group-hover:text-opacity-90 transition duration-200">
              Offering services for booking flights and accommodations for large
              groups, such as family vacations or corporate trips.
            </p>
          </div>
          <div className="max-w-sm mx-auto translate-y-16 opacity-0 service-item sm:max-w-full service-card py-5 xl:py-7 px-6 xl:px-8 text-center rounded-2xl border border-brand-gray-100 group hover:bg-brand-blue ">
            <div className="text-4xl lg:text-5xl leading-none w-16 lg:w-20 h-16 lg:h-20 rounded-2xl bg-brand-blue flex items-center justify-center text-white transition duration-200 group-hover:text-brand-blue group-hover:bg-white mb-4 lg:mb-6 mx-auto">
              <BiSupport />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-brand-blue leading-none mb-3 lg:mb-4 group-hover:text-white transition duration-200">
              Customer support
            </h3>
            <p className="text-sm sm:text-[15px] lg:text-base text-brand-neutral-600 group-hover:text-white group-hover:text-opacity-90 transition duration-200">
              Top quality customer support ensures prompt, friendly assistance.
              Experts address concerns, answer queries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
