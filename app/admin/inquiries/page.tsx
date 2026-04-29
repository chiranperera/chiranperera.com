import { desc } from "drizzle-orm";
import { getDb, isDbConfigured } from "@/db";
import { inquiries } from "@/db/schema";

export const dynamic = "force-dynamic";

async function loadInquiries() {
  const db = getDb();
  if (!db) return [];
  return db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(200);
}

export default async function InquiriesPage() {
  const rows = await loadInquiries();

  return (
    <>
      <h1 className="admin-h1">Inquiries</h1>
      {!isDbConfigured() && (
        <div className="admin-banner admin-banner--warn">
          Database not configured — no inquiries to show. Set <code>DATABASE_URL</code> to enable.
        </div>
      )}
      {rows.length === 0 && isDbConfigured() && (
        <div className="admin-banner">No inquiries yet.</div>
      )}
      {rows.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>When</th>
              <th>Name</th>
              <th>Email</th>
              <th>URL</th>
              <th>Industry</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
                <td>{r.name}</td>
                <td>
                  <a href={`mailto:${r.email}`}>{r.email}</a>
                </td>
                <td>
                  <a href={r.url} target="_blank" rel="noreferrer">
                    {r.url}
                  </a>
                </td>
                <td>{r.industry}</td>
                <td>
                  <span className={`badge badge--${r.status}`}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
