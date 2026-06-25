import type { Locale } from "@/lib/i18n/dictionary";

export type CalculatorCategory =
  | "fitness"
  | "health"
  | "nutrition"
  | "pregnancy"
  | "children"
  | "medical"
  | "finance"
  | "converters"
  | "education";

export interface CalculatorMeta {
  /** Stable identifier, also used as the URL slug under /calculators/[slug]. */
  slug: string;
  title: string;
  shortDescription: string;
  /** Translated title/shortDescription for non-English locales. Falls back to the English fields above when missing. */
  translations?: Partial<Record<Locale, { title: string; shortDescription: string }>>;
  category: CalculatorCategory;
  /** Lucide icon name, resolved in components. */
  icon: string;
  /** Marks calculators surfaced in the "Popular" homepage section. */
  popular?: boolean;
  /** Marks calculators surfaced in the "Latest" homepage section. */
  isNew?: boolean;
}

export interface CategoryMeta {
  slug: CalculatorCategory;
  title: string;
  description: string;
  /** Translated title/description for non-English locales. Falls back to the English fields above when missing. */
  translations?: Partial<Record<Locale, { title: string; description: string }>>;
  icon: string;
  color: string;
}

export interface ArticleMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: CalculatorCategory;
  relatedCalculator?: string;
  readingMinutes: number;
  publishedAt: string;
}
