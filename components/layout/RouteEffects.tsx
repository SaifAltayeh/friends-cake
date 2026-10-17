"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUI } from "@/context/UIContext";

export function RouteEffects() {
  const pathname = usePathname();
  const { closeCart, closeMenu, closeSearch } = useUI();

  useEffect(() => {
    closeCart();
    closeMenu();
    closeSearch();
  }, [pathname, closeCart, closeMenu, closeSearch]);

  return null;
}
