"use client"
import { classNames } from "@/lib/helpers"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { ReactNode } from "react"
import { GoChevronRight } from "react-icons/go"

const NavLink = (props: { name: string; href: string; icon: ReactNode }) => {
  const pathname = usePathname()

  return (
    <>
      <Link
        href={props.href}
        className={classNames(
          "flex items-center justify-between px-3 py-2.5 lg:py-3 rounded-lg",
          pathname === props.href || (pathname.includes(props.href) && props.href !== "/profile")
            ? "text-white bg-brand-blue"
            : "text-brand-neutral-700 hover:bg-gray-100"
        )}
      >
        <div className='flex items-center gap-2.5'>
          <span className='text-[22px]'>{props.icon}</span>
          <span className='text-[15px] lg:text-[17px] leading-none lg:leading-none'>{props.name}</span>
        </div>
        <div className='text-xl lg:text-2xl'>
          <GoChevronRight />
        </div>
      </Link>
    </>
  )
}

export default NavLink
