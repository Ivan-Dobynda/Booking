import { NextResponse } from "next/server";
import { duffel } from "@/lib/duffel";

export const GET = async (
    req: Request,
    context: { params: { offer_id: string } }
) => {
    try {
        const seatMap = await duffel.seatMaps.get({ offer_id: context.params.offer_id });

        return NextResponse.json(
            {
                status: 200,
                message: "success",
                result: seatMap,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
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