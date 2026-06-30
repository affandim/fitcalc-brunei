import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { CompoundInterestForm } from "@/components/calculators/compound-interest-form";

const calculator = calculators.find((c) => c.slug === "compound-interest-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Compound Interest Calculator — Project Your Savings Growth",
  description: "See how your savings grow over time with compound interest and regular monthly contributions.",
  path: "/calculators/compound-interest-calculator",
});

const faqs = [
  {
    question: "What's the difference between compound and simple interest?",
    answer:
      "Simple interest is calculated only on the original principal. Compound interest is calculated on the principal plus all previously earned interest, so growth accelerates over time — which is why starting early matters so much for long-term savings.",
  },
  {
    question: "Why does the chart curve upward rather than rise in a straight line?",
    answer:
      "Because each period's interest is calculated on a growing balance (principal plus prior interest), growth compounds — the curve gets steeper over time even with constant contributions and a constant rate.",
  },
  {
    question: "How much difference do monthly contributions make?",
    answer:
      "A significant one over long horizons. Regular contributions add to the balance that future interest compounds on, so consistent monthly investing — even modest amounts — can meaningfully outpace a larger lump sum left to grow alone over short periods.",
  },
];

export default function CompoundInterestCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <CompoundInterestForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Why compound interest rewards starting early
      </h2>
      <p>
        Compound interest is often called one of the most powerful forces in personal finance,
        and the reason is structural: each period, you earn a return not just on what you
        originally put in, but on every dollar of interest or growth earned in every prior
        period. The longer that process runs, the more dramatic the difference between compound
        and simple growth becomes.
      </p>
      <p>This calculator projects future value using:</p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        FV = P × (1+r)ⁿ + PMT × (((1+r)ⁿ − 1) ÷ r)
      </p>
      <p>
        Where P is your starting amount, r is the rate per compounding period, n is the total
        number of periods, and PMT is your regular contribution amount per period. The first term
        captures growth of your initial lump sum; the second captures growth of your ongoing
        contributions.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why time matters more than most people expect</h3>
      <p>
        Because compounding is exponential rather than linear, the gap between starting early and
        starting late widens dramatically the longer the horizon. Two people contributing the
        same monthly amount at the same rate, but starting ten years apart, can end up with
        future values that differ by far more than ten years' worth of contributions — the
        difference comes from how much longer the early contributions had to compound.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">A few important caveats</h3>
      <p>
        This calculator assumes a constant rate of return, which real markets never actually
        deliver — returns vary year to year, sometimes substantially. Treat the projected number
        as an illustrative long-run average outcome, not a guarantee, and remember that past or
        assumed average returns don't predict any specific year's performance.
      </p>
    </article>
  );
}
