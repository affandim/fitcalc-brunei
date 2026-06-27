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

## Adsterra integration

The Top Banner ad slot is live with a real Adsterra ad unit (`components/ads/adsterra-banner.tsx`
+ `components/ads/ad-slots.tsx`). The ad script is loaded inside an isolated `iframe srcDoc`,
which is the standard safe pattern for embedding `document.write`-based ad tags (like Adsterra's
`invoke.js`) inside a React-managed DOM without it interfering with hydration.

To add more ad units: create the unit in the Adsterra dashboard, copy its `key` (and `invoke.js`
host if different from `highperformanceformat.com`), then fill in the matching `null` in the
`adsterraKeys` object at the top of `components/ads/ad-slots.tsx`. Each slot falls back to a
dashed placeholder automatically until a key is provided.

A site-wide Adsterra Popunder script is also loaded once in `app/layout.tsx` via `next/script`
(`strategy="lazyOnload"`), so it doesn't block initial page render and applies across every
page automatically.

## Milestone 7 — Pregnancy, Children, Medical, Education & Converters (39 calculators total)

14 new calculators fill in the categories that were previously empty:

| Category | Calculators |
|---|---|
| Pregnancy | Due Date Calculator (Naegele's rule), Pregnancy Weight Gain (IOM guidelines) |
| Children | Child Height Predictor (mid-parental method), Child Calorie Needs (ages 3-18) |
| Medical | Blood Pressure Category (AHA), Pulse Pressure & MAP |
| Education | GPA Calculator (dynamic course list via `useFieldArray`), Study Time Planner |
| Converters | Length, Weight, Temperature, Volume, Speed, Time |

New formula engines: `lib/life-formulas.ts` (pregnancy/children/medical/education, 10 tests) and
`lib/converters.ts` (unit conversion, 10 tests) — bringing the total to **52 passing unit tests**
across 4 engine files.

The 6 converters share one generic `UnitConverterForm` component (`components/calculators/
unit-converter-form.tsx`) parameterized by a unit table — no duplicated conversion UI code.
Temperature gets its own small component since it needs an offset, not just a multiplication
factor.

## Milestone 8 — 15 more calculators (54 total)

| Category | New calculators |
|---|---|
| Health | Body Adiposity Index, Body Frame Size |
| Fitness | One Rep Max, Running Calories, Cycling Calories |
| Nutrition | Fiber Intake, Sugar Limit, Alcohol Calories |
| Finance | Tip, Discount, Net Worth, Mortgage Affordability |
| Education | Test Score / Letter Grade |
| Converters | Area, Data Storage |

New formula engine: `lib/more-formulas.ts` (8 tests), plus extensions to `lib/finance-formulas.ts`
(+5 tests), `lib/life-formulas.ts` (+2 tests), and `lib/converters.ts` (+4 tests) — bringing the
total to **71 passing unit tests** across 5 engine files and **54 calculators** across all 9
categories.

## SEO audit fixes

A self-audit of the live site found 3 real issues, now fixed:

1. **OpenGraph/Twitter metadata bug (critical)** — every page except the homepage was showing
   the homepage's `og:title`/`og:description`/`og:url` when shared on social media, because
   Next.js doesn't deep-merge `openGraph` objects between a page and its parent layout — a page
   that only overrides `title`/`description` silently inherits the *entire* parent `openGraph`
   block. Fixed by introducing `lib/seo.ts` (`buildPageMetadata`), which explicitly sets
   `openGraph` and `twitter` per page, and refactoring all 60+ page metadata exports to use it.
2. **Broken hreflang tags** — the homepage advertised `ms-BN`/`id` alternates pointing to `/ms`
   and `/id`, URLs that don't exist (the 3-language feature is client-side locale switching, not
   separate URL routes). Removed until real per-locale URLs exist.
3. **Broken SearchAction structured data** — the homepage's `WebSite` JSON-LD promised a
   `/search?q=` results page that was never built. Removed until a real search results page
   exists.

## OG image & PWA icons

All image assets referenced in `app/layout.tsx` and `public/manifest.webmanifest` now exist —
nothing left as a placeholder:

- `public/og-image.png` (1200x630) — sand background, emerald "Calc**koo**" wordmark, vital-tape
  motif, tagline, category icons.
- `public/icons/icon-192.png`, `icon-512.png`, `apple-touch-icon.png` — emerald-deep background,
  mint/white "Ck" monogram, vital-tape tick accent.

Both generated from SVG sources rendered via `sharp` (bundled with Next.js, no extra
dependency). Replace with designer-made versions anytime — the dimensions are already correct
for their respective uses (OG/Twitter card preview, PWA install icon, iOS home screen icon).

## Logo & brand assets update

Replaced the text-based "Calckoo" wordmark with a real logo (user-provided artwork: a blue 3D
"C"-shaped calculator mark + "Calckoo.com" wordmark). Processed into several derived assets:

- `public/logo-horizontal.png` — icon + wordmark side-by-side, used in the navbar (light
  background)
- `public/logo-icon.png` — icon mark only, transparent background, used in the footer (dark
  background, where the wordmark's navy text wouldn't be legible) and as the source for PWA icons
- `public/og-image.png` — regenerated using the new logo, on the site's sand background
- `public/icons/icon-192.png`, `icon-512.png`, `apple-touch-icon.png` — regenerated using the
  icon mark

Processed with Pillow: cropped the icon and wordmark from the source artwork, made the white
background transparent, and composited each into the sizes/layouts each use case needs.

## Favicon & PWA icon upgrade

Replaced `app/favicon.ico` with a proper multi-resolution ICO (16/32/48/64/128/256px) generated
from a dedicated favicon source image — a polished, app-icon-style rounded-square version of the
"C"-calculator mark with built-in glow/shadow. The same source was also used to regenerate
`public/icons/icon-192.png`, `icon-512.png`, and `apple-touch-icon.png` for sharper, more
consistent results than the earlier crop from the rectangular logo.

## Next steps (Milestone 9)

Build out remaining content depth: 500+ SEO articles, unit converters (50+), translated
versions of the long-form articles/FAQs, real PWA icons, and og-image.png.
