"use client";
import { Fragment, useMemo } from "react";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import { Role } from "@prisma/client";

import { FaUserCircle } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";

import { classNames } from "@/lib/helpers";
import { getAssetPath } from "@/lib/fileUploader";

import LogoutButton from "@/Component/Layout/Header/LogoutButton";
import { ADMIN_ROLES } from "@/app/admin/_utils/constants";
import { MdAdminPanelSettings } from "react-icons/md";

const profileItems = [
  { name: "My Profile", href: "/profile", icon: <FaUserCircle /> },
  { name: "My bookings", href: "/profile/bookings", icon: <IoCalendar /> },
];

interface AvatarProps {
  session: Session;
}

export default function Avatar({ session }: AvatarProps) {
  const items = useMemo(() => {
    if (ADMIN_ROLES.includes(session.user?.role as Role)) {
      return [
        {
          name: "Admin",
          href: "/admin",
          icon: (
            <span className="text-lg">
              <MdAdminPanelSettings />
            </span>
          ),
        },
      ];
    }

    return profileItems;
  }, [session]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex item-center">
        <Menu.Button className="inline-flex shadow-sm">
          <Image
            width={56}
            height={56}
            className="w-12 lg:w-14 h-12 lg:h-14 rounded-full object-cover object-center"
            src={getAssetPath(session?.user?.image || "")}
            alt="User name"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm mb-0.5">Signed in as</p>
            <p className="truncate text-sm font-medium text-gray-900">
              {session.user?.name}
            </p>
          </div>
          <div className="py-1">
            {items.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <Link
                    href={item.href}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "px-4 py-2 text-sm flex gap-2 items-center font-medium"
                    )}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <LogoutButton
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm font-medium"
                  )}
                />
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
