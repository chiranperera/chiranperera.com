import { site } from "@/lib/site";

export function Marquee() {
  const items = [...site.industries, ...site.industries];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((label, i) => (
          <span key={i}>{label}</span>
        ))}
      </div>
    </div>
  );
}
