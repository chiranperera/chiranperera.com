import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-col">
            <div className="wordmark" style={{ marginBottom: 8 }}>
              CHIRAN
              <span className="vdot" />
            </div>
            <p className="foot-tag">
              A lifestyle brand design studio. Beautiful websites, engineered for the AI search era.
            </p>
          </div>
          <div className="foot-col">
            <h5>Studio</h5>
            <ul>
              <li><Link href="/work">Work</Link></li>
              <li><Link href="/studio">Studio</Link></li>
              <li><Link href="/journal">Journal</Link></li>
              <li><Link href="/audit">Audit</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Contact</h5>
            <ul>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><Link href="/studio#booking">Schedule a call</Link></li>
              <li><a href="https://www.linkedin.com/in/chiranperera/" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href={site.ninetyninedesigns} target="_blank" rel="noreferrer">99designs ↗</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Legal</h5>
            <ul>
              <li><Link href="/legal/privacy">Privacy</Link></li>
              <li><Link href="/legal/terms">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot-small">
          <div>© {new Date().getFullYear()} {site.name}. Made with care in {site.locality}, {site.country}.</div>
          <div className="mono">v2026.04</div>
        </div>
      </div>
    </footer>
  );
}
