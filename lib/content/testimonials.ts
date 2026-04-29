export type Testimonial = {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  avatarTone?: "violet" | "gold" | "green" | "red" | "mix" | "graphite" | "amber" | "cyan";
  source?: "99designs" | "in-house" | "placeholder";
  sourceUrl?: string;
  date?: string;
  featured?: boolean;
};

/**
 * ⚠ Mixed-source content — read before editing.
 *
 * The carousel needs longer, more substantial pull-quotes than the
 * 5 verbatim 99designs reviews would allow on their own. Until Chiran
 * adds verified off-platform client quotes, the entries below are a
 * blend:
 *
 *   - source: "placeholder" — written for visual/spec purposes. Replace
 *             with real client feedback before public launch.
 *   - source: "99designs"   — paraphrased from verified reviews on the
 *             public 99designs profile, with a back-link to the original.
 *
 * The "View 21 verified reviews on 99designs ↗" CTA below the carousel
 * always points at the public profile so visitors can verify everything
 * Chiran has on platform.
 */
export const testimonials: Testimonial[] = [
  {
    id: "ph-villa-kaloya",
    quote:
      "Chiran took our messy brand brief and a stack of phone photos and turned it into a website that actually feels like the property. Bookings the first week were higher than the entire previous quarter — and three of them mentioned the site by name when they checked in.",
    clientName: "[Founder · Villa Kaloya]",
    clientRole: "Boutique hotel · Kandy",
    avatarTone: "violet",
    source: "placeholder",
    featured: true,
  },
  {
    id: "ph-lumen",
    quote:
      "We needed a Shopify build that would scale with us and not look like every other clean-beauty brand on Instagram. Chiran's first concept was already 80% of the way there. He’s the rare designer who understands brand AND understands code — handover was a single Zoom call and a Loom.",
    clientName: "[Founder · Lumen Skincare]",
    clientRole: "Beauty · DTC launch",
    avatarTone: "gold",
    source: "placeholder",
  },
  {
    id: "ph-anuhas",
    quote:
      "Three weeks from kickoff to launch. The Ayurveda retreat market is full of identical-looking sites and we didn't want to be one of them. The editorial typography, the seasonal package pages, the way the booking flow asks the right questions — every detail was thought through.",
    clientName: "[Director · Anuhas Wellness]",
    clientRole: "Retreat · South coast",
    avatarTone: "green",
    source: "placeholder",
  },
  {
    id: "ph-audit",
    quote:
      "I asked for the free AI audit not really expecting much, and got back a 14-page PDF that diagnosed exactly why our brand wasn’t showing up in ChatGPT recommendations. The top three fixes were copy-paste; we shipped them in an afternoon and saw citations within a week.",
    clientName: "[CMO · Beauty brand]",
    clientRole: "AI search audit",
    avatarTone: "cyan",
    source: "placeholder",
  },
  {
    id: "99d-rambit8",
    quote:
      "Chiran was on point. The transition from idea to reality was smooth and quick — I imagined working on a logo would be time-consuming, however he made it seem easy. Would work with him again in the future.",
    clientName: "rambit8",
    clientRole: "Logo design · 99designs · Verified",
    avatarTone: "graphite",
    source: "99designs",
    sourceUrl: "https://99designs.com/profiles/chiranperera/about",
    date: "2023",
  },
  {
    id: "99d-arcleaning",
    quote:
      "We love the logo Chiran designed for us — it was a pleasure to work with him. We will work with him about our website soon. Five stars from us.",
    clientName: "arcleaningservices51",
    clientRole: "Logo design · 99designs · Verified",
    avatarTone: "red",
    source: "99designs",
    sourceUrl: "https://99designs.com/profiles/chiranperera/about",
    date: "2023",
  },
  {
    id: "ph-serendib",
    quote:
      "Real-estate websites in this country are uniformly bad. Chiran reframed the project — instead of a property listing site, he treated each plantation property as a story with its own typography and palette. We’ve had three serious enquiries on properties that were on our books for two years.",
    clientName: "[Director · Serendib Estates]",
    clientRole: "Plantation property",
    avatarTone: "amber",
    source: "placeholder",
  },
  {
    id: "ph-paduru",
    quote:
      "We were worried an online music academy would lose the warmth of in-person teaching. Chiran's design somehow keeps that warmth — the way student profiles are presented, the rhythm of the lesson cards, the quiet animations on the home page. Enrolment doubled in our first quarter live.",
    clientName: "[Founder · Paduru Academy]",
    clientRole: "Education platform",
    avatarTone: "mix",
    source: "placeholder",
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
