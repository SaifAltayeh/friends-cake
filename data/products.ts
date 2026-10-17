import type { CustomOption, Product } from "@/types/product";

const sizes: CustomOption[] = [
  { id: "6in", label: "6\" · 6–8 slices", priceDelta: 0 },
  { id: "8in", label: "8\" · 10–14 slices", priceDelta: 12 },
  { id: "10in", label: "10\" · 16–22 slices", priceDelta: 24 },
];

const cupcakeSizes: CustomOption[] = [
  { id: "box6", label: "Box of 6", priceDelta: 0 },
  { id: "box12", label: "Box of 12", priceDelta: 16 },
  { id: "box24", label: "Box of 24", priceDelta: 42 },
];

const flavors: CustomOption[] = [
  { id: "vanilla", label: "Madagascar vanilla", priceDelta: 0 },
  { id: "chocolate", label: "Dark chocolate", priceDelta: 2 },
  { id: "pistachio", label: "Pistachio", priceDelta: 4 },
  { id: "lemon", label: "Meyer lemon", priceDelta: 2 },
];

const fillings: CustomOption[] = [
  { id: "vanilla-cream", label: "Vanilla cream", priceDelta: 0 },
  { id: "chocolate-ganache", label: "Chocolate ganache", priceDelta: 3 },
  { id: "raspberry", label: "Raspberry conserve", priceDelta: 3 },
  { id: "pistachio-cream", label: "Pistachio cream", priceDelta: 4 },
];

const exteriors: CustomOption[] = [
  { id: "ivory", label: "Ivory buttercream", priceDelta: 0 },
  { id: "chocolate", label: "Chocolate ganache", priceDelta: 2 },
  { id: "ombre", label: "Cocoa ombré", priceDelta: 6 },
];

const decorations: CustomOption[] = [
  { id: "clean", label: "Clean finish", priceDelta: 0 },
  { id: "berries", label: "Fresh berries", priceDelta: 5 },
  { id: "piped", label: "Piped atelier border", priceDelta: 7 },
];

