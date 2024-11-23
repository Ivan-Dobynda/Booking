import app from "@/lib/app";
import { duffel } from "@/lib/duffel";
import setOffers from "./setOffers";

interface Passenger {
  age?: number;
  type?: "adult" | "infant_without_seat";
  fare_type?: string;
}

export const POST = app(
  async (req) => {
    const {
      ages,
      adults = 1,
      infant_without_seat,
      slices,
      return_date,
      ...body
    } = req.data;
    const passengers: Passenger[] = Array.from({ length: +adults }, () => ({
      type: "adult",
    }));
    if (ages) ages.forEach((age: string) => passengers.push({ age: +age }));

    if (infant_without_seat) {
      const infantPassengers: Passenger[] = Array.from(
        { length: infant_without_seat },
        () => ({
          type: "infant_without_seat",
        })
      );
      passengers.push(...infantPassengers);
    }

    // @ts-ignore

    const res = (await duffel.offerRequests.create({ slices, passengers, ...body })).data;

    return {
      status: 200,
      message: "success",
      // @ts-ignore
      result: { ...setOffers(res.offers, body), client_key: res.client_key },
    };
  },
  false,
  [
    { name: "slices", minLength: 1, isArray: true },
    { name: "ages", isArray: true },
  ]
);
