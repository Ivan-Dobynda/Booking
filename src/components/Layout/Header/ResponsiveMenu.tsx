"use client";
import React, {Fragment, useEffect, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {signOut, useSession} from "next-auth/react";
import {IoIosMenu, IoMdClose} from "react-icons/io";
import {usePathname} from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import Logo from "@/assets/logos/logo-white.svg";

import {classNames} from "@/lib/helpers";

import Button from "@/components/Button/Button";
import {links} from "./Navigation";
import {getAssetPath} from "@/lib/fileUploader";
import SelectCountryAndLanguageBtn from "@/Component/Layout/Header/SelectCountryAndLanguageBtn";
import {Country} from "@prisma/client";

interface ResponsiveMenuProps {
   currentCountry: Country | null
}
const ResponsiveMenu = ({currentCountry}: ResponsiveMenuProps) => {
    const session = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setMenuOpen((prevState) => !prevState);
    };

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    return (
        <div className="block md:hidden">
            <div className="h-full flex items-center">
                <button onClick={toggleMenu} className="text-4xl text-white">
                    {menuOpen ? <IoMdClose/> : <IoIosMenu/>}
                </button>
            </div>
            <Transition.Root show={menuOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={setMenuOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur transition-opacity"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-16 sm:pl-20">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div
                                                className="absolute left-0 top-0 -ml-10 flex pr-2 pt-4 sm:-ml-12 sm:pr-4">
                                                <button
                                                    type="button"
                                                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-transparent"
                                                    onClick={() => setMenuOpen(false)}
                                                >
                                                    <span className="absolute -inset-2.5"/>
                                                    <span className="sr-only">Close panel</span>
                                                    <span className="text-4xl leading-none">
                            <IoMdClose/>
                          </span>
                                                </button>
                                            </div>
                                        </Transition.Child>
                                        <div className="flex h-full flex-col overflow-auto bg-brand-blue-500 shadow-xl">
                                            <div className="flex justify-center mb-7 sm:mb-10 pt-6">
                                                <Link href="/">
                                                    <Image
                                                        height={56}
                                                        className="h-12 sm:h-14 w-auto"
                                                        src={Logo}
                                                        alt="Fly Smart Deals Logo"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="relative flex-1 flex flex-col justify-between">
                                                <nav className="px-4 sm:px-6 py-6">
                                                    <ul className="space-y-3">
                                                        {links.map((link) => (
                                                            <li key={link.id}>
                                                                <Link
                                                                    className={classNames(
                                                                        pathname === link.href
                                                                            ? "bg-brand-blue-300"
                                                                            : "",
                                                                        "block text-sm sm:text-[15px]  transition py-2.5 text-gray-200 text-center rounded-lg"
                                                                    )}
                                                                    href={link.href}
                                                                >
                                                                    {link.title}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                        <div className={`flex items-center justify-center`}>
                                                            <SelectCountryAndLanguageBtn currentCountry={currentCountry}/>
                                                        </div>
                                                    </ul>
                                                </nav>
                                                <div className="">
                                                    {session?.data?.user ? (
                                                        <div className="px-4 sm:px-6 border-t border-brand-blue">
                                                            <Link
                                                                href="/profile"
                                                                className="flex items-center w-full gap-3 sm:gap-4 py-4"
                                                            >
                                                                <Image
                                                                    width={56}
                                                                    height={56}
                                                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover object-center"
                                                                    src={getAssetPath(
                                                                        session?.data?.user?.image || ""
                                                                    )}
                                                                    alt="User name"
                                                                />
                                                                <h4 className="font-medium text-white text-sm sm:text-base">
                                                                    {session?.data?.user?.name}
                                                                </h4>
                                                            </Link>
                                                            <div className="pb-3">
                                                                <Button
                                                                    onClick={() => signOut()}
                                                                    className="w-full"
                                                                >
                                                                    Logout
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                                                            <Button href="/login" className="w-full">
                                                                Sign In
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
};

export default ResponsiveMenu;
