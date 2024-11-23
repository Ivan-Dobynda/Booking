import { NextRequest, NextResponse } from "next/server";
import { duffel } from "@/lib/duffel";
import { prisma } from "@/lib/prisma";


export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const body = await req.json();
        const order = await duffel.orders.create({ passengers: body.passengers, selected_offers: body.selected_offers, type: 'pay_later' });
        if (order?.data) {
            const booking = await prisma.booking.create({
                data: {
                    orderId: order?.data?.id,
                    userId: body.user_id,
                    airlineName: order?.data?.owner?.name,
                    amount: Number(order?.data?.total_amount),
                    currency: order?.data?.total_currency
                }
            });
        }

        return NextResponse.json(
            {
                status: 200,
                message: "success",
                result: order?.data
            },
            {
                status: 200,
            }
        );
    }
    catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                status: 500,
                message: "error",
                result: error,
            },
            {
                status: 500,
            }
        );
    }
}