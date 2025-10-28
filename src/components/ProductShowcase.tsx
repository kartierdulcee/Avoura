"use client";

import { motion } from "framer-motion";
import { products } from "@/lib/products";
import { ProductCard } from "./ProductCard";

type ProductShowcaseProps = {
  onAdd: (product: Product) => void;
};

export function ProductShowcase({ onAdd }: ProductShowcaseProps) {
  return (
    <section
      id="collection"
      className="relative flex flex-col gap-14 bg-background px-6 pb-24 pt-12 sm:px-12 lg:px-24"
    >
      <motion.header
        className="mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs uppercase tracking-[0.5em] text-foreground/40">
          Signature Collection
        </p>
        <h2 className="mt-6 font-serif text-3xl tracking-tight text-foreground sm:text-5xl">
          A tasting flight of five couture cookies.
        </h2>
        <p className="mt-4 text-sm leading-7 text-foreground/65 sm:text-base">
          Hand-batched in limited runs, each profile honours a distinct moment:
          dusk-lit terraces, midnight lounges, candlelit celebrations.
        </p>
      </motion.header>

      <motion.div
        className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            onAdd={onAdd}
          />
        ))}
      </motion.div>
    </section>
  );
}
