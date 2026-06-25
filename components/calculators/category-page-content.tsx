"use client";

import Link from "next/link";
import { getCalculatorsByCategory } from "@/data/calculators";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/lib/i18n/locale-provider";
import { localizedCalculatorTitle, localizedCalculatorDescription, localizedCategoryTitle, localizedCategoryDescription } from "@/lib/i18n/localize";
import type { CategoryMeta } from "@/types";

export function CategoryPageContent({ category }: { category: CategoryMeta }) {
  const { t, locale } = useLocale();
  const calcs = getCalculatorsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-wide text-emerald">{t.category.label}</p>
      <h1 className="font-display mt-2 text-3xl font-medium sm:text-4xl">
        {localizedCategoryTitle(category, locale)}
      </h1>
      <p className="mt-3 max-w-xl text-foreground/60">{localizedCategoryDescription(category, locale)}</p>

      {calcs.length === 0 ? (
        <p className="mt-10 text-sm text-foreground/50">{t.category.comingSoon}</p>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calcs.map((calc) => (
            <Link key={calc.slug} href={`/calculators/${calc.slug}`}>
              <Card className="h-full p-6 hover:-translate-y-0.5 hover:border-emerald hover:shadow-md">
                <h2 className="font-medium">{localizedCalculatorTitle(calc, locale)}</h2>
                <p className="mt-1.5 text-sm text-foreground/55">{localizedCalculatorDescription(calc, locale)}</p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
