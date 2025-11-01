"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { CSSProperties } from "react";

const gradientStyles: CSSProperties = {
  background:
    "radial-gradient(45% 60% at 50% 35%, rgba(255, 79, 162, 0.22), transparent 70%), radial-gradient(45% 65% at 30% 65%, rgba(255, 255, 255, 0.18), transparent 75%), radial-gradient(35% 45% at 70% 70%, rgba(255, 79, 162, 0.15), transparent 75%)",
};

const rise = { opacity: 0, y: 30 };
const riseVisible = { opacity: 1, y: 0 };

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-32 text-foreground sm:px-12"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80 blur-3xl"
        style={gradientStyles}
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 2, -1, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 flex max-w-3xl flex-col items-center gap-10 text-center">
        <motion.span
          className="accent-text text-sm tracking-[0.6em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          A U V O R A
        </motion.span>

        <motion.h1
          className="font-serif text-4xl leading-tight tracking-tight sm:text-6xl sm:leading-tight"
          initial={rise}
          animate={riseVisible}
          transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Gluten-Free Cookies, Elevated.
        </motion.h1>

        <motion.p
          className="max-w-xl text-balance text-base text-foreground/80 sm:text-lg"
          initial={rise}
          animate={riseVisible}
          transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Auvora bakes small-batch Walnut Raisin, Oatmeal Raisin, and Chocolate
          Chip cookies—each available gluten-free or vegan and couriered across
          Detroit with care.
        </motion.p>

        <motion.div
          className="flex flex-col gap-6 sm:flex-row sm:items-center"
          initial={rise}
          animate={riseVisible}
          transition={{ delay: 1.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="#collection"
            className="group inline-flex items-center justify-center rounded-full border border-transparent bg-accent px-10 py-3 text-sm font-medium uppercase tracking-[0.4em] text-surface transition hover:bg-foreground hover:text-surface"
          >
            Taste the Collection
            <span className="ml-3 block h-[1px] w-12 origin-left scale-x-50 bg-surface/80 transition group-hover:scale-x-100 group-hover:bg-surface" />
          </Link>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.4em] text-foreground/50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          <span>Crafted for slow savoring</span>
          <span className="inline-flex h-12 w-[1px] bg-foreground/30" />
        </motion.div>
      </div>
    </section>
  );
}
