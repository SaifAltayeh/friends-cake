/**
 * Editable storefront configuration.
 * Replace these demo values when Friends Cake confirms commercial details.
 */
export const store = {
  name: "Friends Cake",
  tagline: "Made for your sweetest moments.",
  description:
    "Friends Cake composes celebration cakes, signature layers, and custom atelier pieces for gatherings of every scale.",
  currencyCode: "JOD",
  currencyLabel: "JOD",
  locale: "en",
  currencyNote: "Demo currency and prices. Replace when the live catalogue is confirmed.",
  demoNotice: "This is a frontend demonstration. Orders, requests, and payments are not sent to Friends Cake.",
} as const;

export const contact = {
  email: "hello@friendscake.example",
  phone: "+000 00 000 0000",
  addressLine: "Studio address to be confirmed",
  hours: "Opening hours to be confirmed",
  note: "Placeholder contact details — replace with the studio’s real information.",
} as const;

export const announcement = {
  enabled: true,
  message: "The seasonal atelier collection is now showing",
  href: "/shop?collection=new",
} as const;

export const founder = {
  quote:
    "Every Friends Cake is created to become part of your story—a sweet expression of care that keeps meaningful people and unforgettable moments close.",
  name: "Friends Cake",
  role: "Atelier",
} as const;

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/frenchies-request", label: "Frenchies Request" },
  { href: "/b2b", label: "B2B" },
] as const;

export const footerNav = {
  shop: [
    { href: "/categories", label: "Categories" },
    { href: "/shop", label: "All cakes" },
    { href: "/shop?collection=new", label: "New arrivals" },
    { href: "/shop?collection=bestsellers", label: "Best sellers" },
    { href: "/category/custom-cakes", label: "Custom cakes" },
  ],
  atelier: [
    { href: "/frenchies-request", label: "Frenchies Request" },
    { href: "/b2b", label: "B2B inquiries" },
    { href: "/create-your-cake", label: "Create your cake" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms" },
  ],
} as const;

export const social = [
  { label: "Instagram", href: "https://instagram.com/example" },
  { label: "Facebook", href: "https://facebook.com/example" },
  { label: "Pinterest", href: "https://pinterest.com/example" },
] as const;

export const fulfillment = {
  methods: [
    { id: "delivery", label: "Delivery", helper: "Address required. Delivery fees are not calculated in this demo." },
    { id: "pickup", label: "Pickup", helper: "Collect from the studio once the location is confirmed." },
  ],
  paymentMethods: [
    { id: "cod", label: "Cash on delivery / pickup", helper: "Demo option only." },
    { id: "online", label: "Online payment", helper: "No payment is processed in this demonstration." },
  ],
} as const;

export const pricingDemo = {
  shipping: 0,
  tax: 0,
  shippingLabel: "Shipping (not calculated — demo)",
  taxLabel: "Tax (not calculated — demo)",
} as const;
