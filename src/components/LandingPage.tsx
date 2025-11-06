"use client";

import { useCallback } from "react";
import type { ProductSelection } from "@/lib/products";
import { Hero } from "./Hero";
import { ProductShowcase } from "./ProductShowcase";
import { DetailsSection } from "./DetailsSection";
import { StorySection } from "./StorySection";
import { SiteFooter } from "./SiteFooter";

export function LandingPage() {
  const handleAddToCart = useCallback((product: ProductSelection) => {
    // No checkout flow for now; selection hooks remain for future cart experiences.
    void product;
  }, []);

  return (
    <>
      <Hero />
      <ProductShowcase onAdd={handleAddToCart} />
      <DetailsSection />
      <StorySection />
      <SiteFooter />
    </>
  );
}
