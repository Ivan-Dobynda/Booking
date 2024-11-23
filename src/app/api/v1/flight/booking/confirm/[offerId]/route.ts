import stripe from "@/config/stripe";
import app from "@/lib/app";
import { duffel } from "@/lib/duffel";
import { prisma } from "@/lib/prisma";
import { CreateOrderPassenger } from "@duffel/components";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { offerId: string } }
) => {
  const where = { offerId: context.params.offerId };
  let transaction = null;
  try {
    transaction = await prisma.transaction.findUnique({
      where,
      include: { passengers: true, seatServices: true },
    });
    if (transaction) {
      const paid = transaction?.status === "complete";

      if (!paid) {
        const session = await stripe.checkout.sessions.retrieve(
          transaction?.paymentId
        );

        if (session.payment_status === "paid") {
          const passengers: CreateOrderPassenger[] = transaction.passengers.map(
            (passenger: any) => passenger
          );

          const order = (
            await duffel.orders.create({
              passengers,
              selected_offers: [where.offerId],
              type: "instant",
              services: transaction.seatServices,
              payments: [
                {
                  amount: transaction.amount,
                  currency: transaction.currency,
                  type: "balance",
                },
              ],
            })
          ).data;

          transaction = await prisma.transaction.update({
            where,
            data: { status: "complete", orderId: order.id },
          });
        }
      }

      return NextResponse.json(
        {
          message: "Order has been created!",
          status: 200,
          result: transaction,
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          result: "Order not found!",
          status: 404,
          message: "Order not found",
        },
        {
          status: 500,
        }
      );
    }
  } catch (error: any) {
    if (where.offerId) await prisma.transaction.delete({ where });

    return NextResponse.json(
      {
        status: 500,
        message:
          error?.errors?.[0]?.title ??
          error?.message ??
          "Something went wront, please try again later",
        result: error,
      },
      {
        status: 500,
      }
    );
  }
};
