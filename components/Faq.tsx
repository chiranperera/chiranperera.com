"use client";

import { useState } from "react";

export type FaqItem = { q: string; a: string };

export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className={`faq${isOpen ? " open" : ""}`}>
            <button
              type="button"
              className="faq-q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {it.q}
              <span className="faq-toggle" aria-hidden="true">
                +
              </span>
            </button>
            <div className="faq-a">{it.a}</div>
          </div>
        );
      })}
    </div>
  );
}
