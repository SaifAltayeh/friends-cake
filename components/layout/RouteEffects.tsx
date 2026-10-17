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
    scrollToTop();
    const frame = window.requestAnimationFrame(scrollToTop);
    const timer = window.setTimeout(scrollToTop, 120);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [pathname, closeCart, closeMenu, closeSearch]);

  return null;
}
