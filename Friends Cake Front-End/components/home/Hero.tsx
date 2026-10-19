"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { siteWrap } from "@/lib/cn";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative isolate min-h-[100svh] overflow-x-hidden bg-white text-navy"
    >
      <div className="pointer-events-none absolute right-[8%] top-1/2 hidden h-[70vh] w-[46vw] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(7,27,67,0.06),transparent_62%)] lg:block" />

      <div className={`${siteWrap} relative z-30 flex h-[100svh] min-h-[100svh] flex-col lg:grid lg:h-auto lg:min-h-[100svh] lg:grid-cols-12 lg:items-center`}>
        <motion.div
          className="flex shrink-0 flex-col pt-[calc(6.75rem+env(safe-area-inset-top))] lg:col-span-5 lg:justify-center lg:pt-24 lg:py-24"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-[0.68rem] tracking-[0.28em] uppercase text-ink-soft">Friends Cake</p>
          <h1 className="mt-4 max-w-[11ch] font-serif text-[2.35rem] leading-[0.95] sm:mt-6 sm:text-6xl lg:text-7xl xl:text-8xl">
            Made for your
            <span className="block italic">sweetest moments.</span>
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-soft sm:mt-7 sm:text-[0.95rem]">
            Celebration cakes and custom atelier pieces, finished by hand for the table that
            gathers.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap">
            <ButtonLink href="/shop" className="w-full sm:w-auto">
              Explore our cakes
            </ButtonLink>
            <ButtonLink href="/create-your-cake" variant="ghost" className="w-full sm:w-auto">
              Create your cake
            </ButtonLink>
          </div>
        </motion.div>

        <div
          id="cake-hero-stage"
          className="relative min-h-0 flex-1 lg:col-span-7 lg:min-h-[100svh]"
        />
      </div>
    </section>
  );
}
