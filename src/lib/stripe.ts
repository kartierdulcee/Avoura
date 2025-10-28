import Stripe from "stripe";

const API_VERSION = "2024-10-22" satisfies Stripe.LatestApiVersion;

let stripeClient: Stripe | null = null;

export function getStripeClient() {
  if (stripeClient) {
    return stripeClient;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set.");
  }

  stripeClient = new Stripe(secretKey, { apiVersion: API_VERSION });
  return stripeClient;
}
