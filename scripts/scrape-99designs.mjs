#!/usr/bin/env node
/**
 * Re-snapshots the public reviews + profile metadata from
 * https://99designs.com/profiles/chiranperera/about and writes
 * a fresh JSON file to content/99designs-snapshot.json.
 *
 * The /full_reviews endpoint is gated, so only the publicly-visible
 * reviews are captured (5 of the 21 total at last check).
 *
 * Run:  node scripts/scrape-99designs.mjs
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const PROFILE_URL = "https://99designs.com/profiles/chiranperera/about";
const OUT = resolve(process.cwd(), "content/99designs-snapshot.json");

const sectionRegex = /<div class="testimonial__section">([\s\S]*?)<\/div>/g;
const citationRegex = /<div class="testimonial__citation">([\s\S]*?)<\/div>/g;
const quoteRegex = /<em>\s*"?([\s\S]*?)"?\s*<\/em>/;
const nameRegex = /<span class="display-name">([^<]+)<\/span>/;
const dateRegex = /reviewed\s+([^<]+?)<\/span>/;

const res = await fetch(PROFILE_URL, {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  },
});
if (!res.ok) {
  console.error(`Failed to fetch profile: ${res.status} ${res.statusText}`);
  process.exit(1);
}
const html = await res.text();

const sections = [];
let m;
while ((m = sectionRegex.exec(html))) {
  const q = (m[1].match(quoteRegex)?.[1] || "").trim().replace(/\s+/g, " ");
  if (q) sections.push(q);
}
const citations = [];
let n;
while ((n = citationRegex.exec(html))) {
  const name = (n[1].match(nameRegex)?.[1] || "").trim();
  const date = (n[1].match(dateRegex)?.[1] || "").trim();
  if (name) citations.push({ name, date });
}

const reviews = sections.map((quote, i) => ({
  quote,
  ...(citations[i] || { name: "Anonymous", date: "" }),
}));

writeFileSync(
  OUT,
  JSON.stringify(
    {
      capturedAt: new Date().toISOString(),
      sourceUrl: PROFILE_URL,
      count: reviews.length,
      reviews,
    },
    null,
    2,
  ),
);
console.log(`Wrote ${reviews.length} reviews to ${OUT}`);
