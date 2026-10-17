"use client";

import { useLayoutEffect, type ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return children;
}
