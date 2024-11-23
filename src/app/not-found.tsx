import React from "react";
import Image from "next/image";
import NextTopLoader from "nextjs-toploader";

import NotFoundImage from "@/assets/images/404.svg";

import Button from "@/components/Button/Button";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";

import AuthProvider from "@/context/auth-provider";

const NotFound = () => {
  return (
    <AuthProvider>
      <NextTopLoader showSpinner={false} color="#FFCC99" />

      <Header />
      <main className="pt-20 lg:pt-28 pb-24 lg:pb-32">
        <div className="base-container mx-auto text-center">
          <Image
            width={576}
            priority
            className="max-w-lg lg:max-w-xl w-full mx-auto"
            src={NotFoundImage}
            alt="404 - Not Found"
          />
          <h1 className="font-bold text-4xl lg:text-5xl mt-8 sm:mt-10 mb-3 sm:mb-5 text-center text-brand-blue-300">
            <span className="sm:hidden">Page not found!</span>
            <span className="hidden sm:inline">
              Oops... This page was not found!
            </span>
          </h1>
          <p className="max-w-4xl mx-auto text-lg lg:text-xl mb-5 leading-relaxed text-brand-neutral-700">
            {` We're sorry, but it appears you've taken a wrong turn. The page
              you're searching for doesn't seem to exist or may have been moved
              to a different location.`}
          </p>
          <Button href="/">Go Home</Button>
        </div>
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default NotFound;
