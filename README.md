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

## Milestones 2 & 3 — All 20 calculators (done)

Every calculator from the original brief is now live with a real form, formula, result
visualization, breadcrumb + FAQ JSON-LD, share/print actions, related calculators, and an
original SEO article:

| Calculator | Formula |
|---|---|
| BMI | WHO standard |
| Body Fat | US Navy circumference method |
| Muscle Mass | Estimated from lean body mass |
| Lean Body Mass | Boer formula |
| FFMI | Fat-Free Mass Index, height-normalized |
| Ideal Weight | Devine formula |
| Calories | TDEE ± goal adjustment, with macro split |
| Protein | g/kg by activity goal |
| Water Intake | ml/kg + activity bonus |
| BMR | Mifflin-St Jeor |
| TDEE | BMR × activity multiplier |
| Macro | Custom adjustable protein/carb/fat split |
| Body Surface Area | Mosteller formula |
| Waist-to-Height Ratio | WHtR with risk bands |
| Waist-Hip Ratio | WHO gender-specific thresholds |
| Heart Rate Zone | Tanaka max HR, 5 zones |
| Target Heart Rate | Karvonen formula |
| Pace | Distance/time → pace + speed |
| Running | Riegel formula race time prediction |
| Walking Calories | MET-based estimate |

Each one includes:
- React Hook Form + Zod validation
- A shared, unit-tested calculation engine (`lib/formulas.ts`, tested in `lib/formulas.test.ts` — 24 passing tests)
- Live result cards, range bars, and Recharts visualizations
- Breadcrumb + FAQPage JSON-LD schema (`components/calculators/calculator-shell.tsx`)
- Share / Print actions
- Related calculators
- A long-form, original SEO article (formula, interpretation, limitations, common mistakes, references)

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

## Next steps (Milestone 4)

Build out remaining content depth: 500+ SEO articles, finance calculators (100+), unit
converters (50+), multi-language content (Bahasa Melayu Brunei / Bahasa Indonesia translations),
real PWA icons, and og-image.png.
