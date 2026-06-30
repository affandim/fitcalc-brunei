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

## Performance fixes (Core Web Vitals)

A PageSpeed audit showed LCP at 4.7s and FCP at 2.7s (both in "poor"/"needs improvement"
territory). Two real causes found and fixed:

1. **Oversized logo `<Image>` props (the main culprit)** — the navbar logo's `width`/`height`
   props were set to the source file's native resolution (726x200) instead of its actual
   rendered CSS size (~36px tall). Next.js uses these props to generate its responsive srcset,
   so it was fetching/serving the logo at up to **1920px wide** for an image displayed at 36px
   tall. Fixed by setting `width={160} height={44}` to match actual display size — confirmed via
   build output that requested widths dropped from 750/1920px to 256/384px (~80% less data).
2. **Oversized source files** — `logo-icon.png` (used in the footer) was 850x680px at 494KB for
   a 36px-tall icon. Resized both logo files down to ~3x their display resolution
   (`logo-horizontal.png` → 435x120 @ 51KB, `logo-icon.png` → 150x120 @ 24KB).
3. **Unused font weights/styles** — Fraunces was loading 6 font files (3 weights × normal/italic)
   but a codebase-wide check found only `font-medium` (500) is ever actually used, and italic is
   never used at all. Trimmed to a single weight/style, cutting 5 unnecessary font file
   downloads.

## LCP fix — hero text was hidden until JS finished animating it in

A second PageSpeed check after the image/font fixes showed FCP improved dramatically (2.7s →
0.9s) but LCP barely moved (4.7s → 4.3s). That gap — fast first paint, slow largest paint — is a
classic symptom of the LCP element being invisible at first render and only becoming visible
once JavaScript runs.

Found it: the homepage `Hero` component wrapped its H1 (almost certainly the single largest
element on the page) in Framer Motion with `initial={{ opacity: 0 }}`, so it rendered invisible
in the static HTML and only faded in after React hydrated and the animation library executed —
adding seconds of delay on a throttled mobile connection, exactly where Lighthouse measures LCP.

Fixed by rendering the H1, eyebrow text, subtext, and search bar as plain elements with no
entrance animation (verified the built HTML — no more `opacity:0` inline style on the H1). Kept
a light fade-in only on the non-critical stats counters below the fold-line content. A
codebase-wide check confirmed no other component has this `initial={{ opacity: 0 }}` pattern.

## LCP fix #2 — Adsterra ad iframes were competing in the critical render path

A detailed Lighthouse trace (after the Hero fix above) pinpointed the H1 as the confirmed LCP
element, with "render delay" accounting for 2,310ms of the 3.9s LCP — meaning the text itself
wasn't blocked by a resource, something else was keeping the browser too busy to paint it. The
trace's critical request chain showed two Adsterra `invoke.js` scripts (1.7s+ each) loading
*during the same window*, and Lighthouse explicitly suggested preconnecting to
`highperformanceformat.com` to save ~90ms of LCP — confirming the ad scripts were the cause.

Root cause: `TopBannerAd` and `MobileBannerAd` on the homepage rendered their ad iframe
immediately on mount, with no delay — competing for network/CPU with the critical render path
even though the ad content itself loads inside an isolated iframe.

Fixed in `components/ads/adsterra-banner.tsx`: the iframe (and its `invoke.js` request) now only
mounts after `requestIdleCallback` fires (falling back to a 200ms timeout), keeping it out of
the way until the browser has finished the critical rendering work. Verified the built HTML no
longer contains the ad script at all in the initial server-rendered markup — it's added later,
client-side, once idle.

(The Indonesian Lighthouse report also flagged a single domain redirect adding ~124ms — this is
a Vercel domain-level www/non-www redirect, not something fixable in the codebase.)

## Popunder removed

The site-wide Adsterra popunder script has been removed from `app/layout.tsx`. Remaining active
ad placements: Top Banner, Mobile Banner, and In-Article (all Adsterra banner-format, deferred
until idle — see the LCP fix sections above).

## Milestone 9 — 10 more calculators (64 total)

