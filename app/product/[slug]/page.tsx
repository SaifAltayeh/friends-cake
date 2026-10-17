import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductDetails } from "@/components/products/ProductDetails";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { siteWrap } from "@/lib/cn";

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product?.name ?? "Cake" };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const category = categories.find((item) => item.slug === product.category);

  return (
    <div className={`${siteWrap} py-12 md:py-16`}>
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/shop", label: "Shop" },
          {
            href: `/category/${product.category}`,
            label: category?.name ?? "Category",
          },
          { label: product.name },
        ]}
      />
      <div className="mt-10">
        <ProductDetails product={product} />
      </div>
      <RelatedProducts products={getRelatedProducts(product, 3)} />
    </div>
  );
}
