import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteWrap } from "@/lib/cn";

export function PromoBanner() {
  return (
    <section id="promo" className="relative z-10 bg-white">
      <div className={`${siteWrap} grid items-center gap-12 py-24 md:py-28 lg:grid-cols-2 lg:gap-20`}>
        <div className="max-w-lg">
          <p className="text-[0.68rem] tracking-[0.28em] uppercase text-ink-soft">
            Custom cakes
          </p>
          <h2 className="mt-5 font-serif text-5xl leading-[0.95] text-navy md:text-6xl">
            A cake for the room that gathers.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-ink-soft md:text-base">
            Commission a finish, or begin with a signature layer. Made to order from the
            atelier — for a table, a date, and the people around it.
          </p>
          <Link
            href="/category/custom-cakes"
            className="mt-10 inline-flex items-center gap-1.5 text-sm text-navy underline decoration-navy/40 underline-offset-4 transition-colors hover:decoration-navy"
          >
            Begin a custom cake
            <ArrowRight size={14} strokeWidth={1.75} aria-hidden />
          </Link>
        </div>

        <div
          id="cake-promo-stage"
          className="relative mx-auto aspect-square w-full max-w-xl lg:mr-0 lg:ml-auto"
        />
      </div>
    </section>
  );
}
