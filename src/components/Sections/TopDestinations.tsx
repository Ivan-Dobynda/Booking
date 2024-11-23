"use client";
import React, { useEffect } from "react";
import H2 from "../Typo/H2";
import Image from "next/image";
import Button from "../Button/Button";

import Destination1Image from "@/assets/images/destinations/destination-1.png";
import IndiaImage from "@/assets/images/destinations/india.png";
import Thailand from "@/assets/images/destinations/thailand.png";
import Australia from "@/assets/images/destinations/australia.png";
import Bangladesh from "@/assets/images/destinations/bangladesh.png";
import London from "@/assets/images/destinations/london.png";
import Usa from "@/assets/images/destinations/usa.png";
import Japan from "@/assets/images/destinations/japan.png";
import gsap from "gsap";

const TopDestinations = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    gsap.to(".heading-top", {
      scrollTrigger: {
        trigger: ".top-container",
        start: "top center",
      },
      opacity: 1,
      y: 0,
    });
    gsap.to(".top-subheading", {
      scrollTrigger: {
        trigger: ".top-container",
        start: "top center",
      },
      opacity: 1,
      x: 0,
      delay: 0.3,
    });
    gsap.to(".item2", {
      scrollTrigger: {
        trigger: ".top-container",
        start: "top center",
      },
      opacity: 1,
      y: 0,
      stagger: 0.3,
      delay: 0.5,
    });
    gsap.to(".left-destination", {
      scrollTrigger: {
        trigger: ".top-container",
        start: "top center",
      },
      opacity: 1,
      x: 0,

      delay: 0.7,
    });
    gsap.to(".right-destinations", {
      scrollTrigger: {
        trigger: ".top-container",
        start: "top center",
      },
      opacity: 1,
      x: 0,

      delay: 0.7,
    });
  }, []);
  return (
    <section className="bg-[#f7fbfe] pt-12 md:pt-16 lg:pt-20 xl:pt-28 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-32">
      <div className="base-container top-container">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-16">
          <H2 className="mb-2 heading-top translate-y-10 opacity-0 lg:mb-4">
            Top Destinations
          </H2>
          <p className="max-w-5xl text-sm translate-x-10 opacity-0 top-subheading sm:text-base md:text-lg text-brand-neutral-600 md:leading-relaxed mx-auto">
            Let these trends inspire your next journey and make informed choices
            based on real-time bookings. Explore the world&apos;s most
            sought-after places with confidence, all in one convenient place
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
          <div className="rounded-2xl -translate-x-10 opacity-0 left-destination lg:rounded-3xl overflow-hidden relative sm:h-[480px] md:h-[550px] 2xl:h-[580px]">
            <Image
              className="w-full h-full object-cover object-center"
              src={Destination1Image}
              alt="Top Destinations 1"
            />
            <div className="flex justify-center items-center absolute inset-0 bg-black bg-opacity-20">
              <div>
                <h4 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white mb-1">
                  Up to
                </h4>
                <div className="mb-1">
                  <h3 className="flex items-center text-white leading-none">
                    <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-[84px] mr-2 leading-none">
                      50
                    </span>
                    <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium leading-none">
                      % <br /> off
                    </div>
                  </h3>
                </div>
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white mb-3">
                  Holiday Packages
                </p>
                <Button>Book Now</Button>
              </div>
            </div>
          </div>
          <div className="top-destinations-right-grid  translate-x-10 opacity-0 right-destinations grid gap-4 md:gap-5 lg:gap-6 grid-cols-2 h-[600px] lg:h-[550px] 2xl:h-[580px]">
            <div className="destination-1 relative rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
              <Image
                src={Australia}
                alt="destination-1"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                <span className="text-base md:text-lg text-white font-medium">
                  Australia
                </span>
              </div>
            </div>
            <div className="destination-2 relative rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
              <Image
                src={IndiaImage}
                alt="destination-2"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                <span className="text-base md:text-lg text-white font-medium">
                  India
                </span>
              </div>
            </div>
            <div className="destination-3 relative rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
              <Image
                src={Thailand}
                alt="destination-3"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                <span className="text-base md:text-lg text-white font-medium">
                  Thailand
                </span>
              </div>
            </div>
            <div className="destination-4 relative rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
              <Image
                src={Bangladesh}
                alt="destination-4"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                <span className="text-base md:text-lg text-white font-medium">
                  Bangladesh
                </span>
              </div>
            </div>
            <div className="destination-5 relative rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
              <Image
                src={London}
                alt="destination-5"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                <span className="text-base md:text-lg text-white font-medium">
                  London
                </span>
              </div>
            </div>
            <div className="destination-6 relative rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
              <Image
                src={Usa}
                alt="destination-6"
                className="w-full h-full object-cover object-right"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                <span className="text-base md:text-lg text-white font-medium">
                  USA
                </span>
              </div>
            </div>
            <div className="destination-7 relative rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
              <Image
                src={Japan}
                alt="destination-7"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                <span className="text-base md:text-lg text-white font-medium">
                  Japan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopDestinations;
