import { site } from "@/lib/site";

/**
 * llms.txt — entrypoint for LLM crawlers, formatted per the
 * llmstxt.org draft (https://llmstxt.org). Mirrors the marketing
 * promise on the homepage: this site is engineered to be cited.
 */
export function GET() {
  const body = `# ${site.name}

> ${site.description}

## About

${site.name} is a one-designer lifestyle brand design studio in ${site.locality}, ${site.country}.
Six years, fifty-plus brands. Boutique hotels, wellness retreats, beauty founders, and lifestyle
products. Every site is engineered to be cited by AI search engines from the day it ships.

## Sections

- [Home](${site.url}/) — Studio overview, services, featured work
- [Work](${site.url}/work) — Selected projects across hospitality, wellness, beauty, real estate, lifestyle products, education
- [Studio](${site.url}/studio) — Practice, principles, stack, current availability
- [Audit](${site.url}/audit) — Free AI search visibility audit; results inside 48 hours
- [Journal](${site.url}/journal) — Notes from the studio (launching May 2026)

## Services

- Website design + build (Next.js, WordPress, Shopify) — three-week flagship engagement
- Brand and visual identity systems
- AI search optimization (schema, entity clarity, llms.txt, citation-readiness)
- Care + growth retainers after launch
- AI-native CMS setup (MCP-friendly)

## Contact

- Email: ${site.email}
- Verified profile: ${site.ninetyninedesigns}
- Booking window: ${site.bookingWindow}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
