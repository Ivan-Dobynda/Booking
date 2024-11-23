import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import authOptions from "@/lib/auth/authOptions";
import bcrypt from "bcrypt";
import { updateUser } from "@/queries/user";

export async function PUT(request: Request) {
  const payload = await request?.json();
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
    select: { password: true },
  });

  const passwordMatch = await bcrypt.compare(
    payload.currentPassword,
    user?.password as string
  );

  if (!passwordMatch) {
    return NextResponse.json(
      {
        error: "Invalid current password",
      },
      { status: 401 }
    );
  }

  try {
    const hashedNewPassword = await bcrypt.hash(payload.newPassword, 10);

    await updateUser(session?.user?.id as string, {
      password: hashedNewPassword,
      enableTwoFA: payload.enableTwoFA,
    });

    return NextResponse.json({
      message: "Your password has been updated.",
    });
  } catch (err) {
    console.log("err: ", err);

    return NextResponse.json(
      {
        error: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
