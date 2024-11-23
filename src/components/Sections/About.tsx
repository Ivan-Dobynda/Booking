"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AboutImage from "@/assets/images/about.png";
import H2 from "../Typo/H2";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import CountUp from "react-countup";
gsap.registerPlugin(ScrollTrigger);
const About = () => {
  const [rollingNumbers, setRollingNumbers] = useState({
    backup: 0,
    guides: 0,
    destinations: 0,
    happiness: 0,
  });
  useEffect(() => {
    const tl = gsap.timeline();
    gsap.to(".image", {
      scrollTrigger: {
        trigger: ".trigger",
        start: "top 80%",
      },
      opacity: 1,
      x: 0,
    });
    gsap.to(".our-story", {
      scrollTrigger: {
        trigger: ".trigger",
        start: "top 80%",
      },
      x: 0,
      opacity: 1,
      delay: 0.3,
    });
    gsap.to(".heading-1", {
      scrollTrigger: {
        trigger: ".trigger",
        start: "top 80%",
      },
      y: 0,
      opacity: 1,
      delay: 0.6,
    });
    gsap.to(".paragraph", {
      scrollTrigger: {
        trigger: ".trigger",
        start: "top 80%",
      },
      y: 0,
      opacity: 1,
      delay: 0.8,
    });
    gsap.to(".item", {
      scrollTrigger: {
        trigger: ".trigger",
        start: "top 80%",
      },
      onComplete: () =>
        setRollingNumbers({
          backup: 0,
          guides: 100,
          destinations: 750,
          happiness: 100,
        }),
      y: 0,
      opacity: 1,
      delay: 1.1,
      stagger: 0.3,
    });
  }, []);
  console.log(rollingNumbers);
  return (
    <section className="py-12 md:py-16 lg:py-20 xl:py-28">
      <div className="base-container flex flex-col lg:flex-row gap-7 lg:gap-8 2xl:gap-12 items-start 2xl:items-center">
        <div className="w-full lg:w-[400px] xl:w-[460px] 2xl:w-[520px] sm:h-[400px] xl:h-[460px] 2xl:h-[520px] shrink-0">
          <Image
            className="rounded-[36px] -translate-x-32 opacity-0 image h-full w-full object-cover object-center"
            src={AboutImage}
            alt="Our Passion for Your Travel Adventures"
          ></Image>
        </div>
        <div className="flex-1 trigger text-center sm:text-left">
          <div>
            <h5 className="text-brand-orange-600 our-story opacity-0 translate-x-10  text-sm sm:text-base md:text-lg lg:text-xl flex justify-center sm:justify-start items-center gap-2 font-medium leading-none mb-2 md:mb-3">
              <span className="w-12 h-px md:h-0.5 bg-brand-orange-600 sm:hidden"></span>
              <span className="">Our Story</span>
              <span className="w-12 h-px md:h-0.5 bg-brand-orange-600"></span>
            </h5>
            <H2 className="mb-4 heading-1 opacity-0 translate-y-10 lg:mb-6">
              Our Passion for Your <br /> Travel Adventures
            </H2>
          </div>
          <p className="text-sm sm:text-base opacity-0 translate-y-10 md:text-lg text-brand-neutral-600 paragraph md:leading-relaxed mb-6 lg:mb-8">
            {`At Fly Smart Deals, we redefine the way you explore the world. Travel is not just a destination;
                        it's an immersive journey, and we are here to make it extraordinary. Our online booking platform
                        goes beyond mere reservations, offering a wealth of information and tips to empower you in
                        planning the best trips of your life.`}
            <br />
            <br />
            {`Why stress over trip planning when Fly Smart Deals has your back?
            Discover, plan, and explore with confidence as you delve into a
            world of unparalleled travel experiences.`}
          </p>
          <div className="flex flex-wrap justify-center sm:grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            <div className="py-3 lg:py-4 item translate-y-10 opacity-0 shrink-0 px-6 text-center border border-[rgba(29,41,57,0.20)] rounded-xl">
              <h4
                className="text-sm sm:text-lg md:text-2xl lg:text-[32px]  font-medium mb-2 lg:mb-3 to-brand-blue"
                style={{ lineHeight: "1" }}
              >
                <CountUp end={rollingNumbers.guides} />k
              </h4>
              <p
                className="text-[15px] md:text-lg font-medium text-brand-orange-600"
                style={{ lineHeight: 1 }}
              >
                Local guides
              </p>
            </div>
            <div className="py-3 lg:py-4 item translate-y-10 opacity-0 shrink-0 px-6 text-center border border-[rgba(29,41,57,0.20)] rounded-xl">
              <h4
                className="text-sm sm:text-lg md:text-2xl lg:text-[32px]  font-medium mb-2 lg:mb-3 to-brand-blue"
                style={{ lineHeight: "1" }}
              >
                <CountUp end={rollingNumbers.destinations} />+
              </h4>
              <p
                className="text-[15px] md:text-lg font-medium text-brand-orange-600"
                style={{ lineHeight: 1 }}
              >
                Destinations
              </p>
            </div>
            <div className="py-3 item translate-y-10 opacity-0 lg:py-4 shrink-0 px-6 text-center border border-[rgba(29,41,57,0.20)] rounded-xl">
              <h4
                className="text-sm sm:text-lg md:text-2xl lg:text-[32px]  font-medium mb-2 lg:mb-3 to-brand-blue"
                style={{ lineHeight: "1" }}
              >
                <CountUp end={rollingNumbers.happiness} />%
              </h4>
              <p
                className="text-[15px] md:text-lg font-medium text-brand-orange-600"
                style={{ lineHeight: 1 }}
              >
                Happiness
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
