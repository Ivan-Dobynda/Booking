import React from "react";
import Image from "next/image";

import RegisterImage from "@/assets/images/auth/signup.png";

import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <div className="flex">
      <div className="mx-auto w-full xl:w-[45%] xl:mr-16">
        <h1 className="text-[28px] sm:text-3xl md:text-4xl text-center lg:text-left font-bold text-brand-blue-800 mb-7">
          Register your account
        </h1>
        <RegisterForm />
      </div>
      <div className="flex-1 hidden xl:block py-4">
        <Image
          src={RegisterImage}
          alt="Register FlySmartDeals Account"
          className="h-full rounded-[32px] object-cover object-center"
        />
      </div>
    </div>
  );
};

export default Register;
