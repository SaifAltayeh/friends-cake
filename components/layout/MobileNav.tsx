"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { navigation, social } from "@/data/site";
import { useUI } from "@/context/UIContext";

export function MobileNav() {
  const { menuOpen, closeMenu } = useUI();

  useEffect(() => {
    if (!menuOpen) return;
    const html = document.documentElement;
    const body = document.body;
    const previous = { html: html.style.overflow, body: body.style.overflow };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous.html;
      body.style.overflow = previous.body;
    };
  }, [menuOpen]);

  return (
    <AnimatePresence>
      {menuOpen ? (
        <motion.div
          className="fixed inset-0 z-[80] overflow-y-auto bg-white text-navy xl:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between px-4 pb-4 pt-[calc(1rem+env(safe-area-inset-top))]">
            <div className="relative h-10 w-10 overflow-hidden bg-navy">
              <Image src="/brand/logo-plate.png" alt="" fill className="object-cover scale-[1.14]" />
            </div>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <X size={20} strokeWidth={1.75} />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-4 pt-6" aria-label="Mobile">
            {navigation.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * index }}
              >
                <Link
                  href={item.href}
                  scroll={false}
                  onClick={closeMenu}
                  className="block py-2.5 font-serif text-[2.35rem] leading-[1.05] tracking-[-0.03em]"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-16">
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[0.68rem] tracking-[0.18em] uppercase text-ink-soft">
              {social.map((item) => (
                <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
