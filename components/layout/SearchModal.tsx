"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { useUI } from "@/context/UIContext";
import { formatPrice } from "@/lib/format";

export function SearchModal() {
  const { searchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (searchOpen) setQuery("");
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;

    const html = document.documentElement;
    const body = document.body;
    const previous = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
      bodyOverscroll: body.style.overscrollBehavior,
    };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overscrollBehavior = "none";

    const resultsList = () => document.getElementById("search-results");
    const inResults = (target: EventTarget | null) => {
      const list = resultsList();
      return Boolean(list && target instanceof Node && list.contains(target));
    };

    const onWheel = (event: WheelEvent) => {
      const list = resultsList();
      if (list && inResults(event.target) && list.scrollHeight > list.clientHeight) {
        const atTop = list.scrollTop <= 0 && event.deltaY < 0;
        const atBottom =
          list.scrollTop + list.clientHeight >= list.scrollHeight - 1 && event.deltaY > 0;
        if (!atTop && !atBottom) return;
      }
      event.preventDefault();
    };

    const onTouchMove = (event: TouchEvent) => {
      const list = resultsList();
      if (list && inResults(event.target) && list.scrollHeight > list.clientHeight) return;
      event.preventDefault();
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSearch();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = previous.htmlOverflow;
      body.style.overflow = previous.bodyOverflow;
      html.style.overscrollBehavior = previous.htmlOverscroll;
      body.style.overscrollBehavior = previous.bodyOverscroll;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [searchOpen, closeSearch]);

  const trimmed = query.trim();
  const results = useMemo(() => {
    const q = trimmed.toLowerCase();
    if (!q) return products.slice(0, 5);
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q) ||
        product.category.includes(q),
    );
  }, [trimmed]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {searchOpen ? (
        <div className="fixed inset-0 z-[120]">
          <motion.button
            type="button"
            className="absolute inset-0 bg-white/80 backdrop-blur-sm"
            aria-label="Close search"
            onClick={closeSearch}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-title"
            className="relative z-10 mx-auto mt-[calc(5.25rem+env(safe-area-inset-top))] w-[min(44rem,calc(100%-1rem))] bg-white px-4 py-5 ring-1 ring-navy/10 sm:mt-20 sm:px-8 sm:py-7 md:mt-28"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-6">
              <div>
                <p className="text-[0.68rem] tracking-[0.28em] uppercase text-ink-soft">
                  The catalogue
                </p>
                <h2 id="search-title" className="mt-1.5 font-serif text-[1.85rem] text-navy md:text-4xl">
                  Search
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close search"
                onClick={closeSearch}
                className="-mr-2 grid h-10 w-10 place-items-center text-navy"
              >
                <X size={18} strokeWidth={1.75} />
              </button>
            </div>

            <label htmlFor="site-search" className="sr-only">
              Search cakes
            </label>
            <div className="mt-5 flex items-center gap-3 border-b border-navy/15 pb-3">
              <Search size={18} strokeWidth={1.75} className="shrink-0 text-ink-soft" aria-hidden />
              <input
                id="site-search"
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search cakes, flavours, collections…"
                className="w-full bg-transparent py-1.5 text-[1.05rem] text-ink outline-none placeholder:text-ink-soft/70"
              />
              {trimmed ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-[0.68rem] tracking-[0.18em] uppercase text-ink-soft hover:text-navy"
                >
                  Clear
                </button>
              ) : null}
            </div>

            <p className="mt-6 text-[0.68rem] tracking-[0.22em] uppercase text-ink-soft">
              {trimmed ? `${results.length} ${results.length === 1 ? "cake" : "cakes"}` : "From the atelier"}
            </p>

            <ul
              id="search-results"
              className="mt-3 max-h-[min(28rem,calc(100svh-20rem))] space-y-1 overflow-y-auto overscroll-contain"
            >
              {results.length === 0 ? (
                <li className="py-8 text-sm text-ink-soft">
                  No cakes match “{trimmed}”.
                </li>
              ) : (
                results.map((product) => {
                  const collection = categories.find((item) => item.slug === product.category);
                  return (
                    <li key={product.id}>
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={closeSearch}
                        className="-mx-2 flex items-center gap-4 px-2 py-2.5 transition-colors hover:bg-[#f7f7f7] sm:-mx-3 sm:px-3"
                      >
                        <span className="relative block h-14 w-14 shrink-0 overflow-hidden bg-[#f7f7f7] sm:h-16 sm:w-16">
                          <Image
                            src={product.images[0]}
                            alt=""
                            fill
                            sizes="64px"
                            className="object-contain p-1.5"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[0.95rem] tracking-[-0.01em] text-ink">
                            {product.name}
                          </span>
                          <span className="mt-0.5 block truncate text-sm text-ink-soft">
                            {collection?.name ?? product.shortDescription}
                          </span>
                        </span>
                        <span className="shrink-0 text-sm text-ink">
                          {formatPrice(product.price)}
                        </span>
                      </Link>
                    </li>
                  );
                })
              )}
            </ul>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
