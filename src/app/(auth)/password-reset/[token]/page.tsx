import React from "react";
import Image from "next/image";

import ResetImage from "@/assets/images/auth/reset.png";
import ResetForm from "./ResetForm";

const Reset = () => {
  return (
    <div className="flex h-full flex-1">
      <div className="mx-auto w-full xl:w-[45%] xl:mr-16 xl:py-16">
        <div>
          <h1 className="text-[28px] sm:text-3xl md:text-4xl text-center lg:text-left font-bold text-brand-blue-800 mb-8 lg:mb-9">
            Reset your Password
          </h1>
          <ResetForm />
        </div>
      </div>
      <div className="flex-1 hidden xl:block pt-4">
        <Image
          src={ResetImage}
          alt="Reset your Password"
          className="h-full rounded-[32px]  object-cover object-center"
        />
      </div>
    </div>
  );
};

export default Reset;
