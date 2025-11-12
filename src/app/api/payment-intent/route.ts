import { NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";
import { getProductSelectionById } from "@/lib/products";

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

  const amount = items.reduce((total, item) => {
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
    return total + quantity * selection.price;
  }, 0);

  if (amount === 0) {
    return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
  }

  try {
    const stripe = getStripeClient();
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        source: "auvora-web",
      },
    });

    if (!paymentIntent.client_secret) {
      throw new Error("Payment intent missing client_secret.");
    }

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create payment intent.",
      },
      { status: 500 }
    );
  }
}
