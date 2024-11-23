"use server";
import { prisma } from "@/lib/prisma";

export const getAllCountries = async () => {
  const countries = await prisma?.country.findMany({
    include: {
      languages: {
        select: {
          id: true,
          name: true,
        },
      },
      currencies: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      country: "asc",
    },
  });
  return countries;
};

export const fetchStateByCountry = async (country: string) => {
  const states = await prisma.state.findMany({
    where: {
      country: {
        country,
      },
    },
    orderBy: {
      state: "asc",
    },
  });

  return states;
};

export const fetchCitiesByState = async (stateId: string) => {
  const cities = await prisma.city.findMany({
    where: { stateId },
    orderBy: { city: "asc" },
  });

  return cities;
};
