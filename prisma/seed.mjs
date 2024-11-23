import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Admin - Seed Admin User
const addAdminUser = async () => {
  const hashedPassword = await bcrypt.hash("Password123!", 10);
  const user = await prisma.user.upsert({
    where: {
      email: "admin@flysmartdeals.com",
    },
    update: {
      firstName: "Admin",
      lastName: "User",
      email: "admin@flysmartdeals.com",
      password: hashedPassword,
      role: "ADMIN",
      emailVerifiedAt: new Date(),
    },
    create: {
      firstName: "Admin",
      lastName: "User",
      email: "admin@flysmartdeals.com",
      password: hashedPassword,
      role: "ADMIN",
      emailVerifiedAt: new Date(),
    },
  });

  console.log("Admin User created as: ", user?.email);
};

const linkStatesAndCitiesWithCountries = async () => {
  // fetch all countries & link with states
  const countries = await prisma.country.findMany({
    select: { countryId: true, id: true, country: true },
  });

  countries.forEach(async (country) => {
    if (country.country)
      await prisma.state.updateMany({
        where: { countryIdOld: country.countryId },
        data: { countryId: country.id },
      });
  });

  // fetch all states & link with citites
  const states = await prisma.state.findMany({
    select: { stateId: true, id: true, state: true },
  });

  states.forEach(async (state) => {
    if (state.stateId)
      await prisma.city.updateMany({
        where: { stateIdOld: state.stateId },
        data: { stateId: state.id },
      });
  });
};

const fetchStateForCountry = async (countryName) => {
  const country = await prisma.country.findFirst({
    where: { country: countryName },
  });

  // Fetch States against country
  const states = await prisma.state.findMany({
    where: { countryId: country?.id },
  });

  // Fetch Cities against state
  const state = states.find((s) => s.state === "Capital Governorate");
  const cities = await prisma.city.findMany({
    where: { stateId: state?.id },
  });

  console.log("Country: ", country?.country);
  console.log("Total States: ", states?.length);
  console.log("Cities: ", cities?.length);
};

const seedLanguagesAndCurrencies = async () => {
  // Seed currencies
  const usd = await prisma.currency.create({
    data: { name: "USD" },
  });

  const euro = await prisma.currency.create({
    data: { name: "Euro" },
  });

  // Seed languages
  const english = await prisma.language.create({
    data: { name: "English" },
  });

  const french = await prisma.language.create({
    data: { name: "French" },
  });

  console.log("Seed data inserted successfully");
};

const linkCurrenciesAndLanguageWithCountries = async () => {
  // Currency
  const currencies = await prisma.currency.findMany({ select: { id: true } });
  const currenciesIds = currencies.map((curr) => curr.id);

  // Languages
  const language = await prisma.language.findFirst();

  // Attach to countries
  const countries = await prisma.country.updateMany({
    data: {
      currencyIDs: [...currenciesIds],
      languageIDs: [language.id],
    },
  });

  console.log("Updated Countries: ", countries?.count);
};

async function main() {
  // addAdminUser();
  // linkStatesAndCitiesWithCountries();
  // fetchStateForCountry("Bahrain");
  // seedLanguagesAndCurrencies();
  // linkCurrenciesAndLanguageWithCountries();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
