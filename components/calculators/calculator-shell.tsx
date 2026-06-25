"use client";

import Link from "next/link";
import { ChevronRight, Printer, Share2 } from "lucide-react";
import { calculators } from "@/data/calculators";
import { categories } from "@/data/categories";
import { siteConfig } from "@/config/site";
import { useLocale } from "@/lib/i18n/locale-provider";
import {
  localizedCalculatorTitle,
  localizedCalculatorDescription,
  localizedCategoryTitle,
} from "@/lib/i18n/localize";
import type { CalculatorMeta } from "@/types";

interface FaqItem {
  question: string;
  answer: string;
}

interface CalculatorShellProps {
  calculator: CalculatorMeta;
  children: React.ReactNode; // the calculator form + result
  article: React.ReactNode; // long-form SEO article (English-only for now)
  faqs: FaqItem[]; // FAQ content (English-only for now)
}

export function CalculatorShell({ calculator, children, article, faqs }: CalculatorShellProps) {
  const { t, locale } = useLocale();
  const related = calculators
    .filter((c) => c.category === calculator.category && c.slug !== calculator.slug)
    .slice(0, 3);
  const category = categories.find((c) => c.slug === calculator.category);
  const categoryLabel = category ? localizedCategoryTitle(category, locale) : calculator.category;
  const title = localizedCalculatorTitle(calculator, locale);
  const description = localizedCalculatorDescription(calculator, locale);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: calculator.category,
        item: `${siteConfig.url}/category/${calculator.category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: calculator.title,
        item: `${siteConfig.url}/calculators/${calculator.slug}`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  function handlePrint() {
    window.print();
  }

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // user cancelled share — fall through to clipboard
      }
    }
    await navigator.clipboard.writeText(url);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-foreground/50">
        <Link href="/" className="hover:text-emerald">{t.calculator.home}</Link>
        <ChevronRight size={12} />
        <Link href={`/category/${calculator.category}`} className="hover:text-emerald">
          {categoryLabel}
        </Link>
        <ChevronRight size={12} />
        <span className="text-foreground/70">{title}</span>
      </nav>

      {/* Header */}
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-emerald">
            {categoryLabel}
          </span>
          <h1 className="font-display mt-1 text-3xl font-medium sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-foreground/60">{description}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share this calculator"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:border-emerald hover:text-emerald"
          >
            <Share2 size={16} />
          </button>
          <button
            type="button"
            onClick={handlePrint}
            aria-label="Print this result"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:border-emerald hover:text-emerald"
          >
            <Printer size={16} />
          </button>
        </div>
      </div>

      {/* Calculator form + result */}
      <div className="mt-8">{children}</div>

      {/* Article */}
      <div className="prose-fitcalc mt-16 border-t border-border pt-12">{article}</div>

      {/* FAQ */}
      <div className="mt-16 border-t border-border pt-12">
        <h2 className="font-display text-2xl font-medium">{t.calculator.faqTitle}</h2>
        <div className="mt-6 space-y-6">
          {faqs.map((f) => (
            <div key={f.question}>
              <h3 className="font-medium">{f.question}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">{f.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related calculators */}
      {related.length > 0 && (
        <div className="mt-16 border-t border-border pt-12">
          <h2 className="font-display text-2xl font-medium">{t.calculator.relatedCalculators}</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/calculators/${r.slug}`}
                className="rounded-card border border-border p-4 text-sm transition-colors hover:border-emerald"
              >
                <p className="font-medium">{localizedCalculatorTitle(r, locale)}</p>
                <p className="mt-1 text-foreground/55">{localizedCalculatorDescription(r, locale)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
