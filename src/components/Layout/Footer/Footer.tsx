import React from "react";
import Image from "next/image";
import Link from "next/link";

import { BsSend } from "react-icons/bs";
import { FaEnvelope, FaGlobe, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import Logo from "@/assets/logos/logo-white.svg";
import SocialList from "./SocialList";

const Footer = () => {
  const disclaimerLinks = [
    { name: "Blog", href: "/blog" },
    { name: "Terms and conditions", href: "/terms-and-conditions" },
    { name: "Privacy policy", href: "/privacy-policy" },
    { name: "Cookie policy", href: "/cookie-policy" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Flight", href: "/flight" },
    { name: "Car Rental", href: "/cars" },
    { name: "Hotels", href: "/hotel" },
    { name: "Blog", href: "/blog" },
  ];

  const companyLinks = [
    { name: "About us", href: "#" },
    { name: "Why us", href: "#" },
    { name: "Media", href: "#" },
    { name: "Our Team", href: "#" },
  ];

  return (
    <footer className="bg-brand-blue-400">
      <div className="base-container  pt-8 sm:pt-14 md:pt-16 lg:pt-20  pb-6 md:pb-12 lg:pb-16 flex items-center justify-center">
        <div className="lg:shrink-0 max-w-[400px] w-full">
          <h5 className="text-lg leading-none font-semibold mb-2 lg:mb-4 text-white text-center">
            Our Newsletter
          </h5>
          <p className="text-center text-sm sm:text-[15px] lg:text-base text-gray-400 leading-relaxed xl:leading-relaxed text-opacity-90 mb-4">
            Signup for our latest news & articles. We won&apos;t give you spam
            mails.
          </p>
          <form
            action="#"
            className="relative rounded-xl overflow-hidden flex items-center max-w-md mx-auto"
          >
            <input
              type="text"
              className="block w-full border-none rounded-r-2xl pl-5 pr-[70px] text-sm sm:text-bae py-3 md:py-4 text-brand-neutral-700 leading-none placeholder:text-brand-neutral-400"
              placeholder="Email address"
            />
            <button className="absolute text-xl md:text-2xl h-full bg-brand-blue hover:bg-brand-blue-500 transition duration-200 right-0 px-4 text-white -mr-px">
              <BsSend />
            </button>
          </form>
        </div>
      </div>
      <div className="base-container  pb-8 sm:pb-12 md:pb-14 lg:pb-16 flex-col lg:flex-row 1lg:justify-between flex gap-10 2xl:gap-10">
        <div className="text-center lg:text-left lg:w-[40%] xl:w-auto">
          <Image
            className="mx-auto lg:mx-0 w-40 1sm:w-32 1md:w-36 mb-6"
            width={140}
            src={Logo}
            alt="Fly Smart Deals"
          ></Image>
          <p className="max-w-lg mx-auto lg:mx-0 1text-sm sm:text-[15px] lg:text-base leading-relaxed text-opacity-80 text-gray-400 mb-6 lg:mb-8 lg:max-w-[300px]">
            At Flysmartdeal, We believe that travel is not just about visiting
            new places; it&apos;s about immersing yourself in extraordinary
            experiences that stay with you for a lifetime.
          </p>

          <SocialList />
        </div>

        <div className="flex-1 lg:w-[50%] xl:w-auto grid 1md:grid-cols-3 lg:grid-cols-2 xl:flex gap-y-8 1md:gap-y-8 gap-x-4 md:gap-x-6 lg:justify-end text-center lg:text-left">
          <div className="lg:shrink-0 ">
            <h5 className="text-lg leading-none font-semibold mb-3 lg:mb-4 text-white">
              Quick Link
            </h5>
            <ul className="flex lg:flex-col justify-center lg:items-start gap-3 1space-y-3 1sm:space-y-4">
              {quickLinks.map((link, index) => (
                <li
                  key={index}
                  className="relative inline-flex items-center gap-2.5"
                >
                  {index !== 0 ? (
                    <span className="inline-block lg:hidden w-[3px] h-[3px] rounded-full bg-gray-400"></span>
                  ) : null}
                  <Link
                    className="text-[15px] xl:text-base leading-none text-opacity-90 text-gray-400 hover:text-gray-200 hover:underline"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:shrink-0 ">
            <h5 className="text-lg leading-none font-semibold mb-3 lg:mb-4 text-white">
              Importants Links
            </h5>
            <ul className="flex lg:flex-col justify-center lg:items-start gap-3 1space-y-3 1sm:space-y-4 flex-wrap">
              {disclaimerLinks.map((link, index) => (
                <li
                  key={index}
                  className="relative inline-flex items-center gap-2.5"
                >
                  {index !== 0 ? (
                    <span className="inline-block lg:hidden w-[3px] h-[3px] rounded-full bg-gray-400"></span>
                  ) : null}
                  <Link
                    className="text-[15px] xl:text-base leading-none text-opacity-90 text-gray-400 hover:text-gray-200 hover:underline"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:shrink-0 lg:col-span-1">
            <h5 className="text-lg leading-none font-semibold mb-2 lg:mb-4 text-white">
              Contact Info
            </h5>
            <ul className="flex flex-col items-center lg:items-start space-y-3">
              <li>
                <a
                  className="text-[15px] xl:text-base flex items-center gap-3 leading-none text-opacity-90 text-gray-400 hover:text-gray-200 hover:underline"
                  href="tel:+442035454263"
                >
                  <span className="p-2.5 rounded-full bg-brand-blue">
                    <FaPhoneAlt />
                  </span>
                  <span>+44 (203) 545-4263</span>
                </a>
              </li>
              <li>
                <a
                  className="text-[15px] xl:text-base flex items-center gap-3 leading-none text-opacity-90 text-gray-400 hover:text-gray-200 hover:underline"
                  href="https://www.flysmartdeals.com"
                >
                  <span className="p-2.5 rounded-full bg-brand-blue">
                    <FaGlobe />
                  </span>
                  <span>www.flysmartdeals.com</span>
                </a>
              </li>
              <li>
                <a
                  className="text-[15px] xl:text-base flex items-center gap-3 leading-none text-opacity-90 text-gray-400 hover:text-gray-200 hover:underline"
                  href="mailto:info@flysmartdeals.com"
                >
                  <span className="p-2.5 rounded-full bg-brand-blue">
                    <FaEnvelope />
                  </span>
                  <span>info@flysmartdeals.com</span>
                </a>
              </li>
              <li className="w-64 text-[15px] xl:text-base flex items-start gap-3 text-opacity-90 text-gray-400 hover:text-gray-200">
                <span className="p-2.5 rounded-full bg-brand-blue">
                  <FaLocationDot />
                </span>
                <span>128 City Road, London, United Kingdom, EC1V 2NX</span>
              </li>
            </ul>
          </div>

          <div className="lg:shrink-0 lg:col-span-1">
            <h5 className="text-lg leading-none font-semibold mb-2 lg:mb-4 text-white">
              Company
            </h5>
            <ul className="flex lg:flex-col justify-center lg:items-start gap-3 1space-y-3 1sm:space-y-4 flex-wrap">
              {companyLinks.map((link, index) => (
                  <li
                      key={index}
                      className="relative inline-flex items-center gap-2.5"
                  >
                    {index !== 0 ? (
                        <span className="inline-block lg:hidden w-[3px] h-[3px] rounded-full bg-gray-400"></span>
                    ) : null}
                    <Link
                        className="text-[15px] xl:text-base leading-none text-opacity-90 text-gray-400 hover:text-gray-200 hover:underline"
                        href={link.href}
                    >
                      {link.name}
                    </Link>
                  </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-[#0D4073]">
        <div className="base-container py-4 sm:py-5">
          <p className="text-center text-gray-400 text-sm sm:text-base leading-none">
            &copy; 2024 FlySmartDeals. All Right Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
