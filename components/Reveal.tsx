"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds the .in class to any element with .reveal as it enters the viewport.
 *
 * Re-observes after every client-side route change so sections mounted on
 * the new page get picked up — without that, navigating from /work back
 * to / leaves all the home-page reveal targets at opacity:0.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!elements.length) return;

    // Reset any previously-revealed sections so cross-page navigation works
    // even if the same DOM was reused. Then mark elements already inside the
    // viewport as visible synchronously to avoid a flash.
    const viewportH = window.innerHeight || document.documentElement.clientHeight;
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewportH * 0.9) el.classList.add("in");
      else el.classList.remove("in");
    });

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" },
    );
    elements.forEach((el) => {
      if (!el.classList.contains("in")) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
