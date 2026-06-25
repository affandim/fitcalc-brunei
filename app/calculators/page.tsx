import Link from "next/link";
import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "All Calculators",
  description: "Browse every health, fitness, nutrition and finance calculator on FitCalc Brunei.",
};

export default function CalculatorsIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-wide text-emerald">Directory</p>
      <h1 className="font-display mt-2 text-3xl font-medium sm:text-4xl">All calculators</h1>
      <p className="mt-3 text-foreground/60">{calculators.length} calculators live, with more added weekly.</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calc) => (
          <Link key={calc.slug} href={`/calculators/${calc.slug}`}>
            <Card className="h-full p-6 hover:-translate-y-0.5 hover:border-emerald hover:shadow-md">
              <span className="text-xs font-medium uppercase tracking-wide text-emerald">{calc.category}</span>
              <h2 className="mt-2 font-medium">{calc.title}</h2>
              <p className="mt-1.5 text-sm text-foreground/55">{calc.shortDescription}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
