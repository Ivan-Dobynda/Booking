"use client";
import { classNames } from "@/lib/helpers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({
  href,
  title,
}: {
  id: number;
  title: string;
  href: string;
}) => {
  const pathname = usePathname();

  return (
    <>
      <Link
        href={href}
        className={classNames(
          "leading-none font-medium py-1.5 text-[15px] lg:text-base transition",
          pathname === href
            ? "text-brand-orange border-b border-brand-orange"
            : "text-white hover:text-brand-orange"
        )}
      >
        {title}
      </Link>
    </>
  );
};

export default NavLink;
