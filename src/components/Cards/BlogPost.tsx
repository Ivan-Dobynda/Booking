import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import Destination1Image from "@/assets/images/destination-1.jpeg";
import AvatarImage from "@/assets/images/default-avatar.jpg";
import { FaArrowRightLong } from "react-icons/fa6";

interface IBlogPostProps {
  type?: "default" | "full-width";
}

const BlogPost = ({ type = "default" }: IBlogPostProps) => {
  return type === "default" ? (
    <div className="blog-item translate-y-16 opacity-0">
      <Image className="rounded-t-xl" src={Destination1Image} alt="Blog post" />
      <div className="p-4 md:p-5 border border-[rgba(194,194,194,0.50)] border-t-0 rounded-b-xl">
        <div className="flex justify-between items-center mb-3 sm:mb-3.5">
          <h5 className="py-1 px-2.5 sm:leading-5 text-brand-blue rounded-md bg-[rgba(0,51,102,0.10)] text-xs sm:text-sm">
            Hotel
          </h5>
          <h5 className="leading-5 text-brand-neutral-600 rounded-md flex items-center gap-1.5">
            <span className="text-base sm:text-lg">
              <FaCalendarAlt />
            </span>
            <span className="text-xs sm:text-sm">12/12/2023</span>
          </h5>
        </div>
        <h3 className="text-xl lg:text-2xl font-semibold mb-1.5 md:mb-2 lg:mb-3">
          <Link
            href="/blog/title"
            className="text-brand-neutral-800 hover:text-opacity-90 transition"
          >
            Explore New York&apos;s Hippest Borough
          </Link>
        </h3>
        <p className="text-sm lg:text-base leading-6 lg:leading-[25px] h-[72px] lg:h-[75px] text-brand-neutral-600 truncate-3-lines mb-3.5 sm:mb-5">
          Nestled along the picturesque shores of Lake Como, Italy&apos;s
          Varenna is a hidden gem that encapsulates the essence of lakeside
          tranquility and timeless
        </p>
        <div className="flex justify-between items-center">
          <div className="flex gap-2.5 items-center">
            <Image
              className="w-10 sm:w-11 h-10 sm:h-11 object-cover object-center rounded-full"
              width={44}
              height={44}
              src={AvatarImage}
              alt="Albert Flores"
            />
            <h5 className="text-brand-neutral-700 text-sm sm:text-base">
              Albert Flores
            </h5>
          </div>
          <Link
            href="/blog/title"
            className="flex items-center font-medium hover:underline text-brand-blue py-0.5"
          >
            <span className="mr-1.5 text-sm sm:text-base">Read More</span>
            <span className="text-base sm:text-lg leading-none">
              <FaArrowRightLong />
            </span>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="col-span-full grid lg:grid-cols-2 gap-5 lg:gap-7 md:max-w-full">
      <div className="h-full max-w-xl lg:max-w-full">
        <Image
          className="rounded-2xl h-full object-cover object-center"
          src={Destination1Image}
          alt="Revolutionizing the travel industry, one partnership at a time"
        />
      </div>
      <div className="lg:py-4">
        <span className="inline-block py-1 px-2.5 leading-5 text-brand-blue rounded-md bg-[rgba(0,51,102,0.10)] text-sm mb-2">
          Travel
        </span>
        <h3 className="text-2xl md:text-3xl xl:text-4xl font-semibold mb-3">
          <Link
            href="/blog/title"
            className="text-brand-neutral-800 hover:text-opacity-90 transition"
          >
            Revolutionizing the travel industry, one partnership at a time
          </Link>
        </h3>
        <p className="text-sm sm:text-base leading-[22px] sm:leading-[25px] h-[66px] sm:h-[76px] text-brand-neutral-600 truncate-3-lines mb-3">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has more. Ad Mini In Commodo Fugiat
          Adipisicing Cupidatat Tempor Aliqua.
        </p>

        <Link
          href="/blog/title"
          className="flex items-center font-medium hover:underline text-brand-blue py-0.5 mb-3 lg:mb-4 xl:mb-5"
        >
          <span className="mr-1.5 text-sm sm:text-base">Read More</span>
          <span className="text-base sm:text-lg leading-none">
            <FaArrowRightLong />
          </span>
        </Link>

        <div className="flex gap-2.5 items-center">
          <Image
            className="w-11 h-11 object-cover object-center rounded-full"
            width={44}
            height={44}
            src={AvatarImage}
            alt="Albert Flores"
          />
          <div>
            <h5 className="text-brand-neutral-700 font-medium text-base leading-none mb-1">
              Albert Flores
            </h5>
            <div className="text-brand-blue text-sm leading-none">
              12 December, 2023
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
