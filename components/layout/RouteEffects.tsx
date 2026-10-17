"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { useUI } from "@/context/UIContext";

function scrollToTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function RouteEffects() {
  const pathname = usePathname();
  const { closeCart, closeMenu, closeSearch } = useUI();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    closeCart();
    closeMenu();
    closeSearch();

    let active = true;
    const lock = () => {
      if (active) scrollToTop();
    };

    lock();
    const frame = window.requestAnimationFrame(() => {
      lock();
      window.requestAnimationFrame(lock);
    });
    const timers = [0, 32, 80, 160, 280, 450].map((delay) => window.setTimeout(lock, delay));
    const stop = window.setTimeout(() => {
      active = false;
    }, 500);

    return () => {
      active = false;
      window.cancelAnimationFrame(frame);
      timers.forEach((id) => window.clearTimeout(id));
      window.clearTimeout(stop);
    };
  }, [pathname, closeCart, closeMenu, closeSearch]);

  return null;
}
