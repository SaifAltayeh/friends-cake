import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types/product";

export function CategoryCard({
  category,
  count,
  featured = false,
}: {
  category: Category;
  count?: number;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className={`group relative block overflow-hidden bg-navy ${featured ? "min-h-[280px] md:min-h-[420px]" : "min-h-[220px] md:min-h-[280px]"}`}
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 text-ivory md:p-6">
        <p className="kicker text-slate">{category.tagline}</p>
        <h3 className="mt-2 font-serif text-3xl md:text-4xl">{category.name}</h3>
        {typeof count === "number" ? (
          <p className="mt-2 text-xs tracking-[0.16em] uppercase text-slate">
            {count} cakes · demo
          </p>
        ) : null}
      </div>
    </Link>
  );
}
