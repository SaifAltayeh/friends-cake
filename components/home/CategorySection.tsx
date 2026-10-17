import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { siteWrap } from "@/lib/cn";

export function CategorySection() {
  const featured = categories.slice(0, 3);

  return (
    <section id="categories" className="relative overflow-x-hidden bg-white">
      <div className={`${siteWrap} relative z-30 pb-14 pt-16 md:pb-20 md:pt-36`}>
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-[0.68rem] tracking-[0.28em] uppercase text-ink-soft">
              The collections
            </p>
            <h2 className="mt-3 font-serif text-4xl text-navy md:mt-4 md:text-6xl">Categories</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft md:text-base">
              Cakes from the atelier — choose a collection, or create your own.
            </p>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-sm text-navy underline decoration-navy/40 underline-offset-4 transition-colors hover:decoration-navy"
          >
            View all
            <ArrowRight size={14} strokeWidth={1.75} aria-hidden />
          </Link>
        </div>

        <div className="relative mt-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-5 top-0 bottom-0 w-10 bg-white sm:-left-8 sm:w-14 lg:-left-12 lg:w-20"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-white"
          />
          <div className="relative grid gap-8 md:grid-cols-3 md:gap-8">
            {featured.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`} className="group block">
                <div className="relative aspect-[5/4] overflow-hidden bg-[#f7f7f7]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-contain p-3 transition-transform duration-700 group-hover:scale-[1.03] md:p-4"
                  />
                </div>
                <h3 className="mt-4 font-serif text-[1.75rem] text-navy md:mt-5 md:text-3xl">{category.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{category.tagline}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-navy underline decoration-navy/40 underline-offset-4 transition-colors group-hover:decoration-navy">
                  View more
                  <ArrowRight size={14} strokeWidth={1.75} aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
