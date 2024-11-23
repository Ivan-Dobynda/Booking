import React from "react";
import Image from "next/image";

import { FaUser } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { RxDashboard } from "react-icons/rx";
import { RiQuestionnaireLine } from "react-icons/ri";

import Link from "next/link";

import Logo from "@/assets/logos/logo.svg";

import NavLink from "./NavLink";
import LogoutButton from "./LogoutButton";

const navItems = [
  { id: 1, name: "Dashboard", icon: <RxDashboard />, href: "admin" },
  { id: 2, name: "Admin Users", icon: <FaUser />, href: "admin/users" },
  {
    id: 3,
    name: "Modules",
    href: "admin/modules",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M2.75004 8.95831H6.62496C6.76329 8.95831 6.875 9.07002 6.875 9.20835V16.4166C6.875 16.5549 6.76329 16.6666 6.62496 16.6666H5C3.33333 16.6666 2.5 15.8333 2.5 14.1666V9.20835C2.5 9.07002 2.61171 8.95831 2.75004 8.95831ZM8.125 9.20835V16.4166C8.125 16.5549 8.23671 16.6666 8.37504 16.6666H11.625C11.7633 16.6666 11.875 16.5549 11.875 16.4166V9.20835C11.875 9.07002 11.7633 8.95831 11.625 8.95831H8.37504C8.23671 8.95831 8.125 9.07002 8.125 9.20835ZM15 3.33331H5C3.33333 3.33331 2.5 4.16665 2.5 5.83331V7.45827C2.5 7.59661 2.61171 7.70831 2.75004 7.70831H17.25C17.3883 7.70831 17.5 7.59661 17.5 7.45827V5.83331C17.5 4.16665 16.6667 3.33331 15 3.33331ZM13.125 9.20835V16.4166C13.125 16.5549 13.2367 16.6666 13.375 16.6666H15C16.6667 16.6666 17.5 15.8333 17.5 14.1666V9.20835C17.5 9.07002 17.3883 8.95831 17.25 8.95831H13.375C13.2367 8.95831 13.125 9.07002 13.125 9.20835Z"
          fill="#003366"
        />
      </svg>
    ),
    items: [
      {
        id: 4,
        name: "Manage Blogs",
        href: "/blogs",
        icon: <CgNotes />,
      },
      {
        id: 5,
        name: "FAQs",
        href: "/faqs",
        icon: <RiQuestionnaireLine />,
      },
      // {
      //   id: 2,
      //   name: "Companies",
      //   href: "/companies",
      //   icon: <HiOutlineBuildingOffice />,
      // },
    ],
  },
];

// const logoutItem = { id: 1, icon: LogoutIcon, name: "Log Out", isLogout: true };

const Aside = () => {
  return (
    <aside className="z-50 left-0 fixed top-0 bottom-0 w-[280px] bg-white border-r border-neutral-50 pt-6 flex flex-col justify-between">
      <div className="px-8">
        <div className="mb-6">
          <Link href="/" className="w-32 inline-block">
            <Image src={Logo} alt="Infotech Client App" className="w-full" />
          </Link>
        </div>
        <nav>
          <ul className="space-y-5">
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink item={item} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-neutral-100">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default Aside;
