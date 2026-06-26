import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { CategoryPageContent } from "@/components/calculators/category-page-content";
import { buildPageMetadata } from "@/lib/seo";

type PageParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};
  return buildPageMetadata({
    title: `${category.title} Calculators`,
    description: category.description,
    path: `/category/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return notFound();

  return <CategoryPageContent category={category} />;
}
