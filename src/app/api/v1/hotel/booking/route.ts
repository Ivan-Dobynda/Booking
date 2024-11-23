import { NextRequest, NextResponse } from "next/server";
import { sha256 } from "js-sha256";
import { prisma } from "@/lib/prisma";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  const { firstName, lastName, user_id, rooms, clientReference, paymentData } =
    body;

  try {
    let apiKey = "c08649ffaaae5c256bbdc0c539bb6bcc";
    let secret = "d65b721785";
    let timestamp = Math.floor(Date.now() / 1000);
    var signature = sha256(apiKey + secret + timestamp);

    let endpoint = "https://api.test.hotelbeds.com/hotel-api/1.2/bookings";

    var bookingData = {
      holder: {
        name: firstName,
        surname: lastName,
      },
      rooms: rooms,
      clientReference: clientReference,
      paymentData: paymentData,
    };

    if (paymentData) {
      bookingData.paymentData = paymentData;
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-key": "c08649ffaaae5c256bbdc0c539bb6bcc",
        "X-Signature": signature,
        Accept: "*/*",
        "Accept-Encoding": "gzip",
      },
      body: JSON.stringify(bookingData),
      cache: "no-store",
    });

    const result = await response.json();

    if (result?.booking) {
      const booking = await prisma.hotelBooking.create({
        data: {
          bookingReference: result?.booking?.reference,
          userId: user_id,
          hotelName: result?.booking?.hotel?.name,
          hotelCode: result?.booking?.hotel?.code,
          amount: Number(result?.booking?.hotel?.totalNet),
          currency: result?.booking?.hotel?.currency,
          clientReference: result?.clientReference,
        },
      });
    }

    return NextResponse.json(
      {
        status: 200,
        message: "success",
        result: result,
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
