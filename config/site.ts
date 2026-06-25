export const siteConfig = {
  name: "FitCalc Brunei",
  tagline: "Health calculators you can trust",
  description:
    "Free, accurate health, fitness and nutrition calculators for Brunei and Southeast Asia — BMI, calories, body fat, TDEE, pregnancy and more.",
  url: "https://fitcalcbrunei.com",
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
    { label: "Health", href: "/category/health" },
    { label: "Fitness", href: "/category/fitness" },
    { label: "Nutrition", href: "/category/nutrition" },
    { label: "Finance", href: "/category/finance" },
    { label: "Converters", href: "/category/converters" },
    { label: "Articles", href: "/articles" },
  ],
  footerLinks: {
    company: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
    categories: [
      { label: "Health Calculators", href: "/category/health" },
      { label: "Fitness Calculators", href: "/category/fitness" },
      { label: "Nutrition Calculators", href: "/category/nutrition" },
      { label: "Finance Calculators", href: "/category/finance" },
      { label: "Unit Converters", href: "/category/converters" },
    ],
    resources: [
      { label: "All Articles", href: "/articles" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
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
