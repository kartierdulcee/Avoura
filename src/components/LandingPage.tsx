"use client";

import { useCallback, useState } from "react";
import type { CartLineItem, ProductSelection } from "@/lib/products";
import { Hero } from "./Hero";
import { ProductShowcase } from "./ProductShowcase";
import { CheckoutSection } from "./CheckoutSection";
import { DetailsSection } from "./DetailsSection";
import { StorySection } from "./StorySection";
import { SiteFooter } from "./SiteFooter";

export function LandingPage() {
  const [cartItems, setCartItems] = useState<CartLineItem[]>([]);

  const handleAddToCart = useCallback((product: ProductSelection) => {
    setCartItems((previous) => {
      const existing = previous.find((item) => item.id === product.id);
      if (existing) {
        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...previous, { ...product, quantity: 1 }];
    });
  }, []);

  const handleClearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  return (
    <>
      <Hero />
      <ProductShowcase onAdd={handleAddToCart} />
      <CheckoutSection items={cartItems} onClear={handleClearCart} />
      <DetailsSection />
      <StorySection />
      <SiteFooter />
    </>
  );
}
