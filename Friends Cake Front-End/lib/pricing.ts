import type { Product } from "@/types/product";
import type { CakeConfiguration } from "@/types/cart";
import { pricingDemo } from "@/data/site";

function delta(options: { id: string; priceDelta: number }[] | undefined, id?: string) {
  if (!options || !id) return 0;
  return options.find((option) => option.id === id)?.priceDelta ?? 0;
}

export function unitPriceFor(product: Product, configuration?: CakeConfiguration) {
  if (!configuration) return product.price;

  return (
    product.price +
    delta(product.availableSizes, configuration.sizeId) +
    delta(product.availableFlavors, configuration.flavorId) +
    delta(product.fillings, configuration.fillingId) +
    delta(product.exteriors, configuration.exteriorId) +
    delta(product.decorations, configuration.decorationId)
  );
}

export function cartSubtotal(items: { unitPrice: number; quantity: number }[]) {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

export function estimatedTotal(subtotal: number) {
  return subtotal + pricingDemo.shipping + pricingDemo.tax;
}
