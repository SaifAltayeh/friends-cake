export type CategorySlug =
  | "celebration-cakes"
  | "birthday-cakes"
  | "signature-cakes"
  | "mini-cakes"
  | "cupcakes"
  | "custom-cakes";

export type ProductBadge = "New" | "Best Seller" | "Atelier" | "Limited";

export type Availability = "in-stock" | "made-to-order" | "preorder";

export type CustomOption = {
  id: string;
  label: string;
  priceDelta: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  category: CategorySlug;
  images: string[];
  modelPath?: string;
  badge?: ProductBadge;
  isNew?: boolean;
  isBestSeller?: boolean;
  availableSizes: CustomOption[];
  availableFlavors: CustomOption[];
  fillings?: CustomOption[];
  exteriors?: CustomOption[];
  decorations?: CustomOption[];
  customizable?: boolean;
  availability: Availability;
  servingGuide?: string;
  allergens?: string;
  occasions?: string[];
};

export type Category = {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  image: string;
};
