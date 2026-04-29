# Production launch checklist — chiranperera.com

Phase 7 of the migration plan. Everything below is action you (Chiran) need to take. Once you finish this, the site is live and the backend is fully wired.

## 1. Vercel project setup

- [ ] Sign in to Vercel and import the GitHub repo:
      <https://vercel.com/new/import?s=https://github.com/chiranperera/chiranperera.com>
- [ ] Pick the **Next.js** preset (Vercel will auto-detect).
- [ ] First deploy will succeed without any env vars — the site renders, forms degrade gracefully, admin shows "DB not configured" banners.

## 2. Provision the database

- [ ] In the Vercel dashboard for this project: **Storage → Create Database → Postgres** (Neon-backed). Use the `production` env target.
- [ ] Vercel will auto-set `DATABASE_URL` (and `DATABASE_URL_UNPOOLED` etc) on the project.
- [ ] Locally, pull the env var so you can run migrations: `vercel env pull .env.local`
- [ ] Run the initial migration: `npm run db:migrate`
- [ ] Verify with `npm run db:studio` and confirm the 6 tables (inquiries, audits, bookings, availability, admin_users + 3 enums).

## 3. Resend (transactional email)

- [ ] Create a Resend account and add `chiranperera.com` as a sending domain.
- [ ] Add the SPF + DKIM + DMARC TXT records Resend tells you to, at your DNS provider.
- [ ] Set in Vercel env vars (Production + Preview):
      `RESEND_API_KEY`, `RESEND_FROM_EMAIL=hello@chiranperera.com`
- [ ] Verify the domain in Resend.
- [ ] Send a test inquiry from the live `/audit` page → confirm both emails arrive.

## 4. Admin auth

- [ ] Generate a strong password: `openssl rand -base64 24`
- [ ] In Vercel env vars: `ADMIN_USER=chiran`, `ADMIN_PASSWORD=<paste>`
- [ ] Set `ADMIN_EMAIL=chiran887@gmail.com` (used as the audit notification recipient).
- [ ] Visit `/admin` on the live site, browser will prompt for the basic auth credentials.

## 5. Spam protection (recommended)

- [ ] Sign up for [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) — free.
- [ ] Add a new site and copy both keys.
- [ ] Set `TURNSTILE_SECRET_KEY` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in Vercel.
- [ ] (Optional follow-up) wire the Turnstile widget into `<AuditForm/>` and `<BookingCalendar/>`. The verifier is already in `lib/turnstile.ts`; we just need to render the widget client-side.

## 6. Audit engine — Phase 5a (Gemini)

- [ ] Get a Gemini API key from <https://aistudio.google.com/apikey>.
- [ ] Set `GEMINI_API_KEY` in Vercel env vars.
- [ ] Submit a real audit request from `/audit`, then in `/admin/audits/[id]` click **Run audit** → Preview PDF → Send.

## 7. Audit engine — Phase 5b (3-engine, optional)

- [ ] If you want the homepage promise of "ChatGPT, Claude and Perplexity" honored verbatim, get keys for:
      `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `PERPLEXITY_API_KEY`.
- [ ] Tell me to run Phase 5b — it adds three SDKs alongside Gemini, runs the queries in parallel, updates the score model + PDF template, and reverts the homepage copy if we softened it.

## 8. DNS — point chiranperera.com at Vercel

- [ ] In the Vercel project **Settings → Domains** add `chiranperera.com` and `www.chiranperera.com`.
- [ ] Vercel shows the exact A / AAAA / CNAME records to set at your registrar.
- [ ] Set them, wait for DNS propagation (usually <30 min, sometimes hours).
- [ ] Vercel auto-issues SSL via Let's Encrypt.

## 9. Smoke test (after DNS resolves)

Test each flow end-to-end on `https://chiranperera.com`:

- [ ] Home loads, hero video plays, all 5 pages reachable, mobile nav opens.
- [ ] `/audit` form: submit → `/admin/inquiries` shows the row → both emails arrived (admin + user).
- [ ] `/studio#book-call`: pick a date with open slots → pick a slot → submit form → `/admin/bookings` shows the row → user got confirmation email with `.ics` attached.
- [ ] `/admin/audits/[id]` for a fresh audit: click **Run audit** → succeeds in <60s → score appears → click **Preview PDF** → opens branded report → click **Send to requester** → user gets the PDF in their inbox.
- [ ] `https://chiranperera.com/llms.txt` returns a clean text file.
- [ ] `https://chiranperera.com/sitemap.xml` and `/robots.txt` resolve.
- [ ] Sharing the site on X / LinkedIn → preview shows the Open Graph image.

## 10. Marketing-claim review (do BEFORE telling the world)

See `content/MARKETING-CLAIMS-AUDIT.md`. Decide what to do about:
- "50+ brands designed" vs 35 verified on 99designs
- "99% repeat client rate" vs 2 / 35 verified
- "6 yrs studio experience" vs 9.5 yrs on 99designs
- The named portfolio brands (Sarisara Lanka, Villa Kaloya, etc.) — confirm real or replace.

## 11. Analytics + alerting (optional but recommended)

- [ ] Vercel **Web Analytics** → toggle on (free tier covers low traffic). Add `<Analytics />` from `@vercel/analytics/next` to `app/layout.tsx`.
- [ ] Vercel **Speed Insights** → toggle on for Core Web Vitals.
- [ ] Set up a Vercel email alert for build failures.

---

When you're done with steps 1-9, ping me and I'll do a final smoke-test pass + flip the marketing-claim copy based on your decisions in step 10.
