import React from "react";
import { getServerSession } from "next-auth";

import { IoCalendar, IoSettingsSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { FaCircleInfo } from "react-icons/fa6";

import authOptions from "@/lib/auth/authOptions";

import NavLink from "./NavLink";
import LogoutButton from "./LogoutButton";
import Avatar from "./Avatar";

const pages = [
  { name: "Dashboard", href: "/profile/dashboard", icon: <AiFillDashboard /> },
  { name: "My Bookings", href: "/profile/bookings", icon: <IoCalendar /> },
  { name: "My Profile", href: "/profile", icon: <FaUserCircle /> },
  { name: "Settings", href: "/profile/settings", icon: <IoSettingsSharp /> },
  { name: "Help and Feedback", href: "/profile/help", icon: <FaCircleInfo /> },
];

const Aside = async () => {
  const session = await getServerSession(authOptions);

  return (
    <aside className="bg-white rounded-2xl card-shadow p-4 sm:p-5 md:p-6 min-[920px]:max-w-[290px] lg:max-w-xs xl:max-w-[350px] w-full">
      <div className="flex gap-4 items-center relative border-b pb-4 lg:pb-5 mb-3.5 lg:mb-4">
        <Avatar image={session?.user?.image || null} />
        <div className="absolute h-full flex flex-col justify-center pl-20 lg:pl-24 w-full">
          <h4 className="text-base lg:text-lg font-medium text-brand-neutral-700 lg:leading-none lg:mb-1">
            {session?.user?.name}
          </h4>
          <h5
            className="leading-none lg:leading-none text-brand-neutral-500 py-1 text-sm lg:text-[15px] truncate"
            title={session?.user?.email || ""}
          >
            {session?.user?.email}
          </h5>
        </div>
      </div>
      <ul className="space-y-2">
        {pages.map((link, index) => (
          <li key={index}>
            <NavLink {...link} />
          </li>
        ))}
        <li>
          <LogoutButton />
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
