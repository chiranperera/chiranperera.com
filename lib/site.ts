export const site = {
  name: "Chiran Perera",
  domain: "chiranperera.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://chiranperera.com",
  email: "hello@chiranperera.com",
  ninetyninedesigns: "https://99designs.com/profiles/chiranperera/about",
  description:
    "A cinematic lifestyle brand design studio in Sri Lanka. Websites for hotels, wellness, beauty and lifestyle brands — engineered for the AI search era.",
  locality: "Colombo",
  country: "Sri Lanka",
  bookingWindow: "Q3 2026 · 2 slots",
  industries: [
    "Hospitality",
    "Wellness",
    "Beauty",
    "Real Estate",
    "Lifestyle Products",
    "Education",
    "Eldercare",
    "AI Search",
    "Brand Identity",
  ] as const,
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/studio", label: "Studio" },
  { href: "/audit", label: "Audit" },
  { href: "/journal", label: "Journal" },
] as const;
