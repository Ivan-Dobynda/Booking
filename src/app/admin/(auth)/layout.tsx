import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Login from "@admin/_components/Login/Login";

import ImageLogo from "@/assets/logos/logo.svg";
import authOptions from "@/lib/auth/authOptions";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen bg-[#FAFBFF] flex-1 flex-col justify-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <Link href="/" className="inline-block">
            <Image
              className="h-12 sm:h-16 w-auto"
              src={ImageLogo}
              alt="Fly Smart Deals Logo"
            />
          </Link>
        </div>

        <div className="mx-auto w-full max-w-xl">
          <div
            className="bg-white rounded-2xl p-5 sm:p-6 lg:p-8 border border-gray-100"
            style={{
              boxShadow: "10px 20px 60px 0px rgba(229, 233, 237, 0.40)",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
