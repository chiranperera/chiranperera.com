import type { Metadata } from "next";
import Link from "next/link";
import { BookingCalendar } from "@/components/BookingCalendar";
import { CalendarMini } from "@/components/CalendarMini";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Inside Chiran Perera's studio — six years, fifty brands, four principles, and the stack behind every launch.",
  alternates: { canonical: `${site.url}/studio` },
};

const principles = [
  { num: "01 / PRINCIPLE", text: "Design is a commercial act." },
  { num: "02 / PRINCIPLE", text: "Speed is a feature." },
  { num: "03 / PRINCIPLE", text: "Every brand has a soul." },
  { num: "04 / PRINCIPLE", text: "Ship, then improve." },
];

const tools = [
  { name: "Claude Design", role: "Ideation, spec, mockup" },
  { name: "Claude Code", role: "Production front-end" },
  { name: "Figma", role: "Systems, handoff" },
  { name: "Next.js", role: "Custom builds" },
  { name: "WordPress", role: "Editorial sites" },
  { name: "Adobe CS", role: "Identity, print" },
  { name: "Vercel", role: "Hosting, preview" },
  { name: "Notion", role: "Brief, spec, delivery" },
];

export default function StudioPage() {
  return (
    <main id="main">
      <section className="studio-hero">
        <div className="hero-nebula" aria-hidden="true" style={{ opacity: 0.7 }}>
          <div
            className="orb"
            style={{
              width: "min(50vw, 560px)",
              transform: "translate(-28vw, -5vh)",
            }}
          >
            <div className="rings">
              <div className="ring" />
              <div className="ring r2" />
            </div>
          </div>
        </div>
        <div className="wrap" style={{ position: "relative", zIndex: 3 }}>
          <div className="studio-two">
            <div className="studio-left">
              <div className="mini-pill"><span className="p-dot" />The studio · {site.locality}, {site.country}</div>
              <h1 className="display">
                <span className="line">One designer.</span>
                <span className="line">Six years.</span>
                <span className="line">Fifty <span className="italic-violet">brands</span>.</span>
              </h1>
              <div className="story">
                <p>
                  I&apos;m Chiran. I run a small lifestyle brand design studio out of Colombo. For
                  six years I&apos;ve been quietly building websites for the kinds of brands I love —
                  boutique hotels in the hill country, wellness retreats on the coast, beauty
                  founders shipping out of their kitchens, real estate developers with something
                  actually worth selling.
                </p>
                <p>
                  The studio started the way most do: a few 99designs wins, a referral, a second
                  referral, and then suddenly 50+ brands later you realize you&apos;ve accidentally
                  built a practice. I picked a lane — lifestyle — because it&apos;s where design
                  matters most. If the site doesn&apos;t feel like the brand, the booking
                  doesn&apos;t happen.
                </p>
                <p>
                  Now there&apos;s a second shift. People ask ChatGPT, Claude and Perplexity for
                  hotel picks, product recommendations and therapists instead of opening Google.
                  Lifestyle brands that don&apos;t structure their sites for that conversation are,
                  quietly, going missing. That&apos;s the problem I&apos;m building around in 2026.
                </p>
              </div>
            </div>
            <div className="portrait">
              <span className="ph-tag">[ Portrait of Chiran · {site.locality} · 4×5 ]</span>
            </div>
          </div>

          <div className="section-head" style={{ margin: "120px 0 40px" }}>
            <div className="mini-pill"><span className="p-dot" />How I work</div>
            <h2 className="display section-title">
              Four <span className="italic-violet">principles</span>.
            </h2>
          </div>
          <div className="principles-grid reveal">
            {principles.map((p) => (
              <div key={p.num} className="pr">
                <div className="num">{p.num}</div>
                <div className="p-text">{p.text}</div>
              </div>
            ))}
          </div>

          <div className="section-head" style={{ margin: "120px 0 40px" }}>
            <div className="mini-pill"><span className="p-dot" />Tools of the trade</div>
            <h2 className="display section-title">
              The <span className="italic-green">stack</span>.
            </h2>
          </div>
          <div className="tools-grid reveal">
            {tools.map((t) => (
              <div key={t.name} className="tool">
                <div className="t-name">{t.name}</div>
                <div className="t-role">{t.role}</div>
              </div>
            ))}
          </div>

          <div id="booking" className="section-head" style={{ margin: "120px 0 40px" }}>
            <div className="mini-pill"><span className="p-dot" />Availability</div>
            <h2 className="display section-title">
              Currently booking <span className="italic-green">{site.bookingWindow.split("·")[0].trim()}</span>.
            </h2>
          </div>
          <div className="availability-wrap">
            <p style={{ color: "var(--t2)", fontSize: 17 }}>
              Two engagement slots open each quarter. Discovery calls are 30 minutes,
              weekday mornings + afternoons in Asia/Colombo. Pick a time that works —
              I&apos;ll confirm by email within one business day.
            </p>
            <div className="cal-mini">
              <CalendarMini
                year={2026}
                month={6}
                monthName="July"
                today={6}
                booked={[1, 2, 3, 13, 14, 15, 16, 17, 22, 23, 29, 30]}
              />
              <CalendarMini
                year={2026}
                month={7}
                monthName="August"
                today={0}
                booked={[3, 4, 5, 10, 11, 12, 19, 20, 26, 27, 28]}
              />
            </div>
          </div>

          <div id="book-call" className="section-head" style={{ margin: "80px 0 24px" }}>
            <div className="mini-pill"><span className="p-dot" />Book a discovery call</div>
            <h3 className="display section-title" style={{ fontSize: "clamp(28px,3.5vw,44px)" }}>
              Pick a <span className="italic-violet">slot</span>.
            </h3>
          </div>
          <BookingCalendar
            initialYear={new Date().getFullYear()}
            initialMonth={new Date().getMonth()}
          />
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="final-card reveal">
            <div className="final-orbs" />
            <h2 className="display" style={{ fontSize: "clamp(44px,6vw,82px)" }}>
              Want to work <span className="italic-violet">together</span>?
            </h2>
            <p className="sub">Start with a free AI audit, or tell me about the project.</p>
            <div className="ctas">
              <Link href="/audit" className="btn btn-primary glow">
                Start here <span className="arrow">→</span>
              </Link>
              <a href={`mailto:${site.email}`} className="email-link">
                {site.email} <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
