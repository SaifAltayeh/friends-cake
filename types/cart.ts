export type CakeConfiguration = {
  sizeId: string;
  sizeLabel: string;
  flavorId: string;
  flavorLabel: string;
  fillingId?: string;
  fillingLabel?: string;
  exteriorId?: string;
  exteriorLabel?: string;
  decorationId?: string;
  decorationLabel?: string;
  message?: string;
  requestedDate?: string;
  notes?: string;
};

export type CartItem = {
  lineId: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  configuration?: CakeConfiguration;
};

export type CartState = {
  items: CartItem[];
};
