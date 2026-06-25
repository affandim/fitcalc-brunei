import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articles } from "@/data/articles";
import { InArticleAd } from "@/components/ads/ad-slots";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return notFound();

  return (
    <article className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">
      <span className="text-xs font-medium uppercase tracking-wide text-emerald">{article.category}</span>
      <h1 className="font-display mt-2 text-3xl font-medium sm:text-4xl">{article.title}</h1>
      <p className="mt-3 text-foreground/60">{article.excerpt}</p>

      <InArticleAd />

      <div className="mt-8 rounded-card border border-dashed border-border bg-surface-muted/50 p-10 text-center text-sm text-foreground/50">
        The full 1,500–2,500 word article ships alongside its calculator in Milestone 2.
      </div>
    </article>
  );
}
