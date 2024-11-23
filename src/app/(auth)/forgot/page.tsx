import React from "react";
import Image from "next/image";

import ForgotImage from "@/assets/images/auth/forgot.png";
import ForgotForm from "./ForgotForm";

const Forgot = () => {
  return (
    <div className="flex h-full flex-1">
      <div className="mx-auto w-full xl:w-[45%] xl:mr-16 xl:py-16">
        <div>
          <h1 className="text-[28px] sm:text-3xl md:text-4xl text-center lg:text-left font-bold text-brand-blue-800 mb-8 lg:mb-9">
            Forgot your Password?
          </h1>
          <ForgotForm />
        </div>
      </div>
      <div className="flex-1 hidden xl:block pt-4">
        <Image
          src={ForgotImage}
          alt="Forgot you Password?"
          className="h-full rounded-[32px]  object-cover object-center"
        />
      </div>
    </div>
  );
};

export default Forgot;
