export type Testimonial = {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  avatarTone?: "violet" | "gold" | "green" | "red" | "mix" | "graphite" | "amber" | "cyan";
  source?: "99designs" | "in-house";
  sourceUrl?: string;
  date?: string;
  featured?: boolean;
};

/**
 * Verified testimonials sourced from Chiran's public 99designs profile
 * (https://99designs.com/profiles/chiranperera/about).
 *
 * The full count of 21 reviews shown on that profile includes private
 * reviews not exposed to non-authenticated visitors. The five entries
 * below are everything 99designs renders publicly. The raw scrape lives
 * in `content/99designs-snapshot.json` for traceability — re-run the
 * scraper to refresh.
 */
export const testimonials: Testimonial[] = [
  {
    id: "99d-rambit8",
    quote:
      "Chiran was on point! The transition from idea to reality was smooth and quick. I imagined working on a logo would be time consuming, however he made it seem easy. Would work with him again in the future.",
    clientName: "rambit8",
    clientRole: "Logo design · 99designs",
    avatarTone: "violet",
    source: "99designs",
    sourceUrl: "https://99designs.com/profiles/chiranperera/about",
    date: "about 3 years ago",
    featured: true,
  },
  {
    id: "99d-arcleaningservices51",
    quote:
      "We love the logo what Chiran Perera design for Us. It was pleasure to work with him. We will work with him about our Website soon. 5 stars for him.",
    clientName: "arcleaningservices51",
    clientRole: "Logo design · 99designs",
    avatarTone: "gold",
    source: "99designs",
    sourceUrl: "https://99designs.com/profiles/chiranperera/about",
    date: "about 3 years ago",
  },
  {
    id: "99d-klassicmarbleandgranitK",
    quote: "It was a good experience. We are happy.",
    clientName: "klassicmarbleandgranitK",
    clientRole: "Brand work · 99designs",
    avatarTone: "green",
    source: "99designs",
    sourceUrl: "https://99designs.com/profiles/chiranperera/about",
    date: "about 3 years ago",
  },
  {
    id: "99d-deliIx",
    quote: "Exceptional quality.",
    clientName: "deliIx",
    clientRole: "Verified client · 99designs",
    avatarTone: "amber",
    source: "99designs",
    sourceUrl: "https://99designs.com/profiles/chiranperera/about",
    date: "about 3 years ago",
  },
  {
    id: "99d-infI5aR",
    quote: "Designer did a great job.",
    clientName: "infI5aR",
    clientRole: "Verified client · 99designs",
    avatarTone: "cyan",
    source: "99designs",
    sourceUrl: "https://99designs.com/profiles/chiranperera/about",
    date: "about 3 years ago",
  },
];

/**
 * Aggregate metrics shown on the 99designs profile, captured at the
 * time of the most recent snapshot. Update alongside the snapshot file.
 */
export const ninetyninedesignsProfile = {
  url: "https://99designs.com/profiles/chiranperera/about",
  badge: "Mid Level",
  starRating: 5.0,
  totalReviews: 21,
  publicReviews: 5,
  contestsWon: 3,
  runnerUp: 13,
  projects: 35,
  repeatClients: 2,
  memberSince: "June 8, 2016",
  capturedAt: "2026-04-29",
} as const;
