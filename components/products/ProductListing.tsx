"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { ProductGrid } from "@/components/products/ProductGrid";
import { FilterPanel, type SortKey } from "@/components/products/FilterPanel";

const PAGE = 9;

export function ProductListing({
  products,
  initialCategory = "all",
  collection,
  showCategories = true,
}: {
  products: Product[];
  initialCategory?: string;
  collection?: string;
  showCategories?: boolean;
}) {
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<SortKey>("featured");
  const [visible, setVisible] = useState(PAGE);

  const filtered = useMemo(() => {
    let list = [...products];
    if (collection === "new") list = list.filter((item) => item.isNew);
    if (collection === "bestsellers") list = list.filter((item) => item.isBestSeller);
    if (showCategories && category !== "all") {
      list = list.filter((item) => item.category === category);
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, category, sort, collection, showCategories]);

  const shown = filtered.slice(0, visible);

  function reset() {
    setCategory(initialCategory);
    setSort("featured");
    setVisible(PAGE);
  }

  return (
    <div>
      <FilterPanel
        category={category}
        onCategory={(value) => {
          setCategory(value);
          setVisible(PAGE);
        }}
        sort={sort}
        onSort={setSort}
        count={filtered.length}
        showCategories={showCategories}
      />

      {shown.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-sm text-ink-soft">No cakes in this view.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 text-sm text-navy underline decoration-navy/40 underline-offset-4 hover:decoration-navy"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="mt-16 md:mt-20">
            <ProductGrid products={shown} />
          </div>
          {visible < filtered.length ? (
            <div className="mt-20 text-center">
              <button
                type="button"
                onClick={() => setVisible((count) => count + PAGE)}
                className="text-sm text-navy underline decoration-navy/40 underline-offset-4 transition-colors hover:decoration-navy"
              >
                Load more
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
