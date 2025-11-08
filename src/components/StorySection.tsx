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
          About Auvora
        </motion.p>

        <motion.h3
          className="mt-8 font-serif text-3xl leading-relaxed text-foreground sm:text-4xl"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.6 }}
        >
          I&rsquo;m a lifelong gluten intolerant girl, 20 year vegetarian, and
          cookie obsessed taste tester.
        </motion.h3>

        <motion.p
          className="mt-6 text-sm leading-7 text-foreground/70 sm:text-base"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.6 }}
        >
          Growing up gluten intolerant, I got used to desserts that looked good
          but tasted like cardboard. Every treat felt more like a trick. After
          years of searching for something actually delicious, I finally said,
          forget this, I&rsquo;ll bake my own.
        </motion.p>
        <motion.p
          className="mt-4 text-sm leading-7 text-foreground/70 sm:text-base"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.6 }}
        >
          Every cookie I make is packed with flavor, texture, and the kind of
          joy that makes you close your eyes and smile.
        </motion.p>
        <motion.p
          className="mt-4 text-sm leading-7 text-foreground/70 sm:text-base"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.6 }}
        >
          I created these cookies because I believe everyone deserves desserts
          that make them feel included, happy, and a little spoiled. This
          isn&rsquo;t just baking, it&rsquo;s me sharing a lifelong piece of who
          I am, one chewy, golden bite at a time.
        </motion.p>
        <motion.p
          className="mt-4 text-sm leading-7 text-foreground/70 sm:text-base"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.6 }}
        >
          Welcome to my gluten free world. Grab a few cookies and stay awhile.
        </motion.p>
      </div>
    </section>
  );
}
