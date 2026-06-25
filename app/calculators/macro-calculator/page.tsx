import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { MacroForm } from "@/components/calculators/macro-form";

const calculator = calculators.find((c) => c.slug === "macro-calculator")!;

export const metadata: Metadata = {
  title: "Macro Calculator — Custom Protein, Carbs and Fat Split",
  description: "Turn your daily calorie target into grams of protein, carbs and fat with a fully adjustable split.",
  alternates: { canonical: "/calculators/macro-calculator" },
};

const faqs = [
  {
    question: "How is this different from the Calories Calculator's macro split?",
    answer:
      "The Calories Calculator applies a fixed 30/40/30 split automatically. This calculator lets you set your own percentages — useful if you're following a specific diet style like higher-protein, lower-carb, or a coach-prescribed ratio.",
  },
  {
    question: "What macro split is best?",
    answer:
      "There's no single best split for everyone. Total calories matter most for weight change; macro ratio matters more for things like training performance, satiety, and personal preference. Most people do well within a fairly wide range of ratios as long as protein is adequate.",
  },
  {
    question: "Why does fat update automatically?",
    answer:
      "Protein, carbs and fat percentages must add up to 100% of total calories. Once you set protein and carbs, fat is calculated as the remainder so the numbers always stay consistent.",
  },
];

export default function MacroCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <MacroForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Building your own macro split
      </h2>
      <p>
        Once you know your daily calorie target — from the Calories or TDEE calculator, or from a
        coach — the next decision is how to split it between protein, carbohydrates and fat.
        Unlike the fixed 30/40/30 split used on the Calories Calculator, this tool lets you set
        your own ratio and see exactly how many grams of each macronutrient that works out to.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">A few common starting points</h3>
      <p>
        A balanced split (roughly 30% protein, 40% carbs, 30% fat) suits most general fitness
        goals. A higher-protein, lower-carb split (35-40% protein, 25-30% carbs) is common during
        fat-loss phases to support satiety and muscle preservation. Endurance athletes often run
        higher carbohydrate percentages (45-55%) to fuel training volume. None of these is
        objectively "correct" — they're starting points to adjust based on how you perform and
        feel.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Set protein first</h3>
      <p>
        Of the three macronutrients, protein is the one worth fixing first and treating as
        closest to non-negotiable, since it's most directly tied to muscle preservation and
        satiety. Once protein is set, the carb-to-fat balance is largely a matter of personal
        preference and how your body responds — some people perform and feel better on
        relatively higher carbs, others on relatively higher fat, with total calories and protein
        held constant.
      </p>
    </article>
  );
}
