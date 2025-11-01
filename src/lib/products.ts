export type Product = {
  id: string;
  name: string;
  description: string;
  price: number; // price in cents
  image: string;
  accent: string;
};

export const products: Product[] = [
  {
    id: "gf-box-3",
    name: "Gluten-Free Cookie Box · 3",
    description:
      "Signature Walnut Raisin, Oatmeal Raisin, and Chocolate Chip crafted on our gluten-free base.",
    price: 800,
    image: "/images/celestial-vanilla.svg",
    accent: "from-[#ff4fa240] via-[#ffffff33] to-transparent",
  },
  {
    id: "gf-box-6",
    name: "Gluten-Free Cookie Box · 6",
    description:
      "Two of each gluten-free favorite: Walnut Raisin, Oatmeal Raisin, Chocolate Chip.",
    price: 1600,
    image: "/images/noir-cacao.svg",
    accent: "from-[#ff4fa225] via-[#fce8d830] to-transparent",
  },
  {
    id: "gf-box-12",
    name: "Gluten-Free Cookie Box · 12",
    description:
      "Four of each of our gluten-free trio for gatherings that crave inclusive indulgence.",
    price: 3200,
    image: "/images/amber-pistachio.svg",
    accent: "from-[#ff4fa235] via-[#ffffff26] to-transparent",
  },
  {
    id: "gf-tray-24",
    name: "Gluten-Free Party Tray · 24",
    description:
      "Eight of each gluten-free cookie so every guest can taste all three classics.",
    price: 6400,
    image: "/images/midnight-espresso.svg",
    accent: "from-[#ff4fa218] via-[#fce8d820] to-transparent",
  },
  {
    id: "vegan-box-3",
    name: "Gluten-Free + Vegan Box · 3",
    description:
      "Walnut Raisin, Oatmeal Raisin, and Chocolate Chip made with plant-based butter.",
    price: 900,
    image: "/images/starlit-rose.svg",
    accent: "from-[#ff4fa240] via-[#ffffff40] to-transparent",
  },
  {
    id: "vegan-box-6",
    name: "Gluten-Free + Vegan Box · 6",
    description:
      "Two of each vegan-friendly cookie so no one misses out on dessert.",
    price: 1800,
    image: "/images/celestial-vanilla.svg",
    accent: "from-[#ff4fa240] via-[#ffffff33] to-transparent",
  },
  {
    id: "vegan-box-12",
    name: "Gluten-Free + Vegan Box · 12",
    description:
      "Four of each vegan favorite for thoughtful celebrations and gifting.",
    price: 3600,
    image: "/images/noir-cacao.svg",
    accent: "from-[#ff4fa225] via-[#fce8d830] to-transparent",
  },
  {
    id: "vegan-tray-24",
    name: "Gluten-Free + Vegan Party Tray · 24",
    description:
      "Eight of each plant-based cookie, ready for parties and corporate spreads.",
    price: 7200,
    image: "/images/amber-pistachio.svg",
    accent: "from-[#ff4fa235] via-[#ffffff26] to-transparent",
  },
];

export type CartLineItem = Product & { quantity: number };
