import stripe from "./stripe";
import { Stripe } from 'stripe';

export default async function createStripeSession(options: Stripe.Checkout.SessionCreateParams) {
    const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
        mode: 'payment',
        ...options
    });
    return session;
}