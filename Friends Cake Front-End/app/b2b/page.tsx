import type { Metadata } from "next";
import { b2bContent } from "@/data/b2b";
import { B2BForm } from "@/components/forms/B2BForm";
import { pageWrap } from "@/lib/cn";

export const metadata: Metadata = { title: "B2B" };

export default function B2BPage() {
  return (
    <div className={pageWrap}>
      <header className="max-w-3xl">
        <p className="text-[0.68rem] tracking-[0.28em] uppercase text-ink-soft">
          {b2bContent.kicker}
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-[1.1] text-navy md:mt-4 md:text-6xl md:leading-[1.08]">
          Make every
          <br />
          gathering sweeter.
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-soft md:text-base">
          {b2bContent.lede}
        </p>
      </header>

      <div className="mt-10 grid items-start gap-10 md:mt-20 md:gap-16 lg:grid-cols-12 lg:gap-20">
        <ul className="space-y-2 text-sm text-ink-soft lg:col-span-5">
          {b2bContent.audiences.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="lg:col-span-7">
          <B2BForm />
        </div>
      </div>
    </div>
  );
}
