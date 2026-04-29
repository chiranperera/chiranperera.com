"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const isHomeDark = document.body.classList.contains("home-dark");
      // Flip to the opaque glass state as soon as any scroll happens so
      // nav links stay legible. The at-rest gradient is reserved for
      // y === 0 (page just loaded, hero fully framed).
      setScrolled(y > 10);

      if (isHomeDark) {
        const start = innerHeight * 0.3;
        const span = innerHeight * 0.6;
        const t = Math.max(0, Math.min(1, (y - start) / span));
        const scrim = 0.4 + (0.7 - 0.4) * t;
        document.documentElement.style.setProperty("--video-scrim", scrim.toFixed(3));
        document.documentElement.style.setProperty("--veil-strength", t.toFixed(3));
      }
    };
    // Defer the initial sync past the effect so we don't tripsetState-in-effect.
    const raf = requestAnimationFrame(onScroll);
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
        <Link
          href="/"
          className="wordmark"
          onClick={() => setMobileOpen(false)}
        >
          CHIRAN
          <span className="vdot" />
        </Link>
        <div className="nav-links">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? "active" : ""}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="nav-right">
          <div className="nav-pill">
            <span className="p-dot" />
            {site.bookingWindow}
          </div>
          <Link href="/audit" className="btn btn-primary">
            Start a project <span className="arrow">→</span>
          </Link>
          <button
            type="button"
            className="nav-burger"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="nav-mobile" role="dialog" aria-modal="true">
          <div className="nav-mobile-inner">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={pathname === l.href ? "active" : ""}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/audit" className="btn btn-primary glow" onClick={() => setMobileOpen(false)}>
              Start a project <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
