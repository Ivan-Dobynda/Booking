import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import authOptions from "@/lib/auth/authOptions";
import bcrypt from "bcrypt";
import { updateUser } from "@/queries/user";
import { sendSMS } from "@/lib/mobile";

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const mobile = requestBody.mobile; // Extracting mobile from requestBody

    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUnique({
      where: { id: session?.user.id },
      select: { password: true },
    });

    if (user) {
      // User found
      const smsResponse = await sendSMS(mobile);

      if (smsResponse.status === "pending" || smsResponse.status === "approved")
        return new Response(
          JSON.stringify({
            status: 200,
            message: `SMS send to your number ${mobile}`,
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
