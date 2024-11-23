"use client";
import React, { useEffect } from "react";
import H2 from "../Typo/H2";
import Button from "../Button/Button";
import BlogPost from "../Cards/BlogPost";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
const Blog = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    gsap.to(".heading-news", {
      scrollTrigger: {
        trigger: ".heading-news",
        start: "top center",
      },
      opacity: 1,
      y: 0,
    });
    gsap.to(".para-news", {
      scrollTrigger: {
        trigger: ".heading-news",
        start: "top center",
      },
      opacity: 1,
      x: 0,
      delay: 0.3,
    });
    gsap.to(".blog-item", {
      scrollTrigger: {
        trigger: ".heading-news",
        start: "top center",
      },
      opacity: 1,
      y: 0,
      stagger: 0.3,
      delay: 0.5,
    });
  }, []);
  return (
    <section className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
      <div className="base-container">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-16">
          <H2 className="mb-2 heading-news md:mb-4 opacity-0 -translate-y-10">
            News And Blog
          </H2>
          <p className="max-w-[920px] translate-x-10 opacity-0 para-news mx-auto text-sm sm:text-base md:text-lg text-brand-neutral-600 md:leading-relaxed">
            Stay informed and inspired through our news and blog. Discover
            travel tips, destination insights, and captivating stories that
            ignite your wanderlust and enhance your journey&apos;s planning.
          </p>
        </div>
        <div className="w-full mx-auto max-w-md md:max-w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <BlogPost />
          <BlogPost />
          <BlogPost />
        </div>
        <div className="text-center">
          <Button href="/blog">View More</Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
