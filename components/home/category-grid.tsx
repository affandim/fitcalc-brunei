import Link from "next/link";
import * as Icons from "lucide-react";
import { categories } from "@/data/categories";
import { Card } from "@/components/ui/card";

export function CategoryGrid() {
  return (
    <section className="bg-surface-muted/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-wide text-emerald">
          Browse by category
        </p>
        <h2 className="font-display mt-2 text-2xl font-medium sm:text-3xl">
          Nine ways to measure your health
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => {
            const Icon =
              (Icons as unknown as Record<string, Icons.LucideIcon>)[cat.icon] ?? Icons.Calculator;
            return (
              <Link key={cat.slug} href={`/category/${cat.slug}`}>
                <Card className="group h-full p-5 hover:-translate-y-0.5 hover:border-emerald hover:shadow-md">
                  <Icon size={20} style={{ color: cat.color }} />
                  <h3 className="mt-3 font-medium">{cat.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-foreground/55">
                    {cat.description}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
