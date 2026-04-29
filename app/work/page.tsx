import type { Metadata } from "next";
import Link from "next/link";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { projects } from "@/lib/content/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected lifestyle brand websites built by Chiran Perera — boutique hotels, wellness retreats, beauty founders, real estate developers in Sri Lanka and beyond.",
  alternates: { canonical: `${site.url}/work` },
};

export default function WorkPage() {
  return (
    <main id="main">
      <section className="short-hero">
        <div className="hero-nebula" aria-hidden="true">
          <div className="orb">
            <div className="rings">
              <div className="ring" />
              <div className="ring r2" />
              <div className="ring r3" />
            </div>
          </div>
        </div>
        <div className="wrap short-hero-inner">
          <div className="mini-pill"><span className="p-dot" />Selected work · 2020–2026</div>
          <h1 className="display" style={{ marginTop: 20 }}>
            Every project,<br />every <span className="italic-violet">lesson</span>.
          </h1>
          <p style={{ maxWidth: 560, color: "var(--t2)", fontSize: 17 }}>
            A tight portfolio of lifestyle brands I&apos;ve built with — from boutique hotels in
            the hills to wellness brands ready for global launch.
          </p>
          <ProjectsGrid items={projects} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="final-card reveal">
            <div className="final-orbs" />
            <h2 className="display" style={{ fontSize: "clamp(44px,6vw,80px)" }}>
              Your brand, <span className="italic-violet">next</span>.
            </h2>
            <p className="sub">{site.bookingWindow} calendar opens May 1.</p>
            <div className="ctas">
              <Link href="/audit" className="btn btn-primary glow">
                Start a project <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
