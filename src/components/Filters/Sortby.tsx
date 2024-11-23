"use client";
import { Fragment, ReactNode } from "react";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "@/lib/helpers";

export default function Sortby({ children }: { children?: ReactNode }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        {children ? (
          <Menu.Button>{children}</Menu.Button>
        ) : (
          <Menu.Button className="text-left w-44 sm:w-48 md:w-52 rounded-lg border border-gray-300 bg-opacity-30 hover:bg-opacity-60 transition px-3.5 py-2 bg-white">
            <div
              className="text-brand-neutral-600 mb-1.5"
              style={{ lineHeight: 1 }}
            >
              <span className="text-xs sm:text-sm" style={{ lineHeight: 1 }}>
                Sort by
              </span>
            </div>
            <div className="text-brand-neutral-700 text-sm sm:text-[15px] leading-none font-medium">
              Recommended
            </div>
          </Menu.Button>
        )}
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active
                      ? "bg-gray-100 text-brand-neutral-800"
                      : "text-brand-neutral-600",
                    "block px-4 py-2 text-sm sm:text-[15px] font-medium"
                  )}
                >
                  Recommended
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active
                      ? "bg-gray-100 text-brand-neutral-800"
                      : "text-brand-neutral-600",
                    "block px-4 py-2 text-sm sm:text-[15px] font-medium"
                  )}
                >
                  Cheapest
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active
                      ? "bg-gray-100 text-brand-neutral-800"
                      : "text-brand-neutral-600",
                    "block px-4 py-2 text-sm sm:text-[15px] font-medium"
                  )}
                >
                  Shortest
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
