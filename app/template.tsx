"use client";

import { useLayoutEffect, type ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const toTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    toTop();
    const timers = [0, 40, 120, 240].map((delay) => window.setTimeout(toTop, delay));
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  return children;
}
