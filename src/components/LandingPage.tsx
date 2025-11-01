"use client";

import { useCallback, useState } from "react";
import type { CartLineItem, Product } from "@/lib/products";
import { Hero } from "./Hero";
import { ProductShowcase } from "./ProductShowcase";
import { CheckoutSection } from "./CheckoutSection";
import { DetailsSection } from "./DetailsSection";
import { StorySection } from "./StorySection";
import { SiteFooter } from "./SiteFooter";

export function LandingPage() {
  const [items, setItems] = useState<CartLineItem[]>([]);

  const handleAddToCart = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, 5) }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <>
      <Hero />
      <ProductShowcase onAdd={handleAddToCart} />
      <DetailsSection />
      <CheckoutSection items={items} onClear={clearCart} />
      <StorySection />
      <SiteFooter />
    </>
  );
}
