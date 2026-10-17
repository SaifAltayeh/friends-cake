import type { Metadata } from "next";
import { frenchiesContent } from "@/data/frenchies";
import { FrenchiesForm } from "@/components/forms/FrenchiesForm";
import { pageWrap } from "@/lib/cn";

export const metadata: Metadata = { title: "Frenchies Request" };

export default function FrenchiesPage() {
  return (
    <div className={pageWrap}>
      <header className="max-w-3xl">
        <p className="text-[0.68rem] tracking-[0.28em] uppercase text-ink-soft">
          {frenchiesContent.kicker}
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-[1.1] text-navy md:mt-4 md:text-6xl md:leading-[1.08]">
          Frenchies Request
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-soft md:text-base">
          {frenchiesContent.lede}
        </p>
      </header>

      <div className="mt-10 max-w-3xl md:mt-20">
        <FrenchiesForm />
      </div>
    </div>
  );
}
