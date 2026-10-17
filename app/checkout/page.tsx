import { Suspense } from "react";
import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { Confirmation } from "@/components/checkout/Confirmation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { store } from "@/data/site";
import { LoadingState } from "@/components/ui/LoadingState";
import { siteWrap } from "@/lib/cn";

export const metadata: Metadata = { title: "Checkout" };

type Search = Promise<{ [key: string]: string | string[] | undefined }>;

export default function CheckoutPage({ searchParams }: { searchParams: Search }) {
  return (
    <div className={`${siteWrap} py-12 md:py-16`}>
      <Suspense fallback={<LoadingState label="Preparing checkout" />}>
        <CheckoutContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function CheckoutContent({ searchParams }: { searchParams: Search }) {
  const params = await searchParams;
  const confirmed = typeof params.confirmed === "string" ? params.confirmed : "";

  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/cart", label: "Cart" },
          { label: confirmed ? "Confirmation" : "Checkout" },
        ]}
      />
      {confirmed ? (
        <div className="mt-10">
          <Confirmation reference={confirmed} />
        </div>
      ) : (
        <>
          <h1 className="mt-8 font-serif text-5xl text-navy">Checkout</h1>
          <p className="mt-3 max-w-xl text-sm text-ink-soft">{store.demoNotice}</p>
          <div className="mt-10">
            <CheckoutForm />
          </div>
        </>
      )}
    </>
  );
}
