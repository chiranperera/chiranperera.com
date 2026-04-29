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
          {items.map((t) => (
            <article key={t.id} className="tc-card">
              <div className="tc-quote-mark">&ldquo;</div>
              <p className="quote">{t.quote}</p>
              <div className="who">
                <div className={`avatar ${TONE_CLASS[t.avatarTone ?? "violet"]}`.trim()}>
                  {t.clientName.charAt(1)?.toUpperCase() || "—"}
                </div>
                <div>
                  <div className="name">{t.clientName}</div>
                  <div className="role">{t.clientRole}</div>
                </div>
              </div>
            </article>
          ))}
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
