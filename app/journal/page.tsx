import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes from the studio — essays on lifestyle brand building, AI search, and running a one-person studio. First issue May 2026.",
  alternates: { canonical: `${site.url}/journal` },
};

export default function JournalPage() {
  return (
    <main>
      <section className="short-hero">
        <div className="hero-nebula" aria-hidden="true">
          <div className="orb">
            <div className="rings">
              <div className="ring" />
              <div className="ring r2" />
            </div>
          </div>
        </div>
        <div className="wrap short-hero-inner" style={{ textAlign: "center" }}>
          <div className="mini-pill" style={{ margin: "0 auto" }}>
            <span className="p-dot" />Journal · Coming soon
          </div>
          <h1 className="display" style={{ marginTop: 24 }}>
            Notes from the <span className="italic-violet">studio</span>.
          </h1>
          <p style={{ color: "var(--t2)", fontSize: 17, maxWidth: 520, margin: "24px auto 28px" }}>
            Essays on lifestyle brand building, AI search, and running a one-person studio. First
            issue May 2026.
          </p>
          <div className="ctas" style={{ display: "flex", justifyContent: "center" }}>
            <Link href="/" className="btn btn-primary glow">
              Back home <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
