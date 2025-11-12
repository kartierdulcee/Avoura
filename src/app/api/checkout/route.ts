import { NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";
import { getProductSelectionById } from "@/lib/products";
import {
  getStripePriceEnvKey,
  getStripePriceId,
} from "@/lib/stripe-prices.server";

type RequestItem = {
  id: string;
  quantity: number;
};

export async function POST(request: Request) {
  let items: RequestItem[];

  try {
    const body = await request.json();
    items = (body.items ?? []) as RequestItem[];
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "No items provided." }, { status: 400 });
  }

  const origin =
    request.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "";

  try {
    const lineItems = items.map((item) => {
      const selection = getProductSelectionById(item.id);
      if (!selection) {
        throw new Error(`Unknown item "${item.id}".`);
      }

      const quantityNumber = Number(item.quantity ?? 0);
      const quantity =
        Number.isFinite(quantityNumber) && quantityNumber > 0
          ? Math.floor(quantityNumber)
          : 0;

      if (quantity === 0) {
        throw new Error(`Invalid quantity for "${selection.name}".`);
      }

      const priceId = getStripePriceId(selection.id);
      if (!priceId) {
        const envKey = getStripePriceEnvKey(selection.id);
        throw new Error(
          `Missing Stripe Price ID for "${selection.name}". Set ${envKey} in your environment.`
        );
      }

      return {
        price: priceId,
        quantity,
      };
    });

    if (lineItems.length === 0) {
      throw new Error("No valid line items provided.");
    }

    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "pay",
      currency: "usd",
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      automatic_tax: { enabled: false },
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      line_items: lineItems,
      success_url: origin
        ? `${origin}/?checkout=success`
        : "https://auvora.com?checkout=success",
      cancel_url: origin
        ? `${origin}/?checkout=canceled`
        : "https://auvora.com?checkout=canceled",
    });

    if (!session.url) {
      throw new Error("Session did not return a redirect URL.");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create checkout session.",
      },
      { status: 500 }
    );
  }
}
