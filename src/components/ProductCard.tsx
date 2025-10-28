"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatCurrency } from "@/lib/currency";
import type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  index: number;
  onAdd: (product: Product) => void;
};

export function ProductCard({ product, index, onAdd }: ProductCardProps) {
  const [justAdded, setJustAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAdd = () => {
    onAdd(product);
    setJustAdded(true);
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setJustAdded(false);
      timeoutRef.current = null;
    }, 1400);
  };

  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-[32px] border border-muted/40 bg-surface shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        delay: index * 0.08,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        className={`relative aspect-square w-full overflow-hidden bg-gradient-to-br ${product.accent}`}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0.45, scale: 0.95 }}
          whileInView={{ opacity: 0.75, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.04, duration: 1.5 }}
        />
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 360px, (min-width: 768px) 33vw, 80vw"
          className="object-cover object-center mix-blend-lighten"
          priority={index === 0}
        />
      </div>

      <div className="flex flex-1 flex-col gap-6 px-8 pb-8 pt-7">
        <div className="space-y-2 text-left">
          <h3 className="font-serif text-2xl tracking-tight text-foreground">
            {product.name}
          </h3>
          <p className="text-sm leading-6 text-foreground/70">
            {product.description}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-sans text-sm uppercase tracking-[0.35em] text-foreground/60">
            {formatCurrency(product.price)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            className="group relative inline-flex items-center gap-3 rounded-full border border-transparent bg-accent px-5 py-2 text-xs uppercase tracking-[0.4em] text-surface transition hover:bg-foreground hover:text-surface"
          >
            {justAdded ? "Added" : "Add to Cart"}
            <span className="block h-[1px] w-6 bg-surface/70 transition group-hover:w-8 group-hover:bg-surface" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
