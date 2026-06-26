import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { NetWorthForm } from "@/components/calculators/net-worth-form";

const calculator = calculators.find((c) => c.slug === "net-worth-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Net Worth Calculator — Assets Minus Liabilities",
  description: "Calculate your net worth by adding up your assets and subtracting your liabilities.",
  path: "/calculators/net-worth-calculator",
});

const faqs = [
  {
    question: "What should I count as an asset?",
    answer:
      "Cash and savings, investment account balances, retirement accounts, the current market value of property you own, and the resale value of vehicles are all typically counted. Personal items like furniture or electronics are usually excluded unless they have significant resale value.",
  },
  {
    question: "What counts as a liability?",
    answer:
      "Any debt you owe: mortgage balance, car loans, student loans, credit card balances, and any other outstanding loans. Use current balances, not original loan amounts.",
  },
  {
    question: "Is a negative net worth a problem?",
    answer:
      "It's common, especially earlier in life — student loans or a mortgage taken on recently can easily outweigh assets accumulated so far. What matters more than the snapshot is the trend over time as you pay down debt and build savings or investments.",
  },
];

export default function NetWorthCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <NetWorthForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Net worth: a single number for your overall financial position
      </h2>
      <p>
        Net worth combines everything you own and everything you owe into one summary figure —
        useful precisely because it captures your overall financial picture in a way that income
        alone doesn't. A high earner with significant debt can have a lower net worth than a
        modest earner who has consistently saved and avoided debt.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        Net worth = Total assets − Total liabilities
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">A snapshot, tracked over time</h3>
      <p>
        A single net worth calculation is a snapshot, but its real value comes from tracking it
        periodically — quarterly or annually — to see the trend. A negative or low net worth
        early on (common with student loans or a recent mortgage) isn't necessarily a problem if
        the trend is moving in a healthy direction as debt gets paid down and savings accumulate.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Being honest about asset values</h3>
      <p>
        Use realistic current market values rather than purchase prices, especially for property
        and vehicles, which can appreciate or depreciate significantly over time. Overestimating
        asset values gives a misleadingly optimistic picture that doesn't reflect what you could
        actually realize if you needed to.
      </p>
    </article>
  );
}
