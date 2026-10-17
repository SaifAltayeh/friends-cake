import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 lg:px-12">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Privacy Policy" }]} />
      <h1 className="mt-8 font-serif text-5xl text-navy">Privacy Policy</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-soft">
        <p>
          This is placeholder legal copy for the Friends Cake demo storefront. It is not a live
          privacy policy.
        </p>
        <p>
          The demonstration stores a cart in the browser’s local storage and a demo order reference
          in session storage. No personal data is sent to a server.
        </p>
        <p>Replace this page with counsel-approved policy text before launch.</p>
      </div>
    </div>
  );
}
