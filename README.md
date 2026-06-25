# FitCalc Brunei

Premium health/fitness calculator platform — Milestone 1 (foundation).

## What's included in this milestone

- Next.js 16 (App Router) + TypeScript + Tailwind v4
- Design token system in `app/globals.css` (emerald/sand palette, Fraunces/Inter/IBM Plex Mono fonts, the "Vital Tape" signature motif used as a divider/underline throughout)
- Dark mode via `next-themes`
- Sticky header with instant search/autocomplete, language switcher, theme toggle, mobile menu
- Footer with link columns
- Full homepage: Hero, Search, Popular Calculators, Category Grid, Featured Articles, Latest Calculators, Stats Banner, FAQ, Newsletter
- Reusable ad slot components (top banner, sidebar, in-article, sticky bottom, mobile) — placeholders ready to wire up to Adsterra
- SEO: per-page metadata, OpenGraph/Twitter cards, JSON-LD WebSite schema, `next-sitemap` (auto sitemap.xml + robots.txt on build)
- PWA manifest (`public/manifest.webmanifest`) — add real icon files at `public/icons/icon-192.png` and `icon-512.png` before shipping
- Scalable data layer: `data/calculators.ts` (first 20 calculators as metadata), `data/categories.ts` (9 categories), `data/articles.ts` (seed articles)
- Stub routes for `/calculators`, `/calculators/[slug]`, `/category/[slug]`, `/articles`, `/articles/[slug]`, `/about`, `/contact`, `/privacy`, `/terms` — these get full interactive content in Milestone 2

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

`next-sitemap` regenerates `public/sitemap.xml` and `public/robots.txt` automatically after every build — update `siteUrl` in `next-sitemap.config.js` and `config/site.ts` once you have a real domain.

## Next steps (Milestone 2)

Build out the first 20 calculators with real forms (React Hook Form + Zod), formulas, charts (Recharts), result cards, FAQ schema, and the 1,500–2,500 word article for each.
