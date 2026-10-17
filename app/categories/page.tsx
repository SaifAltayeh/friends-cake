import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/products/CategoryCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { siteWrap } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Categories",
};

export default function CategoriesPage() {
  const featured = categories.slice(0, 3);

  return (
    <div className={`${siteWrap} py-8 md:py-16`}>
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Categories" }]} />
      <p className="kicker mt-6 md:mt-8">The collections</p>
      <h1 className="mt-3 font-serif text-4xl text-navy md:text-6xl">Categories</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
        Cakes from the atelier — choose a collection, or create your own.
      </p>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {featured.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
}
