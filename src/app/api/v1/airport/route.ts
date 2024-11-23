import { NextRequest, NextResponse } from "next/server";
import { duffel } from "@/lib/duffel";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("query");

    let payload: any = {
      // limit: parseInt(process.env.NEXT_PAGINATION_LIMIT as string),
    };

    if (query) {
      payload.query = query;
    }

    const airports = await duffel.suggestions.list(payload);

    const filteredAirports = airports.data;

    return NextResponse.json(
      {
        status: 200,
        message: "success",
        result: filteredAirports,
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
};
