import type { CartItem, CakeConfiguration } from "@/types/cart";
import type { Product } from "@/types/product";
import { unitPriceFor } from "@/lib/pricing";

function configKey(configuration?: CakeConfiguration) {
  if (!configuration) return "plain";
  return JSON.stringify(configuration);
}

export function createLineId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `line-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function addItemToCart(
  items: CartItem[],
  product: Product,
  quantity: number,
  configuration?: CakeConfiguration,
): CartItem[] {
  const nextQty = Math.max(1, quantity);
  const key = configKey(configuration);
  const existing = items.find(
    (item) => item.productId === product.id && configKey(item.configuration) === key,
  );

  if (existing) {
    return items.map((item) =>
      item.lineId === existing.lineId
        ? { ...item, quantity: item.quantity + nextQty }
        : item,
    );
  }

  const line: CartItem = {
    lineId: createLineId(),
    productId: product.id,
    slug: product.slug,
    name: product.name,
    image: product.images[0],
    unitPrice: unitPriceFor(product, configuration),
    quantity: nextQty,
    configuration: configuration ? { ...configuration } : undefined,
  };

  return [...items, line];
}

export function updateQuantity(items: CartItem[], lineId: string, quantity: number) {
  if (quantity < 1) return items.filter((item) => item.lineId !== lineId);
  return items.map((item) => (item.lineId === lineId ? { ...item, quantity } : item));
}

export function removeLine(items: CartItem[], lineId: string) {
  return items.filter((item) => item.lineId !== lineId);
}

export function itemCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
