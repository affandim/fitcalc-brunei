"use client";

import Link from "next/link";
import * as Icons from "lucide-react";
import { getLatestCalculators } from "@/data/calculators";
import { useLocale } from "@/lib/i18n/locale-provider";
import { localizedCalculatorTitle } from "@/lib/i18n/localize";

export function LatestCalculators() {
  const latest = getLatestCalculators();
  const { t, locale } = useLocale();

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-wide text-emerald">{t.latest.eyebrow}</p>
      <h2 className="font-display mt-2 text-2xl font-medium sm:text-3xl">{t.latest.title}</h2>

      <div className="mt-8 flex gap-4 overflow-x-auto pb-2">
        {latest.map((calc) => {
          const Icon =
            (Icons as unknown as Record<string, Icons.LucideIcon>)[calc.icon] ?? Icons.Calculator;
          return (
            <Link
              key={calc.slug}
              href={`/calculators/${calc.slug}`}
              className="group flex min-w-[230px] shrink-0 items-center gap-3 rounded-card border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-emerald hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint/15 text-emerald-deep">
                <Icon size={18} />
              </div>
              <div>
                <p className="text-sm font-medium leading-snug">{localizedCalculatorTitle(calc, locale)}</p>
                <span className="text-xs text-emerald">{t.latest.newBadge}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
