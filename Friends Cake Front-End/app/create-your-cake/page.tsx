import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/data/products";
import { ProductGallery } from "@/components/products/ProductGallery";
import { CakeConfigurator } from "@/components/products/CakeConfigurator";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { store } from "@/data/site";
import { pageWrap } from "@/lib/cn";

export const metadata: Metadata = { title: "Create your cake" };

export default function CreateYourCakePage() {
  const product = getProductBySlug("atelier-ombre");
  if (!product) notFound();

  return (
    <div className={pageWrap}>
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Create your cake" }]} />
      <p className="kicker mt-6 md:mt-8">Atelier</p>
      <h1 className="mt-3 font-serif text-4xl text-navy md:text-6xl">Create your cake</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
        Choose a size, flavour, filling, and finish. Add a short message and a date — a sample
        configurator for a cake composed to the table.
      </p>
      <p className="mt-3 max-w-xl text-xs text-ink-soft">{store.currencyNote}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} name="Create your cake" modelPath={product.modelPath} />
        <div>
          <p className="text-xs leading-relaxed text-ink-soft">
            The cake photograph does not change with each option. Sample configurator only.
          </p>
          <div className="mt-8">
            <CakeConfigurator product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
