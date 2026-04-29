# Marketing claims — audit against verifiable evidence

Captured **2026-04-29** during Phase 2 ingestion.
Source of truth for verification: <https://99designs.com/profiles/chiranperera/about>

This document flags places where the site copy makes claims that aren't fully supported by what's currently public-verifiable. The site can still ship with these claims, but Chiran should know which need a footnote, which need to be softened, and which can be backed up with off-platform evidence.

## Claims worth a second look

| Where it appears | Site says | 99designs verifies | Recommendation |
|---|---|---|---|
| Home hero stats (`/`) | **50+ Brands Designed** | 35 projects, 21 reviews | Soften to "35+" or back up with off-platform projects (private clients, retainer work). Anything claimed in writing on the site should be defensible. |
| Home hero stats (`/`) | **6 yrs Studio Experience** | Joined 99designs **June 8, 2016** → ~10 years | Could be bumped to "9+ yrs" if Chiran wants. The current "6" undersells. |
| Home hero stats (`/`) | **99% Repeat Client Rate** | 2 repeat clients out of 35 projects (~6%) | This is the biggest gap. Either the 99designs number doesn't capture off-platform repeats, or the claim is aspirational. Recommend: replace with something verifiable, e.g. "5.0 ★ from 21 reviews" or "100% on-time delivery". |
| Home hero stats (`/`) | **3 wks Site to Launch** | Not on 99designs (off-platform) | Defensible if Chiran can point to past launches at this pace. Keep. |
| Studio (`/studio`) | **Six years. Fifty brands.** | Same as above | Same recommendation as hero stats. |
| Studio (`/studio`) | "Boutique hotels in the hill country, wellness retreats on the coast, beauty founders…" | 99designs services list: Logo design, Web page design, WordPress theme design, Logo & social media pack, Icon or button. No hospitality/wellness niche. | Could be a positioning shift Chiran is making. Real client examples should back it up before launch. |
| Audit page (`/audit`) | "I run your domain through ChatGPT, Claude, and Perplexity" | Phase 5a will ship Gemini-only first | Either ship Phase 5b before launch, OR temporarily change copy to "Gemini + schema scan" until the other engines are wired. |
| Home featured work (`/`) | Project names: Sarisara Lanka, Villa Kaloya, Lumen Skincare, Hiruka Wellness, North Point Estates, etc. | Not on the public 99designs profile | Need confirmation these are real clients with permission to be named. If aspirational/portfolio-vision rather than real, replace with verifiable names. |

## What we *can* prove right now (use these freely)

- ⭐ **5.0 / 5 from 21 reviews on 99designs** (already added as a "Verified" badge above the testimonials carousel — links back to the public profile)
- **Designer on 99designs since June 2016** (~9.5 years on platform)
- **Mid Level designer badge** with **3 contests won + 13 runner-up + 35 projects**
- Verified services on platform: logo design, web page design, WordPress theme design, identity packs

## How to refresh

The five publicly-visible reviews are checked into `content/99designs-snapshot.json`. To re-snapshot:

```bash
node scripts/scrape-99designs.mjs
```

The other 16 reviews are private (only visible to logged-in 99designs users). If Chiran wants those used on the site, he can copy-paste them into `lib/content/testimonials.ts` and add `source: "99designs"` + the original review URL.

## Testimonial carousel: 100% verified 99designs reviews

Per Chiran's request the carousel now ships only the five publicly-visible 99designs reviews — no placeholders, no fabricated quotes. Each card shows:

- ★ rating row (all five reviews are 5-star)
- The verbatim quote, truncated at 200 chars on a word boundary with a `read full ↗` link to the original review when truncation kicks in
- A bolded client name + date · category line
- The "View 21 verified reviews on 99designs ↗" CTA below the carousel

To add more testimonials later, either copy verified reviews from the gated `/full_reviews` page (manually) into `lib/content/testimonials.ts`, or capture off-platform client quotes (with written permission) and add them with `source: "in-house"`.
