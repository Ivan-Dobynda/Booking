import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/authOptions";

import { updateUser } from "@/queries/user";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const enableTwoFA = requestBody.enableTwoFA;
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: { id: session?.user.id },
      select: { isPhoneNumberVerified: true },
    });

    if (user?.isPhoneNumberVerified) {
      // Update password unconditionally
      const response = await updateUser(session?.user?.id as string, {
        enableTwoFA: enableTwoFA,
      });

      if (response) {
        return new Response(
          JSON.stringify({
            status: 200,
            message: `${
              enableTwoFA ? "Authentication Enabled" : "Authentication Disabled"
            }`,
          })
        );
      }
    } else {
      return new Response(
        JSON.stringify({
          message: "Please Verify Your Phone Number In Contact Section",
        }),
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
