"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Toggles `body.home-dark` based on the active route, scoping the original
 * dark glassmorphism theme to the home page only. Inner pages use the
 * default light theme defined in globals.css.
 */
export function BodyClass() {
  const pathname = usePathname();

  useEffect(() => {
    const dark = pathname === "/";
    document.body.classList.toggle("home-dark", dark);
  }, [pathname]);

  return null;
}
