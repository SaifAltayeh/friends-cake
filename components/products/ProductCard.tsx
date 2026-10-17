"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { ProductModelPreview } from "@/components/products/ProductModelPreview";

export function ProductCard({
  product,
  liveModel = false,
}: {
  product: Product;
  liveModel?: boolean;
}) {
  const showModel = Boolean(liveModel || product.modelPath);

  return (
    <article className="group bg-white text-center">
      <Link href={`/product/${product.slug}`} className="relative block bg-white">
        <div
          id={liveModel ? "cake-product-stage" : undefined}
          className="relative aspect-[4/3] bg-white"
        >
          {showModel ? (
            product.modelPath && !liveModel ? (
              <div className="absolute inset-0">
                <ProductModelPreview path={product.modelPath} />
              </div>
            ) : null
          ) : (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
              className="object-contain p-5 transition-transform duration-700 group-hover:scale-[1.03] md:p-10"
            />
          )}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[18%] bottom-[10%] h-5 rounded-[100%] bg-black/[0.07] blur-md"
          />
        </div>
        <p className="mt-5 text-[0.95rem] font-normal tracking-[-0.01em] text-ink md:mt-8">
          {product.name}
        </p>
        <PriceDisplay amount={product.price} className="mt-1.5 block text-[0.9rem] text-ink" />
      </Link>
    </article>
  );
}
