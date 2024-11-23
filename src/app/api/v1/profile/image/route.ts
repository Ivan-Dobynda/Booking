import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import authOptions from "@/lib/auth/authOptions";

export async function PUT(request: Request) {
  const { image } = await request?.json();

  const userSession = await getServerSession(authOptions);

  try {
    await prisma.user.update({
      where: { id: userSession?.user?.id },
      data: {
        image,
      },
    });

    return NextResponse.json({
      message: "Profile image has been updated",
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
