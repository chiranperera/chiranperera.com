export type Testimonial = {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  avatarTone?: "violet" | "gold" | "green" | "red" | "mix" | "graphite" | "amber" | "cyan";
  source?: "99designs" | "in-house";
  sourceUrl?: string;
  date?: string;
  rating?: number;
  featured?: boolean;
};

/**
 * Verified testimonials from Chiran's public 99designs profile:
 * https://99designs.com/profiles/chiranperera/about
 *
 * These are the five reviews 99designs renders publicly. The other 16
 * (of 21 total · 5.0 ★ aggregate) are private — visitors can verify
 * the full picture via the "View 21 verified reviews on 99designs ↗"
 * CTA at the bottom of the carousel.
 *
 * Quotes are verbatim from the platform. Re-snapshot anytime with
 *   npm run scrape:99designs
 */
export const testimonials: Testimonial[] = [
  {
    id: "99d-rambit8",
    quote:
      "Chiran was on point! The transition from idea to reality was smooth and quick. I imagined working on a logo would be time consuming, however he made it seem easy. Would work with him again in the future.",
    clientName: "Rambit",
    clientRole: "Logo design · 2023",
    avatarTone: "violet",
    source: "99designs",
    sourceUrl: "https://99designs.com/profiles/chiranperera/about",
    date: "2023",
    rating: 5,
    featured: true,
  },
  {
    id: "99d-arcleaningservices51",
    quote:
      "We love the logo Chiran Perera designed for us. It was a pleasure to work with him. We will work with him about our website soon. 5 stars for him.",
    clientName: "AR Cleaning Services",
    clientRole: "Logo design · 2023",
    avatarTone: "gold",
    source: "99designs",
    sourceUrl: "https://99designs.com/profiles/chiranperera/about",
    date: "2023",
    rating: 5,
  },
  {
    id: "99d-klassicmarbleandgranit",
    quote: "It was a good experience. We are happy.",
    clientName: "Klassic Marble & Granite",
    clientRole: "Brand work · 2023",
    avatarTone: "green",
    source: "99designs",
    sourceUrl: "https://99designs.com/profiles/chiranperera/about",
    date: "2023",
    rating: 5,
  },
  {
    id: "99d-deliIx",
    quote: "Exceptional quality.",
    clientName: "Deli (Verified)",
    clientRole: "Verified client · 2023",
    avatarTone: "amber",
    source: "99designs",
    sourceUrl: "https://99designs.com/profiles/chiranperera/about",
    date: "2023",
    rating: 5,
  },
  {
    id: "99d-infI5aR",
    quote: "Designer did a great job.",
    clientName: "Inf (Verified)",
    clientRole: "Verified client · 2023",
    avatarTone: "cyan",
    source: "99designs",
    sourceUrl: "https://99designs.com/profiles/chiranperera/about",
    date: "2023",
    rating: 5,
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
