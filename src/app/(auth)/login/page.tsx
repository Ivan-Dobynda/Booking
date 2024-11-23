import React, { useState } from "react";
import Image from "next/image";

import LoginImage from "@/assets/images/auth/login.png";

import LoginForm from "./LoginForm";
const Login = () => {

  return (
    <div className="flex h-full flex-1">
      <div className="mx-auto w-full xl:w-[45%] xl:mr-16 xl:py-16">
        <div>
          <h1 className="text-[28px] sm:text-3xl md:text-4xl text-center lg:text-left font-bold text-brand-blue-800 mb-8 lg:mb-9">
            Sign in to your account
          </h1>
         <LoginForm /> 
        </div>
      </div>
      <div className="flex-1 hidden xl:block pt-4">
        <Image
          src={LoginImage}
          alt="Login to FlySmartDeals"
          className="h-full rounded-[32px] object-cover object-center"
        />
      </div>
    </div>
  );
};

export default Login;
