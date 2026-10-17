"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { ProductModelPreview } from "@/components/products/ProductModelPreview";

export function ProductGallery({
  images,
  name,
  modelPath,
}: {
  images: string[];
  name: string;
  modelPath?: string;
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className={`relative aspect-[4/5] overflow-hidden ${modelPath ? "bg-transparent" : "bg-mist"}`}>
        {modelPath ? (
          <div className="absolute inset-0">
            <ProductModelPreview path={modelPath} />
          </div>
        ) : (
          <Image
            src={current}
            alt={name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        )}
      </div>
      {images.length > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`View image ${index + 1}`}
              onClick={() => setActive(index)}
              className={cn(
                "relative h-20 w-16 shrink-0 overflow-hidden border",
                index === active ? "border-navy" : "border-transparent",
              )}
            >
              <Image src={image} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
