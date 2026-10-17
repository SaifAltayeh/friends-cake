import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/types/product";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/category/${category.slug}`} className="group block">
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
  );
}
