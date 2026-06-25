"use client";

import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { articles } from "@/data/articles";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/lib/i18n/locale-provider";

export function FeaturedArticles() {
  const { t } = useLocale();

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-emerald">
            {t.articlesSection.eyebrow}
          </p>
          <h2 className="font-display mt-2 text-2xl font-medium sm:text-3xl">
            {t.articlesSection.title}
          </h2>
        </div>
        <Link
          href="/articles"
          className="hidden shrink-0 items-center gap-1 text-sm font-medium text-foreground/60 hover:text-emerald sm:flex"
        >
          {t.articlesSection.viewAll} <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {articles.map((article) => (
          <Link key={article.slug} href={`/articles/${article.slug}`}>
            <Card className="h-full p-6 hover:-translate-y-0.5 hover:border-emerald hover:shadow-lg">
              <span className="text-xs font-medium uppercase tracking-wide text-emerald">
                {article.category}
              </span>
              <h3 className="font-display mt-3 text-lg leading-snug">{article.title}</h3>
              <p className="mt-2 text-sm text-foreground/55">{article.excerpt}</p>
              <span className="mt-4 flex items-center gap-1.5 text-xs text-foreground/45">
                <Clock size={12} /> {article.readingMinutes} {t.articlesSection.minRead}
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
