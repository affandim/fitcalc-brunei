import type { ArticleMeta } from "@/types";

export const articles: ArticleMeta[] = [
  {
    slug: "understanding-your-bmi-result",
    title: "Understanding Your BMI Result: What the Number Really Means",
    excerpt:
      "BMI is a starting point, not a diagnosis. Here's how to read your result in context.",
    category: "health",
    relatedCalculator: "bmi-calculator",
    readingMinutes: 8,
    publishedAt: "2026-01-12",
  },
  {
    slug: "tdee-vs-bmr-whats-the-difference",
    title: "TDEE vs BMR: What's the Difference and Which Should You Use?",
    excerpt:
      "Two numbers, two purposes. Learn which one should drive your nutrition plan.",
    category: "nutrition",
    relatedCalculator: "tdee-calculator",
    readingMinutes: 7,
    publishedAt: "2026-02-03",
  },
  {
    slug: "how-to-find-your-heart-rate-zones",
    title: "How to Find Your Heart Rate Zones for Smarter Training",
    excerpt:
      "Train with purpose by understanding the five zones and what each one does.",
    category: "fitness",
    relatedCalculator: "heart-rate-zone-calculator",
    readingMinutes: 6,
    publishedAt: "2026-02-18",
  },
];
