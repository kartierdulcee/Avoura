import { NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";

const BASE_PRODUCT_PRICE = 10_00;
const SHIPPING_INSIDE_LIST_PRICE = 1_00;
const SHIPPING_OUTSIDE_LIST_PRICE = 2_00;
const DISCOUNTED_ZIPS = ["0000", "0000", "0000", "000"] satisfies readonly string[]; // Replace with real ZIP codes.

export async function POST(request: Request) {
  let zip: string | undefined;

  try {
    const body = await request.json();
    zip = typeof body?.zip === "string" ? body.zip.trim() : undefined;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!zip) {
    return NextResponse.json({ error: "ZIP code is required." }, { status: 400 });
  }

  const shippingCost = DISCOUNTED_ZIPS.includes(zip)
    ? SHIPPING_INSIDE_LIST_PRICE
    : SHIPPING_OUTSIDE_LIST_PRICE;

  try {
    const stripe = getStripeClient();
    const origin =
      request.headers.get("origin") ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      "http://localhost:4242";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      billing_address_collection: "auto",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: BASE_PRODUCT_PRICE,
            product_data: { name: "Sample Product" },
          },
        },
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: shippingCost,
            product_data: {
              name: "Shipping",
              metadata: { zip },
            },
          },
        },
      ],
      success_url: `${origin}/?checkout=success`,
      cancel_url: `${origin}/?checkout=canceled`,
    });

    if (!session.url) {
      throw new Error("No Checkout URL returned.");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to create Checkout session.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
