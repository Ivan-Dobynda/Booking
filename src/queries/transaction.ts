import createStripeSession from "@/config/createStripeSession";
import { duffel } from "@/lib/duffel";
import { prisma } from "@/lib/prisma";
import { Passenger, Seat } from "@prisma/client";

interface CreateTypes {
    total_amount: number;
    currency: string;
    expires_at: string;
    seat_prices: {
        price: number;
        quantity: number;
        name: string
    }[];
    offer_amount: number;
    passengers: Passenger[],
    selected_offers: string[],
    seats: Seat[],
    user_id?: string
}

export async function create(data: CreateTypes) {
    const line_items = data.seat_prices.map(seat_price => ({
        price_data: {
            currency: data.currency,
            product_data: {
                name: `Seat ${seat_price.name}`,
            },
            unit_amount: seat_price.price * 100,
        },
        quantity: seat_price.quantity,
    }));
    line_items.unshift({
        price_data: {
            currency: data.currency,
            product_data: {
                name: 'Flight'
            },
            unit_amount: data.offer_amount * 100,
        },
        quantity: 1
    })

    const session = await createStripeSession({ line_items })

    const res = (await duffel.paymentIntents.create({
        amount: data.total_amount.toFixed(2),
        currency: data.currency
    })).data;


    const transaction = await prisma.transaction.create({
        data: {
            paid: false,
            paymentId: res.id,
            amount: res.amount,
            client_token: res.client_token,
            currency: res.currency,
            // @ts-ignore
            status: res.status || "",
            live_mode: false,
            card_country_code: res.card_country_code,
            card_last_four_digits: res.card_country_code,
            card_network: res.card_network,
            confirmed_at: res.confirmed_at,
            created_at: res.created_at,
            updated_at: res.updated_at,
            fees_currency: res.fees_currency,
            net_currency: res.net_currency,
            user_id: data.user_id,
            expires_at: data.expires_at,
            passengers: {
                create: data.passengers
            },
            selected_offers: data.selected_offers,
            seatServices: {
                create: data.seats
            },
            session
        }
    })

    return transaction;
} 