export const siteConfig = {
  name: "FitCalc Brunei",
  tagline: "Health calculators you can trust",
  description:
    "Free, accurate health, fitness and nutrition calculators for Brunei and Southeast Asia — BMI, calories, body fat, TDEE, pregnancy and more.",
  url: "https://calckoo.com",
  ogImage: "/og-image.png",
  locales: [
    { code: "en", label: "English", default: true },
    { code: "ms-bn", label: "Bahasa Melayu Brunei", default: false },
    { code: "id", label: "Bahasa Indonesia", default: false },
  ],
  links: {
    twitter: "https://twitter.com/fitcalcbrunei",
    facebook: "https://facebook.com/fitcalcbrunei",
    instagram: "https://instagram.com/fitcalcbrunei",
  },
  nav: [
    { key: "health", href: "/category/health" },
    { key: "fitness", href: "/category/fitness" },
    { key: "nutrition", href: "/category/nutrition" },
    { key: "finance", href: "/category/finance" },
    { key: "converters", href: "/category/converters" },
    { key: "articles", href: "/articles" },
  ] as const,
  footerLinks: {
    company: [
      { key: "about", href: "/about" },
      { key: "contact", href: "/contact" },
      { key: "privacy", href: "/privacy" },
      { key: "terms", href: "/terms" },
    ] as const,
    categories: [
      { key: "health", href: "/category/health" },
      { key: "fitness", href: "/category/fitness" },
      { key: "nutrition", href: "/category/nutrition" },
      { key: "finance", href: "/category/finance" },
      { key: "converters", href: "/category/converters" },
    ] as const,
    resources: [
      { key: "allArticles", href: "/articles" },
      { key: "sitemap", href: "/sitemap.xml" },
    ] as const,
  },
} as const;

/** Reusable ad slot identifiers — wired up to Adsterra placement IDs later. */
export const adSlots = {
  topBanner: "ad-top-banner",
  sidebar: "ad-sidebar",
  inArticle: "ad-in-article",
  stickyBottom: "ad-sticky-bottom",
  mobileBanner: "ad-mobile-banner",
} as const;
