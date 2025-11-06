"use client";

import { motion } from "framer-motion";

const deliveryRates = [
  { area: "Pickup (by appointment)", price: "Free" },
  {
    area: "Detroit Core (Downtown, Midtown, North End, Boston Edison)",
    price: "$1",
  },
  {
    area: "Detroit neighborhoods beyond the core",
    price: "$2",
  },
];

const glutenFreeIngredients = [
  "Gluten-free almond flour",
  "Gluten-free chickpea flour",
  "Brown sugar",
  "Cane sugar",
  "Butter",
  "Real vanilla flavor",
  "Baking powder",
  "Baking soda",
];

const veganIngredients = [
  "Gluten-free almond flour",
  "Gluten-free chickpea flour",
  "Brown sugar",
  "Cane sugar",
  "Plant-based butter",
  "Real vanilla flavor",
  "Psyllium husk",
  "Baking powder",
  "Baking soda",
];

const rise = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function DetailsSection() {
  return (
    <section
      id="details"
      className="relative bg-surface px-6 py-24 text-foreground sm:px-12 lg:px-24"
    >
      <motion.div
        className="mx-auto flex max-w-5xl flex-col gap-14"
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.12 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.header variants={rise} className="text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.4em] text-foreground/45">
            Flavor & Ingredient Guide
          </p>
          <h2 className="mt-6 font-serif text-3xl tracking-tight sm:text-4xl">
            Walnut Raisin, Oatmeal Raisin, and Chocolate Chip.
          </h2>
          <p className="mt-4 text-sm leading-7 text-foreground/70 sm:text-base">
            Every batch starts with a small-batch gluten-free base. Select
            classic butter or plant-based butter so both traditional and vegan
            cookie lovers can enjoy the same trio of cookies.
          </p>
        </motion.header>

        <div className="grid gap-10 md:grid-cols-2">
          <motion.div
            variants={rise}
            className="rounded-[28px] border border-muted/60 bg-background/50 p-8"
          >
            <h3 className="font-serif text-2xl tracking-tight">
              Gluten-Free Cookie Base
            </h3>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-foreground/70">
              {glutenFreeIngredients.map((ingredient) => (
                <li key={ingredient} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent/80" />
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={rise}
            className="rounded-[28px] border border-muted/60 bg-background/50 p-8"
          >
            <h3 className="font-serif text-2xl tracking-tight">
              Gluten-Free + Vegan Cookie Base
            </h3>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-foreground/70">
              {veganIngredients.map((ingredient) => (
                <li key={ingredient} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent/80" />
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={rise}
          className="rounded-[28px] border border-muted/60 bg-background/50 p-8"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="font-serif text-2xl tracking-tight">
                Local delivery, two-hour target.
              </h3>
              <p className="mt-3 text-sm leading-6 text-foreground/70">
                Standard orders typically arrive within two hours of ordering.
                Party trays are delivered within six hours so every cookie stays
                fresh at your door, and pickup is always complimentary.
              </p>
            </div>
            <div className="flex-1">
              <ul className="space-y-3 text-sm leading-6 text-foreground/75">
                {deliveryRates.map((option) => (
                  <li
                    key={option.area}
                    className="flex flex-col gap-0.5 md:flex-row md:items-center md:justify-between"
                  >
                    <span className="uppercase tracking-[0.2em] text-foreground/60">
                      {option.area}
                    </span>
                    <span className="font-medium text-foreground">
                      {option.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
