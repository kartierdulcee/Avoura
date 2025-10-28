import { NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";

type RequestItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
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

  const origin = request.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "";

  try {
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
      line_items: items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: item.price,
          product_data: {
            name: item.name,
            metadata: {
              id: item.id,
            },
          },
        },
      })),
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
