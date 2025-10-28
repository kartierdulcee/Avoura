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
    accent: "from-[#ff4fa240] via-[#ffffff33] to-transparent",
  },
  {
    id: "noir-cocoa",
    name: "Noir Cacao",
    description: "70% single-origin cacao layered with smoked caramel and cacao nib crunch.",
    price: 4600,
    image: "/images/noir-cacao.svg",
    accent: "from-[#ff4fa225] via-[#fce8d830] to-transparent",
  },
  {
    id: "amber-pistachio",
    name: "Amber Pistachio",
    description: "Sicilian pistachio praline crowned with candied citrus and honeyed crumble.",
    price: 4800,
    image: "/images/amber-pistachio.svg",
    accent: "from-[#ff4fa235] via-[#ffffff26] to-transparent",
  },
  {
    id: "midnight-espresso",
    name: "Midnight Espresso",
    description: "Dark roast espresso ganache with bourbon vanilla cream and cocoa dust.",
    price: 4500,
    image: "/images/midnight-espresso.svg",
    accent: "from-[#ff4fa218] via-[#fce8d820] to-transparent",
  },
  {
    id: "starlit-rose",
    name: "Starlit Rose",
    description: "Rose petal shortbread infused with champagne jam and candied petals.",
    price: 5000,
    image: "/images/starlit-rose.svg",
    accent: "from-[#ff4fa240] via-[#ffffff40] to-transparent",
  },
];

export type CartLineItem = Product & { quantity: number };
