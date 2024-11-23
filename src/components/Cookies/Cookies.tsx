"use client";
import React, { useEffect, useState } from "react";
import Button from "@/Component/Button/Button";

const Cookies = () => {
  const [loaded, setLoaded] = useState(false);
  const [acceptedCookies, setAcceptedCookies] = useState<boolean>(false);

  useEffect(() => {
    setAcceptedCookies(!!localStorage.getItem("acceptedCookies"));
    setLoaded(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("acceptedCookies", "true");
    setAcceptedCookies(true);
  };

  const rejectCookies = () => {
    localStorage.setItem("acceptedCookies", "false");
    setAcceptedCookies(true);
  };

  if (!loaded) return null;

  return (
    <div
      className={`w-full fixed bottom-0 ${
        acceptedCookies ? "hidden" : "flex"
      } items-center justify-center py-4 z-20 text-white bg-black`}
    >
      <div className="max-w-full p-4 md:p-6 gap-6 flex max-lg:flex-col items-center mx-auto">
        <div>
          <h1 className="font-bold text-lg">Manage cookie preferences</h1>
          <p className="max-lg:text-sm">
            By clicking {"Accept"} you agree with the use of analytical cookies
            (which are used to gain insight on website usage and which are used
            to improve our site and services) and tracking cookies (both from
            Booking.com and other trusted partners) that help decide which
            product to show you on and off our site, measure the audience
            visiting our websites, and enable you to like or share things
            directly on social media. By clicking here, you can manage your
            consent and find more information about the cookies we use.
          </p>
        </div>
        <div className="flex lg:flex-col gap-3">
          <Button variant={"green"} onClick={acceptCookies}>
            Accept
          </Button>
          <Button onClick={rejectCookies} variant={"secondary"}>
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
