import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import authOptions from "@/lib/auth/authOptions";

export async function PUT(request: Request) {
  const payload = await request?.json();
  const session = await getServerSession(authOptions);

  const data: any = {};

  const fields = [
    "email",
    "firstName",
    "lastName",
    "dob",
    "mobile",
    "gender",
    "bio",
    "accessibilityNeeds",
    "address",
    "emergencyContact",
    "travelDocuments",
    "flightPreferences",
    "language",
    "currency",
    "countryId",
    "currencyId",
    "languageId",
    "isMobileVerified",
  ];

  fields.forEach((field) => {
    if (payload[field]) data[field] = payload[field];
  });

  try {
    const user = await prisma.user.findUnique({
      where: { id: session?.user.id },
      select: { mobile: true, isPhoneNumberVerified: true },
    });

    // if (user?.mobile !== data?.mobile && !payload?.isMobileVerified)
    //   return NextResponse.json(
    //     {
    //       error: "Please Verify Your New Number First",
    //     },
    //     { status: 500 }
    //   );

    if (user?.mobile === data?.mobile && !user?.isPhoneNumberVerified)
      return NextResponse.json(
        {
          error: "Please verify mobile number first",
        },
        { status: 500 }
      );
    delete data["isMobileVerified"];
    const updatedUser = await prisma.user.update({
      where: { id: session?.user?.id },
      data: data,
    });

    return NextResponse.json({
      message: "Your profile has been updated.",
      data: {
        firstName: updatedUser?.firstName,
        lastName: updatedUser?.lastName,
        email: updatedUser?.email,
        mobile: updatedUser?.mobile,
        dob: updatedUser?.dob,
        gender: updatedUser?.gender,
        bio: updatedUser?.bio,
        accessibilityNeeds: updatedUser?.accessibilityNeeds,
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
