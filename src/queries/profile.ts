"use server";

import { getServerSession } from "next-auth";

import authOptions from "@/lib/auth/authOptions";
import { prisma } from "@/lib/prisma";
import {AdditionalTraveler} from "@prisma/client";

export const getProfileInfo = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return null;

  const profileInfo = await prisma?.user.findUnique({
    where: { id: session?.user?.id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      dob: true,
      gender: true,
      mobile: true,
      accessibilityNeeds: true,
      bio: true,
      emergencyContact: true,
      address: true,
      travelDocuments: true,
      flightPreferences: true,
      language: true,
      country: true,
      currency: true,
      currencyId: true,
      countryId: true,
      languageId: true,
      
    },
  });

  return profileInfo;
};

export const getCurrentCountry = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return null;

  const currentCountry = await prisma?.user.findUnique({
    where: { id: session?.user?.id },
    select: {
      country: true
    }
  })

  return currentCountry?.country

}

export const getPersonalInfo = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return null;

  const personalInfo = await prisma?.personalInfo.findUnique({
    where: { userId: session?.user?.id },
    select: {
      id: true,
      nationalId: true,
      passportNumber: true,

    },
  });

  return personalInfo;
};

export const getAdditionalTravellers = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return null;

  const additionalTravellers = await prisma?.additionalTraveler?.findMany({
    where: {userId: session?.user?.id},
    select: {
      id: true,
      userId: true,
      firstName: true,
      lastName: true,
      mobile: true,
      dob: true,
      gender: true,
      emergencyContact: true,
      
    }
  }) as AdditionalTraveler[]

  return additionalTravellers;

}
export const getUserSession  = async ()=>{
  const session = await getServerSession(authOptions);
    const user = await prisma.user.findUnique({
      where: { id: session?.user.id },
      select: { enableTwoFA: true, },
    });

    return user

}
