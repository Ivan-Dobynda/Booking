import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

const deletePasswordResetToken = (tokenId?: string) => {
  return prisma.passwordResetToken.delete({
    where: {
      id: tokenId,
    },
  });
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { password, token } = await req.json();

  const passwordResetToken = await prisma.passwordResetToken.findUnique({
    where: {
      token,
      createdAt: { gt: new Date(Date.now() - 1000 * 60 * 60 * 4) },
    },
  });

  if (!passwordResetToken) {
    return NextResponse.json(
      {
        error:
          "Invalid token reset request. Please try resetting your password again.",
      },
      { status: 401 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Update password unconditionally
  const updateUser = prisma.user.update({
    where: { id: passwordResetToken.userId },
    data: {
      password: hashedPassword,
    },
  });

  // Check if emailVerifiedAt is null before updating it
  const user = await prisma.user.findUnique({
    where: { id: passwordResetToken.userId },
    select: { emailVerifiedAt: true },
  });

  try {
    // Execute the transaction
    if (!user?.emailVerifiedAt) {
      const updateEmailVerifiedAt = prisma.user.update({
        where: { id: passwordResetToken.userId },
        data: {
          emailVerifiedAt: new Date(),
        },
      });

      await prisma.$transaction([
        updateUser,
        updateEmailVerifiedAt,
        deletePasswordResetToken(passwordResetToken.id),
      ]);
    } else {
      await prisma.$transaction([
        updateUser,
        deletePasswordResetToken(passwordResetToken.id),
      ]);
    }
    return NextResponse.json({
      message: "Your password has been updated.",
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
};
