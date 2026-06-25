# FitCalc Brunei

Premium health/fitness calculator platform.

## Milestone 1 — Foundation (done)

- Next.js 16 (App Router) + TypeScript + Tailwind v4
- Design token system in `app/globals.css` (emerald/sand palette, Fraunces/Inter/IBM Plex Mono fonts, the "Vital Tape" signature motif used as a divider/underline throughout)
- Dark mode via `next-themes`
- Sticky header with instant search/autocomplete, language switcher, theme toggle, mobile menu
- Footer with link columns
- Full homepage: Hero, Search, Popular Calculators, Category Grid, Featured Articles, Latest Calculators, Stats Banner, FAQ, Newsletter
- Reusable ad slot components (top banner, sidebar, in-article, sticky bottom, mobile) — placeholders ready to wire up to Adsterra
- SEO: per-page metadata, OpenGraph/Twitter cards, JSON-LD WebSite schema, `next-sitemap` (auto sitemap.xml + robots.txt on build)
- PWA manifest (`public/manifest.webmanifest`) — add real icon files at `public/icons/icon-192.png` and `icon-512.png` before shipping

## Milestone 2 — First 5 calculators (done)

Fully built with real forms, formulas, charts and long-form articles:

- **BMI Calculator** (`/calculators/bmi-calculator`)
- **Body Fat Calculator** (`/calculators/body-fat-calculator`) — US Navy method
- **BMR Calculator** (`/calculators/bmr-calculator`) — Mifflin-St Jeor
- **TDEE Calculator** (`/calculators/tdee-calculator`)
- **Calories Calculator** (`/calculators/calories-calculator`) — with macro split

Each one includes:
- React Hook Form + Zod validation
- A shared, unit-tested calculation engine (`lib/formulas.ts`, tested in `lib/formulas.test.ts`)
- Live result cards, range bars, and Recharts visualizations
- Breadcrumb + FAQPage JSON-LD schema (`components/calculators/calculator-shell.tsx`)
- Share / Print actions
- Related calculators
- A long-form, original SEO article (formula, interpretation, limitations, common mistakes, references)

The remaining 15 calculators from the original list (Muscle Mass, Lean Body Mass, FFMI, Ideal Weight,
Protein, Water Intake, Macro, Body Surface Area, Waist-to-Height Ratio, Waist-Hip Ratio, Heart Rate
Zone, Target Heart Rate, Pace, Running, Walking Calories) currently render the Milestone-1 stub page
at `/calculators/[slug]` and are the next batch to build using the same pattern.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Tests

```bash
npm run test
```

Runs the Vitest suite against the shared calculation engine.

## Build

```bash
npm run build
npm run start
```

`next-sitemap` regenerates `public/sitemap.xml` and `public/robots.txt` automatically after every build — update `siteUrl` in `next-sitemap.config.js` and `config/site.ts` once you have a real domain.

## Next steps (Milestone 3)

Build out the remaining 15 calculators using the same reusable pattern: a pure function in
`lib/formulas.ts`, a form component in `components/calculators/`, and a page in
`app/calculators/[slug]/page.tsx` using `CalculatorShell`.

