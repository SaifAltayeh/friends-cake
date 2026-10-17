import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { CategoryCard } from "@/components/products/CategoryCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { siteWrap } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Categories",
};

export default function CategoriesPage() {
  return (
    <div className={`${siteWrap} py-8 md:py-16`}>
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Categories" }]} />
      <p className="kicker mt-6 md:mt-8">The collections</p>
      <h1 className="mt-3 font-serif text-4xl text-navy md:text-6xl">Categories</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
        Editorial collections for the demo storefront. Replace imagery and names with the live
        Friends Cake catalogue.
      </p>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            category={category}
            count={products.filter((product) => product.category === category.slug).length}
            featured
          />
        ))}
      </div>
    </div>
  );
}
