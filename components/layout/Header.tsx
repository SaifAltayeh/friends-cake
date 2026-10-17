"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { navigation } from "@/data/site";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { cn, siteWrap } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const { openMenu, openSearch } = useUI();

  return (
    <header className="bg-ivory/95 backdrop-blur-md">
      <div className={`${siteWrap} flex items-center justify-between gap-2 py-3 sm:gap-4 sm:py-4`}>
        <Link href="/" scroll={false} className="flex min-w-0 items-center gap-2.5 sm:gap-3" aria-label="Friends Cake home">
          <span className="relative block h-10 w-10 shrink-0 overflow-hidden bg-navy sm:h-11 sm:w-11">
            <Image
              src="/brand/logo-plate.png"
              alt=""
              fill
              sizes="44px"
              className="object-cover scale-[1.16]"
              priority
            />
          </span>
          <span className="hidden font-serif text-[1.15rem] tracking-[0.04em] text-navy sm:block sm:text-[1.35rem] sm:tracking-[0.06em]">
            Friends Cake
          </span>
        </Link>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
          {navigation.map((item) => {
            const path = item.href.split("?")[0];
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === path || pathname.startsWith(`${path}/`);
            const shopActive = item.href === "/shop" && pathname.startsWith("/category");
            return (
              <Link
                key={item.href}
                href={item.href}
                scroll={false}
                className={cn(
                  "text-[0.68rem] tracking-[0.2em] uppercase transition-colors",
                  active || shopActive ? "text-navy" : "text-ink-soft hover:text-navy",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center text-navy">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center sm:h-11 sm:w-11"
            aria-label="Search cakes"
            onClick={openSearch}
          >
            <Search size={18} />
          </button>
          <Link href="/account" scroll={false} className="grid h-10 w-10 place-items-center sm:h-11 sm:w-11" aria-label="Account">
            <User size={18} />
          </Link>
          <Link
            href="/cart"
            scroll={false}
            className="relative grid h-10 w-10 place-items-center sm:h-11 sm:w-11"
            aria-label={`Cart, ${count} items`}
          >
            <ShoppingBag size={18} />
            {count > 0 ? (
              <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center bg-navy px-1 text-[0.6rem] text-ivory">
                {count}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center sm:h-11 sm:w-11 xl:hidden"
            aria-label="Open menu"
            onClick={openMenu}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
