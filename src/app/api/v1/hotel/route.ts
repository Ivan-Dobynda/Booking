import { NextRequest, NextResponse } from "next/server"
import { sha256 } from 'js-sha256';

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    let config = {
      apiKey: "c08649ffaaae5c256bbdc0c539bb6bcc",
      secret: "d65b721785",
      timestamp: Math.floor(Date.now() / 1000),
    }

    var signature = sha256(config.apiKey + config.secret + config.timestamp);

    // let endpoint = `https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels?fields=name&fields=destinationCode&fields=countryCode&language=ENG&from=1&to=3&useSecondaryLanguage=false`
    let endpoint = `https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels?fields=all&language=ENG&from=1&to=10&useSecondaryLanguage=false`
    
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Api-key": "c08649ffaaae5c256bbdc0c539bb6bcc",
        "X-Signature": signature,
        "Accept": "*/*",
        "Accept-Encoding": "gzip"
      },
      cache: 'no-store'
    });
    

    const result = await response.json();

    return NextResponse.json(
      {
        status: 200,
        message: "success",
        result: result,
      },
      {
        status: 200,
      }
    )
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
    )
  }
}
