import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import { articles } from "@/data/articles";
import { articleContentRegistry } from "@/data/article-content-registry";
import { InArticleAd } from "@/components/ads/ad-slots";
import { calculators } from "@/data/calculators";
import { buildPageMetadata } from "@/lib/seo";

type PageParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return buildPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/articles/${article.slug}`,
  });
}

export default async function ArticlePage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return notFound();

  const Content = articleContentRegistry[article.slug];
  const relatedCalculator = article.relatedCalculator
    ? calculators.find((c) => c.slug === article.relatedCalculator)
    : undefined;

  return (
    <article className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-foreground/50">
        <Link href="/" className="hover:text-emerald">Home</Link>
        <ChevronRight size={12} />
        <Link href="/articles" className="hover:text-emerald">Articles</Link>
        <ChevronRight size={12} />
        <span className="text-foreground/70 capitalize">{article.category}</span>
      </nav>

      <span className="mt-4 inline-block text-xs font-medium uppercase tracking-wide text-emerald">
        {article.category}
      </span>
      <h1 className="font-display mt-2 text-3xl font-medium sm:text-4xl">{article.title}</h1>
      <p className="mt-3 text-foreground/60">{article.excerpt}</p>
      <span className="mt-3 flex items-center gap-1.5 text-xs text-foreground/45">
        <Clock size={12} /> {article.readingMinutes} min read
      </span>

      {relatedCalculator && (
        <Link
          href={`/calculators/${relatedCalculator.slug}`}
          className="mt-6 flex items-center justify-between rounded-card border border-border bg-surface-muted/50 p-4 text-sm transition-colors hover:border-emerald"
        >
          <span>
            Try the <strong className="text-foreground">{relatedCalculator.title}</strong>
          </span>
          <ChevronRight size={16} className="text-emerald" />
        </Link>
      )}

      <div className="mt-10">
        <InArticleAd />
      </div>

      <div className="mt-10">
        {Content ? (
          <Content />
        ) : (
          <div className="rounded-card border border-dashed border-border bg-surface-muted/50 p-10 text-center text-sm text-foreground/50">
            The full article for this topic is coming soon.
          </div>
        )}
      </div>
    </article>
  );
}
