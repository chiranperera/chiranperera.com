"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Wraps bare text nodes inside any `.btn` in `<span class="btn-label">`
 * so they sit above the hover-wipe ::after. Mirrors the original site's
 * runtime patch. Runs on every route change to catch newly-rendered buttons.
 */
export function BtnLabels() {
  const pathname = usePathname();

  useEffect(() => {
    const wrap = () => {
      document.querySelectorAll<HTMLElement>(".btn").forEach((btn) => {
        if (btn.dataset.btnWrapped === "1") return;
        const children = Array.from(btn.childNodes);
        children.forEach((node) => {
          if (
            node.nodeType === Node.TEXT_NODE &&
            (node.textContent?.trim().length ?? 0) > 0
          ) {
            const span = document.createElement("span");
            span.className = "btn-label";
            span.textContent = node.textContent;
            node.parentNode?.replaceChild(span, node);
          }
        });
        btn.dataset.btnWrapped = "1";
      });
    };

    wrap();

    // Catch buttons that mount after initial paint (forms swapping state,
    // testimonials carousel, etc.).
    const obs = new MutationObserver(wrap);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, [pathname]);

  return null;
}
