"use client";
import React from "react";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="flex h-16 items-center text-brand-blue-300 px-8 gap-2 text-base hover:bg-brand-blue-300/5 w-full transition"
    >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M16.8 2H14.2C11 2 9 4 9 7.2V11.25H15.25C15.66 11.25 16 11.59 16 12C16 12.41 15.66 12.75 15.25 12.75H9V16.8C9 20 11 22 14.2 22H16.79C19.99 22 21.99 20 21.99 16.8V7.2C22 4 20 2 16.8 2Z"
            fill="#003366"
          />
          <path
            d="M4.56043 11.25L6.63043 9.17997C6.78043 9.02997 6.85043 8.83997 6.85043 8.64997C6.85043 8.45997 6.78043 8.25997 6.63043 8.11997C6.34043 7.82997 5.86043 7.82997 5.57043 8.11997L2.22043 11.47C1.93043 11.76 1.93043 12.24 2.22043 12.53L5.57043 15.88C5.86043 16.17 6.34043 16.17 6.63043 15.88C6.92043 15.59 6.92043 15.11 6.63043 14.82L4.56043 12.75H9.00043V11.25H4.56043Z"
            fill="#003366"
          />
        </svg>
      </span>
      <span>Log Out</span>
    </button>
  );
};

export default LogoutButton;
