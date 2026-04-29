"use client";

import { useEffect } from "react";

/**
 * Adds the .in class to any element with .reveal as it enters the viewport.
 * Mirrors the original IntersectionObserver-based reveal animation.
 */
export function Reveal() {
  useEffect(() => {
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
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
