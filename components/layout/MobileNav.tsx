"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { navigation, social } from "@/data/site";
import { useUI } from "@/context/UIContext";

export function MobileNav() {
  const { menuOpen, closeMenu } = useUI();

  return (
    <AnimatePresence>
      {menuOpen ? (
        <motion.div
          className="fixed inset-0 z-[60] bg-navy text-ivory lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between px-4 py-4">
            <div className="relative h-12 w-12 overflow-hidden">
              <Image src="/brand/logo-plate.png" alt="" fill className="object-cover scale-[1.14]" />
            </div>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <X />
            </button>
          </div>
          <nav className="flex flex-col gap-2 px-6 pt-8" aria-label="Mobile">
            {navigation.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * index }}
              >
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="block py-2 font-serif text-4xl"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="absolute bottom-8 left-6 right-6 flex gap-4 text-[0.7rem] tracking-[0.18em] uppercase text-slate">
            {social.map((item) => (
              <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
