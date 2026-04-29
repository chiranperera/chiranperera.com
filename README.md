# chiranperera.com

The studio site for **Chiran Perera** — a one-designer lifestyle brand studio in Colombo, Sri Lanka. Built on Next.js 16 + React 19 + TypeScript, deployed on Vercel.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript + Turbopack |
| Styling | Vanilla CSS (preserved from the original design) + CSS Modules |
| DB | Vercel Postgres (Neon) + Drizzle ORM |
| Email | Resend + React Email |
| Auth (admin) | Auth.js v5 magic-link |
| LLM (audit + drafts) | Google Gemini (`@google/generative-ai`); ChatGPT/Claude/Perplexity in Phase 5b |
| Background jobs | QStash (Upstash) for audit runs |
| Spam | Cloudflare Turnstile |
| PDF | `@react-pdf/renderer` |
| Hosting | Vercel |

## Commands

```bash
npm run dev      # local dev (Turbopack)
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```

## Environment

See `.env.example`. Production env vars live in Vercel.

## Repo layout

```
app/        — App Router routes (home, work, studio, audit, journal, admin, api/*)
components/ — Client + server components (Hero, AmbientFX, Calendar, etc.)
lib/        — db, email, audit pipeline, auth, ics utilities
db/         — Drizzle schema + migrations
content/    — MDX projects + JSON testimonials
public/     — Static assets (hero-bg.mp4, favicon, OG fallbacks)
_legacy/    — Original single-file HTML design (reference only, do not edit)
```

## Origin of the design

`_legacy/index.html` is the original single-file design built in Claude Design. The migration preserves it byte-for-byte; the Next.js code in `app/` re-implements the same visual + interaction system as routed pages with a real backend.
