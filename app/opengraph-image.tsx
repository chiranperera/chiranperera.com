import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.name} — Lifestyle brand design studio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#070710",
          color: "#FFFFFF",
          padding: 80,
          fontFamily: "sans-serif",
          backgroundImage:
            "radial-gradient(900px 600px at 12% 8%, rgba(119,0,255,0.35), transparent 60%), radial-gradient(1000px 700px at 88% 20%, rgba(0,236,252,0.30), transparent 60%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>
          CHIRAN
          <span style={{ width: 9, height: 9, borderRadius: 999, background: "#00ECFC", display: "inline-block" }} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.0 }}>
            Brands people <span style={{ color: "#7700FF" }}>love.</span>
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              backgroundImage: "linear-gradient(90deg, #15D1FD 0%, #328BFD 45%, #6820FE 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Engineered for AI.
          </div>
          <div style={{ fontSize: 26, marginTop: 24, color: "rgba(255,255,255,0.72)", maxWidth: 880, lineHeight: 1.4 }}>
            A lifestyle brand design studio in {site.locality}, {site.country} — websites engineered to be cited by ChatGPT, Claude and Perplexity.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 20, color: "rgba(255,255,255,0.6)" }}>
          <span>{site.url.replace(/^https?:\/\//, "")}</span>
          <span style={{ color: "#00ECFC" }}>★ 5.0 from verified clients on 99designs</span>
        </div>
      </div>
    ),
    size,
  );
}
