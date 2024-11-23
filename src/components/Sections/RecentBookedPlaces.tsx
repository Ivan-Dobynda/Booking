"use client";
import React, { useEffect } from "react";
import H2 from "../Typo/H2";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

import Australia from "@/assets/images/recent-places/australia.png";
import England from "@/assets/images/recent-places/england.png";
import Usa from "@/assets/images/recent-places/usa.png";
import Qatar from "@/assets/images/recent-places/qatar.png";
import Thailand from "@/assets/images/recent-places/thailand.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
const RecentBookedPlaces = () => {
  useEffect(() => {
    gsap.to(".heading-recent", {
      scrollTrigger: {
        trigger: ".recent-container",
        start: "top center",
      },
      opacity: 1,
      y: 0,
    });
    gsap.to(".para-recent", {
      scrollTrigger: {
        trigger: ".recent-container",
        start: "top center",
      },
      opacity: 1,
      x: 0,
      delay: 0.3,
    });
    gsap.to(".image-mid", {
      scrollTrigger: {
        trigger: ".recent-container",
        start: "top center",
      },
      opacity: 1,
      y: 0,
      delay: 0.5,
    });
    gsap.to(".england", {
      scrollTrigger: {
        trigger: ".recent-container",
        start: "top center",
      },
      opacity: 1,
      x: 0,
      delay: 0.45,
    });
    gsap.to(".austrailia", {
      scrollTrigger: {
        trigger: ".recent-container",
        start: "top center",
      },
      opacity: 1,
      x: 0,
      delay: 0.5,
    });
    gsap.to(".thailand", {
      scrollTrigger: {
        trigger: ".recent-container",
        start: "top center",
      },
      opacity: 1,
      x: 0,
      delay: 0.45,
    });
    gsap.to(".qatar", {
      scrollTrigger: {
        trigger: ".recent-container",
        start: "top center",
      },
      opacity: 1,
      x: 0,
      delay: 0.5,
    });
  }, []);
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32  bg-[#f2fafe]">
      <div className="base-container recent-container">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-16">
          <H2 className="mb-2 lg:mb-4">
            Our Unique Feature: Intelligent Travel Planning
          </H2>
          <p className="max-w-5xl text-sm sm:text-base md:text-lg text-brand-neutral-600 md:leading-relaxed mx-auto">
            What makes Fly Smart Deals unique is our advanced AI technology.
            Simply tell us your preferences, and our smart AI does the work for
            you—searching, calculating, and finding the best deals, options, and
            routes tailored to your needs.
            <br /> <br />
            {`Elevate your travel experiences with Fly Smart Deals—we're here to enhance every journey.`}
          </p>
        </div>
        <div className="mx-auto max-w-md sm:max-w-full grid grid-cols-6 sm:grid-cols-12 gap-4 md:gap-5 lg:gap-6">
          <div className="grid col-span-full lg:col-span-3 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-4 md:gap-5 lg:gap-6">
            <div className="relative opacity-0 -translate-x-10 austrailia rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
              <Image
                className="h-full w-full object-cover object-center"
                src={Australia}
                alt="Booked Place"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 p-4 lg:p-5 flex flex-col justify-between">
                <div>
                  <div className="h-7 md:h-8 lg:h-9 px-2 lg:px-3 rounded-full bg-brand-orange-50 inline-flex items-center gap-1 md:gap-1.5">
                    <span className="text-lg lg:text-xl leading-none text-yellow-500 -mt-px">
                      <FaStar />
                    </span>
                    <h5 className="text-sm md:text-base lg:text-lg font-bold text-brand-neutral-600 leading-none">
                      3.5
                    </h5>
                  </div>
                </div>
                <div className="text-white">
                  <div className="px-3 py-1.5 inline-flex items-center gap-1.5 rounded-full bg-brand-blue-300 mb-3">
                    <span>
                      <FaCheck />
                    </span>
                    <h5 className="leading-none text-xs lg:text-sm">
                      Hotel Booked
                    </h5>
                  </div>
                  <h4 className="text-xl lg:text-2xl leading-none font-medium mb-1.5 lg:mb-2.5">
                    Australia
                  </h4>
                  <h5 className="text-sm lg:text-base leading-none mb-1 lg:mb-2">
                    Sydne
                  </h5>
                  <h5 className="text-sm lg:text-base leading-none">
                    Date: 02/08/22-16/08/22
                  </h5>
                </div>
              </div>
            </div>
            <div className="relative opacity-0 -translate-x-10 england rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
              <Image
                className="h-full w-full object-cover object-center"
                src={England}
                alt="Booked Place"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 p-4 lg:p-5 flex flex-col justify-between">
                <div>
                  <div className="h-7 md:h-8 lg:h-9 px-2 lg:px-3 rounded-full bg-brand-orange-50 inline-flex items-center gap-1 md:gap-1.5">
                    <span className="text-lg lg:text-xl leading-none text-yellow-500 -mt-px">
                      <FaStar />
                    </span>
                    <h5 className="text-sm md:text-base lg:text-lg font-bold text-brand-neutral-600 leading-none">
                      4.5
                    </h5>
                  </div>
                </div>
                <div className="text-white ">
                  <div className="px-3 py-1.5 inline-flex items-center gap-1.5 rounded-full bg-brand-blue-300 mb-3">
                    <span>
                      <FaCheck />
                    </span>
                    <h5 className="leading-none text-xs lg:text-sm">
                      Flight Booked
                    </h5>
                  </div>
                  <h4 className="text-xl lg:text-2xl leading-none font-medium mb-1.5 lg:mb-2.5">
                    England
                  </h4>
                  <h5 className="text-sm lg:text-base leading-none mb-1 lg:mb-2">
                    London
                  </h5>
                  <h5 className="text-sm lg:text-base leading-none">
                    Date: 04/10/22-10/10/22
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="relative lg:h-[520px] xl:h-[560px] opacity-0 translate-y-16 image-mid rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden col-span-6 lg:col-span-5">
            <Image
              className="h-full w-full object-cover object-center"
              src={Usa}
              alt="Booked Place"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 p-4 lg:p-5 flex flex-col justify-between">
              <div>
                <div className="h-7 md:h-8 lg:h-9 px-2 lg:px-3 rounded-full bg-brand-orange-50 inline-flex items-center gap-1 md:gap-1.5">
                  <span className="text-lg lg:text-xl leading-none text-yellow-500 -mt-px">
                    <FaStar />
                  </span>
                  <h5 className="text-sm md:text-base lg:text-lg font-bold text-brand-neutral-600 leading-none">
                    5.0
                  </h5>
                </div>
              </div>
              <div className="text-white">
                <div className="px-3 py-1.5 inline-flex items-center gap-1.5 rounded-full bg-brand-blue-300 mb-3">
                  <span>
                    <FaCheck />
                  </span>
                  <h5 className="leading-none text-sm ">Hotel Booked</h5>
                </div>
                <h4 className="text-xl lg:text-2xl leading-none font-medium mb-1.5 lg:mb-2.5">
                  USA
                </h4>
                <h5 className="text-sm lg:text-base leading-none mb-1 lg:mb-2">
                  Wahington
                </h5>
                <h5 className="text-sm lg:text-base leading-none">
                  Date: 10/02/22-16/02/22
                </h5>
              </div>
            </div>
          </div>
          <div className="grid col-span-6 lg:col-span-4 grid-rows-2 gap-4 md:gap-5 lg:gap-6">
            <div className="relative opacity-0 translate-x-10 qatar rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
              <Image
                className="h-full w-full object-cover object-center"
                src={Qatar}
                alt="Booked Place"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 p-4 lg:p-5 flex flex-col justify-between">
                <div>
                  <div className="h-7 md:h-8 lg:h-9 px-2 lg:px-3 rounded-full bg-brand-orange-50 inline-flex items-center gap-1 md:gap-1.5">
                    <span className="text-lg lg:text-xl leading-none text-yellow-500 -mt-px">
                      <FaStar />
                    </span>
                    <h5 className="text-sm md:text-base lg:text-lg font-bold text-brand-neutral-600 leading-none">
                      4.0
                    </h5>
                  </div>
                </div>
                <div className="text-white">
                  <div className="px-3 py-1.5 inline-flex items-center gap-1.5 rounded-full bg-brand-blue-300 mb-3">
                    <span>
                      <FaCheck />
                    </span>
                    <h5 className="leading-none text-xs lg:text-sm">
                      Car Booked
                    </h5>
                  </div>
                  <h4 className="text-xl lg:text-2xl leading-none font-medium mb-1.5 lg:mb-2.5">
                    Qatar
                  </h4>
                  <h5 className="text-sm lg:text-base leading-none mb-1 lg:mb-2">
                    Doha
                  </h5>
                  <h5 className="text-sm lg:text-base leading-none">
                    Date: 28/12/22-04/12/22
                  </h5>
                </div>
              </div>
            </div>
            <div className="relative opacity-0 translate-x-10 thailand rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
              <Image
                className="h-full w-full object-cover object-center"
                src={Thailand}
                alt="Booked Place"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 p-4 lg:p-5 flex flex-col justify-between">
                <div>
                  <div className="h-7 md:h-8 lg:h-9 px-2 lg:px-3 rounded-full bg-brand-orange-50 inline-flex items-center gap-1 md:gap-1.5">
                    <span className="text-lg lg:text-xl leading-none text-yellow-500 -mt-px">
                      <FaStar />
                    </span>
                    <h5 className="text-sm md:text-base lg:text-lg font-bold text-brand-neutral-600 leading-none">
                      3.5
                    </h5>
                  </div>
                </div>
                <div className="text-white">
                  <div className="px-3 py-1.5 inline-flex items-center gap-1.5 rounded-full bg-brand-blue-300 mb-3">
                    <span>
                      <FaCheck />
                    </span>
                    <h5 className="leading-none text-xs lg:text-sm">
                      Flight Booked
                    </h5>
                  </div>
                  <h4 className="text-xl lg:text-2xl leading-none font-medium mb-1.5 lg:mb-2.5">
                    Thailand
                  </h4>
                  <h5 className="text-sm lg:text-base leading-none mb-1 lg:mb-2">
                    Bankok
                  </h5>
                  <h5 className="text-sm lg:text-base leading-none">
                    Date: 15/05/22-22/06/22
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentBookedPlaces;
