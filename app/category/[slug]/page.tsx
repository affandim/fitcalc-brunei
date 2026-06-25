import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { getCalculatorsByCategory } from "@/data/calculators";
import { Card } from "@/components/ui/card";

type PageParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: `${category.title} Calculators`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return notFound();

  const calcs = getCalculatorsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-wide text-emerald">Category</p>
      <h1 className="font-display mt-2 text-3xl font-medium sm:text-4xl">{category.title} calculators</h1>
      <p className="mt-3 max-w-xl text-foreground/60">{category.description}</p>

      {calcs.length === 0 ? (
        <p className="mt-10 text-sm text-foreground/50">
          Calculators in this category are coming soon.
        </p>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calcs.map((calc) => (
            <Link key={calc.slug} href={`/calculators/${calc.slug}`}>
              <Card className="h-full p-6 hover:-translate-y-0.5 hover:border-emerald hover:shadow-md">
                <h2 className="font-medium">{calc.title}</h2>
                <p className="mt-1.5 text-sm text-foreground/55">{calc.shortDescription}</p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
