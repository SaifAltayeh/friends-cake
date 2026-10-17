import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteWrap } from "@/lib/cn";

export function PromoBanner() {
  return (
    <section id="promo" className="relative z-10 bg-white">
      <div className={`${siteWrap} grid items-center gap-8 py-16 md:gap-12 md:py-28 lg:grid-cols-2 lg:gap-20`}>
        <div className="max-w-lg">
          <p className="text-[0.68rem] tracking-[0.28em] uppercase text-ink-soft">
            Custom cakes
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-[1.02] text-navy md:mt-5 md:text-6xl md:leading-[0.95]">
            A cake for the room that gathers.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-ink-soft md:text-base">
            Commission a finish, or begin with a signature layer. Made to order from the
            atelier — for a table, a date, and the people around it.
          </p>
          <Link
            href="/category/custom-cakes"
            className="mt-7 inline-flex items-center gap-1.5 text-sm text-navy underline decoration-navy/40 underline-offset-4 transition-colors hover:decoration-navy md:mt-10"
          >
            Begin a custom cake
            <ArrowRight size={14} strokeWidth={1.75} aria-hidden />
          </Link>
        </div>

        <div
          id="cake-promo-stage"
          className="relative mx-auto aspect-square w-full max-w-[18rem] sm:max-w-md lg:mr-0 lg:ml-auto lg:max-w-xl"
        />
      </div>
    </section>
  );
}
