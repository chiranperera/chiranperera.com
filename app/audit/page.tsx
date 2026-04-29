import type { Metadata } from "next";
import { AuditForm } from "@/components/AuditForm";
import { Faq, type FaqItem } from "@/components/Faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free AI search audit",
  description:
    "Test how often ChatGPT, Claude and Perplexity cite your brand — and learn the top five fixes to land in their answers. Free PDF in 48 hours.",
  alternates: { canonical: `${site.url}/audit` },
};

const faqItems: FaqItem[] = [
  {
    q: "What exactly will I get?",
    a: "A branded PDF delivered to your inbox within 48 hours. It includes the visibility score across three AI engines, a schema audit, competitor comparison, entity clarity check, and a prioritized list of the top five fixes.",
  },
  {
    q: "How is this different from SEO?",
    a: "SEO optimizes for Google's blue-link results. This audit tests for something newer: whether LLMs cite your brand in their answers when a human asks them for a recommendation. Some overlap, but different rules.",
  },
  {
    q: "How do you run the audit?",
    a: "Ten representative category queries per engine, executed against ChatGPT, Claude, and Perplexity. Screenshots captured. Schema and structured-data scanned via tooling, then reviewed by hand.",
  },
  {
    q: "Is my data shared anywhere?",
    a: "Never. Your domain and business context stay between us and the audit file. I don't sell leads, don't add you to a newsletter, don't pass details to third parties.",
  },
  {
    q: "What if I don't have a website yet?",
    a: "Then the audit isn't right for you yet — the build service is. Reach out directly and we'll talk about what to launch with, wired for AI citation on day one.",
  },
  {
    q: "Do I have to buy anything after?",
    a: "No. The audit is genuinely free, with no follow-up sales call. If you want help fixing what it surfaces, the studio is here. If you'd rather fix it yourself, the PDF is written so you can.",
  },
];

const deliverables = [
  {
    title: "Visibility score across ChatGPT, Claude, Perplexity",
    desc: "Ten category queries per engine — counted, screenshotted, scored.",
  },
  {
    title: "Schema + structured data audit",
    desc: "What's present, what's missing, what to add for citation-readiness.",
  },
  {
    title: "Competitor comparison",
    desc: "Who's being cited for the queries you should own.",
  },
  {
    title: "Entity clarity check",
    desc: "Does your brand read as a clear entity, or a vague content soup?",
  },
  {
    title: "Top 5 fixes, prioritized",
    desc: "Ordered by impact, not effort. Copy-paste ready where possible.",
  },
  {
    title: "Branded PDF, in 48 hours",
    desc: "Readable by humans, actionable by developers, shareable with stakeholders.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((it) => ({
    "@type": "Question",
    name: it.q,
    acceptedAnswer: { "@type": "Answer", text: it.a },
  })),
};

export default function AuditPage() {
  return (
    <main>
      <section className="audit-hero">
        <div className="hero-nebula" aria-hidden="true" style={{ opacity: 0.7 }}>
          <div
            className="orb"
            style={{ width: "min(46vw, 520px)", transform: "translate(28vw, -8vh)" }}
          >
            <div className="rings">
              <div className="ring" />
              <div className="ring r2" />
              <div className="ring r3" />
            </div>
          </div>
        </div>

        <div className="wrap audit-hero-grid">
          <div>
            <div className="mini-pill"><span className="p-dot" />Free AI search audit</div>
            <h1 className="display">
              See where your brand<br />
              goes <span className="italic-violet">missing</span> in AI.
            </h1>
            <p className="sub">
              Travelers, buyers and clients are asking ChatGPT, Claude and Perplexity for
              recommendations right now. Is your brand in the answer?
            </p>
          </div>
          <AuditForm />
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <div className="mini-pill"><span className="p-dot" />What&apos;s inside your audit</div>
            <h2 className="display section-title">
              10 queries.<br />3 engines.<br />1 clear <span className="italic-violet">verdict</span>.
            </h2>
          </div>
          <div className="audit-card reveal" style={{ padding: 40 }}>
            <div className="deliverables">
              {deliverables.map((d) => (
                <div key={d.title} className="dv">
                  <div className="check" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="d-title">{d.title}</div>
                    <div className="d-desc">{d.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="audit-mock">
              <div className="m-head">
                <div className="m-logo">Chiran<span className="d" /></div>
                <div className="m-date">REPORT · 04·24·26</div>
              </div>
              <div className="m-body">
                <div className="m-title">AI Search<br />Visibility <em>Report</em></div>
                <div className="m-row"><span>Domain</span><span className="mono">yourbrand.com</span></div>
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

      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <div className="mini-pill"><span className="p-dot" />The shift</div>
            <h2 className="display section-title">
              Search is <span className="italic-violet">changing</span>.<br />Are you ready?
            </h2>
          </div>
          <div className="sc-grid reveal">
            <div className="sc">
              <div className="big" data-count="47">0<span className="u">%</span></div>
              <div className="desc">
                of travelers plan trips using an AI chatbot as part of their research.
              </div>
              <div className="mini-chart">
                <div className="bar" style={{ height: "20%" }} />
                <div className="bar" style={{ height: "34%" }} />
                <div className="bar" style={{ height: "48%" }} />
                <div className="bar" style={{ height: "64%" }} />
                <div className="bar" style={{ height: "78%" }} />
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
                <div className="bar" style={{ height: "26%" }} />
                <div className="bar" style={{ height: "22%" }} />
                <div className="bar" style={{ height: "28%" }} />
              </div>
            </div>
            <div className="sc">
              <div className="big" data-count="12">0<span className="u">%</span></div>
              <div className="desc">
                of lifestyle sites are structurally ready to be cited by an LLM. The rest are invisible.
              </div>
              <div className="mini-chart">
                <div className="bar" style={{ height: "88%" }} />
                <div className="bar" style={{ height: "86%" }} />
                <div className="bar" style={{ height: "84%" }} />
                <div className="bar" style={{ height: "22%" }} />
              </div>
            </div>
          </div>
          <p style={{ marginTop: 40, maxWidth: 640, color: "var(--t2)", fontSize: 16 }}>
            Sites that get cited in AI answers in 2026 will own the category. The rest will lose
            traffic quietly, for years, before they notice. The audit tells you which one
            you&apos;re on track for.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div
            className="section-head reveal"
            style={{ textAlign: "center", alignItems: "center", margin: "0 auto 48px" }}
          >
            <div className="mini-pill"><span className="p-dot" />FAQ</div>
            <h2 className="display section-title">
              Questions, <span className="italic-green">answered</span>.
            </h2>
          </div>
          <Faq items={faqItems} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="final-card reveal">
            <div className="final-orbs" />
            <h2 className="display" style={{ fontSize: "clamp(44px,6vw,82px)" }}>
              Stop being invisible.<br />Get the <span className="italic-violet">audit</span>.
            </h2>
            <p className="sub">Two minutes to fill out. 48 hours to answer. Free.</p>
            <div className="ctas">
              <a href="#audit-form" className="btn btn-primary glow">
                Request my audit <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  );
}
