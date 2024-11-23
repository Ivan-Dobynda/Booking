"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Disclosure } from "@headlessui/react";
import { HiOutlineChevronDown, HiOutlineChevronRight } from "react-icons/hi";

import { classNames } from "@/lib/helpers";

interface NavLinkProps {
  item: {
    id: number;
    icon: ReactNode;
    href?: string;
    name: string;
    items?: { id: number; name: string; href: string; icon: ReactNode }[];
    isLogout?: boolean;
  };
}
const NavLink = ({ item }: NavLinkProps) => {
  const pathname = usePathname();

  const currentItem = item.items?.length
    ? pathname.includes(`/${item.href}`)
    : pathname === `/${item.href === "/" ? "" : item.href || ""}` && item?.href
    ? true
    : false;

  // if (item?.isLogout)
  //   return (
  //     <button
  //       className={classNames(
  //         "flex w-full transition bg-white text-base border rounded-lg items-center",
  //         currentItem
  //           ? "p-1.5 hover:bg-gray-100 border-[#0165B3]"
  //           : ""
  //       )}
  //     >
  //       <div
  //         className={classNames(
  //           currentItem ? "p-2.5 rounded-lg bg-brand-blue-300" : ""
  //         )}
  //       >
  //         <Image src={item.icon} alt={item.name} className="w-6" />
  //       </div>
  //       <span
  //         className={classNames(
  //           "font-medium ml-2.5 leading-none",
  //           currentItem ? "" : ""
  //         )}
  //       >
  //         {item.name}
  //       </span>
  //     </button>
  //   );

  return !item.items ? (
    <Link
      href={item.href ? `/${item.href}` : pathname}
      className={classNames(
        "flex w-full transition text-base rounded-lg items-center",
        currentItem
          ? "px-5 py-4 bg-brand-blue-300 text-white"
          : "py-2 text-brand-blue-300"
      )}
      style={
        currentItem
          ? { boxShadow: "0px 10px 30px 0px rgba(87, 189, 204, 0.20)" }
          : {}
      }
    >
      <div className="text-2xl">
        {/* <Image src={item.icon} alt={item.name} className="w-6" /> */}
        {item.icon}
      </div>
      <span
        className={classNames(
          "ml-2.5 leading-none",
          currentItem ? "font-medium " : ""
        )}
      >
        {item.name}
      </span>
    </Link>
  ) : (
    <Disclosure defaultOpen={currentItem}>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={classNames(
              "flex w-full transition text-brand-blue-300 text-base rounded-lg items-center justify-between py-2",
              currentItem ? "" : ""
            )}
          >
            <div className="flex items-center">
              <div className="text-xl">
                {/* <Image src={item.icon} alt={item.name} className="w-6" /> */}
                {item.icon}
              </div>
              <span
                className={classNames(
                  "ml-2.5 leading-none",
                  currentItem ? "" : ""
                )}
              >
                {item.name}
              </span>
            </div>
            <div
              className={classNames(
                "text-xl",
                open ? "trasform rotate-180" : ""
              )}
            >
              <HiOutlineChevronDown />
            </div>
          </Disclosure.Button>
          <Disclosure.Panel as="ul" className="mt-2">
            {item.items?.length &&
              item.items.map((subItem, index) => {
                const isCurrent =
                  pathname ===
                  `/${item.href}${
                    subItem.href === "/" ? "" : subItem.href || ""
                  }`;
                return (
                  <li key={subItem.id}>
                    <Link
                      href={`/${item.href}${subItem.href}`}
                      className="flex items-center hover:text-opacity-80 transition"
                    >
                      {index + 1 !== item.items?.length ? (
                        <svg
                          width="21"
                          height="58"
                          viewBox="0 0 21 58"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 1V57"
                            stroke="#F1F2F4"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M8 1V23C8 26.3137 10.6863 29 14 29H20"
                            stroke="#F1F2F4"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="21"
                          height="57"
                          viewBox="0 0 21 57"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 1V23C8 26.3137 10.6863 29 14 29H20"
                            stroke="#F1F2F4"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                      <div
                        className={classNames(
                          "py-4 px-2 leading-none flex-1 rounded-[10px] text-sm inline-flex items-center justify-between gap-2",
                          index + 1 === item.items?.length
                            ? "-mt-0.5"
                            : "-mt-2",
                          isCurrent
                            ? "bg-brand-blue-300/10 text-brand-blue-300 font-medium"
                            : "text-neutral-700"
                        )}
                      >
                        <div className="inline-flex gap-2 items-center">
                          <span
                            className={classNames(
                              "text-xl",
                              !isCurrent ? "text-brand-neutral-500" : ""
                            )}
                          >
                            {subItem.icon}
                          </span>
                          <span>{subItem.name}</span>
                        </div>
                        <div
                          className={classNames(
                            "text-xl",
                            !isCurrent ? "text-brand-neutral-500" : ""
                          )}
                        >
                          <HiOutlineChevronRight />
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavLink;
