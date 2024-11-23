import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Logo from "@/assets/logos/logo.svg";

export const metadata: Metadata = {
  title: "Fly Smart Deals",
  description: "Fly Smart Deals for best affordable prices across the world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="pt-10 lg:pt-12 pb-14 lg:pb-16 flex justify-center items-center min-h-screen">
      <div className="max-w-xl lg:max-w-2xl xl:max-w-full w-full">
        <header className="mb-6 sm:mb-8">
          <div className="base-container text-center lg:text-left">
            <Link href="/" className="inline-block">
              <Image
                height={64}
                className="h-14 sm:h-16 w-auto"
                src={Logo}
                alt="Fly Smart Deals"
              />
            </Link>
          </div>
        </header>
        <div className="base-container flex flex-col flex-1">{children}</div>
      </div>
    </main>
  );
}
