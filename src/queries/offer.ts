import commission from "@/constants/commission";
import { duffel } from "@/lib/duffel";
import Stripe from "stripe";

interface Offer {
    id: string,
    seats?: { id: string, quantity: number }[],
}

export default async function getAmount({ id, seats }: Offer) {
    const offer = (await duffel.offers.get(id)).data;
    if (new Date() > new Date(offer.expires_at)) throw Error(`Offer has been expired`, { cause: 410 });
    let total_amount = +offer.total_amount;
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
        {
            price_data: {
                currency: offer.base_currency,
                product_data: {
                    name: 'Flight'
                },
                unit_amount: +(+offer.total_amount * 100 * commission).toFixed(),
            },
            quantity: 1
        }
    ];
    if (seats && seats.length > 0) {
        const services = new Map(offer.available_services.map(service => [service.id, service]));
        for (let seat of seats) {
            const service = services.get(seat.id);
            if (!service) throw Error(`Service ${seat.id} not found`);
            if (seat.quantity > service.maximum_quantity) throw Error(`Quantity for service ${service.id} exceeds maximum limit`, { cause: 422 })
            line_items.push({
                price_data: {
                    currency: offer.base_currency,
                    product_data: {
                        // @ts-ignore
                        name: 'Seat ' + service.metadata.designator
                    },
                    unit_amount: +(+service.total_amount * 100).toFixed(),
                },
                quantity: +seat.quantity
            })
            total_amount += (+seat.quantity) * (+service.total_amount);
        }
    }

    return { total_amount: total_amount, currency: offer.base_currency, expires_at: offer.expires_at, line_items, offer_amount: +offer.total_amount, owner_name: offer.owner.name }
}