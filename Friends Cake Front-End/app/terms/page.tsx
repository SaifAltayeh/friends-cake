import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-[calc(9.5rem+env(safe-area-inset-top))] sm:px-8 lg:px-12 lg:pt-44">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Terms" }]} />
      <h1 className="mt-6 font-serif text-4xl text-navy md:mt-8 md:text-5xl">Terms</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-soft">
        <p>
          Placeholder terms for the demo storefront. Prices, availability, delivery, and payment
          rules are not contractual.
        </p>
        <p>
          Demo checkout does not create a real order, charge a card, or send a confirmation to
          Friends Cake.
        </p>
        <p>Replace this page with the studio’s actual terms before launch.</p>
      </div>
    </div>
  );
}
