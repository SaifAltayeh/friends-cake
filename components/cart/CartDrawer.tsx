"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartSummary } from "@/components/cart/CartSummary";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export function CartDrawer() {
  const { cartOpen, closeCart } = useUI();
  const { items, subtotal, total } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {cartOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            className="fixed inset-0 z-[100] bg-navy/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="fixed inset-y-0 right-0 z-[110] flex w-full max-w-md flex-col bg-white shadow-2xl"
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 24, opacity: 0 }}
            transition={{ type: "tween", duration: 0.22 }}
          >
            <div className="flex items-center justify-between border-b border-navy/10 px-5 py-4">
              <h2 id="cart-title" className="font-serif text-3xl text-navy">
                Cart
              </h2>
              <button type="button" aria-label="Close cart" onClick={closeCart}>
                <X />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5">
              {items.length === 0 ? (
                <div className="py-10">
                  <EmptyState
                    title="Your cart is empty"
                    body="Begin with a signature cake or a custom commission."
                    href="/shop"
                    action="Browse cakes"
                  />
                </div>
              ) : (
                items.map((item) => <CartItemRow key={item.lineId} item={item} />)
              )}
            </div>
            {items.length > 0 ? (
              <div className="border-t border-navy/10 p-5">
                <CartSummary subtotal={subtotal} total={total} withCheckout={false} />
                <div className="mt-4 grid gap-2">
                  <ButtonLink href="/cart" className="w-full" variant="ghost">
                    View cart
                  </ButtonLink>
                  <ButtonLink href="/checkout" className="w-full" variant="primary">
                    Checkout
                  </ButtonLink>
                </div>
              </div>
            ) : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
