import getAmount from "@/queries/offer";
import app from "@/lib/app";
import createStripeSession from "@/config/createStripeSession";
import { prisma } from "@/lib/prisma";
import commission from "@/constants/commission";

export const POST = app(
  async (req) => {
    const { offerId, seatServices, passengers } = req.data;
    const data = await getAmount({ id: offerId, seats: seatServices });
    const domain = req.headers.get("host");
    const session = await createStripeSession({
      line_items: data.line_items,
      success_url: `http://${domain}/flight/${offerId}/success`,
    });
    await prisma.transaction.create({
      data: {
        amount: data.total_amount.toString(),
        paymentId: session.id,
        client_token: session.client_secret,
        currency: data.currency,
        created_at: new Date(),
        expires_at: new Date(session.expires_at * 1000),
        status: session.status,
        seatServices: {
          create: seatServices,
        },
        passengers: {
          create: passengers,
        },
        offerId,
        userId: req.user?.id,
        airlineName: data.owner_name,
        commission,
      },
    });
    return {
      status: 200,
      message: "success",
      result: session,
    };
  },
  false,
  [
    { name: "offerId", minLength: 10, message: "Offer Id is required!" },
    { name: "seatServices", isArray: true },
    { name: "passengers", isArray: true, minLength: 1 },
  ]
);
