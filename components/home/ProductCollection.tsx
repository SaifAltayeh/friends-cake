import type { Product } from "@/types/product";
import { ProductCard } from "@/components/products/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { cn, siteWrap } from "@/lib/cn";

export function ProductCollection({
  id,
  kicker,
  title,
  body,
  products,
  href,
  action,
  featuredSlug,
  cakeBehind = false,
  className,
}: {
  id?: string;
  kicker: string;
  title: string;
  body: string;
  products: Product[];
  href: string;
  action: string;
  featuredSlug?: string;
  cakeBehind?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-x-hidden bg-white py-24 md:py-28",
        cakeBehind ? "" : "z-10",
        className,
      )}
    >
      <div className={cn(siteWrap, cakeBehind && "relative z-30")}>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-[0.68rem] tracking-[0.28em] uppercase text-ink-soft">{kicker}</p>
            <h2 className="mt-4 font-serif text-5xl text-navy md:text-6xl">{title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft md:text-base">{body}</p>
          </div>
          <ButtonLink href={href} variant="ghost">
            {action}
          </ButtonLink>
        </div>
        <div className="relative mt-20">
          {cakeBehind ? (
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-5 -inset-y-6 bg-white sm:-inset-x-8 lg:-inset-x-12"
            />
          ) : null}
          <div
            className={cn(
              "relative grid gap-x-12 gap-y-20 sm:grid-cols-2 md:gap-x-20",
              products.length === 3 ? "lg:grid-cols-3" : "xl:grid-cols-4",
            )}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                liveModel={product.slug === featuredSlug}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
