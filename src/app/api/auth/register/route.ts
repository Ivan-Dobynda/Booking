import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { randomUUID } from "crypto";
import { render } from "@react-email/render";

import { prisma } from "@/lib/prisma";
import VerifyEmail from "@/emails/VerifyEmail";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { firstName, lastName, email, password } = await req.json();

  if (!firstName || !lastName || !email || !password)
    return NextResponse.json(
      { error: "Please fill all the required fields." },
      { status: 422 }
    );

  const oldUser = await prisma.user.findFirst({ where: { email: email } });
  if (oldUser)
    return NextResponse.json(
      {
        error: "Email is already taken.",
      },
      { status: 422 }
    );

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "USER",
      emailVerifiedAt: null,
    },
  });
  const token = await prisma.activateToken.create({
    data: {
      token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
      userId: user.id,
    },
  });

  const mailData = {
    from: `${process.env.MAIL_FROM}`,
    to: user?.email ?? "",
    subject: "Activate Account",
    html: render(
      VerifyEmail({
        verifyLink: `${process.env.NEXT_PUBLIC_SERVER_URL}/activate/${token.token}`,
        name: `${user.firstName || ""}`,
        twoFactor: false,
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
    tls: {
      rejectUnauthorized: false,
    },
  });

  transport.sendMail(mailData, (error: any, info: any) => {
    if (error) console.log(error);
  });

  return NextResponse.json({
    message:
      "User registered successfully. Please check your email and activate the account.",
  });
};
