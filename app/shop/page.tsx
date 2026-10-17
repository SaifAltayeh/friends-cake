import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/data/products";
import { ProductListing } from "@/components/products/ProductListing";
import { LoadingState } from "@/components/ui/LoadingState";
import { cn, siteWrap } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Shop",
};

type Search = Promise<{ [key: string]: string | string[] | undefined }>;

const views = {
  all: {
    kicker: "The catalogue",
    title: "Shop",
    body: "Celebration, signature, and custom cakes from the atelier — made to order for the table that gathers.",
  },
  new: {
    kicker: "Just from the kitchen",
    title: "New releases",
    body: "The latest cakes from the atelier — pistachio, blush, mango, and more.",
  },
  bestsellers: {
    kicker: "The house favourites",
    title: "Best sellers",
    body: "The cakes guests come back for: lotus crumb, birthday, and dark chocolate.",
  },
} as const;

export default function ShopPage({ searchParams }: { searchParams: Search }) {
  return (
    <div className={`${siteWrap} pb-20 pt-6 md:pb-36 md:pt-12`}>
      <Suspense fallback={<LoadingState label="Opening the catalogue" />}>
        <ShopContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ShopContent({ searchParams }: { searchParams: Search }) {
  const params = await searchParams;
  const collection = typeof params.collection === "string" ? params.collection : undefined;
  const view =
    collection === "new"
      ? views.new
      : collection === "bestsellers"
        ? views.bestsellers
        : views.all;

  return (
    <>
      <header>
        <p className="text-[0.68rem] tracking-[0.28em] uppercase text-ink-soft">{view.kicker}</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-5 md:mt-4 md:gap-8">
          <div className="max-w-xl">
            <h1 className="font-serif text-4xl text-navy md:text-6xl">{view.title}</h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft md:mt-4 md:text-base">{view.body}</p>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm md:gap-6" aria-label="Catalogue views">
            <ViewLink href="/shop" active={!collection}>
              All
            </ViewLink>
            <ViewLink href="/shop?collection=new" active={collection === "new"}>
              New
            </ViewLink>
            <ViewLink href="/shop?collection=bestsellers" active={collection === "bestsellers"}>
              Best sellers
            </ViewLink>
          </nav>
        </div>
      </header>
      <div className="mt-10 md:mt-20">
        <ProductListing products={products} collection={collection} />
      </div>
    </>
  );
}

function ViewLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "transition-colors",
        active
          ? "text-navy underline decoration-navy/40 underline-offset-4"
          : "text-ink-soft hover:text-navy",
      )}
    >
      {children}
    </Link>
  );
}
