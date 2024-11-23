import { NextRequest, NextResponse } from "next/server";
import { duffel } from "@/lib/duffel";

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const body = await req.json();

        const payment = await duffel.payments.create(body);

        return NextResponse.json(
            {
                status: 200,
                message: "success",
                result: payment,
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
