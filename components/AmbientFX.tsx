"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const PARTICLES = 18;

export function AmbientFX() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cinematic ambient layer is reserved for the home page. Inner pages
    // stay calm so content reads better.
    if (pathname !== "/") {
      const host = ref.current;
      if (host) host.querySelectorAll(".p").forEach((n) => n.remove());
      return;
    }
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const host = ref.current;
    if (!host || host.childElementCount > 3) return; // already populated

    for (let i = 0; i < PARTICLES; i++) {
      const p = document.createElement("span");
      p.className = "p" + (Math.random() < 0.4 ? " purple" : "");
      p.style.left = (Math.random() * 100).toFixed(1) + "%";
      p.style.top = 60 + Math.random() * 60 + "%";
      const dur = (14 + Math.random() * 22).toFixed(1);
      p.style.animationDuration = dur + "s";
      p.style.animationDelay = (-Math.random() * Number(dur)).toFixed(1) + "s";
      const sz = (2 + Math.random() * 3).toFixed(1);
      p.style.width = sz + "px";
      p.style.height = sz + "px";
      host.appendChild(p);
    }

    return () => {
      host.querySelectorAll(".p").forEach((n) => n.remove());
    };
  }, [pathname]);

  return (
    <div ref={ref} className="ai-fx" aria-hidden="true">
      <div className="vignette" />
      <div className="scan" />
      <div className="scan s2" />
    </div>
  );
}
