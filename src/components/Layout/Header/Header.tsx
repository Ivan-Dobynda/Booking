import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";

import authOptions from "@/lib/auth/authOptions";
import Logo from "@/assets/logos/logo-white.svg";

import Button from "@/Component/Button/Button";
import Avatar from "./Avatar";
import Navigation from "./Navigation";
import ResponsiveMenu from "./ResponsiveMenu";
import {getCurrentCountry} from "@/queries/profile";
import {Country} from "@prisma/client";
import SelectCountryAndLanguageBtn from "@/Component/Layout/Header/SelectCountryAndLanguageBtn";

const Header = async () => {
  const session = await getServerSession(authOptions);
  const currentCountry = await getCurrentCountry();

  return (
    <header className="bg-brand-blue-400 h-[72px] md:h-20 xl:h-[86px] w-full relative z-50">
      <div className="base-container flex justify-between items-center h-full">
        <Link href="/">
          <Image
            height={56}
            className="h-10 lg:h-12 xl:h-14 w-auto"
            src={Logo}
            alt="Fly Smart Deals Logo"
          />
        </Link>
        <Navigation />
        <div className="hidden md:flex items-center gap-4">
          {session?.user ? (
            <Avatar session={session} />
          ) : (
            <Button variant="primary-light" href="/login">
              Sign in
            </Button>
          )}
          <SelectCountryAndLanguageBtn currentCountry={currentCountry as Country}/>
        </div>

        <ResponsiveMenu currentCountry={currentCountry as Country} />
      </div>
    </header>
  );
};

export default Header;
