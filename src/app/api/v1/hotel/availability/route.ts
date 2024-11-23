import { NextRequest, NextResponse } from "next/server"
import { sha256 } from 'js-sha256';

// Interface
interface SearchParams {
    stay: {
        checkIn?: string
        checkOut?: string
    }
    occupancies: [{
        rooms?: number;
        adults?: number;
        children?: number;
    }]
    destination: {
        code?: string
    }
}

export const POST = async (req: NextRequest, res: NextResponse) => {
    const body = await req.json()

    console.log('bodyyyyy', body)
    const { checkIn, checkOut, rooms, adults, children, hotels, destinationCode, geolocation } = body
    try {
        let apiKey = "c08649ffaaae5c256bbdc0c539bb6bcc";
        let secret = "d65b721785"
        let timestamp = Math.floor(Date.now() / 1000);
        var signature = sha256(apiKey + secret + timestamp);

        let endpoint = "https://api.test.hotelbeds.com/hotel-api/1.0/hotels"


        // let data = {
        //     "stay": {
        //         "checkIn": "2024-01-15",
        //         "checkOut": "2024-01-20"
        //     },
        //     "occupancies": [{
        //         "rooms": 1,
        //         "adults": 2,
        //         "children": 0,
        //     }],
        //     "destination": {
        //         "code": "PMI"
        //     }
        // }
        // let data = {
        //     "stay": {
        //         "checkIn": "2024-01-15",
        //         "checkOut": "2024-01-16"
        //     },
        //     "occupancies": [
        //         {
        //             "rooms": 1,
        //             "adults": 2,
        //             "children": 0
        //         }
        //     ],
        //     "hotels": {
        //         "hotel": [
        //             1533
        //         ]
        //     }
        // }
        let availabilityData = {
            stay: {
                checkIn: checkIn,
                checkOut: checkOut
            },
            occupancies: [
                {
                    "rooms": rooms,
                    "adults": adults,
                    "children": children,
                }
            ],
        }

        if (hotels) {
            Object.assign(availabilityData, {hotels: {
                hotel: hotels
            }});
        }
        if (destinationCode) {
            Object.assign(availabilityData, {destination: {
                code: destinationCode
            }});
        }
        if (geolocation) {
            Object.assign(availabilityData, {geolocation: {
                latitude: geolocation.latitude,
                longitude: geolocation.longitude,
                secondaryLatitude:geolocation.secondaryLatitude,
                secondaryLongitude:geolocation.secondaryLongitude
            }});
        }
        // let availabilityData = {
        //     "stay": {
        //         "checkIn": checkIn,
        //         "checkOut": checkOut
        //     },
        //     "occupancies": [
        //         {
        //             "rooms": rooms,
        //             "adults": adults,
        //             "children": children,
        //         }
        //     ],
        //     "hotels": {
        //         "hotel": [
        //             hotelCode,
        //         ]
        //     }
        // }
        console.log("availabilityDatataa", availabilityData)
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Api-key": "c08649ffaaae5c256bbdc0c539bb6bcc",
                "X-Signature": signature,
                "Accept": "*/*",
                "Accept-Encoding": "gzip"
            },
            body: JSON.stringify(availabilityData),
            cache: 'no-store'
        });
        // var raw =
        // //  "{\n	\"stay\": {\n		\"checkIn\": \"2018-11-15\",\n		\"checkOut\": \"2018-11-16\"\n	},\n	\"occupancies\": [{\n		\"rooms\": 1,\n        \"adults\": 2,\n		\"children\": 0,\n	}],\n	\"destination\": {\n		\"code\": \"MCO\",\n		\"zone\": 1\n	}\n}";
        // {
        //     "stay": {
        //         "checkIn": "2024-01-17",
        //         "checkOut": "2024-01-20"
        //     },
        //     "occupancies": [{
        //         "rooms": 1,
        //         "adults": 2,
        //         "children": 0,
        //     }],
        //     "destination": {
        //         "code": "MCO",
        //         "zone": 1
        //     },


        // "geolocation": {
        //     "latitude": 43.378126,
        //     "longitude": -5.898018,
        //     "secondaryLatitude": 43.344487,
        //     "secondaryLongitude": -5.814223
        // },


        // "hotels": {
        //     "hotel": [
        //        hotelCode,
        //     ]
        // }
        // }

        const result = await response.json();
        console.log("result", result)

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
        console.log('error', error);
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
