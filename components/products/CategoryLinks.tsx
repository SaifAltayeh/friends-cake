import Link from "next/link";
import { categories } from "@/data/categories";
import { cn } from "@/lib/cn";

const shortName: Record<string, string> = {
  "celebration-cakes": "Celebration",
  "birthday-cakes": "Birthday",
  "signature-cakes": "Signature",
  "mini-cakes": "Mini",
  "cupcakes": "Cupcakes",
  "custom-cakes": "Custom",
};

export function CategoryLinks({ active }: { active?: string }) {
  return (
    <nav
      className="-mx-4 flex gap-5 overflow-x-auto px-4 text-sm whitespace-nowrap touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:gap-6 sm:px-0"
      aria-label="Collections"
    >
      <Link
        href="/shop"
        className={cn(
          "transition-colors",
          !active
            ? "text-navy underline decoration-navy/40 underline-offset-4"
            : "text-ink-soft hover:text-navy",
        )}
      >
        All
      </Link>
      {categories.map((item) => (
        <Link
          key={item.slug}
          href={`/category/${item.slug}`}
          className={cn(
            "transition-colors",
            active === item.slug
              ? "text-navy underline decoration-navy/40 underline-offset-4"
              : "text-ink-soft hover:text-navy",
          )}
        >
          {shortName[item.slug] ?? item.name}
        </Link>
      ))}
    </nav>
  );
}
