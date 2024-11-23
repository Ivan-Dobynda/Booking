"use client";

import { Fragment, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import ProfileImage from "@/assets/images/default-avatar.jpg";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "@/lib/helpers";
import { signOut, useSession } from "next-auth/react";
import { ADMIN_ROLES_OPTIONS } from "../../_utils/constants";

export default function UserDropdown() {
  const { data, status } = useSession();

  const role = useMemo(() => {
    return ADMIN_ROLES_OPTIONS.find(
      (option) => option.value === data?.user?.role
    )?.name;
  }, [data?.user?.role]);

  const items = [
    { name: "Dashboard", href: "/admin" },
    // { name: "Account settings", href: "/app/settings/profile" },
    // { name: "Companies", href: "/app/search-companies" },
    // { name: "My Orders", href: "/app/my-reports/my-orders" },
  ];

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2.5 pl-2 pr-3 py-2 rounded-full bg-[#FAFAFA] transition">
        <Image
          src={ProfileImage}
          alt="Profile image"
          className="w-11 h-11 rounded-full"
        />
        <div className="text-left ">
          <div className="text-neutral-700 text-sm lg:text-base font-medium">
            {data?.user?.name?.split(" ")?.[0]}
          </div>
          <div className="text-neutral-500 text-xs">{role}</div>
        </div>
        <ChevronDownIcon className="w-6 text-[#4B5563]" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute md:left-auto md:right-0 z-10 mt-2 w-56 md:w-60 origin-top-left md:origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg shadow-black/5 ring-1 ring-gray-700 ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm">Signed in as</p>
            <p className="truncate text-sm font-medium text-gray-900">
              {data?.user?.name}
            </p>
          </div>
          <div className="py-1">
            {items.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <Link
                    href={item.href}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => signOut()}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  Log Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
