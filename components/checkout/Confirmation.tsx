"use client";

import { useEffect, useState } from "react";
import type { DemoOrder } from "@/types/checkout";
import { readSessionJson } from "@/lib/storage";
import { formatPrice } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";
import { store } from "@/data/site";

export function Confirmation({ reference }: { reference: string }) {
  const [order, setOrder] = useState<DemoOrder | null>(null);

  useEffect(() => {
    const stored = readSessionJson<DemoOrder | null>("friends-cake.order", null);
    if (stored?.reference === reference) setOrder(stored);
  }, [reference]);

  return (
    <div className="mx-auto max-w-xl border border-navy/10 bg-white px-8 py-14 text-center">
      <p className="kicker">Demo confirmation</p>
      <h1 className="mt-4 font-serif text-5xl text-navy">Order noted</h1>
      <p className="mt-4 text-sm leading-relaxed text-ink-soft">
        Reference <strong className="text-navy">{reference}</strong>. {store.demoNotice}
      </p>
      {order ? (
        <p className="mt-4 text-sm text-ink-soft">
          {order.itemCount} items · estimated {formatPrice(order.estimatedTotal)}
        </p>
      ) : null}
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/shop">Continue browsing</ButtonLink>
        <ButtonLink href="/" variant="ghost">
          Home
        </ButtonLink>
      </div>
    </div>
  );
}
