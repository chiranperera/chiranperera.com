import { desc } from "drizzle-orm";
import { getDb, isDbConfigured } from "@/db";
import { audits } from "@/db/schema";

export const dynamic = "force-dynamic";

async function loadAudits() {
  const db = getDb();
  if (!db) return [];
  return db.select().from(audits).orderBy(desc(audits.createdAt)).limit(200);
}

export default async function AuditsPage() {
  const rows = await loadAudits();

  return (
    <>
      <h1 className="admin-h1">Audits</h1>
      {!isDbConfigured() && (
        <div className="admin-banner admin-banner--warn">
          Database not configured — no audits to show.
        </div>
      )}
      {rows.length === 0 && isDbConfigured() && (
        <div className="admin-banner">
          No audits yet. The semi-automated audit pipeline ships in Phase 5.
        </div>
      )}
      {rows.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>When</th>
              <th>Target URL</th>
              <th>Status</th>
              <th>Score</th>
              <th>Sent</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
                <td>
                  <a href={r.targetUrl} target="_blank" rel="noreferrer">
                    {r.targetUrl}
                  </a>
                </td>
                <td>
                  <span className={`badge badge--${r.status}`}>{r.status}</span>
                </td>
                <td>{r.score ?? "—"}</td>
                <td>{r.sentAt ? new Date(r.sentAt).toLocaleString() : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
