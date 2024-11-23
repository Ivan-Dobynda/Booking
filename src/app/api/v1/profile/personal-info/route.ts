import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import authOptions from "@/lib/auth/authOptions";

export async function PUT(request: Request) {
  const payload = await request?.json();
  const session = await getServerSession(authOptions);

  const data: any = {};

  const fields = ["passportNumber", "nationalId"];

  fields.forEach((field) => {
    if (payload[field]) data[field] = payload[field];
  });

  try {
    const personalInfo = await prisma.personalInfo.upsert({
      where: { userId: session?.user?.id },
      create: {
        ...data,
        userId: session?.user?.id as string,
      },
      update: data,
    });

    return NextResponse.json({
      message: "Your personal info has been updated.",
      data: {
        passportNumber: personalInfo?.passportNumber,
        nationalId: personalInfo?.nationalId,
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
