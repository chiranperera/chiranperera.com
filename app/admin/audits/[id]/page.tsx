import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { getDb } from "@/db";
import { audits, inquiries } from "@/db/schema";
import type { LlmResults } from "@/lib/audit/gemini";
import type { ScanData } from "@/lib/audit/scanner";
import { scoreAudit, scoreToVerdict } from "@/lib/audit/scorer";
import { AuditActions } from "./AuditActions";

export const dynamic = "force-dynamic";

export default async function AuditDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const auditId = Number(id);
  const db = getDb();
  if (!db) {
    return (
      <>
        <h1 className="admin-h1">Audit #{id}</h1>
        <div className="admin-banner admin-banner--warn">
          Database not configured.
        </div>
      </>
    );
  }
  const [row] = await db
    .select({ audit: audits, name: inquiries.name, email: inquiries.email, industry: inquiries.industry })
    .from(audits)
    .innerJoin(inquiries, eq(audits.inquiryId, inquiries.id))
    .where(eq(audits.id, auditId))
    .limit(1);
  if (!row) notFound();

  const scan = row.audit.scanData as ScanData | null;
  const llm = row.audit.llmResults as LlmResults | null;
  const score = scan && llm ? scoreAudit(scan, llm) : null;
  const verdict = score ? scoreToVerdict(score.total) : null;

  return (
    <>
      <h1 className="admin-h1">Audit #{auditId}</h1>

      <table className="admin-table" style={{ marginBottom: 24 }}>
        <tbody>
          <tr><th>Status</th><td><span className={`badge badge--${row.audit.status}`}>{row.audit.status}</span></td></tr>
          <tr><th>Target URL</th><td><a href={row.audit.targetUrl} target="_blank" rel="noreferrer">{row.audit.targetUrl}</a></td></tr>
          <tr><th>Requester</th><td>{row.name} · <a href={`mailto:${row.email}`}>{row.email}</a></td></tr>
          <tr><th>Industry</th><td>{row.industry}</td></tr>
          <tr><th>Created</th><td>{new Date(row.audit.createdAt).toLocaleString()}</td></tr>
          {row.audit.sentAt && (
            <tr><th>Sent</th><td>{new Date(row.audit.sentAt).toLocaleString()}</td></tr>
          )}
        </tbody>
      </table>

      <AuditActions
        auditId={auditId}
        canRun={["pending", "failed"].includes(row.audit.status)}
        canSend={row.audit.status === "ready"}
      />

      {score && verdict && (
        <>
          <div className="admin-stats" style={{ marginTop: 24 }}>
            <div className="admin-stat">
              <div className="admin-stat-label">Total · {verdict.label}</div>
              <div className="admin-stat-num">{score.total}%</div>
            </div>
            <div className="admin-stat">
              <div className="admin-stat-label">Citation</div>
              <div className="admin-stat-num">{score.citation}</div>
            </div>
            <div className="admin-stat">
              <div className="admin-stat-label">Schema</div>
              <div className="admin-stat-num">{score.schema}</div>
            </div>
            <div className="admin-stat">
              <div className="admin-stat-label">Entity</div>
              <div className="admin-stat-num">{score.entity}</div>
            </div>
            <div className="admin-stat">
              <div className="admin-stat-label">Technical</div>
              <div className="admin-stat-num">{score.technical}</div>
            </div>
          </div>
        </>
      )}

      {scan && (
        <>
          <h2 className="admin-h1" style={{ fontSize: 22, marginTop: 32 }}>Scan</h2>
          <pre style={{ padding: 16, background: "#0F172A", color: "#E2E8F0", borderRadius: 10, overflow: "auto", fontSize: 12, lineHeight: 1.5 }}>
            {JSON.stringify(scan, null, 2)}
          </pre>
        </>
      )}

      {llm && (
        <>
          <h2 className="admin-h1" style={{ fontSize: 22, marginTop: 32 }}>Citation results · {llm.engine}</h2>
          <p style={{ color: "var(--t3)", fontSize: 13, marginBottom: 12 }}>{llm.modelNotes}</p>
          {llm.results.map((r, i) => (
            <div key={i} style={{ padding: 14, background: "#fff", border: "1px solid var(--border)", borderRadius: 10, marginBottom: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Q{i + 1}. {r.query}</div>
              <div style={{ color: "var(--t2)", fontSize: 13, marginBottom: 6 }}>{r.rawAnswer}</div>
              {r.brandMentioned ? (
                <div style={{ color: "#1F8000", fontSize: 12, fontWeight: 700 }}>✓ Brand cited</div>
              ) : (
                <div style={{ color: "#A61828", fontSize: 12, fontWeight: 700 }}>
                  ✗ Not cited{r.competitorsMentioned.length > 0 ? ` · competitors: ${r.competitorsMentioned.join(", ")}` : ""}
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {row.audit.adminNotes && (
        <>
          <h2 className="admin-h1" style={{ fontSize: 22, marginTop: 32 }}>Admin notes</h2>
          <pre style={{ padding: 14, background: "#FFFBEA", border: "1px solid #F0E0A0", borderRadius: 10, fontSize: 13, whiteSpace: "pre-wrap" }}>
            {row.audit.adminNotes}
          </pre>
        </>
      )}
    </>
  );
}
