"use client";

import { useRef } from "react";
import type { Testimonial } from "@/lib/content/testimonials";
import { ninetyninedesignsProfile } from "@/lib/content/testimonials";

const TONE_CLASS: Record<NonNullable<Testimonial["avatarTone"]>, string> = {
  violet: "",
  gold: "a2",
  green: "a3",
  red: "a4",
  mix: "a5",
  graphite: "a6",
  amber: "a7",
  cyan: "a8",
};

const MAX_QUOTE_CHARS = 200;

function truncateAtWord(text: string, max: number): { text: string; truncated: boolean } {
  if (text.length <= max) return { text, truncated: false };
  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > max - 40 ? lastSpace : max;
  return { text: slice.slice(0, cut).trimEnd() + "…", truncated: true };
}

function avatarInitial(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "—";
  // Strip a leading bracket-tag like "(Verified)" so initial reflects the
  // actual name, then take the first non-whitespace character.
  const withoutParens = trimmed.replace(/\(.*?\)/g, "").trim();
  return (withoutParens[0] || trimmed[0]).toUpperCase();
}

function Stars({ count }: { count: number }) {
  return (
    <span className="tc-stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? "tc-star tc-star--on" : "tc-star"}>
          ★
        </span>
      ))}
    </span>
  );
}

export function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const cardWidth = () => {
    const t = trackRef.current;
    if (!t) return 320;
    const card = t.querySelector<HTMLElement>(".tc-card");
    const gap = parseFloat(getComputedStyle(t).gap || "20") || 20;
    return (card?.offsetWidth ?? 320) + gap;
  };

  return (
    <div className="testimonials-carousel reveal">
      <button
        type="button"
        className="tc-arrow tc-prev"
        aria-label="Previous testimonial"
        onClick={() => trackRef.current?.scrollBy({ left: -cardWidth(), behavior: "smooth" })}
      >
        ←
      </button>
      <div className="tc-viewport">
        <div className="tc-track" ref={trackRef}>
          {items.map((t) => {
            const { text, truncated } = truncateAtWord(t.quote, MAX_QUOTE_CHARS);
            return (
              <article key={t.id} className="tc-card">
                <div className="tc-card-top">
                  <div className="tc-quote-mark" aria-hidden="true">&ldquo;</div>
                  {t.rating ? <Stars count={t.rating} /> : null}
                </div>
                <p className="quote">
                  {text}
                  {truncated && t.sourceUrl ? (
                    <>
                      {" "}
                      <a
                        href={t.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="tc-readmore"
                      >
                        read full ↗
                      </a>
                    </>
                  ) : null}
                </p>
                <div className="who">
                  <div className={`avatar ${TONE_CLASS[t.avatarTone ?? "violet"]}`.trim()}>
                    {avatarInitial(t.clientName)}
                  </div>
                  <div className="who-meta">
                    <div className="name">{t.clientName}</div>
                    <div className="role">{t.clientRole}</div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <button
        type="button"
        className="tc-arrow tc-next"
        aria-label="Next testimonial"
        onClick={() => trackRef.current?.scrollBy({ left: cardWidth(), behavior: "smooth" })}
      >
        →
      </button>
      <div className="tc-foot">
        <a
          href={ninetyninedesignsProfile.url}
          target="_blank"
          rel="noreferrer"
          className="tc-cta"
        >
          <span className="tc-cta-stars">
            ★ {ninetyninedesignsProfile.starRating.toFixed(1)}
          </span>
          View {ninetyninedesignsProfile.totalReviews} verified reviews on 99designs
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
