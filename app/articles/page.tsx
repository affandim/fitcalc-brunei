import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "@/data/articles";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Articles",
  description: "In-depth, plain-language guides behind every Calckoo calculator.",
};

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-wide text-emerald">Journal</p>
      <h1 className="font-display mt-2 text-3xl font-medium sm:text-4xl">All articles</h1>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {articles.map((a) => (
          <Link key={a.slug} href={`/articles/${a.slug}`}>
            <Card className="h-full p-6 hover:-translate-y-0.5 hover:border-emerald hover:shadow-md">
              <span className="text-xs font-medium uppercase tracking-wide text-emerald">{a.category}</span>
              <h2 className="font-display mt-2 text-lg">{a.title}</h2>
              <p className="mt-2 text-sm text-foreground/55">{a.excerpt}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
