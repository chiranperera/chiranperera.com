import * as cheerio from "cheerio";

export type ScanData = {
  fetchedAt: string;
  url: string;
  finalUrl: string;
  status: number;
  title: string | null;
  description: string | null;
  language: string | null;
  ogTags: Record<string, string>;
  twitterTags: Record<string, string>;
  jsonLd: { types: string[]; raw: unknown[] };
  headings: { h1: string[]; h2: string[] };
  hasRobotsTxt: boolean;
  hasSitemap: boolean;
  hasLlmsTxt: boolean;
  canonical: string | null;
  imageCount: number;
  altCoverage: number; // 0..1
  wordCount: number;
};

const FETCH_TIMEOUT_MS = 12_000;

async function fetchWithTimeout(url: string): Promise<Response> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, {
      signal: ac.signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; chiranperera-audit/0.1; +https://chiranperera.com/audit)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

async function probe(url: string): Promise<boolean> {
  try {
    const res = await fetchWithTimeout(url);
    return res.ok;
  } catch {
    return false;
  }
}

export async function scanSite(targetUrl: string): Promise<ScanData> {
  const url = new URL(targetUrl);
  const res = await fetchWithTimeout(url.toString());
  const finalUrl = res.url || url.toString();
  const html = await res.text();
  const $ = cheerio.load(html);

  const ogTags: Record<string, string> = {};
  $('meta[property^="og:"]').each((_, el) => {
    const k = $(el).attr("property");
    const v = $(el).attr("content");
    if (k && v) ogTags[k] = v;
  });

  const twitterTags: Record<string, string> = {};
  $('meta[name^="twitter:"]').each((_, el) => {
    const k = $(el).attr("name");
    const v = $(el).attr("content");
    if (k && v) twitterTags[k] = v;
  });

  const jsonLdRaw: unknown[] = [];
  const jsonLdTypes = new Set<string>();
  $('script[type="application/ld+json"]').each((_, el) => {
    const txt = $(el).contents().text();
    if (!txt) return;
    try {
      const parsed = JSON.parse(txt);
      jsonLdRaw.push(parsed);
      const collect = (node: unknown) => {
        if (!node || typeof node !== "object") return;
        const obj = node as Record<string, unknown>;
        if (typeof obj["@type"] === "string") jsonLdTypes.add(obj["@type"]);
        if (Array.isArray(obj["@type"]))
          (obj["@type"] as unknown[]).forEach((t) => typeof t === "string" && jsonLdTypes.add(t));
        if (Array.isArray(obj["@graph"])) (obj["@graph"] as unknown[]).forEach(collect);
      };
      if (Array.isArray(parsed)) parsed.forEach(collect);
      else collect(parsed);
    } catch {
      /* ignore unparseable LD blocks */
    }
  });

  const h1: string[] = [];
  const h2: string[] = [];
  $("h1").each((_, el) => {
    h1.push($(el).text().trim().slice(0, 200));
  });
  $("h2").each((_, el) => {
    h2.push($(el).text().trim().slice(0, 200));
  });

  const images = $("img");
  const altWithText = images.toArray().filter((el) => ($(el).attr("alt") || "").trim().length > 0);
  const altCoverage = images.length === 0 ? 1 : altWithText.length / images.length;

  const wordCount = $("body")
    .text()
    .split(/\s+/)
    .filter((w) => w.length > 1).length;

  const origin = `${url.protocol}//${url.host}`;
  const [hasRobotsTxt, hasSitemap, hasLlmsTxt] = await Promise.all([
    probe(`${origin}/robots.txt`),
    probe(`${origin}/sitemap.xml`),
    probe(`${origin}/llms.txt`),
  ]);

  return {
    fetchedAt: new Date().toISOString(),
    url: targetUrl,
    finalUrl,
    status: res.status,
    title: ($("title").first().text() || ogTags["og:title"] || null)?.trim() || null,
    description:
      ($('meta[name="description"]').attr("content") ||
        ogTags["og:description"] ||
        null)?.trim() || null,
    language: $("html").attr("lang") || null,
    ogTags,
    twitterTags,
    jsonLd: { types: [...jsonLdTypes], raw: jsonLdRaw },
    headings: { h1: h1.slice(0, 5), h2: h2.slice(0, 10) },
    hasRobotsTxt,
    hasSitemap,
    hasLlmsTxt,
    canonical: $('link[rel="canonical"]').attr("href") || null,
    imageCount: images.length,
    altCoverage: Number(altCoverage.toFixed(2)),
    wordCount,
  };
}
