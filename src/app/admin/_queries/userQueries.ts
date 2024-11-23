"use server";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

import { ADMIN_ROLES } from "@admin/_utils/constants";

import { prisma } from "@/lib/prisma";
import { IAdminUserPayload } from "../_utils/interfaces";

export const fetchAdminUser = async ({ email }: { email: string }) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
      role: {
        notIn: ["TRAVELER", "USER"],
      },
    },
  });

  return { ...user, password: "" };
};

export const createAdminUser = async (data: IAdminUserPayload) => {
  const userExists = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
    select: {
      id: true,
    },
  });

  if (userExists?.id) {
    return { error: "Email already exists." };
  }

  const hashedPassword = await bcrypt.hash(data?.password || "", 10);

  await prisma.user.create({
    data: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role as Role,
      password: hashedPassword,
      emailVerifiedAt: new Date(),
    },
  });

  revalidatePath("/admin/users");

  return { message: "Successfully created admin user" };
};

export const updateAdminUser = async (id: string, data: IAdminUserPayload) => {
  const userExists = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!userExists?.id) {
    return { error: "User not exist." };
  }

  const updatedUser: any = {
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    role: data.role as Role,
  };

  if (data.password) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    updatedUser.password = hashedPassword;
  }

  await prisma.user.update({
    where: {
      id,
    },
    data: updatedUser,
  });

  revalidatePath("/admin/users");

  return { message: "Successfully updated admin user" };
};

export const deleteAdminUser = async (id: string) => {
  // await prisma.user.delete(id);
  // revalidatePath("/admin/users");

  return { message: "Successfully deleted admin user" };
};

const SELECTABLE_FIELDS_FOR_ADMIN_USERS = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  role: true,
  createdAt: true,
};

// Archive User
export const deleteUser = async (id: string) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });

    return user?.deletedAt ? true : false;
  } catch (err) {
    console.log("err: ", err);

    return false;
  }
};

export const deleteUsers = async (userIds: string[]) => {
  try {
    const isDeleted = await prisma.user.deleteMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });

    return isDeleted
      ? {
          success: "Successfully deleted selected companies",
        }
      : {
          error: "Something went wrong while deleting selected companies",
        };
  } catch (err) {
    console.log("err: ", err);

    return {
      error: "Something went wrong while deleting selected companies",
    };
  }
};

export const isUserDeleted = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        deletedAt: true,
      },
    });

    return user?.deletedAt ? true : false;
  } catch (err) {
    console.log("err: ", err);
    return false;
  }
};

// Manage Admin Users
export const fetchAdminUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: SELECTABLE_FIELDS_FOR_ADMIN_USERS,
      where: {
        role: {
          in: ADMIN_ROLES,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return users;
  } catch (err) {
    console.log("Something went wrong: ", err);
  }
};

// Manage Users
export const verifyEmailsQuery = async (userIds: string[]) => {
  try {
    await prisma?.user.updateMany({
      where: {
        id: {
          in: userIds,
        },
      },
      data: {
        emailVerifiedAt: new Date(),
      },
    });

    return {
      success: "Successfully verified email of selected records.",
    };
  } catch (err) {
    return {
      error: "Something went wrong while verifying email of selected records.",
    };
  }
};

export const verifyEmailQuery = async (id: string) => {
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        emailVerifiedAt: new Date(),
      },
    });

    return user?.emailVerifiedAt || false;
  } catch (err) {
    console.log(err);
    return false;
  }
};