export const products: Product[] = [
  {
    id: "fc-00",
    slug: "lotus-crumb",
    name: "Lotus Crumb",
    shortDescription: "Lotus biscuit crumb, caramel cream, and an ivory board — the house 3D cake.",
    description:
      "The Friends Cake lotus crumb: caramel cream, biscuit crumb, and a finished ivory board. This is the live 3D model from the homepage, listed as a best seller in the demo catalogue.",
    price: 46,
    category: "signature-cakes",
    images: ["/images/hero/cake-float.png"],
    modelPath: "/models/friends-cake.glb",
    badge: "Best Seller",
    isBestSeller: true,
    availableSizes: sizes,
    availableFlavors: [
      { id: "lotus", label: "Lotus caramel", priceDelta: 0 },
      { id: "vanilla", label: "Madagascar vanilla", priceDelta: 0 },
      { id: "chocolate", label: "Dark chocolate", priceDelta: 2 },
    ],
    fillings,
    availability: "made-to-order",
    servingGuide: "Serves according to selected size.",
    occasions: ["Birthday", "Gathering", "Gifting"],
  },
  {
    id: "fc-birthday",
    slug: "birthday-cake",
    name: "Birthday Cake",
    shortDescription: "A celebration layer with candles, cream, and a festive finish.",
    description:
      "The Friends Cake birthday model — a celebration layer for the table that gathers. Demo product from the live 3D catalogue.",
    price: 44,
    category: "birthday-cakes",
    images: ["/images/products/lemon-layer.jpg"],
    modelPath: "/models/birthday.glb",
    badge: "Best Seller",
    isBestSeller: true,
    availableSizes: sizes,
    availableFlavors: flavors,
    fillings,
    availability: "made-to-order",
    servingGuide: "Serves according to selected size.",
    occasions: ["Birthday", "Celebration"],
  },
  {
    id: "fc-dark-chocolate",
    slug: "dark-chocolate",
    name: "Dark Chocolate",
    shortDescription: "Deep cocoa layers, ganache, and a dark studio finish.",
    description:
      "The Friends Cake dark chocolate model — cocoa, ganache, and a finished board. Demo product from the live 3D catalogue.",
    price: 48,
    category: "signature-cakes",
    images: ["/images/products/chocolate-drip.jpg"],
    modelPath: "/models/dark-chocolate.glb",
    badge: "Best Seller",
    isBestSeller: true,
    availableSizes: sizes,
    availableFlavors: [
      { id: "chocolate", label: "Dark chocolate", priceDelta: 0 },
      { id: "hazelnut", label: "Hazelnut chocolate", priceDelta: 4 },
    ],
    fillings,
    availability: "made-to-order",
    servingGuide: "Serves according to selected size.",
    occasions: ["Dinner", "Birthday", "Gifting"],
  },
  {
    id: "fc-03",
    slug: "atelier-ombre",
    name: "Atelier Ombré",
    shortDescription: "Hand-piped cocoa scales, from deepest ganache to ivory cream.",
    description:
      "The configurable atelier cake. Size, flavour, filling, exterior, and inscription are sample options for this demonstration and should be replaced with confirmed studio capabilities.",
    price: 54,
    category: "custom-cakes",
    images: ["/images/products/red-velvet-card.jpg", "/images/hero/cake-float.png"],
    badge: "Atelier",
    isNew: true,
    customizable: true,
    availableSizes: sizes,
    availableFlavors: flavors,
    fillings,
    exteriors,
    decorations,
    availability: "made-to-order",
    servingGuide: "Made to order. Please allow a requested date in the configurator.",
    occasions: ["Custom", "Celebration", "Birthday"],
  },
  {
    id: "fc-05",
    slug: "mango-glace",
    name: "Mango Glacé",
    shortDescription: "A glazed entremet with strawberry and a cocoa shard.",
    description:
      "A smoother, more architectural signature. The mango glaze and strawberry finish are part of the demo art direction.",
    price: 38,
    category: "signature-cakes",
    images: ["/images/products/lotus-biscoff-card.jpg"],
    badge: "New",
    isNew: true,
    availableSizes: [
      { id: "6in", label: "6\" entremet", priceDelta: 0 },
      { id: "8in", label: "8\" entremet", priceDelta: 10 },
    ],
    availableFlavors: [
      { id: "mango", label: "Mango & vanilla", priceDelta: 0 },
      { id: "passion", label: "Passion fruit", priceDelta: 3 },
    ],
    availability: "made-to-order",
    occasions: ["Dinner", "Gifting"],
  },
  {
    id: "fc-06",
    slug: "blush-cherry",
    name: "Blush Cherry",
    shortDescription: "Ivory frosting, a pink drip, and a confetti hem.",
    description:
      "A birthday cake with a lighter register — cherry, drip, and sprinkles. Demo birthday language.",
    price: 36,
    category: "birthday-cakes",
    images: ["/images/products/lemon-mint-card.jpg"],
    badge: "New",
    isNew: true,
    availableSizes: sizes,
    availableFlavors: [
      { id: "vanilla", label: "Vanilla bean", priceDelta: 0 },
      { id: "strawberry", label: "Strawberry cream", priceDelta: 2 },
    ],
    availability: "made-to-order",
    occasions: ["Birthday"],
  },
  {
    id: "fc-13",
    slug: "cocoa-chip-cupcakes",
    name: "Cocoa Chip Cupcakes",
    shortDescription: "Deep chocolate sponge and a cocoa cream swirl.",
    description:
      "A straightforward chocolate cupcake for mixed boxes and office tables. Demo.",
    price: 18,
    category: "cupcakes",
    images: ["/images/products/red-velvet-card.jpg"],
    availableSizes: cupcakeSizes,
    availableFlavors: [{ id: "chocolate", label: "Dark chocolate", priceDelta: 0 }],
    availability: "in-stock",
    occasions: ["Office", "Birthday"],
  },
  {
    id: "fc-14",
    slug: "swirl-chocolate-cupcakes",
    name: "Swirl Chocolate Cupcakes",
    shortDescription: "Cocoa cupcakes with ivory frosting in a mixed box.",
    description:
      "A birthday-friendly cupcake with a taller swirl. Demo photography.",
    price: 19,
    category: "birthday-cakes",
    images: ["/images/products/lotus-biscoff-card.jpg"],
    availableSizes: cupcakeSizes,
    availableFlavors: [{ id: "chocolate", label: "Chocolate", priceDelta: 0 }],
    availability: "in-stock",
    occasions: ["Birthday"],
  },
  {
    id: "fc-15",
    slug: "commission-cake",
    name: "Commission Cake",
    shortDescription: "A fully briefed custom cake, composed from the atelier options.",
    description:
      "Use the configurator to assemble a sample commission. Every option is demo data until Friends Cake publishes real finishes, sizes, and lead times.",
    price: 62,
    category: "custom-cakes",
    images: ["/images/products/lemon-mint-card.jpg"],
    badge: "Atelier",
    customizable: true,
    availableSizes: [
      { id: "8in", label: "8\" · 10–14 slices", priceDelta: 0 },
      { id: "10in", label: "10\" · 16–22 slices", priceDelta: 18 },
      { id: "two-tier", label: "Two tier · 24–32 slices", priceDelta: 40 },
    ],
    availableFlavors: flavors,
    fillings,
    exteriors,
    decorations,
    availability: "preorder",
    servingGuide: "Lead times are not confirmed in this demo.",
    occasions: ["Wedding", "Corporate", "Custom"],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return products.filter((product) => product.category === slug);
}

export function getNewProducts() {
  return products.filter((product) => product.isNew);
}

export function getBestSellers() {
  return products.filter((product) => product.isBestSeller);
}

export function getRelatedProducts(product: Product, limit = 3) {
  return products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .concat(products.filter((item) => item.id !== product.id && item.category !== product.category))
    .slice(0, limit);
}
