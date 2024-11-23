"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import Search from "../Search/Search";

const Hero = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(".heading1", {
      y: 0,
      opacity: 1,
      delay: 0,
    });
    tl.to(".heading2", {
      y: 0,
      opacity: 1,
      delay: 0,
    });
    tl.to(".subheading", {
      x: 0,
      opacity: 1,
      delay: 0,
    });
  }, []);
  return (
    <section className="hero py-20 sm:py-24 md:py-32 lg:py-40 2xl:py-44 relative">
      {/* <div className="base-container text-white text-center space-y-3 sm:space-y-4 mb-16 sm:mb-32 md:mb-36 lg:mb-40">
        <h5 className="font-semibold heading1 opacity-0 translate-y-10  md:font-bold text-base sm:text-lg md:text-xl lg:text-2xl leading-none">
          Welcome To FlySmartDeals
        </h5>
        <h1 className="text-3xl heading2 opacity-0 translate-y-10 leading-9 sm:leading-none sm:text-4xl md:text-5xl lg:text-[55px] xl:text-[65px] font-bold capitalize">
          Experience the world together
        </h1>
        <p className="text-sm subheading translate-x-10 opacity-0 sm:text-base md:text-lg lg:text-xl leading-none">
          Find awesome flights, hotel, and car rental.
        </p>
      </div> */}
      <div className="w-full z-10">
        <Search />
      </div>
    </section>
  );
};

export default Hero;
