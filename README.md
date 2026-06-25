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

## Milestone 4 — Finance calculators (done)

Five finance calculators added, using the same reusable pattern and a dedicated finance
calculation engine (`lib/finance-formulas.ts`, tested in `lib/finance-formulas.test.ts` — 8
passing tests):

| Calculator | What it does |
|---|---|
| Loan EMI | Monthly payment, total interest, principal/interest breakdown |
| Compound Interest | Future value projection with monthly contributions + growth chart |
| Simple Interest | Basic interest on a principal over time |
| Savings Goal | Solves for the monthly contribution needed to hit a target |
| Investment Return | Total return and annualized (CAGR) return |

## Fixes

- **Critical bug fixed**: dynamic routes (`/category/[slug]`, `/calculators/[slug]`,
  `/articles/[slug]`) were reading `params` synchronously, but Next.js 15+ made `params` a
  Promise for page props. This caused every category page (and the articles fallback route) to
  silently 404 in production despite building successfully — `params.slug` was always
  `undefined`. All three routes now correctly `await params`.
- **Header navigation** now highlights the active section (Health/Fitness/Nutrition/Finance/
  Converters/Articles) based on the current path, both desktop and mobile menus.

## Articles — full content (6 of many planned)

`/articles` now serves complete, original long-form pieces (not calculator-page articles —
these are standalone, broader-angle pieces that link back to relevant calculators):

- Understanding Your BMI Result
- TDEE vs BMR: What's the Difference
- How to Find Your Heart Rate Zones
- How Much Protein Do You Really Need
- Waist-to-Height Ratio vs BMI
- A Beginner's Guide to Calorie Deficits

Article bodies live in `components/articles/article-content-*.tsx`, mapped to slugs via
`data/article-content-registry.tsx`. Any article slug without a registry entry falls back to a
"coming soon" placeholder rather than breaking the build — so new articles can be added
incrementally.

## Multi-language (i18n) — UI chrome (done)

The language switcher in the header is now functionally real, not cosmetic. Selecting English /
Bahasa Melayu Brunei / Bahasa Indonesia immediately re-renders the site-wide chrome in that
language and persists the choice (`localStorage`) across navigation:

- Header nav, search placeholder
- Hero section
- Homepage section headers (Popular, Categories, Articles, Latest, Stats)
- FAQ section (questions + answers)
- Newsletter section
- Footer (column headers, links, copyright line)

Implementation: `lib/i18n/dictionary.ts` (translation strings for all three locales) +
`lib/i18n/locale-provider.tsx` (React context, `useLocale()` hook, localStorage persistence).
Components needing translated text are client components calling `useLocale()` and reading
`t.<section>.<key>`.

**Scope note:** calculator forms (labels like "Height", "Weight", "Calculate") and the 6 full
article bodies remain English-only. Translating all 25 calculators and growing article set into
3 languages is a substantially larger follow-up — this milestone makes the switcher real and
covers everything site-wide outside individual calculator/article content.

## Multi-language support (3 of 3 active)

Real, working language switching — not cosmetic — across:

- **Site chrome**: nav, footer, hero, search placeholder/results, FAQ, newsletter, stats
  (already wired before this pass, via `lib/i18n/dictionary.ts` + `lib/i18n/locale-provider.tsx`)
- **Calculator & category directory data**: all 25 calculator titles/descriptions and all 9
  category titles/descriptions now have `ms-bn`/`id` translations in `data/calculators.ts` and
  `data/categories.ts`, resolved via `lib/i18n/localize.ts` with English fallback
- **Calculator pages**: breadcrumb, category badge, H1 title, description, "Related
  calculators" and "Frequently asked questions" headings all localize via `CalculatorShell`
- **`/calculators` directory and `/category/[slug]` pages**: fully localized (split into
  client components — `CalculatorsDirectory` and `CategoryPageContent` — since their parent
  `page.tsx` files stay server components for `generateMetadata`/`generateStaticParams`)

**Still English-only by design** (documented as a known, deliberate scope boundary): the long-
form calculator articles, calculator FAQ question/answer content, and the 6 standalone
`/articles` pieces. Translating ~25 articles' worth of nuanced prose accurately is a
substantially larger effort than translating UI strings and short titles, and is the natural
next phase rather than something to rush.

Language preference persists via `localStorage` (`fitcalc-locale` key) and applies instantly
across the whole site without a page reload.

## Next steps (Milestone 6)

Build out remaining content depth: 500+ SEO articles, unit converters (50+), translated
versions of the long-form articles/FAQs, real PWA icons, and og-image.png.
