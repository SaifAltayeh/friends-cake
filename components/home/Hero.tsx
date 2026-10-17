"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { siteWrap } from "@/lib/cn";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative isolate min-h-[100svh] overflow-hidden bg-white text-navy"
    >
      <div className="pointer-events-none absolute right-[8%] top-1/2 hidden h-[70vh] w-[46vw] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(7,27,67,0.06),transparent_62%)] lg:block" />

      <div className={`${siteWrap} relative z-30 grid min-h-[100svh] items-center lg:grid-cols-12`}>
        <motion.div
          className="flex flex-col justify-end pb-10 pt-32 lg:col-span-5 lg:justify-center lg:py-24"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-[0.7rem] tracking-[0.32em] uppercase text-ink-soft">Friends Cake</p>
          <h1 className="mt-6 font-serif text-[3.25rem] leading-[0.9] sm:text-7xl xl:text-8xl">
            Made for your
            <span className="block italic">sweetest moments.</span>
          </h1>
          <p className="mt-7 max-w-sm text-[0.95rem] leading-relaxed text-ink-soft">
            Celebration cakes and custom atelier pieces, finished by hand for the table that
            gathers.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/shop">
              Explore our cakes
            </ButtonLink>
            <ButtonLink href="/product/lotus-crumb" variant="ghost">
              Create your cake
            </ButtonLink>
          </div>
        </motion.div>

        <div className="relative min-h-[52vh] lg:col-span-7 lg:min-h-[100svh]" />
      </div>
    </section>
  );
}
