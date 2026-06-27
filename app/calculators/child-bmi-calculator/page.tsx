import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { ChildBmiForm } from "@/components/calculators/child-bmi-form";
import { buildPageMetadata } from "@/lib/seo";

const calculator = calculators.find((c) => c.slug === "child-bmi-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Child BMI Calculator — Simplified Estimate",
  description: "A simplified BMI estimate for children, with important context on why pediatric assessment differs from adult BMI.",
  path: "/calculators/child-bmi-calculator",
});

const faqs = [
  {
    question: "Why is this called a 'simplified' calculator?",
    answer:
      "Accurate pediatric BMI assessment compares a child's BMI against percentile growth charts specific to their exact age (in months) and sex, since healthy BMI changes substantially as children grow. This calculator uses the same raw BMI formula as adults with rough category bands, which is a much cruder approximation than a proper percentile chart.",
  },
  {
    question: "Where can I get an accurate assessment?",
    answer:
      "A pediatrician can plot your child's height and weight on official CDC or WHO growth charts, which account for age and sex precisely — this is the standard, clinically appropriate method, and the one to rely on for any real health decisions.",
  },
  {
    question: "Why doesn't BMI work the same way for children as adults?",
    answer:
      "Children's body composition changes substantially as they grow — proportion of body fat naturally shifts at different ages and between sexes. A BMI that would be high for a 5-year-old might be entirely normal for a 15-year-old, which fixed adult-style cutoffs can't capture.",
  },
];

export default function ChildBmiCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <ChildBmiForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Why child BMI needs more context than adult BMI
      </h2>
      <p>
        BMI is calculated the same way for children as adults — weight divided by height squared
        — but interpreting the result is fundamentally different. A BMI of 18 might be
        underweight for one age and overweight for another, because what counts as a healthy
        body composition shifts substantially as children grow and develop.
      </p>
      <p>
        Proper pediatric practice addresses this using percentile growth charts — comparing a
        child's BMI against a large reference population of children the same age and sex,
        rather than against fixed numeric cutoffs. This calculator uses simplified, rough
        category bands instead, which is meaningfully less precise.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">When to see a pediatrician</h3>
      <p>
        For any genuine concern about a child's growth or weight, a pediatrician using official
        growth charts is the appropriate resource — they can track your specific child's
        percentile over time, which is far more informative than any single BMI snapshot,
        simplified or otherwise.
      </p>
    </article>
  );
}
