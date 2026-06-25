import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { LeanBodyMassForm } from "@/components/calculators/lean-body-mass-form";

const calculator = calculators.find((c) => c.slug === "lean-body-mass-calculator")!;

export const metadata: Metadata = {
  title: "Lean Body Mass Calculator — Boer Formula",
  description: "Estimate your lean body mass (everything that isn't fat) using the Boer formula.",
  alternates: { canonical: "/calculators/lean-body-mass-calculator" },
};

const faqs = [
  {
    question: "What counts as lean body mass?",
    answer:
      "Lean body mass is your total weight minus fat mass — it includes muscle, bone, organs, skin, and body water. It's the part of your body that's metabolically active and contributes most to your calorie burn.",
  },
  {
    question: "Why use the Boer formula?",
    answer:
      "The Boer formula is one of the most widely validated equations for estimating lean body mass from height and weight alone, without needing skinfold callipers or a body fat scale. It's a solid estimate, not a clinical-grade measurement.",
  },
  {
    question: "How is this different from the Body Fat Calculator?",
    answer:
      "The Body Fat Calculator estimates your fat percentage directly from circumference measurements. This one estimates lean mass from height and weight, then derives fat mass by subtraction — they're complementary views of the same underlying picture.",
  },
];

export default function LeanBodyMassCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <LeanBodyMassForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Lean body mass: the part of you that isn't fat
      </h2>
      <p>
        Lean body mass (LBM) is your total body weight minus fat mass — muscle, bone, organs,
        connective tissue, and body water all included. It's a useful number because it's the
        metabolically active part of your body that drives most of your calorie burn, and it's
        what most people actually mean when they talk about wanting to "keep muscle" during a
        diet or "build mass" during a bulk.
      </p>
      <p>This calculator uses the Boer formula:</p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        Men: LBM = 0.407 × weight(kg) + 0.267 × height(cm) − 19.2
        <br />
        Women: LBM = 0.252 × weight(kg) + 0.473 × height(cm) − 48.3
      </p>
      <p>
        Like every height-and-weight-only formula, it's a population-level estimate. It won't
        capture genuine individual variation in muscularity the way a DEXA scan would, but it's
        consistent and convenient enough to track meaningfully over time — which, for most
        people, matters more than lab-grade precision on any single day.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why this number matters</h3>
      <p>
        Tracking lean mass alongside total weight gives a much better picture of progress than
        the scale alone. Two people can lose the same 5kg, but if one loses mostly fat and the
        other loses a meaningful chunk of lean mass, the health and aesthetic outcomes are very
        different. This is part of why slower, more moderate calorie deficits paired with
        resistance training tend to outperform aggressive crash diets for body composition,
        even when total weight loss looks similar on paper.
      </p>
    </article>
  );
}
