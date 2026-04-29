"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Always apply `body.home-dark`. The class name is now historical —
 * dark mode is the entire site's primary palette so the navigation
 * never flashes a theme change between pages. Inner pages get
 * differentiation by content rhythm (no hero video, no ambient FX),
 * not by switching to a light theme.
 *
 * Kept as a client component so any subtle pathname-driven body
 * classes can be added later without further refactors.
 */
export function BodyClass() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.add("home-dark");
    document.body.dataset.route = pathname === "/" ? "home" : "inner";
  }, [pathname]);

  return null;
}
