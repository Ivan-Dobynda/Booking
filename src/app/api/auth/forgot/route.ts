import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";

import ResetPasswordTemplate from "@/emails/ResetPassword";
import { ADMIN_ROLES } from "@/app/admin/_utils/constants";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { email, isAdmin } = await req.json();

  const where: any = {
    email: email,
  };

  const user = await prisma.user.findUnique({
    where,
  });

  if (!user) {
    return NextResponse.json({
      message: "Check you email",
    });
  }

  if (isAdmin && user?.role && !ADMIN_ROLES.includes(user?.role)) {
    return NextResponse.json({
      message: "Check you email",
    });
  }

  const token = await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
    },
  });

  const mailData = {
    from: `${process.env.APP_NAME} <${process.env.MAIL_FROM}>`,
    to: user.email || "",
    subject: "Reset Password Request",
    html: render(
      ResetPasswordTemplate({
        resetLink: `${process.env.NEXT_PUBLIC_SERVER_URL}/${
          isAdmin ? "admin/" : ""
        }password-reset/${token.token}`,
        name: `${user.firstName || ""}`,
      })
    ),
  };

  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: process.env.MAIL_SECURE === "true", // upgrade later with STARTTLS
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  transport.sendMail(mailData, (error: any, info: any) => {
    if (error) console.log(error);
  });

  return NextResponse.json({
    message: "Check you email",
  });
};
