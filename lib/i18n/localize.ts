import type { Locale } from "@/lib/i18n/dictionary";
import type { CalculatorMeta, CategoryMeta } from "@/types";

export function localizedCalculatorTitle(calc: CalculatorMeta, locale: Locale): string {
  return calc.translations?.[locale]?.title ?? calc.title;
}

export function localizedCalculatorDescription(calc: CalculatorMeta, locale: Locale): string {
  return calc.translations?.[locale]?.shortDescription ?? calc.shortDescription;
}

export function localizedCategoryTitle(category: CategoryMeta, locale: Locale): string {
  return category.translations?.[locale]?.title ?? category.title;
}

export function localizedCategoryDescription(category: CategoryMeta, locale: Locale): string {
  return category.translations?.[locale]?.description ?? category.description;
}
