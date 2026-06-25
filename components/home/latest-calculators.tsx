import Link from "next/link";
import * as Icons from "lucide-react";
import { getLatestCalculators } from "@/data/calculators";

export function LatestCalculators() {
  const latest = getLatestCalculators();

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-wide text-emerald">Just added</p>
      <h2 className="font-display mt-2 text-2xl font-medium sm:text-3xl">Latest calculators</h2>

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
                <p className="text-sm font-medium leading-snug">{calc.title}</p>
                <span className="text-xs text-emerald">New</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
