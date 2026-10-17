"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUI } from "@/context/UIContext";

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function RouteEffects() {
  const pathname = usePathname();
  const { closeCart, closeMenu, closeSearch } = useUI();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    closeCart();
    closeMenu();
    closeSearch();
    scrollToTop();
    const frame = window.requestAnimationFrame(scrollToTop);
    const timer = window.setTimeout(scrollToTop, 50);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [pathname, closeCart, closeMenu, closeSearch]);

  return null;
}
