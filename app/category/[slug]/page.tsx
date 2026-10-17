import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { ProductListing } from "@/components/products/ProductListing";
import { CategoryLinks } from "@/components/products/CategoryLinks";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { siteWrap } from "@/lib/cn";

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
    <div className={`${siteWrap} pb-28 pt-8 md:pb-36 md:pt-12`}>
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
      <h1 className="mt-4 font-serif text-5xl text-navy md:text-6xl">{category.name}</h1>
      <div className="mt-10">
        <CategoryLinks active={category.slug} />
      </div>
      <div className="mt-16 md:mt-20">
        <ProductListing products={list} initialCategory={slug} showCategories={false} />
      </div>
    </div>
  );
}
