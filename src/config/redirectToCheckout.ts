import getStripe from "./getStripe";

export default async function redirectToCheckout(sessionId: string) {
    const stripe = await getStripe();
    if (stripe) stripe.redirectToCheckout({ sessionId });
}