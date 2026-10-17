"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { FounderQuote } from "@/components/home/FounderQuote";
import { CategorySection } from "@/components/home/CategorySection";
import { ProductCollection } from "@/components/home/ProductCollection";
import { PromoBanner } from "@/components/home/PromoBanner";
import { getBestSellers, getNewProducts } from "@/data/products";

const CakeTheater = dynamic(
  () => import("@/components/home/CakeTheater").then((mod) => mod.CakeTheater),
  { ssr: false },
);

export function HomePage() {
  const news = getNewProducts().slice(0, 3);
  const bestsellers = getBestSellers().slice(0, 3);

  return (
    <div id="cake-journey">
      <Hero />
      <FounderQuote />
      <CakeTheater />
      <CategorySection />
      <div id="new-releases">
        <ProductCollection
          kicker="Just from the kitchen"
          title="New releases"
          body="The latest cakes from the atelier — pistachio, blush, mango, and more."
          products={news}
          href="/shop"
          action="View new arrivals"
          cakeBehind
        />
      </div>
      <PromoBanner />
      <ProductCollection
        id="best-sellers"
        featuredSlug="lotus-crumb"
        kicker="The house favourites"
        title="Best sellers"
        body="The cakes guests come back for: lotus crumb, birthday, and dark chocolate."
        products={bestsellers}
        href="/shop"
        action="Browse best sellers"
        className="bg-white"
      />
    </div>
  );
}
