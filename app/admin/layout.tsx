import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/audits", label: "Audits" },
  { href: "/admin/bookings", label: "Bookings" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <div className="admin-brand">
          CHIRAN <span style={{ color: "var(--violet)" }}>·</span> admin
        </div>
        <nav>
          {adminNav.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="admin-side-foot">
          <Link href="/" target="_blank" rel="noreferrer">
            View site ↗
          </Link>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