Filled out the categories that had the fewest calculators:

| Category | New calculators |
|---|---|
| Pregnancy (2→5) | Conception Date, Ovulation, Pregnancy Calorie |
| Children (2→5) | Child BMI (simplified), Height Velocity, Sleep Needs |
| Medical (3→5) | Anion Gap, Estimated Blood Volume |
| Education (3→5) | Weighted Average Grade (dynamic rows), Attendance Percentage |

All 9 categories now have at least 5 calculators. New tests bring the total to **82 passing unit
tests** across 5 engine files.

## IndexNow verification

`public/dbb76988cb884396bfd2679a058d2eed.txt` hosts the IndexNow API key at the site root
(`https://calckoo.com/dbb76988cb884396bfd2679a058d2eed.txt`), required by Bing/Yandex's
IndexNow protocol for instant indexing notifications (push new/updated URLs instead of waiting
for the next crawl).

## IndexNow bulk submission script

`scripts/submit-indexnow.mjs` finds every calculator, category, article, and static page URL
(by reading the slugs straight out of the `data/*.ts` files — no extra dependency needed) and
submits them all in one batch to IndexNow, which fans the notification out to Bing, Yandex, and
other participating search engines for near-instant crawl requests instead of waiting on their
normal schedule.

```bash
npm run submit:indexnow            # submit all URLs
npm run submit:indexnow -- --dry-run   # just print the URL list without submitting
```

Run this locally (or in CI) after deploying new content — the sandbox this was built in can't
reach `api.indexnow.org` directly, so the live submission itself hasn't been tested end-to-end,
only the URL-discovery logic (confirmed finding all 86 current URLs correctly in dry-run mode).

## Popunder — now triggers on the 2nd click, not the 1st

Re-added the Adsterra popunder, but via a new `components/ads/delayed-popunder.tsx` component
instead of a plain `next/script` tag. Most popunder scripts attach their own click listener as
soon as they load and fire on the very next click — meaning a naive setup fires on a visitor's
*first* click on the page.

`DelayedPopunder` counts clicks itself first, and only injects the actual ad script once the
configured threshold (`armAfterClicks`, currently `1`) has passed — so the network's own
listener isn't armed until after the visitor's first click, and fires on their second instead.
Verified in the built HTML that no `<script src=".../1ac47bd9...">` tag exists in the initial
markup — only the URL string appears, embedded as a React prop for client-side hydration; the
actual script tag is injected by `DelayedPopunder`'s click handler at runtime.

This also keeps it out of the critical render path (same LCP concern as the banner ads earlier),
since nothing loads until after the page is already interactive and the visitor has clicked once.

## Milestone 10 — 10 new how-to articles (16 total)

Added based on a user-supplied keyword list, all written as original how-to/search-style
content, each linking to its most relevant calculator:

1. How to Calculate BMI Correctly → BMI Calculator
2. How Many Calories Do You Need to Lose Weight? → Calories Calculator
3. How to Save Money for a House Down Payment → Savings Goal Calculator
4. How to Calculate Your Daily Calorie Needs → TDEE Calculator
5. How to Figure Out Your Ideal Body Weight → Ideal Weight Calculator
6. How Much Should You Save Each Month? → Savings Goal Calculator
7. How to Calculate Mortgage Payments Before Buying a Home → Loan EMI Calculator
8. How to Create a Budget That Actually Works → Net Worth Calculator
9. How to Calculate Your Body Fat Percentage → Body Fat Calculator
10. How to Estimate Your Retirement Savings Goal → Compound Interest Calculator

Content lives in `components/articles/article-content-3.tsx` and `article-content-4.tsx`,
registered in `data/article-content-registry.tsx` — same pattern as the original 6 articles.
Still English-only, consistent with the documented i18n scope decision.

## AI indexing / GEO setup

Two changes to help AI assistants and AI-powered search (ChatGPT, Claude, Perplexity, Google AI
Overviews, etc.) find, crawl, and cite Calckoo content:

