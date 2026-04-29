import { site } from "./site";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  email: site.email,
  founder: {
    "@type": "Person",
    name: site.name,
    jobTitle: "Designer",
    url: site.url,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: site.locality,
    addressCountry: site.country,
  },
  sameAs: [site.ninetyninedesigns],
  description: site.description,
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  jobTitle: "Lifestyle brand designer",
  url: site.url,
  email: site.email,
  worksFor: { "@id": `${site.url}/#organization` },
  address: {
    "@type": "PostalAddress",
    addressLocality: site.locality,
    addressCountry: site.country,
  },
  sameAs: [site.ninetyninedesigns],
  knowsAbout: [
    "Lifestyle brand design",
    "Hospitality websites",
    "Wellness brand identity",
    "Beauty DTC websites",
    "AI search optimization",
    "Schema markup",
    "Next.js development",
    "WordPress",
  ],
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#business`,
  name: site.name,
  url: site.url,
  email: site.email,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.locality,
    addressCountry: site.country,
  },
  areaServed: ["Sri Lanka", "South Asia", "Worldwide"],
  priceRange: "$$",
  paymentAccepted: ["Bank transfer", "Card"],
  founder: { "@id": `${site.url}/#person` },
  sameAs: [site.ninetyninedesigns],
};

export const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    "Website Design + Build",
    "Brand + Visual Identity",
    "AI Search Optimization",
    "Care + Growth retainers",
    "AI-Native CMS setup",
  ].map((name, i) => ({
    "@type": "Service",
    position: i + 1,
    name,
    provider: { "@id": `${site.url}/#organization` },
    serviceType: name,
  })),
};

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function jsonLdScript(payload: unknown) {
  return {
    type: "application/ld+json" as const,
    dangerouslySetInnerHTML: { __html: JSON.stringify(payload) },
  };
}
