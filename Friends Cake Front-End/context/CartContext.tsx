"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem, CakeConfiguration } from "@/types/cart";
import type { Product } from "@/types/product";
import { addItemToCart, itemCount, removeLine, updateQuantity } from "@/lib/cart";
import { cartSubtotal, estimatedTotal } from "@/lib/pricing";
import { readJson, writeJson } from "@/lib/storage";

const STORAGE_KEY = "friends-cake.cart.v1";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  total: number;
  addProduct: (product: Product, quantity?: number, configuration?: CakeConfiguration) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  remove: (lineId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(readJson<CartItem[]>(STORAGE_KEY, []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) writeJson(STORAGE_KEY, items);
  }, [items, ready]);

  const addProduct = useCallback(
    (product: Product, quantity = 1, configuration?: CakeConfiguration) => {
      setItems((current) => addItemToCart(current, product, quantity, configuration));
    },
    [],
  );

  const setQuantity = useCallback((lineId: string, quantity: number) => {
    setItems((current) => updateQuantity(current, lineId, quantity));
  }, []);

  const remove = useCallback((lineId: string) => {
    setItems((current) => removeLine(current, lineId));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = cartSubtotal(items);
    return {
      items,
      count: itemCount(items),
      subtotal,
      total: estimatedTotal(subtotal),
      addProduct,
      setQuantity,
      remove,
      clear,
    };
  }, [items, addProduct, setQuantity, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
