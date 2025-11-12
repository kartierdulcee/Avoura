export type ProductVariantId = "gluten-free" | "vegan-gluten-free";

export type ProductSizeId = "box-3" | "box-6" | "box-12" | "tray-24";

export type ProductVariant = {
  id: ProductVariantId;
  label: string;
  priceBySize: Record<ProductSizeId, number>;
};

export type ProductSize = {
  id: ProductSizeId;
  label: string;
  description: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  accent: string;
};

export type ProductSelection = {
  id: string;
  name: string;
  description: string;
  price: number; // price in cents
  image: string;
  accent: string;
  productId: string;
  productName: string;
  variantId: ProductVariantId;
  variantLabel: string;
  sizeId: ProductSizeId;
  sizeLabel: string;
};

export type CartLineItem = ProductSelection & { quantity: number };

export const productVariants: ProductVariant[] = [
  {
    id: "gluten-free",
    label: "Gluten Free",
    priceBySize: {
      "box-3": 800,
      "box-6": 1600,
      "box-12": 3200,
      "tray-24": 6400,
    },
  },
  {
    id: "vegan-gluten-free",
    label: "Vegan Gluten Free",
    priceBySize: {
      "box-3": 900,
      "box-6": 1800,
      "box-12": 3600,
      "tray-24": 7200,
    },
  },
];

export const productSizes: ProductSize[] = [
  {
    id: "box-3",
    label: "Box of 3",
    description: "A tasting flight of three cookies.",
  },
  {
    id: "box-6",
    label: "Box of 6",
    description: "Shareable half dozen with room for seconds.",
  },
  {
    id: "box-12",
    label: "Box of 12",
    description: "A dozen for gifting or office spoils.",
  },
  {
    id: "tray-24",
    label: "Party Tray of 24",
    description: "Crowd ready platter for gatherings.",
  },
];

export const products: Product[] = [
  {
    id: "walnut-raisin",
    name: "Walnut Raisin",
    description:
      "Caramelized walnuts and sun dried raisins folded into our signature chewy base.",
    image: "/images/celestial-vanilla.svg",
    accent: "from-[#ff4fa240] via-[#ffffff33] to-transparent",
  },
  {
    id: "oatmeal-raisin",
    name: "Oatmeal Raisin",
    description:
      "Toasted oats, brown butter, and golden raisins with a whisper of Saigon cinnamon.",
    image: "/images/noir-cacao.svg",
    accent: "from-[#ff4fa225] via-[#fce8d830] to-transparent",
  },
  {
    id: "chocolate-chip",
    name: "Chocolate Chip",
    description:
      "Single origin dark chocolate shards swimming in vanilla scented dough.",
    image: "/images/amber-pistachio.svg",
    accent: "from-[#ff4fa235] via-[#ffffff26] to-transparent",
  },
];

export function buildProductSelection(
  product: Product,
  variantId: ProductVariantId,
  sizeId: ProductSizeId
): ProductSelection {
  const variant = productVariants.find((entry) => entry.id === variantId);
  const size = productSizes.find((entry) => entry.id === sizeId);

  if (!variant || !size) {
    throw new Error("Invalid variant or size selection.");
  }

  const price = variant.priceBySize[sizeId];

  return {
    id: `${product.id}-${variantId}-${sizeId}`,
    name: `${product.name} · ${variant.label} · ${size.label}`,
    description: product.description,
    price,
    image: product.image,
    accent: product.accent,
    productId: product.id,
    productName: product.name,
    variantId,
    variantLabel: variant.label,
    sizeId,
    sizeLabel: size.label,
  };
}

let selectionCache: Map<string, ProductSelection> | null = null;

function buildSelectionCache() {
  const cache = new Map<string, ProductSelection>();
  for (const product of products) {
    for (const variant of productVariants) {
      for (const size of productSizes) {
        const selection = buildProductSelection(product, variant.id, size.id);
        cache.set(selection.id, selection);
      }
    }
  }
  return cache;
}

export function getProductSelectionById(
  selectionId: string
): ProductSelection | undefined {
  if (!selectionCache) {
    selectionCache = buildSelectionCache();
  }
  return selectionCache.get(selectionId);
}
