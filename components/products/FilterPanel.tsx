"use client";

import { ChevronDown } from "lucide-react";
import type { CategorySlug } from "@/types/product";
import { categories } from "@/data/categories";
import { cn } from "@/lib/cn";

export type SortKey = "featured" | "price-asc" | "price-desc" | "name";

const shortName: Record<string, string> = {
  "celebration-cakes": "Celebration",
  "birthday-cakes": "Birthday",
  "signature-cakes": "Signature",
  "mini-cakes": "Mini",
  "cupcakes": "Cupcakes",
  "custom-cakes": "Custom",
};

export function FilterPanel({
  category,
  onCategory,
  sort,
  onSort,
  count,
  showCategories = true,
}: {
  category: string;
  onCategory: (value: string) => void;
  sort: SortKey;
  onSort: (value: SortKey) => void;
  count: number;
  showCategories?: boolean;
}) {
  return (
    <div className="flex flex-col gap-5 border-y border-navy/10 py-5 lg:flex-row lg:items-center lg:justify-between">
      {showCategories ? (
        <nav
          className="-mx-4 flex gap-5 overflow-x-auto px-4 text-sm whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:gap-6 sm:px-0"
          aria-label="Filter by collection"
        >
          <FilterLink active={category === "all"} onClick={() => onCategory("all")}>
            All
          </FilterLink>
          {categories.map((item) => (
            <FilterLink
              key={item.slug}
              active={category === item.slug}
              onClick={() => onCategory(item.slug as CategorySlug)}
            >
              {shortName[item.slug] ?? item.name}
            </FilterLink>
          ))}
        </nav>
      ) : (
        <p className="text-sm text-ink-soft">
          {count} {count === 1 ? "cake" : "cakes"}
        </p>
      )}

      <div className="flex shrink-0 items-center justify-between gap-6 text-sm sm:gap-8">
        {showCategories ? (
          <p className="text-ink-soft">
            {count} {count === 1 ? "cake" : "cakes"}
          </p>
        ) : null}
        <label className="relative inline-flex items-center gap-2 text-navy">
          <span className="sr-only">Sort cakes</span>
          <select
            value={sort}
            onChange={(event) => onSort(event.target.value as SortKey)}
            className="cursor-pointer appearance-none bg-transparent pr-5 text-sm outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
            <option value="name">Name</option>
          </select>
          <ChevronDown
            size={14}
            strokeWidth={1.75}
            className="pointer-events-none absolute right-0 text-ink-soft"
            aria-hidden
          />
        </label>
      </div>
    </div>
  );
}

function FilterLink({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "pb-0.5 transition-colors",
        active
          ? "text-navy underline decoration-navy/40 underline-offset-4"
          : "text-ink-soft hover:text-navy",
      )}
    >
      {children}
    </button>
  );
}
