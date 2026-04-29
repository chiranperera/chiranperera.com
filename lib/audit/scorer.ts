import type { LlmResults } from "./gemini";
import type { ScanData } from "./scanner";

export type ScoreBreakdown = {
  total: number; // 0-100
  citation: number; // 0-100 (LLM)
  schema: number; // 0-100 (structured data)
  entity: number; // 0-100 (clarity / metadata)
  technical: number; // 0-100 (robots, sitemap, llms.txt, alt, canonical)
};

const STRUCTURED_TYPES = new Set([
  "Organization",
  "LocalBusiness",
  "WebSite",
  "WebPage",
  "Product",
  "Service",
  "Article",
  "BlogPosting",
  "BreadcrumbList",
  "Person",
  "Hotel",
  "LodgingBusiness",
  "Hospital",
  "MedicalBusiness",
  "FAQPage",
  "Review",
  "AggregateRating",
]);

export function scoreAudit(scan: ScanData, llm: LlmResults): ScoreBreakdown {
  // Citation: percentage of queries where the brand was mentioned (out of LLM answers).
  const queriesAnswered = llm.results.length;
  const cited = llm.results.filter((r) => r.brandMentioned).length;
  const citation = queriesAnswered > 0 ? Math.round((cited / queriesAnswered) * 100) : 0;

  // Schema: how many high-value JSON-LD types are present.
  const presentTypes = scan.jsonLd.types.filter((t) => STRUCTURED_TYPES.has(t)).length;
  const schema = Math.min(100, presentTypes * 20);

  // Entity: title + description + canonical + og:title + og:image present.
  const checks = [
    Boolean(scan.title && scan.title.length >= 8),
    Boolean(scan.description && scan.description.length >= 40),
    Boolean(scan.canonical),
    Boolean(scan.ogTags["og:title"]),
    Boolean(scan.ogTags["og:image"]),
    scan.headings.h1.length === 1, // exactly one h1 is best for entity clarity
  ];
  const entity = Math.round((checks.filter(Boolean).length / checks.length) * 100);

  // Technical: robots.txt, sitemap.xml, llms.txt, alt coverage, language tag.
  const technicalChecks = [
    scan.hasRobotsTxt,
    scan.hasSitemap,
    scan.hasLlmsTxt,
    scan.altCoverage >= 0.7,
    Boolean(scan.language),
  ];
  const technical = Math.round((technicalChecks.filter(Boolean).length / technicalChecks.length) * 100);

  // Weighted total: citation 40, schema 25, entity 20, technical 15.
  const total = Math.round(citation * 0.4 + schema * 0.25 + entity * 0.2 + technical * 0.15);

  return { total, citation, schema, entity, technical };
}

export function scoreToVerdict(score: number): { label: string; tone: "low" | "mid" | "high" } {
  if (score >= 70) return { label: "Highly visible", tone: "high" };
  if (score >= 40) return { label: "Partially visible", tone: "mid" };
  return { label: "Largely invisible", tone: "low" };
}
