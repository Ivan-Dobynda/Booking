"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { GiEntryDoor } from "react-icons/gi";

const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="flex items-center gap-2.5 px-3 py-2.5 lg:py-3 rounded-lg text-red-500 hover:bg-red-50 w-full"
    >
      <span className="text-[22px]">
        <GiEntryDoor />
      </span>
      <span className="text-[15px] lg:text-[17px] leading-none lg:leading-none">
        Logout
      </span>
    </button>
  );
};

export default LogoutButton;
