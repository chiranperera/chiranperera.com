import { renderToBuffer } from "@react-pdf/renderer";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { audits, inquiries } from "@/db/schema";
import type { LlmResults } from "@/lib/audit/gemini";
import { AuditPdf } from "@/lib/audit/pdf";
import { buildTopFixes } from "@/lib/audit/runner";
import type { ScanData } from "@/lib/audit/scanner";
import { scoreAudit } from "@/lib/audit/scorer";

export const maxDuration = 30;

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const auditId = Number(id);
  if (!Number.isFinite(auditId)) {
    return NextResponse.json({ message: "Invalid audit id" }, { status: 400 });
  }

  const db = getDb();
  if (!db) return NextResponse.json({ message: "DB not configured" }, { status: 503 });

  const [row] = await db
    .select({ audit: audits, name: inquiries.name, industry: inquiries.industry })
    .from(audits)
    .innerJoin(inquiries, eq(audits.inquiryId, inquiries.id))
    .where(eq(audits.id, auditId))
    .limit(1);

  if (!row) return NextResponse.json({ message: "Not found" }, { status: 404 });
  if (!row.audit.scanData || !row.audit.llmResults) {
    return NextResponse.json({ message: "Audit not ready — run /api/audit/run first" }, { status: 409 });
  }

  const scan = row.audit.scanData as ScanData;
  const llm = row.audit.llmResults as LlmResults;
  const score = scoreAudit(scan, llm);
  const brand =
    scan.title?.split("|")[0].split("·")[0].split("—")[0].trim() ||
    row.name ||
    new URL(row.audit.targetUrl).hostname;
  const topFixes = buildTopFixes({ brand, scan, llm });

  const buffer = await renderToBuffer(
    <AuditPdf
      brand={brand}
      industry={row.industry}
      url={row.audit.targetUrl}
      generatedAt={new Date().toISOString()}
      scan={scan}
      llm={llm}
      score={score}
      topFixes={topFixes}
    />,
  );

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="audit-${auditId}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
