import type { Product } from "@/types/product";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="mt-14 md:mt-20">
      <SectionHeading kicker="Continue" title="You may also like" />
      <div className="mt-8 md:mt-10">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
