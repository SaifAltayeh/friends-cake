import { store } from "@/data/site";

export function formatPrice(amount: number) {
  return `${store.currencyLabel} ${amount.toFixed(2)}`;
}

export function formatAvailability(value: string) {
  if (value === "in-stock") return "Ready in the demo catalogue";
  if (value === "preorder") return "Preorder · demo lead time";
  return "Made to order · demo";
}
