import Image from "next/image";
import Link from "next/link";
import { contact, footerNav, social, store } from "@/data/site";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { siteWrap } from "@/lib/cn";

export function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-white text-navy">
      <div className={`${siteWrap} grid gap-10 py-14 md:grid-cols-12 md:gap-12 md:py-24`}>
        <div className="md:col-span-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="relative block h-11 w-11 overflow-hidden bg-navy">
              <Image
                src="/brand/logo-plate.png"
                alt="Friends Cake"
                fill
                sizes="44px"
                className="object-cover scale-[1.14]"
              />
            </span>
            <span className="font-serif text-[1.35rem] tracking-[0.04em]">Friends Cake</span>
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-soft">
            {store.description}
          </p>
        </div>

        <div className="md:col-span-2">
          <p className="text-[0.68rem] tracking-[0.28em] uppercase text-ink-soft">Shop</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {footerNav.shop.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-navy transition-opacity hover:opacity-55">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="text-[0.68rem] tracking-[0.28em] uppercase text-ink-soft">Atelier</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {footerNav.atelier.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-navy transition-opacity hover:opacity-55">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-[0.68rem] tracking-[0.28em] uppercase text-ink-soft">Newsletter</p>
          <p className="mt-5 text-sm leading-relaxed text-ink-soft">
            Notes on new cakes and seasonal tables.
          </p>
          <NewsletterForm variant="light" />
          <div className="mt-8 space-y-1 text-sm text-ink-soft">
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <p>{contact.addressLine}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-navy/10">
        <div className={`${siteWrap} flex flex-col gap-4 py-6 text-xs text-ink-soft md:flex-row md:items-center md:justify-between`}>
          <p>© 2026 Friends Cake</p>
          <div className="flex flex-wrap gap-5">
            {social.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="transition-opacity hover:text-navy hover:opacity-100"
              >
                {item.label}
              </a>
            ))}
            {footerNav.legal.map((item) => (
              <Link key={item.href} href={item.href} className="transition-opacity hover:text-navy">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
