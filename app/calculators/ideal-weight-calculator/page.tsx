import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { IdealWeightForm } from "@/components/calculators/ideal-weight-form";

const calculator = calculators.find((c) => c.slug === "ideal-weight-calculator")!;

export const metadata: Metadata = {
  title: "Ideal Weight Calculator — Devine Formula",
  description: "Find your ideal body weight range based on height, using the widely used Devine formula.",
  alternates: { canonical: "/calculators/ideal-weight-calculator" },
};

const faqs = [
  {
    question: "Where does the Devine formula come from?",
    answer:
      "Dr. B.J. Devine published it in 1974, originally to help estimate drug dosing based on body weight. It has since become one of the most widely used 'ideal weight' formulas in clinical settings, despite being a simple height-based estimate.",
  },
  {
    question: "Is there one single 'ideal weight'?",
    answer:
      "No — frame size, muscle mass, and individual body composition all shift what's healthy for a given height. That's why this calculator shows a ±10% range rather than a single number.",
  },
  {
    question: "How does this differ from BMI?",
    answer:
      "BMI classifies a given weight into a range (underweight to obese). Ideal weight calculators work the other way — starting from height, they estimate a target weight. Both are screening tools, not diagnoses.",
  },
];

export default function IdealWeightCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <IdealWeightForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        How "ideal weight" formulas actually work
      </h2>
      <p>
        Ideal body weight formulas were originally developed for clinical purposes — most
        commonly, calculating safe drug dosages, where using actual body weight for someone with
        a very high or low BMI could lead to over- or under-dosing. The Devine formula, used
        here, is one of the most established:
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        Men: IBW(kg) = 50 + 2.3 × (height in inches − 60)
        <br />
        Women: IBW(kg) = 45.5 + 2.3 × (height in inches − 60)
      </p>
      <p>
        Like BMI, it only takes height as an input, which means it can't account for frame size,
        muscle mass, or individual body composition. Two people of the same height with very
        different builds will get the same "ideal weight" from this formula, even though their
        genuinely healthy weights might differ by 10kg or more.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">How to use this number sensibly</h3>
      <p>
        Treat the result as a rough reference point, not a target to hit precisely. The ±10%
        range shown alongside the main number reflects the genuine variation in healthy weight at
        a given height — if your actual weight sits within or close to that range and you feel
        well, energetic, and capable, the exact number matters far less than those broader
        signals of health.
      </p>
    </article>
  );
}
