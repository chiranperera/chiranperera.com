export type Testimonial = {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  avatarTone?: "violet" | "gold" | "green" | "red" | "mix" | "graphite" | "amber" | "cyan";
  source?: "99designs" | "in-house";
  sourceUrl?: string;
  featured?: boolean;
};

// Phase 2 ingestion replaces these from
// https://99designs.com/profiles/chiranperera/about (21 reviews).
// Until then we keep a small set of bracketed placeholders so the
// component renders. They are clearly labeled as placeholders.
export const testimonials: Testimonial[] = [
  {
    id: "p1",
    quote:
      "[Awaiting 99designs ingestion — placeholder hero quote about specific outcome and tone.]",
    clientName: "[Client Name]",
    clientRole: "Founder, [Brand]",
    avatarTone: "violet",
    featured: true,
  },
  {
    id: "p2",
    quote:
      "[Placeholder — about speed of delivery and how the site felt from day one.]",
    clientName: "[Client Name]",
    clientRole: "Owner, Boutique Hotel",
    avatarTone: "gold",
  },
  {
    id: "p3",
    quote: "[Placeholder — short, punchy. Pull-quote material.]",
    clientName: "[Client Name]",
    clientRole: "Director, Wellness Retreat",
    avatarTone: "green",
  },
  {
    id: "p4",
    quote: "[Placeholder — about the AI audit process.]",
    clientName: "[Client Name]",
    clientRole: "CMO, Beauty Brand",
    avatarTone: "red",
  },
  {
    id: "p5",
    quote: "[Placeholder — about handover and docs.]",
    clientName: "[Client Name]",
    clientRole: "Developer, Real Estate",
    avatarTone: "mix",
  },
  {
    id: "p6",
    quote:
      "[Placeholder — the long emotional one. Trust, craft, being understood.]",
    clientName: "[Client Name]",
    clientRole: "Founder, Lifestyle Product",
    avatarTone: "graphite",
  },
  {
    id: "p7",
    quote:
      "[Placeholder — bookings and revenue impact after launch.]",
    clientName: "[Client Name]",
    clientRole: "GM, Eco Resort",
    avatarTone: "amber",
  },
  {
    id: "p8",
    quote: "[Placeholder — referrals and why they came back.]",
    clientName: "[Client Name]",
    clientRole: "Head of Brand, Eldercare",
    avatarTone: "cyan",
  },
];
