import Link from "next/link";
import { Counters } from "@/components/Counters";
import { HeroIndustries } from "@/components/HeroIndustries";
import { HeroTitle } from "@/components/HeroTitle";
import { Marquee } from "@/components/Marquee";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { ninetyninedesignsProfile, testimonials } from "@/lib/content/testimonials";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-video-wrap">
          <video autoPlay muted loop playsInline preload="auto">
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="corner tl" aria-hidden="true" />
        <div className="corner tr" aria-hidden="true" />
        <div className="corner bl" aria-hidden="true" />
        <div className="corner br" aria-hidden="true" />

        <HeroIndustries />

        <div className="hero-nebula" aria-hidden="true">
          <div className="orb">
            <div className="rings">
              <div className="ring" />
              <div className="ring r2" />
              <div className="ring r3" />
              <div className="ring r4" />
            </div>
          </div>
        </div>

        <div className="wrap hero-inner">
          <div className="hero-top">
            <div className="label">DESIGN STUDIO</div>
            <div className="hero-pill">
              <span className="p-dot" />
              Now booking {site.bookingWindow} open
            </div>
          </div>

          <div className="hero-center">
            <div className="label" style={{ textAlign: "center", letterSpacing: ".22em" }}>
              WHERE DESIGN MEETS INTELLIGENCE
            </div>
            <HeroTitle />
            <p className="hero-sub">
              I design and build websites for hotels, wellness, beauty and lifestyle brands —
              cinematic, editorial, and engineered to be cited by ChatGPT, Claude and Perplexity.
            </p>
            <div className="hero-ctas">
              <Link href="/audit" className="btn btn-primary glow">
                Get a free AI audit <span className="arrow">→</span>
              </Link>
              <a href="#featured" className="btn btn-secondary">
                See the work
              </a>
            </div>

            <div className="partners" aria-label="Trusted by">
              <span className="p-logo">Sarisara Lanka</span>
              <span className="dot-sep" />
              <span className="p-logo">Villa Kaloya</span>
              <span className="dot-sep" />
              <span className="p-logo">Lumen Skincare</span>
              <span className="dot-sep" />
              <span className="p-logo">Hiruka Wellness</span>
              <span className="dot-sep" />
              <span className="p-logo">North Point Estates</span>
            </div>
          </div>

          <aside className="hero-aside">
            <span className="aside-label">What I build</span>
            A one-designer studio shipping editorial, AI-citable websites for 50+ lifestyle brands —
            from boutique hotels to beauty founders — on Next.js and WordPress.
          </aside>

          <div className="hero-stats">
            <div className="hstat">
              <div className="hs-num">50<em>+</em></div>
              <div className="hs-lbl">Brands<br />Designed</div>
            </div>
            <div className="hstat">
              <div className="hs-num">6<em> yrs</em></div>
              <div className="hs-lbl">Studio<br />Experience</div>
            </div>
            <div className="hstat">
              <div className="hs-num">99<em>%</em></div>
              <div className="hs-lbl">Repeat<br />Client Rate</div>
            </div>
            <div className="hstat">
              <div className="hs-num">3<em> wks</em></div>
              <div className="hs-lbl">Site to<br />Launch</div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* WHAT I DO */}
      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <div className="mini-pill"><span className="p-dot" />The studio · what I do</div>
            <h2 className="display section-title">
              A studio for lifestyle brands<br />that want to be{" "}
              <span className="italic-violet">found</span>.
            </h2>
          </div>

          <div className="services-bento reveal">
            <div className="sv big">
              <span className="sv-kicker">01 · Flagship</span>
              <h3>Website Design<br />+ Build, in 3 weeks.</h3>
              <p>
                Custom websites on Next.js or WordPress — strategy, brand application, front-end,
                CMS and launch — wired for AI citation on day one.
              </p>
              <div className="schematic">
                <div className="orbit" />
                <div className="grid-lines" />
                <svg
                  className="wave-lines"
                  viewBox="0 0 300 200"
                  fill="none"
                  stroke="rgba(169,75,255,.55)"
                  strokeWidth=".6"
                >
                  <path d="M0 160 Q 80 120, 150 140 T 300 100" />
                  <path d="M0 140 Q 80 100, 150 120 T 300 80" opacity=".6" />
                  <path d="M0 120 Q 80 80, 150 100 T 300 60" opacity=".35" />
                  <path d="M0 180 Q 80 150, 150 170 T 300 130" opacity=".25" />
                </svg>
              </div>
              <div className="sv-foot">
                <div className="sv-tags">
                  <span className="t">Next.js</span>
                  <span className="t">WordPress</span>
                  <span className="t">Shopify</span>
                </div>
                <Link href="/work" className="learn">
                  Learn more <span>→</span>
                </Link>
              </div>
            </div>

            <div className="sv">
              <span className="sv-kicker">02 · Identity</span>
              <h3>Brand +<br />Visual Identity</h3>
              <p>Logos, visual systems, guidelines — the kind that don&apos;t need a refresh in 18 months.</p>
              <div className="sv-foot">
                <div className="sv-tags">
                  <span className="t">Logo</span>
                  <span className="t">Guidelines</span>
                </div>
                <Link href="/work" className="learn">→</Link>
              </div>
            </div>

            <div className="sv">
              <span className="sv-kicker">03 · AI Search</span>
              <h3>AI Search<br />Optimization</h3>
              <p>Structured so ChatGPT, Claude and Perplexity cite your brand in their answers.</p>
              <div className="sv-foot">
                <div className="sv-tags">
                  <span className="t">Schema</span>
                  <span className="t">Entity</span>
                  <span className="t">llms.txt</span>
                </div>
                <Link href="/audit" className="learn">→</Link>
              </div>
            </div>

            <div className="sv">
              <span className="sv-kicker">04 · Lifecycle</span>
              <h3>Care + Growth,<br />after launch.</h3>
              <p>Monthly retainers for the brands that want their site to keep improving, not just exist.</p>
              <div className="sv-foot">
                <div className="sv-tags">
                  <span className="t">Retainer</span>
                  <span className="t">Analytics</span>
                </div>
                <Link href="/studio" className="learn">→</Link>
              </div>
            </div>

            <div className="sv">
              <span className="sv-kicker">05 · Tooling</span>
              <h3>AI-Native<br />CMS setup.</h3>
              <p>Clean content models, MCP hooks, and editor workflows your team will actually use.</p>
              <div className="sv-foot">
                <div className="sv-tags">
                  <span className="t">CMS</span>
                  <span className="t">MCP</span>
                </div>
                <Link href="/studio" className="learn">→</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section id="featured">
        <div className="wrap">
          <div
            className="section-head reveal"
            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div className="mini-pill"><span className="p-dot" />Featured work · 2026</div>
              <h2 className="display section-title">
                Recent <span className="italic-green">work</span>.
              </h2>
            </div>
            <Link href="/work" className="btn btn-secondary">
              All projects <span className="arrow">→</span>
            </Link>
          </div>

          <div className="work-grid reveal">
            <article className="wk wide">
              <div className="wk-media">
                <div className="ph"><span className="ph-tag">[ Sarisara Lanka — hero still ]</span></div>
                <div className="wk-ov" />
                <div className="wk-play">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="wk-body">
                <div>
                  <h3 className="wk-title">Sarisara Lanka</h3>
                  <div className="wk-pills">
                    <span className="p">Travel Marketplace</span>
                    <span className="p">WordPress</span>
                    <span className="p">AI Itinerary</span>
                    <span className="p">MCP Ready</span>
                  </div>
                </div>
                <Link href="/work/sarisara-lanka" className="wk-link">
                  Case study <span>→</span>
                </Link>
              </div>
            </article>

            <article className="wk">
              <div className="wk-media">
                <div className="ph"><span className="ph-tag">[ Villa Kaloya — lobby still ]</span></div>
                <div className="wk-ov" />
              </div>
              <div className="wk-body">
                <div>
                  <h3 className="wk-title">Villa Kaloya</h3>
                  <div className="wk-pills">
                    <span className="p">Hospitality</span>
                    <span className="p">Next.js</span>
                    <span className="p">Bookings</span>
                  </div>
                </div>
                <Link href="/work/villa-kaloya" className="wk-link">→</Link>
              </div>
            </article>

            <article className="wk">
              <div className="wk-media">
                <div className="ph"><span className="ph-tag">[ Lumen Skincare — product flat-lay ]</span></div>
                <div className="wk-ov" />
              </div>
              <div className="wk-body">
                <div>
                  <h3 className="wk-title">Lumen Skincare</h3>
                  <div className="wk-pills">
                    <span className="p">Beauty</span>
                    <span className="p">Shopify</span>
                    <span className="p">Brand System</span>
                  </div>
                </div>
                <Link href="/work/lumen-skincare" className="wk-link">→</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* AUDIT LEAD MAGNET */}
      <section>
        <div className="wrap">
          <div className="audit-card reveal">
            <div>
              <div className="mini-pill" style={{ marginBottom: 20 }}>
                <span className="p-dot" />Free tool · limited capacity
              </div>
              <h2
                className="display"
                style={{ fontSize: "clamp(40px,5.4vw,72px)", marginBottom: 18 }}
              >
                Is your website <span className="italic-violet">invisible</span> to AI?
              </h2>
              <p style={{ color: "var(--t2)", fontSize: 17, maxWidth: 520 }}>
                Travelers, buyers, and clients ask ChatGPT, Claude and Perplexity for
                recommendations right now. I&apos;ll check if your brand shows up — and tell
                you how to fix it if it doesn&apos;t.
              </p>
              <ul className="a-list">
                <li>I run your domain through ChatGPT, Claude, and Perplexity</li>
                <li>Check schema, entity clarity, and citation-readiness</li>
                <li>Deliver a branded PDF within 48 hours</li>
                <li>Free. No credit card, no sales call.</li>
              </ul>
              <Link href="/audit" className="btn btn-primary glow">
                Get your free audit <span className="arrow">→</span>
              </Link>
            </div>
            <div className="audit-mock">
              <div className="m-head">
                <div className="m-logo">Chiran<span className="d" /></div>
                <div className="m-date">AUDIT · 04·24·26</div>
              </div>
              <div className="m-body">
                <div className="m-title">AI Search<br />Visibility <em>Report</em></div>
                <div className="m-row"><span>Domain</span><span className="mono">sarisaralanka.com</span></div>
                <div className="m-row"><span>ChatGPT cites</span><span className="mono">2 / 10</span></div>
                <div className="m-row"><span>Claude cites</span><span className="mono">1 / 10</span></div>
                <div className="m-row"><span>Perplexity cites</span><span className="mono">3 / 10</span></div>
                <div className="m-row"><span>Schema found</span><span className="mono">Partial</span></div>
                <div className="m-score">
                  <div className="lbl">Citation<br />Readiness</div>
                  <div className="big">34<span style={{ fontSize: 18 }}>%</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <div className="mini-pill"><span className="p-dot" />How it works</div>
            <h2 className="display section-title">
              Simple process.<br />Serious <span className="italic-green">results</span>.
            </h2>
          </div>
          <div className="process-rail reveal">
            <div className="process-grid">
              <div className="ps">
                <div className="node">01</div>
                <div className="week">30 minutes</div>
                <h4>Discovery Call</h4>
                <p>We talk about your brand, your audience, and what success looks like after launch.</p>
              </div>
              <div className="ps">
                <div className="node">02</div>
                <div className="week">Week One</div>
                <h4>Strategy + Wireframes</h4>
                <p>Content, positioning, and site architecture — with AI-search structure baked in.</p>
              </div>
              <div className="ps">
                <div className="node">03</div>
                <div className="week">Week Two</div>
                <h4>Design + Build</h4>
                <p>Visual design, front-end and CMS — built the way I&apos;d build my own studio site.</p>
              </div>
              <div className="ps">
                <div className="node">04</div>
                <div className="week">Week Three</div>
                <h4>Launch + Handover</h4>
                <p>We ship it live, you get a Loom walkthrough and 30 days of support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI SHIFT STATS */}
      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <div className="mini-pill"><span className="p-dot" />The shift · Why this matters</div>
            <h2 className="display section-title">
              Search is <span className="italic-violet">changing</span>.<br />Are you ready?
            </h2>
          </div>
          <div className="sc-grid reveal">
            <div className="sc">
              <div className="big" data-count="47">0<span className="u">%</span></div>
              <div className="desc">
                of travelers plan trips using an AI chatbot as part of their research — rising every
                quarter.
              </div>
              <div className="mini-chart">
                <div className="bar" style={{ height: "18%" }} />
                <div className="bar" style={{ height: "32%" }} />
                <div className="bar" style={{ height: "46%" }} />
                <div className="bar" style={{ height: "58%" }} />
                <div className="bar" style={{ height: "72%" }} />
                <div className="bar" style={{ height: "90%" }} />
              </div>
            </div>
            <div className="sc">
              <div className="big">
                <span className="grad-text" style={{ fontStyle: "italic" }}>1</span>{" "}
                <span style={{ color: "var(--t3)", fontStyle: "italic", fontWeight: 400, fontSize: 40 }}>in</span>{" "}
                <span data-count="4">0</span>
              </div>
              <div className="desc">
                Google searches now return an AI Overview above the first organic result.
              </div>
              <div className="mini-chart">
                <div className="bar" style={{ height: "82%" }} />
                <div className="bar" style={{ height: "28%" }} />
                <div className="bar" style={{ height: "22%" }} />
                <div className="bar" style={{ height: "26%" }} />
              </div>
            </div>
            <div className="sc">
              <div className="big" data-count="12">0<span className="u">%</span></div>
              <div className="desc">
                of small-and-midsized lifestyle sites are structurally ready to be cited by an LLM.
                The rest are invisible.
              </div>
              <div className="mini-chart">
                <div className="bar" style={{ height: "88%" }} />
                <div className="bar" style={{ height: "86%" }} />
                <div className="bar" style={{ height: "84%" }} />
                <div className="bar" style={{ height: "22%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <div className="mini-pill"><span className="p-dot" />What clients say</div>
            <h2 className="display section-title">
              Wall of <span className="italic-green">love</span>.
            </h2>
            <a
              href={ninetyninedesignsProfile.url}
              target="_blank"
              rel="noreferrer"
              className="verify-badge"
            >
              <span className="verify-dot" />
              {ninetyninedesignsProfile.starRating.toFixed(1)} ★ from{" "}
              {ninetyninedesignsProfile.totalReviews} verified reviews on 99designs
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <TestimonialsCarousel items={testimonials} />
        </div>
      </section>

      {/* FINAL CTA */}
      <section>
        <div className="wrap">
          <div className="final-card reveal">
            <div className="final-orbs" />
            <h2 className="display">
              Let&apos;s build<br />something <span className="italic-violet">unforgettable</span>.
            </h2>
            <p className="sub">Currently booking {site.bookingWindow.split("·")[0]}. {site.bookingWindow.split("·")[1]?.trim()} remaining.</p>
            <div className="ctas">
              <Link href="/audit" className="btn btn-primary glow">
                Start a project <span className="arrow">→</span>
              </Link>
              <a href={`mailto:${site.email}`} className="email-link">
                {site.email} <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Counters />
    </main>
  );
}
