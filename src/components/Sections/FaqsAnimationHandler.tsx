"use client";
import { useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const FaqsAnimationHandler = () => {
  useEffect(() => {
    gsap.to(".faq-box", {
      scrollTrigger: {
        trigger: ".faq-container",
        start: "top-=100 center",
      },
      opacity: 1,
      x: 0,
      stagger: 0.2,
    });
    gsap.to(".faq-heading", {
      scrollTrigger: {
        trigger: ".faq-container",
        start: "top-=100 center",
      },
      opacity: 1,
      x: 0,
      stagger: 0.2,
    });
  }, []);

  return null;
};

export default FaqsAnimationHandler;
