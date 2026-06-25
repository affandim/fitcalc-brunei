import type { ComponentType } from "react";
import {
  UnderstandingBmiResultArticle,
  TdeeVsBmrArticle,
  HeartRateZonesArticle,
} from "@/components/articles/article-content-1";
import {
  ProteinNeedsArticle,
  WaistToHeightVsBmiArticle,
  CalorieDeficitGuideArticle,
} from "@/components/articles/article-content-2";

/**
 * Maps an article slug to its full-content component. Slugs not present
 * here fall back to a "coming soon" placeholder on the article page.
 */
export const articleContentRegistry: Record<string, ComponentType> = {
  "understanding-your-bmi-result": UnderstandingBmiResultArticle,
  "tdee-vs-bmr-whats-the-difference": TdeeVsBmrArticle,
  "how-to-find-your-heart-rate-zones": HeartRateZonesArticle,
  "how-much-protein-do-you-really-need": ProteinNeedsArticle,
  "waist-to-height-vs-bmi-which-is-better": WaistToHeightVsBmiArticle,
  "beginners-guide-to-calorie-deficits": CalorieDeficitGuideArticle,
};
