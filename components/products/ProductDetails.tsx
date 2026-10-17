"use client";

import type { Product } from "@/types/product";
import { ProductGallery } from "@/components/products/ProductGallery";
import { CakeConfigurator } from "@/components/products/CakeConfigurator";
import { formatAvailability } from "@/lib/format";
import { store } from "@/data/site";

export function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <ProductGallery images={product.images} name={product.name} modelPath={product.modelPath} />
      <div>
        <p className="kicker">{product.badge ?? "Friends Cake"}</p>
        <h1 className="mt-3 font-serif text-4xl text-navy md:text-5xl">{product.name}</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">{product.description}</p>
        <p className="mt-4 text-xs text-ink-soft">
          {formatAvailability(product.availability)} · {store.currencyNote}
        </p>
        {product.servingGuide ? (
          <p className="mt-2 text-sm text-ink-soft">{product.servingGuide}</p>
        ) : null}
        {product.allergens ? (
          <p className="mt-2 text-sm text-ink-soft">{product.allergens}</p>
        ) : null}
        {product.customizable ? (
          <p className="mt-6 text-xs leading-relaxed text-ink-soft">
            The cake photograph does not change with each option. Sample configurator only.
          </p>
        ) : null}
        <div className="mt-8">
          <CakeConfigurator product={product} />
        </div>
      </div>
    </div>
  );
}
