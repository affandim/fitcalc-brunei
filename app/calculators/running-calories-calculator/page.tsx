import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { RunningCaloriesForm } from "@/components/calculators/running-calories-form";

const calculator = calculators.find((c) => c.slug === "running-calories-calculator")!;

export const metadata: Metadata = {
  title: "Running Calories Calculator — Calories Burned by Pace",
  description: "Estimate how many calories you burn running, based on your weight, pace, and duration.",
  alternates: { canonical: "/calculators/running-calories-calculator" },
};

const faqs = [
  {
    question: "Why does pace matter more for running than walking?",
    answer:
      "Running at different paces spans a much wider range of metabolic intensity than walking does — the MET difference between an easy jog and a fast run is considerably larger than between a slow and brisk walk, which is why pace has an outsized effect on calorie burn for running.",
  },
  {
    question: "Is running more efficient for burning calories than walking?",
    answer:
      "Per minute, yes — running burns more calories than walking at any comparable duration, since it requires substantially more energy per unit of time. Per kilometre covered, the difference is smaller than per-minute, since walking the same distance simply takes longer.",
  },
];

export default function RunningCaloriesCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <RunningCaloriesForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        How running pace changes your calorie burn
      </h2>
      <p>
        Running spans a wide range of metabolic intensity depending on pace, which is why this
        calculator uses distinct MET (Metabolic Equivalent of Task) values for four pace
        categories rather than a single flat rate. An easy jog sits around 6 METs, while a fast
        run can reach nearly 15 — meaning calorie burn over the same duration can roughly double
        or more between an easy and a hard effort.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        Calories = MET × weight(kg) × duration(hours)
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why heavier runners burn more, pace for pace</h3>
      <p>
        Because the formula scales directly with bodyweight, a heavier runner burns more calories
        than a lighter runner at the identical pace and duration — moving more mass requires more
        energy, regardless of how efficiently someone runs.
      </p>
    </article>
  );
}
