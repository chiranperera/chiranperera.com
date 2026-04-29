import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { audits, inquiries } from "@/db/schema";
import { runCitationTest } from "./gemini";
import { scanSite } from "./scanner";
import { scoreAudit } from "./scorer";

export type RunResult =
  | { ok: true; auditId: number; score: number }
  | { ok: false; status: number; message: string };

/**
 * Runs the full audit pipeline for a single audit row:
 *   1. Scan the target URL with cheerio (≈5-10s).
 *   2. Run the Gemini citation test (single batched call, ≈10-25s).
 *   3. Score the result.
 *   4. Persist scan_data + llm_results + score and set status=ready.
 *
 * The Vercel function timeout (60s on Hobby, 300s on Pro) is the
 * upper bound — for a typical lifestyle brand site we measure ~25-40s
 * end to end. If a site times out, the audit row is marked `failed`.
 */
export async function runAudit(auditId: number): Promise<RunResult> {
  const db = getDb();
  if (!db) {
    return { ok: false, status: 503, message: "Database not configured." };
  }

  const [row] = await db
    .select({
      audit: audits,
      industry: inquiries.industry,
      name: inquiries.name,
    })
    .from(audits)
    .innerJoin(inquiries, eq(audits.inquiryId, inquiries.id))
    .where(eq(audits.id, auditId))
    .limit(1);

  if (!row) return { ok: false, status: 404, message: "Audit not found." };

  await db
    .update(audits)
    .set({ status: "scanning" })
    .where(eq(audits.id, auditId));

  try {
    const scan = await scanSite(row.audit.targetUrl);
    const brand =
      scan.title?.split("|")[0].split("·")[0].split("—")[0].trim() ||
      row.name ||
      new URL(row.audit.targetUrl).hostname;
    const llm = await runCitationTest({
      brand,
      industry: row.industry,
      url: row.audit.targetUrl,
    });
    const score = scoreAudit(scan, llm);

    await db
      .update(audits)
      .set({
        status: "ready",
        scanData: scan,
        llmResults: llm,
        score: score.total,
      })
      .where(eq(audits.id, auditId));

    return { ok: true, auditId, score: score.total };
  } catch (err) {
    console.error("[audit] run failed", err);
    await db
      .update(audits)
      .set({
        status: "failed",
        adminNotes: err instanceof Error ? err.message : String(err),
      })
      .where(eq(audits.id, auditId));
    return { ok: false, status: 500, message: "Audit pipeline failed." };
  }
}

export function buildTopFixes(args: {
  brand: string;
  scan: import("./scanner").ScanData;
  llm: import("./gemini").LlmResults;
}): Array<{ title: string; description: string }> {
  const fixes: Array<{ title: string; description: string }> = [];
  if (!args.scan.jsonLd.types.includes("Organization")) {
    fixes.push({
      title: "Add Organization JSON-LD",
      description: `${args.brand} should declare a top-level Organization schema with name, url, logo, sameAs, and address. This is the single highest-leverage change for AI citation.`,
    });
  }
  if (!args.scan.hasLlmsTxt) {
    fixes.push({
      title: "Publish an llms.txt",
      description: "Add /llms.txt at the site root to give LLM crawlers a clean entry-point with brand description, key sections, and primary services.",
    });
  }
  if (!args.scan.hasSitemap) {
    fixes.push({
      title: "Publish sitemap.xml",
      description: "A sitemap helps both classic search and AI crawlers discover your full content surface. Generate it from your CMS or build pipeline.",
    });
  }
  if (args.scan.altCoverage < 0.7) {
    fixes.push({
      title: "Improve image alt text",
      description: `Only ${(args.scan.altCoverage * 100).toFixed(0)}% of images have alt text. Adding descriptive alts improves accessibility AND gives AI more context.`,
    });
  }
  if (!args.scan.canonical) {
    fixes.push({
      title: "Add canonical URLs",
      description: "Each page should declare its canonical URL so AI crawlers don't get confused by trailing slashes or query strings.",
    });
  }
  if (args.llm.results.filter((r) => r.brandMentioned).length === 0) {
    fixes.push({
      title: "Build entity authority",
      description: `${args.brand} wasn't mentioned in any of the 10 sample queries. Strengthen mentions on Wikipedia, industry directories, and high-authority publications.`,
    });
  }
  return fixes.slice(0, 5);
}
