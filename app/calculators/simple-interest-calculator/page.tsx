import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { SimpleInterestForm } from "@/components/calculators/simple-interest-form";

const calculator = calculators.find((c) => c.slug === "simple-interest-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Simple Interest Calculator",
  description: "Calculate simple interest on a principal amount over a fixed time period.",
  path: "/calculators/simple-interest-calculator",
});

const faqs = [
  {
    question: "When is simple interest actually used?",
    answer:
      "Simple interest is common for short-term loans, certain bonds, and some promotional savings products. Most long-term loans and investments — mortgages, typical savings accounts — use compound interest instead.",
  },
  {
    question: "Why is simple interest lower than compound interest over time?",
    answer:
      "Because simple interest only ever calculates on the original principal, while compound interest calculates on a growing balance that includes previously earned interest. The gap widens the longer the time period.",
  },
];

export default function SimpleInterestCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <SimpleInterestForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        The simplest way interest can work
      </h2>
      <p>
        Simple interest calculates a return purely on the original principal amount, for the
        entire duration — unlike compound interest, where earned interest itself starts earning
        interest. The formula is about as straightforward as finance math gets:
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        Interest = Principal × Rate × Time
      </p>
      <p>
        Because the principal used in the calculation never changes, interest accrues at a
        constant amount each period rather than accelerating — a straight line rather than a
        curve when plotted over time.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Where you'll encounter it</h3>
      <p>
        Simple interest shows up in some short-term loans, certain bonds, and a handful of
        promotional savings products. For anything longer-term — mortgages, typical retirement
        accounts, most savings products — compound interest is the standard, and the Compound
        Interest Calculator on this site is the more relevant tool for those scenarios.
      </p>
    </article>
  );
}