1. **`next-sitemap.config.js`** now explicitly allows the major AI crawlers in `robots.txt`
   (GPTBot, ChatGPT-User, ClaudeBot, anthropic-ai, Claude-Web, PerplexityBot, Google-Extended,
   Applebot-Extended, CCBot, Bytespider) — on top of the pre-existing wildcard `Allow: /` that
   was already permitting them implicitly. Verified the generated `robots.txt` lists all 10
   explicitly.
2. **`public/llms.txt`** — an emerging convention (see llmstxt.org) similar to `robots.txt` but
   aimed at LLMs: a single markdown file summarizing what the site is and linking every
   calculator, grouped by category, so an AI system can understand the full site structure
   without needing to crawl 86 individual pages. Auto-generatable from `data/calculators.ts` and
   `data/categories.ts` (see the inline script used to build it — worth turning into a proper
   `scripts/generate-llms-txt.mjs` once content stabilizes, similar to `submit-indexnow.mjs`).

Note: getting *crawled* (covered above) is different from getting *cited* by an AI's live
answers, which depends much more on content quality, originality, and the site already ranking
well in the underlying search index (Bing, in Perplexity/Copilot's case) that the AI tool draws
from — there's no separate "AI index" to submit to beyond standard SEO plus these two crawler-
access steps.

## Analytics

Two analytics tools now installed and **verified working**:

1. **Vercel Analytics** (`@vercel/analytics/next`) — no separate account needed, tied directly
   to the Vercel project. Enable it in the Vercel dashboard (Project → Analytics tab → Enable).
2. **Google Analytics (GA4)** — measurement ID `G-WNFRCTHPCS`, stream confirmed live and
   detected by Google.

GA4 initially failed Google's "tag detected" check after deploying with
`strategy="afterInteractive"`. Root cause: that strategy injects the script client-side via JS
*after* the initial render, so a simple checker that fetches raw HTML without executing
JavaScript never sees it — even though it works fine for real browser visitors. Switched both
`<Script>` tags to `strategy="beforeInteractive"`, which Next.js renders directly into the
initial server-rendered HTML — verified the script appears in the raw build output, and Google's
verification subsequently passed (stream ID `15167620347` confirmed active).

## Milestone 11 — 5 more pregnancy & fertility calculators (69 total)

Pregnancy category expanded from 5 to 10 calculators:

| Calculator | What it does |
|---|---|
| Menstrual Cycle Calculator | Predicts next period, following period, and ovulation date |
| Pregnancy Test Calculator | Earliest possible vs. most reliable day to test |
| IVF Due Date Calculator | Due date from embryo transfer date (day-3 or day-5) |
| Implantation Calculator | Estimated implantation window (6-10 days post-ovulation) |
| Pregnancy Weeks to Months Calculator | Converts weeks pregnant into months + trimester |

New formula tests bring the total to **87 passing unit tests**.

## Per-category OG images

Each of the 9 categories now has its own distinct social-share preview image
(`public/og/og-{category}.png`, 1200x630) instead of sharing the single site-wide
`og-image.png`. Each one uses the same Calckoo logo and sand background, but with a
category-specific accent color and a hand-drawn icon (heart for Health, dumbbell for Fitness,
graduation cap for Education, etc.), the category title, description, and calculator count.

Generated with a Python/Pillow script (`/home/claude/og-categories/generate.py` during
development — not checked into the repo, but easy to recreate if more categories are added
later: same template, swap title/description/count/color/icon-drawing-function per category).

`lib/seo.ts`'s `buildPageMetadata` now accepts an optional `ogImage` override, and
`app/category/[slug]/page.tsx` passes the matching `/og/og-{slug}.png` for its `generateMetadata`
— verified in the build output that each category page's `og:image` tag points to its own
distinct file.

Calculator pages still use the single site-wide image for now — extending this same per-image
treatment to all 69 calculator pages (likely grouped by category rather than 69 unique images)
is a reasonable next step if needed.

## Sidebar & Sticky Bottom ad placements added

Two more ad slots are now actually placed in the layout (previously defined in
`components/ads/ad-slots.tsx` but never rendered anywhere):

- **Sidebar (300x250)** — `CalculatorShell` restructured from a single max-w-3xl column into a
  `1fr / 300px` grid on large screens (`lg:`), with the sidebar ad sticky-positioned alongside
  the calculator content as the page scrolls. Hidden entirely below `lg:` so it doesn't crowd
  mobile layouts. All 69 calculator pages get this automatically since they all go through
  `CalculatorShell`.
- **Sticky Bottom (728x90)** — added to `app/layout.tsx`, so it appears site-wide (fixed to the
  bottom of the viewport, same pattern as the existing top/mobile banners).

Both currently render their dashed placeholder (no Adsterra key assigned yet) — fill in
`adsterraKeys.sidebar` and `adsterraKeys.stickyBottom` in `components/ads/ad-slots.tsx` once
those ad units exist in the Adsterra dashboard, following the same pattern as the other 3 active
placements.

## All 5 Adsterra banner placements now active

Sticky Bottom is now live too, at **468x60** (728x90 was unavailable for the same reason
Sidebar's 300x250 was — Adsterra's dashboard had already locked those sizes from an earlier
creation). Updated `StickyBottomAd` in `components/ads/ad-slots.tsx` to the real dimensions.

Full active placement summary:

| Slot | Size | Location |
|---|---|---|
| Top Banner | 728x90 | Homepage, desktop |
| Mobile Banner | 320x50 | Homepage, mobile |
| In-Article | 300x250 | All 69 calculator pages + 6 standalone articles |
| Sidebar | 160x600 | All 69 calculator pages, sticky, desktop only |
| Sticky Bottom | 468x60 | Every page, fixed to viewport bottom, desktop only |

Plus the click-delayed Popunder (`components/ads/delayed-popunder.tsx`, fires on the visitor's
2nd click). All Adsterra placements are deferred until the browser is idle, keeping them out of
the critical render path established during the earlier LCP fixes.

## Full Adsterra refresh after domain typo fix

After fixing the "caclkoo.com" → "calckoo.com" typo in the Adsterra account, the user generated
a complete fresh set of ad units. Several changes:

1. **Replaced 3 existing keys** (Top Banner, In-Article, Mobile Banner) with new ones — the old
   keys were potentially created while the account still had the misspelled domain, so they
   were swapped for the freshly-generated, confirmed-correct-domain versions.
2. **Sidebar (160x600) and Sticky Bottom (468x60)** keys were re-supplied identically to before
   — left unchanged, since matching keys suggest those specific zones weren't affected by the
   domain fix.
3. **New formats added**:
   - **Popunder** — script URL updated to the new one (old one fully removed; verified via
     build output it no longer appears anywhere).
   - **Native Banner** — new component `components/ads/native-banner-ad.tsx`, using Adsterra's
     div+script pattern (no iframe isolation needed here, since this format doesn't rely on
     `document.write`). Placed on the homepage between Popular Calculators and Category Grid.
   - **Social Bar** — new component `components/ads/social-bar-ad.tsx`, a site-wide
     self-rendering floating unit (similar mechanism to the popunder script), added to
     `app/layout.tsx`. Both load only after the browser is idle, consistent with every other
     Adsterra placement on the site, to stay out of the critical render path.
   - **Smartlink** — a bare URL (not a script), which Adsterra typically expects to be opened by
     a deliberate, clearly-labeled user action (e.g. a "Sponsored" button or link) rather than
     auto-triggered. Not implemented yet — flagged for the user to decide where, if anywhere, a
     clearly-labeled sponsored link would make sense, consistent with not implementing anything
     that disguises an ad as calculator functionality.
4. **Unused 160x300 banner key** (`acf5d804516d9b578586fffdb49070a8`) noted in
   `adsterraKeys.unusedBanner160x300` but not yet assigned to a placement.

## Next steps (Milestone 12)

Build out remaining content depth: 500+ SEO articles, unit converters (50+), translated
versions of the long-form articles/FAQs, real PWA icons, and og-image.png.
