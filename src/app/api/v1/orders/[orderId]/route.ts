import { duffel } from "@/lib/duffel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: Request,
    context: { params: { orderId: string } }
  ) => {
    try {
        const booking = await duffel.orders.get(context.params.orderId);

        return NextResponse.json(
            {
                status: 200,
                message: "success",
                result: booking?.data
            },
            {
                status: 200,
            }
        );
    }
    catch (error) {
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
