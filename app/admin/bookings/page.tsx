import { desc } from "drizzle-orm";
import { getDb, isDbConfigured } from "@/db";
import { bookings } from "@/db/schema";

export const dynamic = "force-dynamic";

async function loadBookings() {
  const db = getDb();
  if (!db) return [];
  return db.select().from(bookings).orderBy(desc(bookings.slotStart)).limit(200);
}

export default async function BookingsPage() {
  const rows = await loadBookings();

  return (
    <>
      <h1 className="admin-h1">Bookings</h1>
      {!isDbConfigured() && (
        <div className="admin-banner admin-banner--warn">
          Database not configured — no bookings to show.
        </div>
      )}
      {rows.length === 0 && isDbConfigured() && (
        <div className="admin-banner">
          No bookings yet. The interactive booking calendar ships in Phase 4.
        </div>
      )}
      {rows.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Slot</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Brief</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{new Date(r.slotStart).toLocaleString()}</td>
                <td>{r.name}</td>
                <td>
                  <a href={`mailto:${r.email}`}>{r.email}</a>
                </td>
                <td>
                  <span className={`badge badge--${r.status}`}>{r.status}</span>
                </td>
                <td>{r.projectBrief?.slice(0, 80) ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
