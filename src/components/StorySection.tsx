"use client";

import { motion } from "framer-motion";

export function StorySection() {
  return (
    <section
      id="story"
      className="relative overflow-hidden bg-background px-6 py-24 sm:px-12 lg:px-24"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#ff4fa220] via-transparent to-[#ffffff70] opacity-80"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.9 }}
        transition={{ duration: 1.6 }}
        viewport={{ once: true }}
      />

      <div className="relative mx-auto max-w-3xl text-center md:text-left">
        <motion.p
          className="text-xs uppercase tracking-[0.4em] text-foreground/40"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.6 }}
        >
          The Auvora Story
        </motion.p>

        <motion.h3
          className="mt-8 font-serif text-3xl leading-relaxed text-foreground sm:text-4xl"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.6 }}
        >
          Handcrafted indulgence from Auvora Bakery. Every bite, a moment. We
          source butter churned within 24 hours, rare cacao, and hand-picked
          botanicals to build layers of texture that bloom with each pause.
        </motion.h3>

        <motion.p
          className="mt-6 text-sm leading-7 text-foreground/70 sm:text-base"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.6 }}
        >
          Each batch rests for twenty-four hours to deepen flavor, baked at
          dawn, and boxed in satin-lined keepsakes. Auvora is a celebration of
          intentional pace - crafted to be savored, never rushed.
        </motion.p>
      </div>
    </section>
  );
}
