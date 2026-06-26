import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { TestScoreForm } from "@/components/calculators/test-score-form";

const calculator = calculators.find((c) => c.slug === "test-score-calculator")!;

export const metadata: Metadata = {
  title: "Test Score Calculator — Percentage & Letter Grade",
  description: "Calculate your test score percentage and letter grade from the number of correct answers.",
  alternates: { canonical: "/calculators/test-score-calculator" },
};

const faqs = [
  {
    question: "Does this match my school's exact grading scale?",
    answer:
      "This uses the common US 90/80/70/60 letter-grade bands. Many schools and countries use different scales or thresholds — check your specific institution's grading policy if you need an exact official match.",
  },
  {
    question: "Why might my actual grade differ from this percentage?",
    answer:
      "Some courses apply a curve, weight certain questions differently, or include partial credit not reflected in a simple correct/total ratio. This calculator gives the raw percentage; your instructor's final grade may adjust from there.",
  },
];

export default function TestScoreCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <TestScoreForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        From raw score to letter grade
      </h2>
      <p>
        Converting a raw score into a percentage is simple division, but translating that
        percentage into a letter grade depends on the grading scale in use — which varies by
        country, institution, and sometimes by individual course.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        Percentage = (correct answers ÷ total questions) × 100
      </p>
      <p>
        This calculator applies the common US convention: 90% and above is an A, 80-89% a B,
        70-79% a C, 60-69% a D, and below 60% an F. Many schools and other countries use
        different bands entirely, so treat the letter grade shown as a general reference rather
        than an authoritative match to any specific institution's policy.
      </p>
    </article>
  );
}
