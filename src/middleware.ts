import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_ROLES } from "./app/admin/_utils/constants";
import { Role } from "@prisma/client";

export default async function middleware(req: NextRequest) {
  const loggedInUser = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthRoute =
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/register" ||
    req.nextUrl.pathname === "/forgot" ||
    req.nextUrl.pathname.startsWith("/password-reset");

  const isAdminAuthRoute =
    req.nextUrl.pathname === "/admin/login" ||
    req.nextUrl.pathname === "/admin/register" ||
    req.nextUrl.pathname === "/admin/forgot" ||
    req.nextUrl.pathname.startsWith("/admin/password-reset");

  if (
    !!loggedInUser &&
    ADMIN_ROLES.includes(loggedInUser?.role as Role) &&
    (req.nextUrl.pathname.startsWith("/profile") || isAdminAuthRoute)
  ) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin`);
  }

  if (!!loggedInUser && isAuthRoute) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/`);
  }

  if (!loggedInUser && req.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/`);
  }

  if (
    !!loggedInUser &&
    !ADMIN_ROLES.includes(loggedInUser?.role as Role) &&
    req.nextUrl.pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`
    );
  }

  return null;
}
