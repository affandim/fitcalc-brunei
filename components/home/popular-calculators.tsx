"use client";

import Link from "next/link";
import * as Icons from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { getPopularCalculators } from "@/data/calculators";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/lib/i18n/locale-provider";
import { localizedCalculatorTitle, localizedCalculatorDescription } from "@/lib/i18n/localize";

export function PopularCalculators() {
  const popular = getPopularCalculators();
  const { t, locale } = useLocale();

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-emerald">
            {t.popular.eyebrow}
          </p>
          <h2 className="font-display mt-2 text-2xl font-medium sm:text-3xl">
            {t.popular.title}
          </h2>
        </div>
        <Link
          href="/calculators"
          className="hidden shrink-0 items-center gap-1 text-sm font-medium text-foreground/60 hover:text-emerald sm:flex"
        >
          {t.popular.viewAll} <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {popular.map((calc) => {
          const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[calc.icon] ?? Icons.Calculator;
          return (
            <Link key={calc.slug} href={`/calculators/${calc.slug}`}>
              <Card className="group h-full p-6 hover:-translate-y-0.5 hover:border-emerald hover:shadow-lg">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-medium leading-snug">{localizedCalculatorTitle(calc, locale)}</h3>
                <p className="mt-1.5 text-sm text-foreground/55">{localizedCalculatorDescription(calc, locale)}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-emerald opacity-0 transition-opacity group-hover:opacity-100">
                  {t.popular.calculate} <ArrowUpRight size={13} />
                </span>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
