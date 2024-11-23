import React from "react";
import Link from "next/link";
import Image from "next/image";

import ImageLogo from "@/assets/logos/logo.svg";
import LoginForm from "@admin/(auth)/login/AdminLogin";

const Login = () => {
  return (
    <div className="flex min-h-screen bg-[#FAFBFF] flex-1 flex-col justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <Link href="/" className="inline-block">
          <Image
            className="h-12 sm:h-16 w-auto"
            src={ImageLogo}
            alt="Wazifame Logo"
          />
        </Link>
      </div>

      <div className="mx-auto w-full max-w-xl">
        <div
          className="bg-white rounded-2xl p-5 sm:p-6 lg:p-8 border border-gray-100"
          style={{
            boxShadow: "10px 20px 60px 0px rgba(229, 233, 237, 0.40)",
          }}
        >
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
