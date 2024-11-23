import React from "react";
import UserDropdown from "./UserDropdown";
import MailIcon from "@admin/_assets/icons/mail.svg";
import SearchIcon from "@admin/_assets/icons/Search.svg";
import Image from "next/image";
import { classNames } from "@/lib/helpers";

const Header = () => {
  return (
    <header
      className={
        "bg-white z-40 h-20 fixed w-full top-0 left-0 border-b border-neutral-50"
      }
    >
      <div className="ml-[280px] h-full px-8 flex justify-between items-center">
        <div className="relative flex items-center max-w-sm w-full">
          <Image
            src={SearchIcon}
            alt="Search here..."
            className="absolute left-4 pointer-events-none"
          />
          <input
            type="text"
            className={classNames(
              "border-0 text-app-text-dark rounded-lg bg-[#F8F8F8] block w-full pl-12 pr-2.5 py-2.5 text-sm leading-[22px] placeholder:text-neutral-400 focus:ring-0 focus:border-gray-300 transition"
            )}
            placeholder="Search anything…"
          />
        </div>
        <div className="flex items-center gap-[18px]">
          <button className="relative">
            <div className="w-3 h-3 rounded-full bg-red-500 absolute -right-0.5 -top-0 border-2 border-white"></div>
            <Image src={MailIcon} alt="Mail Icon" className="w-7 h-7" />
          </button>
          <div className="space-x-3 flex">
            {/* <BasketLink variant="app" href="/app/basket" /> */}
            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
