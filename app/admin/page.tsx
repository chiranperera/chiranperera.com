import Link from "next/link";
import { sql } from "drizzle-orm";
import { getDb, isDbConfigured } from "@/db";
import { audits, bookings, inquiries } from "@/db/schema";

export const dynamic = "force-dynamic";

async function loadStats() {
  const db = getDb();
  if (!db) return null;
  const [inquiryCount] = await db.select({ n: sql<number>`count(*)::int` }).from(inquiries);
  const [openAudits] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(audits)
    .where(sql`${audits.status} in ('pending','scanning','drafting','ready')`);
  const [bookingCount] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(bookings)
    .where(sql`${bookings.status} in ('held','pending','confirmed')`);
  return {
    inquiries: inquiryCount?.n ?? 0,
    openAudits: openAudits?.n ?? 0,
    bookings: bookingCount?.n ?? 0,
  };
}

export default async function AdminDashboard() {
  const stats = await loadStats();

  return (
    <>
      <h1 className="admin-h1">Studio control room</h1>

      {!isDbConfigured() && (
        <div className="admin-banner admin-banner--warn">
          <strong>Database not configured.</strong> Set <code>DATABASE_URL</code> in your environment to enable inquiries, audits, and bookings. Until then, form submissions log to the server console.
        </div>
      )}

      <div className="admin-stats">
        <div className="admin-stat">
          <div className="admin-stat-label">All-time inquiries</div>
          <div className="admin-stat-num">{stats?.inquiries ?? "—"}</div>
          <Link href="/admin/inquiries">view all →</Link>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Open audits</div>
          <div className="admin-stat-num">{stats?.openAudits ?? "—"}</div>
          <Link href="/admin/audits">review →</Link>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Booking pipeline</div>
          <div className="admin-stat-num">{stats?.bookings ?? "—"}</div>
          <Link href="/admin/bookings">view →</Link>
        </div>
      </div>
    </>
  );
}
