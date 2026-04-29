export type ProjectCategory =
  | "hospitality"
  | "wellness"
  | "beauty"
  | "real-estate"
  | "products"
  | "education";

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  tag: string;
  description: string;
  pillTags?: string[];
  featured?: boolean;
  wide?: boolean;
};

export const projectFilters: Array<{ id: "all" | ProjectCategory; label: string }> = [
  { id: "all", label: "All" },
  { id: "hospitality", label: "Hospitality" },
  { id: "wellness", label: "Wellness" },
  { id: "beauty", label: "Beauty" },
  { id: "real-estate", label: "Real Estate" },
  { id: "products", label: "Products" },
  { id: "education", label: "Education" },
];

// Phase 2 will overwrite these with verified entries from the
// 99designs profile + Chiran's own portfolio. Names below are
// the same indicative set used in the original design preview.
export const projects: Project[] = [
  {
    slug: "sarisara-lanka",
    name: "Sarisara Lanka",
    category: "hospitality",
    tag: "Travel Marketplace",
    description: "WordPress + AI itinerary builder, MCP-ready.",
    pillTags: ["Travel Marketplace", "WordPress", "AI Itinerary", "MCP Ready"],
    featured: true,
    wide: true,
  },
  {
    slug: "villa-kaloya",
    name: "Villa Kaloya",
    category: "hospitality",
    tag: "Boutique Hotel",
    description: "Hill-country lodge on Next.js, bookings integrated.",
    pillTags: ["Hospitality", "Next.js", "Bookings"],
    featured: true,
  },
  {
    slug: "lumen-skincare",
    name: "Lumen Skincare",
    category: "beauty",
    tag: "Beauty · DTC",
    description: "Shopify brand system for a clean-beauty founder.",
    pillTags: ["Beauty", "Shopify", "Brand System"],
    featured: true,
  },
  {
    slug: "anuhas-wellness",
    name: "Anuhas Wellness",
    category: "wellness",
    tag: "Retreat",
    description: "Ayurvedic retreat, seasonal packages, multilingual.",
  },
  {
    slug: "serendib-estates",
    name: "Serendib Estates",
    category: "real-estate",
    tag: "Developer",
    description: "Plantation-era property portfolio, Colombo.",
  },
  {
    slug: "koyo-hinoki",
    name: "Kōyō Hinoki",
    category: "products",
    tag: "Home Fragrance",
    description: "Editorial shop for a Japanese-Lankan incense atelier.",
  },
  {
    slug: "paduru-academy",
    name: "Paduru Academy",
    category: "education",
    tag: "Platform",
    description: "Online music academy — courses, bookings, streams.",
  },
  {
    slug: "muse-bay",
    name: "Muse Bay",
    category: "hospitality",
    tag: "Surf Hotel",
    description: "South-coast surf hotel. Editorial. Seasonal. Fast.",
  },
  {
    slug: "herba-clinic",
    name: "Herba Clinic",
    category: "wellness",
    tag: "Clinical",
    description: "Naturopathy clinic with protocol-based content.",
  },
  {
    slug: "ondulee-studio",
    name: "Ondulee Studio",
    category: "beauty",
    tag: "Salon",
    description: "A Colombo hair atelier, booked three months ahead.",
  },
  {
    slug: "kalpitiya-homes",
    name: "Kalpitiya Homes",
    category: "real-estate",
    tag: "Lagoon Villas",
    description: "Villas for rent and sale, lagoon-side.",
  },
  {
    slug: "chaga-goods",
    name: "Chaga Goods",
    category: "products",
    tag: "Wellness CPG",
    description: "Functional mushroom brand, shipped in 16 days.",
  },
];
