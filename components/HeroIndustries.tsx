"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

const BANDS = [
  { x: [2, 18], y: [12, 28] },
  { x: [2, 18], y: [32, 48] },
  { x: [2, 18], y: [52, 68] },
  { x: [2, 18], y: [72, 88] },
  { x: [82, 97], y: [12, 28] },
  { x: [82, 97], y: [32, 48] },
  { x: [82, 97], y: [52, 68] },
  { x: [82, 97], y: [72, 88] },
  { x: [35, 65], y: [92, 96] },
];

const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);

export function HeroIndustries() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host || host.childElementCount > 0) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const labels = [...site.industries].sort(() => Math.random() - 0.5).slice(0, 9);
    labels.forEach((txt, i) => {
      const band = BANDS[i % BANDS.length];
      const el = document.createElement("span");
      el.className = "ind";
      el.textContent = txt;
      el.style.left = rand(band.x[0], band.x[1]).toFixed(1) + "%";
      el.style.top = rand(band.y[0], band.y[1]).toFixed(1) + "%";
      el.style.animationDuration = (8 + Math.random() * 6).toFixed(2) + "s";
      el.style.animationDelay = (Math.random() * 8).toFixed(2) + "s";
      host.appendChild(el);
    });

    return () => {
      host.querySelectorAll(".ind").forEach((n) => n.remove());
    };
  }, []);

  return <div ref={ref} className="hero-industries" aria-hidden="true" />;
}
