import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main">
      <section className="short-hero" style={{ minHeight: "70vh" }}>
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
            <span className="p-dot" />404
          </div>
          <h1 className="display" style={{ marginTop: 24 }}>
            Page <span className="italic-violet">not found</span>.
          </h1>
          <p style={{ color: "var(--t2)", fontSize: 17, maxWidth: 480, margin: "24px auto 28px" }}>
            The page you&apos;re looking for has either moved, been retired, or was never here in
            the first place.
          </p>
          <div className="ctas" style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            <Link href="/" className="btn btn-primary glow">
              Back home <span className="arrow">→</span>
            </Link>
            <Link href="/work" className="btn btn-secondary">
              See the work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
