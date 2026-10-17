"use client";

import { useCart } from "@/context/CartContext";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { siteWrap } from "@/lib/cn";

export default function CartPage() {
  const { items, subtotal, total, clear } = useCart();

  return (
    <div className={`${siteWrap} py-12 md:py-16`}>
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Cart" }]} />
      <h1 className="mt-8 font-serif text-5xl text-navy">Cart</h1>
      {items.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="Your cart is empty"
            body="Explore the demo catalogue and add a cake."
            href="/shop"
            action="Browse cakes"
          />
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            {items.map((item) => (
              <CartItemRow key={item.lineId} item={item} />
            ))}
            <Button variant="ghost" className="mt-6" onClick={clear}>
              Clear cart
            </Button>
          </div>
          <CartSummary subtotal={subtotal} total={total} />
        </div>
      )}
    </div>
  );
}
