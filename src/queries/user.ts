"use server";

import { randomUUID } from "crypto";
import { Prisma as PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const getUserByEamil = (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = (data: PrismaClient.UserCreateInput) => {
  return prisma.user.create({
    data,
  });
};

export const updateUser = (id: string, data: PrismaClient.UserUpdateInput) => {
  return prisma.user.update({
    where: { id: id },
    data,
  });
};

export const createOrUpdate = (
  where: PrismaClient.UserWhereUniqueInput,
  update: PrismaClient.UserUpdateInput,
  create: PrismaClient.UserCreateInput
) => {
  return prisma.user.upsert({
    where,
    update,
    create,
  });
};

// Auth
export const createActivateToken = (userId: string) => {
  return prisma.activateToken.create({
    data: {
      token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
      userId: userId,
    },
  });
};

export const getActivateTokenCount = (userId: string) => {
  return prisma.activateToken.count({
    where: {
      userId,
      createdAt: {
        gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
      },
    },
  });
};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const checkTwoFactor = async (userId: string) => {
  const otp = generateOTP();

  const otpExpiration = new Date();
  otpExpiration.setMinutes(otpExpiration.getMinutes() + 2);

  await prisma.user.update({
    where: { id: userId },
    data: { otp, otpExpiration },
  });

  return { otp, otpExpiration };
};
