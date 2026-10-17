"use client";

import Image from "next/image";
import Link from "next/link";
import type { CartItem } from "@/types/cart";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { useCart } from "@/context/CartContext";

export function CartItemRow({ item }: { item: CartItem }) {
  const { setQuantity, remove } = useCart();
  const config = item.configuration;

  return (
    <article className="flex gap-3 border-b border-navy/10 py-5 sm:gap-4">
      <Link href={`/product/${item.slug}`} className="relative h-20 w-16 shrink-0 overflow-hidden bg-mist sm:h-24 sm:w-20">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </Link>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/product/${item.slug}`} className="font-serif text-lg text-navy sm:text-xl">
              {item.name}
            </Link>
            {config ? (
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                {[config.sizeLabel, config.flavorLabel, config.fillingLabel, config.message]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            ) : null}
          </div>
          <PriceDisplay amount={item.unitPrice * item.quantity} />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <QuantitySelector
            value={item.quantity}
            onChange={(value) => setQuantity(item.lineId, value)}
          />
          <button
            type="button"
            className="text-[0.68rem] tracking-[0.16em] uppercase text-ink-soft hover:text-navy"
            onClick={() => remove(item.lineId)}
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}
