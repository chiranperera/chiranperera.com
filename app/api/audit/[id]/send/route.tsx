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
import { sendEmail } from "@/lib/email";
import { site } from "@/lib/site";

export const maxDuration = 60;

export async function POST(
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
    .select({ audit: audits, name: inquiries.name, email: inquiries.email, industry: inquiries.industry })
    .from(audits)
    .innerJoin(inquiries, eq(audits.inquiryId, inquiries.id))
    .where(eq(audits.id, auditId))
    .limit(1);

  if (!row) return NextResponse.json({ message: "Not found" }, { status: 404 });
  if (!row.audit.scanData || !row.audit.llmResults) {
    return NextResponse.json({ message: "Audit not ready" }, { status: 409 });
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

  const firstName = row.name.split(" ")[0] || row.name;
  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#0f172a">
      <h2>Your AI search audit, ${firstName}.</h2>
      <p>Attached is your branded report for <strong>${row.audit.targetUrl}</strong>.</p>
      <p>You scored <strong>${score.total}%</strong> citation-readiness across 10 sample queries. The PDF has the breakdown, the queries, and the top fixes — prioritized by impact.</p>
      <p>Reply to this email if you want help fixing what it surfaced.</p>
      <p style="color:#475569">— Chiran<br/><a href="${site.url}" style="color:#7700ff">${site.url}</a></p>
    </div>
  `;

  await sendEmail({
    to: row.email,
    subject: `Your AI search audit — ${row.audit.targetUrl}`,
    html,
    text: `Your AI search audit for ${row.audit.targetUrl}. Score: ${score.total}%.`,
    replyTo: process.env.ADMIN_EMAIL,
    attachments: [
      {
        filename: `chiranperera-audit-${auditId}.pdf`,
        content: buffer.toString("base64"),
        contentType: "application/pdf",
      },
    ],
  });

  await db
    .update(audits)
    .set({ status: "sent", sentAt: new Date() })
    .where(eq(audits.id, auditId));

  return NextResponse.json({ ok: true });
}
