"use client";

import { useEffect, useRef } from "react";

type Line = { text: string; italic?: string; gradient?: boolean };

const LINES: Line[] = [
  { text: "Brands" },
  { text: "people ", italic: "love." },
  { text: "Engineered for AI.", gradient: true },
];

export function HeroTitle() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    LINES.forEach((line, li) => {
      const el = root.querySelector<HTMLElement>(`[data-line="${li}"]`);
      if (!el || el.dataset.staggered === "1") return;
      el.dataset.staggered = "1";
      const base = li * 160;

      if (line.gradient) {
        el.innerHTML = "";
        const whole = document.createElement("span");
        whole.className = "grad-fill";
        whole.textContent = line.text;
        whole.style.display = "inline-block";
        whole.style.opacity = "0";
        whole.style.transform = "translateY(14px)";
        whole.style.animation = "charIn .9s forwards";
        whole.style.animationDelay = base + "ms";
        el.appendChild(whole);
        return;
      }

      el.innerHTML = "";
      let idx = 0;
      const put = (ch: string, parent: HTMLElement) => {
        const s = document.createElement("span");
        s.style.display = "inline-block";
        s.style.opacity = "0";
        s.style.transform = "translateY(12px)";
        s.style.animation = "charIn .6s forwards";
        s.style.animationDelay = base + idx * 28 + "ms";
        s.textContent = ch === " " ? " " : ch;
        parent.appendChild(s);
        idx++;
      };
      for (const ch of line.text) put(ch, el);
      if (line.italic) {
        const wrap = document.createElement("span");
        wrap.className = "italic-violet";
        const inner = document.createElement("span");
        inner.style.display = "inline-block";
        inner.style.opacity = "0";
        inner.style.transform = "translateY(12px)";
        inner.style.animation = "charIn .7s forwards";
        inner.style.animationDelay = base + line.text.length * 28 + 40 + "ms";
        inner.textContent = line.italic;
        wrap.appendChild(inner);
        el.appendChild(wrap);
      }
    });
  }, []);

  return (
    <h1 className="display hero-title" ref={ref}>
      {LINES.map((line, li) => (
        <span
          key={li}
          className={`line${line.gradient ? " line-3" : ""}`}
          data-line={li}
        >
          {line.italic ? (
            <>
              {line.text}
              <span className="italic-violet">{line.italic}</span>
            </>
          ) : (
            line.text
          )}
        </span>
      ))}
    </h1>
  );
}
