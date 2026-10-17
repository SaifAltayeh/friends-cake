import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { ProductListing } from "@/components/products/ProductListing";
import { CategoryLinks } from "@/components/products/CategoryLinks";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { pageWrap } from "@/lib/cn";

export async function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  return { title: category?.name ?? "Category" };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const list = getProductsByCategory(slug);

  return (
    <div className={pageWrap}>
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/shop", label: "Shop" },
          { label: category.name },
        ]}
      />
      <p className="mt-8 text-[0.68rem] tracking-[0.28em] uppercase text-ink-soft">
        {category.tagline}
      </p>
      <h1 className="mt-3 font-serif text-4xl text-navy md:mt-4 md:text-6xl">{category.name}</h1>
      <div className="mt-10">
        <CategoryLinks active={category.slug} />
      </div>
      <div className="mt-10 md:mt-20">
        <ProductListing products={list} initialCategory={slug} showCategories={false} />
      </div>
    </div>
  );
}
