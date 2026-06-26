import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { InArticleAd } from "@/components/ads/ad-slots";
import { buildPageMetadata } from "@/lib/seo";

type PageParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return calculators.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { slug } = await params;
  const calc = calculators.find((c) => c.slug === slug);
  if (!calc) return {};
  return buildPageMetadata({
    title: calc.title,
    description: calc.shortDescription,
    path: `/calculators/${calc.slug}`,
  });
}

export default async function CalculatorPage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const calc = calculators.find((c) => c.slug === slug);
  if (!calc) return notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <span className="text-xs font-medium uppercase tracking-wide text-emerald">{calc.category}</span>
      <h1 className="font-display mt-2 text-3xl font-medium sm:text-4xl">{calc.title}</h1>
      <p className="mt-3 text-foreground/60">{calc.shortDescription}</p>

      <div className="mt-10 rounded-card border border-dashed border-border bg-surface-muted/50 p-10 text-center text-sm text-foreground/50">
        The interactive {calc.title.toLowerCase()} form, formula breakdown, chart and
        article are coming soon.
      </div>

      <div className="mt-8">
        <InArticleAd />
      </div>
    </div>
  );
}
