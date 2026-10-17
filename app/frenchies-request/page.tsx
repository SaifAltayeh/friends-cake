import type { Metadata } from "next";
import { frenchiesContent } from "@/data/frenchies";
import { FrenchiesForm } from "@/components/forms/FrenchiesForm";
import { siteWrap } from "@/lib/cn";

export const metadata: Metadata = { title: "Frenchies Request" };

export default function FrenchiesPage() {
  return (
    <div className={`${siteWrap} pb-28 pt-8 md:pb-36 md:pt-12`}>
      <header className="max-w-3xl">
        <p className="text-[0.68rem] tracking-[0.28em] uppercase text-ink-soft">
          {frenchiesContent.kicker}
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.08] text-navy md:text-6xl">
          Frenchies Request
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-soft md:text-base">
          {frenchiesContent.lede}
        </p>
      </header>

      <div className="mt-16 max-w-3xl md:mt-20">
        <FrenchiesForm />
      </div>
    </div>
  );
}
