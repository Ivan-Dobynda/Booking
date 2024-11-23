import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Header from "@/app/admin/_components/Layout/Header";
import Aside from "@/app/admin/_components/Layout/Aside";
import Login from "@admin/_components/Login/Login";

import authOptions from "@/lib/auth/authOptions";
import { ADMIN_ROLES } from "../_utils/constants";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) return <Login />;

  if (!ADMIN_ROLES.includes(session?.user?.role as Role)) redirect("/");

  return (
    <div className={`relative min-h-screen flex flex-col pt-20 bg-[#fafafa]`}>
      <Header />

      <Aside />

      <main className="ml-[280px] flex-1 h-full py-8 px-6">{children}</main>
    </div>
  );
}
