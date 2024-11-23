import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import authOptions from "@/lib/auth/authOptions";
import bcrypt from "bcrypt";
import { updateUser } from "@/queries/user";
import { sendSMS, verificationToken } from "@/lib/mobile";

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const mobile = requestBody.mobile; // Extracting mobile from requestBody
    const verifyOTP = requestBody.verifyOTP; // Extracting mobile from requestBody

    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUnique({
      where: { id: session?.user.id },
      select: { password: true },
    });

    if (user) {
      const verificationResponse = await verificationToken(
        mobile as string,
        verifyOTP
      );

      if (
        verificationResponse.status === "pending" ||
        verificationResponse.status === "approved"
      )
        await updateUser(session?.user?.id as string, {
          mobile: mobile,
          isPhoneNumberVerified: true,
        });
      return new Response(
        JSON.stringify({
          status: 200,
          message: `Mobile number is verified`,
        })
      );
    } else {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
