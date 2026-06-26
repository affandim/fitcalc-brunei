import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { WaistToHeightForm } from "@/components/calculators/waist-to-height-form";

const calculator = calculators.find((c) => c.slug === "waist-to-height-ratio-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Waist-to-Height Ratio Calculator",
  description: "Calculate your waist-to-height ratio, a simple and effective cardiovascular risk indicator.",
  path: "/calculators/waist-to-height-ratio-calculator",
});

const faqs = [
  {
    question: "Why use waist-to-height ratio instead of BMI?",
    answer:
      "Several studies have found waist-to-height ratio a stronger predictor of cardiovascular and metabolic risk than BMI, because it directly reflects central (abdominal) fat, which carries more health risk than fat stored elsewhere, regardless of overall body size.",
  },
  {
    question: "What's the simplest way to remember the healthy threshold?",
    answer:
      "'Keep your waist to less than half your height' is a commonly cited public health message — a ratio under 0.5 is associated with lower cardiovascular and metabolic risk across a wide range of heights and ages.",
  },
  {
    question: "Does this work the same for men and women?",
    answer:
      "The 0.5 threshold is commonly applied to both men and women, unlike waist-hip ratio, which uses different cutoffs by gender — making waist-to-height ratio a simpler, more universal screening tool.",
  },
];

export default function WaistToHeightRatioCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <WaistToHeightForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        A simple ratio that may predict risk better than BMI
      </h2>
      <p>
        Waist-to-height ratio (WHtR) divides waist circumference by height, producing a single
        number that's increasingly cited in research as a stronger predictor of cardiovascular
        and metabolic risk than BMI alone — particularly because it directly captures central
        (abdominal) fat, the type most strongly linked to heart disease and type 2 diabetes risk.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        WHtR = waist circumference ÷ height
      </p>
      <p>
        The appeal is its simplicity: unlike BMI, which needs separate reference charts for
        children, adults, and different ethnicities, a single threshold — roughly 0.5 — works
        reasonably well across a broad range of ages, heights, and both sexes, which has made
        "keep your waist circumference under half your height" a popular, easy-to-remember public
        health message.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">How to measure correctly</h3>
      <p>
        Measure waist circumference standing upright, at the end of a normal exhale, at the
        narrowest point of your torso — usually just above the belly button for most people.
        Avoid pulling the tape tight enough to compress the skin, and try to measure at a
        consistent time of day for comparable readings over time.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">What the categories mean</h3>
      <p>
        A ratio below 0.5 is generally considered healthy. Between 0.5 and 0.6 suggests increased
        risk and is often a useful prompt to look more closely at lifestyle factors — diet,
        activity, sleep. Above 0.6 is associated with meaningfully higher risk and is worth
        discussing with a healthcare provider, particularly alongside other risk factors like
        family history or blood pressure.
      </p>
    </article>
  );
}
