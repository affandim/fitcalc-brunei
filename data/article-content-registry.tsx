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
import {
  HowToCalculateBmiArticle,
  HowManyCaloriesToLoseWeightArticle,
  HowToSaveForDownPaymentArticle,
  HowToCalculateDailyCalorieNeedsArticle,
  HowToFindIdealBodyWeightArticle,
} from "@/components/articles/article-content-3";
import {
  HowMuchToSaveEachMonthArticle,
  HowToCalculateMortgagePaymentsArticle,
  HowToCreateABudgetArticle,
  HowToCalculateBodyFatPercentageArticle,
  HowToEstimateRetirementSavingsArticle,
} from "@/components/articles/article-content-4";

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
  "how-to-calculate-bmi-correctly": HowToCalculateBmiArticle,
  "how-many-calories-to-lose-weight": HowManyCaloriesToLoseWeightArticle,
  "how-to-save-for-a-house-down-payment": HowToSaveForDownPaymentArticle,
  "how-to-calculate-daily-calorie-needs": HowToCalculateDailyCalorieNeedsArticle,
  "how-to-find-your-ideal-body-weight": HowToFindIdealBodyWeightArticle,
  "how-much-should-you-save-each-month": HowMuchToSaveEachMonthArticle,
  "how-to-calculate-mortgage-payments": HowToCalculateMortgagePaymentsArticle,
  "how-to-create-a-budget-that-works": HowToCreateABudgetArticle,
  "how-to-calculate-body-fat-percentage": HowToCalculateBodyFatPercentageArticle,
  "how-to-estimate-retirement-savings-goal": HowToEstimateRetirementSavingsArticle,
};
