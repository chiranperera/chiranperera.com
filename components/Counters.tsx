"use client";

import { useEffect } from "react";

/**
 * Watches every `[data-count]` element on the page and animates from 0
 * to its target value when it scrolls into view. Mirrors the original
 * vanilla-JS easing exactly.
 */
export function Counters() {
  useEffect(() => {
    const animate = (el: HTMLElement) => {
      const target = Number(el.dataset.count);
      if (!Number.isFinite(target) || el.dataset.done) return;
      el.dataset.done = "1";
      const dur = 1400;
      const start = performance.now();
      const suffix = el.innerHTML.replace(/^\d+/, "");
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        const v = Math.round(target * eased);
        el.innerHTML = v + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            animate(en.target as HTMLElement);
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.3 },
    );
    document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
