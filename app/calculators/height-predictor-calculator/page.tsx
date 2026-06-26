import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { HeightPredictorForm } from "@/components/calculators/height-predictor-form";

const calculator = calculators.find((c) => c.slug === "height-predictor-calculator")!;

export const metadata: Metadata = {
  title: "Child Height Predictor — Mid-Parental Height Method",
  description: "Predict your child's approximate adult height using the mid-parental height method.",
  alternates: { canonical: "/calculators/height-predictor-calculator" },
};

const faqs = [
  {
    question: "How accurate is this prediction?",
    answer:
      "The mid-parental method has a margin of error of roughly ±8.5cm in research validation studies. It captures the strong genetic component of height but can't account for individual variation in nutrition, health, or growth timing.",
  },
  {
    question: "Why is 13cm added or subtracted?",
    answer:
      "The 13cm adjustment accounts for the average height difference between adult men and women. It's added for boys (to account for typically taller male adult height) and subtracted for girls, after averaging both parents' heights.",
  },
  {
    question: "Does this work for any age of child?",
    answer:
      "The formula is based purely on parental height and doesn't require the child's current age or height, which is both its main convenience and its main limitation — it can't incorporate the child's own growth trajectory.",
  },
];

export default function HeightPredictorCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <HeightPredictorForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Predicting adult height from parental height
      </h2>
      <p>
        Height is one of the most strongly heritable physical traits — research consistently
        finds parental height explains a large share of the variation in adult height between
        people. The mid-parental height method takes advantage of this, offering a simple
        estimate using nothing but both parents' heights.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        Boys: (father&apos;s height + mother&apos;s height + 13) ÷ 2
        <br />
        Girls: (father&apos;s height + mother&apos;s height − 13) ÷ 2
      </p>
      <p>
        The 13cm adjustment reflects the average height gap between adult men and women, applied
        in the direction appropriate to the child's sex after averaging both parents' heights
        together.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">What this method can't capture</h3>
      <p>
        Height has a genetic component, but it isn't determined solely by genetics. Childhood
        nutrition, chronic illness, sleep, and overall health all influence whether a child
        reaches their genetic height potential. This formula assumes reasonably typical
        conditions and can't account for significant deviations in any of these factors.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">A rough estimate, not a guarantee</h3>
      <p>
        Research validating this method against actual adult outcomes finds a margin of error of
        roughly ±8.5cm — meaningful enough that the predicted number should be treated as a
        reasonable ballpark, not a precise forecast. It's a fun, genuinely science-based estimate
        rather than a clinical growth assessment.
      </p>
    </article>
  );
}
