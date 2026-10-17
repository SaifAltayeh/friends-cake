import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-[calc(9.5rem+env(safe-area-inset-top))] sm:px-8 lg:px-12 lg:pt-44">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Account" }]} />
      <h1 className="mt-6 font-serif text-4xl text-navy md:mt-8 md:text-5xl">Account</h1>
      <p className="mt-4 text-sm leading-relaxed text-ink-soft">
        Customer accounts are not connected in this demonstration. This page is a placeholder for a
        future sign-in and order history.
      </p>
      <div className="mt-8">
        <ButtonLink href="/shop">Continue shopping</ButtonLink>
      </div>
    </div>
  );
}
