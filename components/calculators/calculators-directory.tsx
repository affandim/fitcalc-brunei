"use client";

import Link from "next/link";
import { calculators } from "@/data/calculators";
import { categories } from "@/data/categories";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/lib/i18n/locale-provider";
import { localizedCalculatorTitle, localizedCalculatorDescription, localizedCategoryTitle } from "@/lib/i18n/localize";

const directoryLabels: Record<string, { eyebrow: string; title: string; count: (n: number) => string }> = {
  en: { eyebrow: "Directory", title: "All calculators", count: (n) => `${n} calculators live, with more added weekly.` },
  "ms-bn": { eyebrow: "Direktori", title: "Semua kalkulator", count: (n) => `${n} kalkulator aktif, dengan lebih banyak ditambah setiap minggu.` },
  id: { eyebrow: "Direktori", title: "Semua kalkulator", count: (n) => `${n} kalkulator aktif, dengan lebih banyak ditambahkan setiap minggu.` },
};

export function CalculatorsDirectory() {
  const { locale } = useLocale();
  const labels = directoryLabels[locale] ?? directoryLabels.en;

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-wide text-emerald">{labels.eyebrow}</p>
      <h1 className="font-display mt-2 text-3xl font-medium sm:text-4xl">{labels.title}</h1>
      <p className="mt-3 text-foreground/60">{labels.count(calculators.length)}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calc) => {
          const cat = categories.find((c) => c.slug === calc.category);
          return (
            <Link key={calc.slug} href={`/calculators/${calc.slug}`}>
              <Card className="h-full p-6 hover:-translate-y-0.5 hover:border-emerald hover:shadow-md">
                <span className="text-xs font-medium uppercase tracking-wide text-emerald">
                  {cat ? localizedCategoryTitle(cat, locale) : calc.category}
                </span>
                <h2 className="mt-2 font-medium">{localizedCalculatorTitle(calc, locale)}</h2>
                <p className="mt-1.5 text-sm text-foreground/55">{localizedCalculatorDescription(calc, locale)}</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
