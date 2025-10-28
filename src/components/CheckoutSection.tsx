"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  loadStripe,
  type PaymentRequestPaymentMethodEvent,
  type PaymentRequest as StripePaymentRequest,
  type Stripe,
} from "@stripe/stripe-js";
import {
  Elements,
  PaymentRequestButtonElement,
  useStripe,
} from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/currency";
import type { CartLineItem } from "@/lib/products";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

const stripePromise: Promise<Stripe | null> | null = publishableKey
  ? loadStripe(publishableKey)
  : null;

type CheckoutSectionProps = {
  items: CartLineItem[];
  onClear: () => void;
};

type PaymentRequestButtonProps = {
  items: CartLineItem[];
  amount: number;
  onSuccess: () => void;
  disabled: boolean;
  setStatus: (status: string | null) => void;
};

function PaymentRequestButtonInner({
  items,
  amount,
  onSuccess,
  disabled,
  setStatus,
}: PaymentRequestButtonProps) {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState<StripePaymentRequest | null>(null);

  const lineItems = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    [items]
  );

  useEffect(() => {
    // Provision a Payment Request button once Stripe is ready and the cart has a total.
    if (!stripe || !amount) {
      setPaymentRequest(null);
      return;
    }

    const pr = stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        label: "Auvora Cookies",
        amount,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
      } else {
        setPaymentRequest(null);
      }
    });

    const handlePaymentMethod = async (
      event: PaymentRequestPaymentMethodEvent
    ) => {
      try {
        setStatus("Processing payment...");
        const response = await fetch("/api/payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: lineItems }),
        });

        if (!response.ok) {
          throw new Error("Unable to start payment.");
        }

        const { clientSecret } = (await response.json()) as {
          clientSecret: string;
        };

        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: event.paymentMethod.id,
          },
          {
            handleActions: false,
          }
        );

        if (error) {
          event.complete("fail");
          setStatus(error.message ?? "Payment failed. Please try again.");
          return;
        }

        event.complete("success");

        if (paymentIntent && paymentIntent.status === "requires_action") {
          const { error: confirmError } = await stripe.confirmCardPayment(
            clientSecret
          );
          if (confirmError) {
            setStatus(confirmError.message ?? "Additional authentication failed");
            return;
          }
        }

        setStatus("Payment complete. Confirmation emailed.");
        onSuccess();
      } catch (error) {
        event.complete("fail");
        setStatus(
          error instanceof Error
            ? error.message
            : "We could not complete the payment."
        );
      }
    };

    pr.on("paymentmethod", handlePaymentMethod);

    return () => {
      pr.off("paymentmethod", handlePaymentMethod);
    };
  }, [stripe, amount, lineItems, onSuccess, setStatus]);

  if (!stripe || !paymentRequest) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-full border border-foreground/10 bg-foreground/5">
      <PaymentRequestButtonElement
        options={{
          paymentRequest,
          style: {
            paymentRequestButton: {
              type: "buy",
              theme: "dark",
              height: "48px",
              borderRadius: "9999px",
            },
          },
        }}
        disabled={disabled}
      />
    </div>
  );
}

const PaymentRequestButton = (props: PaymentRequestButtonProps) => {
  if (!stripePromise) {
    return (
      <div className="rounded-3xl border border-dashed border-foreground/20 px-6 py-4 text-center text-xs text-foreground/45">
        Add your Stripe publishable key to enable Tap-to-Pay quick checkout.
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <PaymentRequestButtonInner {...props} />
    </Elements>
  );
};

export function CheckoutSection({ items, onClear }: CheckoutSectionProps) {
  const amount = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStatus(null);
  }, [items]);

  const createCheckoutSession = useCallback(async () => {
    try {
      setLoading(true);
      setStatus("Redirecting to secure checkout...");
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to create checkout session.");
      }

      const { url } = (await response.json()) as { url: string };
      window.location.href = url;
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Checkout unavailable."
      );
    } finally {
      setLoading(false);
    }
  }, [items]);

  return (
    <section
      id="checkout"
      className="relative bg-background px-6 pb-24 pt-12 sm:px-12 lg:px-24"
    >
      <motion.div
        className="mx-auto flex max-w-4xl flex-col gap-10 rounded-[36px] border border-foreground/10 bg-foreground/5 px-8 py-12 backdrop-blur sm:px-14 sm:py-16"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-foreground/45">
            Checkout
          </p>
          <h3 className="font-serif text-3xl tracking-tight sm:text-4xl">
            Seamless payment, delivered to your door.
          </h3>
          <p className="text-sm leading-7 text-foreground/65 sm:text-base">
            Use Tap-to-Pay on supported devices with Apple Pay or Google Pay, or
            transition to our hosted Stripe checkout for alternate methods. Your
            cart is reserved for ten minutes.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-foreground/15 p-8 text-center text-sm text-foreground/50">
              Select a cookie above to begin your tasting experience.
            </div>
          ) : (
            <div className="rounded-3xl border border-foreground/10 bg-background/40 p-6 backdrop-blur">
              <ul className="space-y-4 text-sm text-foreground/80">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between uppercase tracking-[0.25em]"
                  >
                    <span>
                      {item.quantity} × {item.name}
                    </span>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between border-t border-foreground/10 pt-4 font-sans text-sm uppercase tracking-[0.35em] text-foreground/60">
                <span>Order Total</span>
                <span>{formatCurrency(amount)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <PaymentRequestButton
            items={items}
            amount={amount}
            onSuccess={() => {
              onClear();
            }}
            disabled={items.length === 0}
            setStatus={setStatus}
          />

          <button
            type="button"
            onClick={createCheckoutSession}
            disabled={items.length === 0 || loading}
            className="inline-flex items-center justify-center rounded-full border border-foreground/20 bg-foreground/15 px-8 py-3 text-xs uppercase tracking-[0.4em] text-foreground transition hover:border-foreground/40 hover:bg-foreground/25 disabled:cursor-not-allowed disabled:border-foreground/10 disabled:bg-transparent disabled:text-foreground/30"
          >
            {loading ? "Preparing..." : "Open Secure Checkout"}
          </button>

          {status && (
            <p className="text-xs text-foreground/50">{status}</p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
