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
    id: "celestial-vanilla",
    name: "Celestial Vanilla",
    description: "Madagascar vanilla bean, cultured butter, flecks of Tahitian sea salt.",
    price: 4200,
    image: "/images/celestial-vanilla.svg",
    accent: "from-[#d6b06a55] via-[#f3e6cc22] to-transparent",
  },
  {
    id: "noir-cocoa",
    name: "Noir Cacao",
    description: "70% single-origin cacao layered with smoked caramel and cacao nib crunch.",
    price: 4600,
    image: "/images/noir-cacao.svg",
    accent: "from-[#f3e6cc1a] via-[#d6b06a33] to-transparent",
  },
  {
    id: "amber-pistachio",
    name: "Amber Pistachio",
    description: "Sicilian pistachio praline crowned with candied citrus and honeyed crumble.",
    price: 4800,
    image: "/images/amber-pistachio.svg",
    accent: "from-[#d6b06a44] via-[#f3e6cc33] to-transparent",
  },
  {
    id: "midnight-espresso",
    name: "Midnight Espresso",
    description: "Dark roast espresso ganache with bourbon vanilla cream and cocoa dust.",
    price: 4500,
    image: "/images/midnight-espresso.svg",
    accent: "from-[#f3e6cc19] via-[#d6b06a19] to-transparent",
  },
  {
    id: "starlit-rose",
    name: "Starlit Rose",
    description: "Rose petal shortbread infused with champagne jam and candied petals.",
    price: 5000,
    image: "/images/starlit-rose.svg",
    accent: "from-[#d6b06a40] via-[#f3e6cc4d] to-transparent",
  },
];

export type CartLineItem = Product & { quantity: number };
