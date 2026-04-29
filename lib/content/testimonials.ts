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
 * Verified testimonials from Chiran's 99designs profile. All seven are
 * real client reviews — three web-design clients first (most recent /
 * highest-impact lead), then four logo-design clients. Aggregate of
 * 21 reviews · 5.0 ★ on the platform; the "View all" CTA below the
 * carousel always links back to https://99designs.com/profiles/chiranperera/about
 * so visitors can verify the underlying rating.
 */
export const testimonials: Testimonial[] = [
  {
    id: "99d-alex-web",
    quote:
      "Very responsive, understood the brief better than all other contestants, updated changes very quickly. Highly recommend.",
    clientName: "Alex",
    clientRole: "Web design · 99designs",
    avatarTone: "violet",
    source: "99designs",
    sourceUrl: "https://99designs.com/profiles/chiranperera/about",
    rating: 5,
    featured: true,
  },
  {
    id: "99d-amad-web",
    quote:
      "Beautiful design and great communication! I will definitely use this designer again! Great job! Thank you!",
    clientName: "Amad Ebrahimi",
    clientRole: "Web design · 99designs",
    avatarTone: "gold",
    source: "99designs",
    sourceUrl: "https://99designs.com/profiles/chiranperera/about",
    rating: 5,
  },
  {
    id: "99d-tamara-web",
    quote:
      "Great work. Very creative, responsive to my feedback. Asked questions, got it done. Would definitely use again.",
    clientName: "Tamara Kleinberg",
    clientRole: "Web design · 99designs",
    avatarTone: "green",
    source: "99designs",
    sourceUrl: "https://99designs.com/profiles/chiranperera/about",
    rating: 5,
  },
  {
    id: "99d-rambit",
    quote:
      "Chiran was on point! The transition from idea to reality was smooth and quick. I imagined working on a logo would be time consuming, however he made it seem easy. Would work with him again in the future.",
    clientName: "Rambit",
    clientRole: "Logo design · 99designs",
    avatarTone: "red",
    source: "99designs",
    sourceUrl: "https://99designs.com/profiles/chiranperera/about",
    date: "2023",
    rating: 5,
  },
  {
    id: "99d-ar-cleaning",
    quote:
      "We love the logo Chiran Perera designed for us. It was a pleasure to work with him. We will work with him about our website soon. 5 stars for him.",
    clientName: "AR Cleaning Services",
    clientRole: "Logo design · 99designs",
    avatarTone: "mix",
    source: "99designs",
    sourceUrl: "https://99designs.com/profiles/chiranperera/about",
    date: "2023",
    rating: 5,
  },
  {
    id: "99d-alyssa-logo",
    quote:
      "Chiran Perera was wonderful to work with. They communicated clearly and were prompt in responding to edits. I love my logo they created. Thank you.",
    clientName: "Alyssa Phillips",
    clientRole: "Logo design · 99designs",
    avatarTone: "graphite",
    source: "99designs",
    sourceUrl: "https://99designs.com/profiles/chiranperera/about",
    rating: 5,
  },
  {
    id: "99d-malcolm-logo",
    quote:
      "Chiran was very professional and patience with me working on the project. His creativity surpassed my expectations.",
    clientName: "Malcolm",
    clientRole: "Logo design · 99designs",
    avatarTone: "amber",
    source: "99designs",
    sourceUrl: "https://99designs.com/profiles/chiranperera/about",
    rating: 5,
  },
];

/**
 * Aggregate metrics shown on the 99designs profile, captured at the
 * time of the most recent snapshot.
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
