import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { WalkingCaloriesForm } from "@/components/calculators/walking-calories-form";

const calculator = calculators.find((c) => c.slug === "walking-calories-calculator")!;

export const metadata: Metadata = {
  title: "Walking Calories Calculator — Calories Burned Walking",
  description: "Estimate how many calories you burn walking, based on your weight, pace, and duration.",
  alternates: { canonical: "/calculators/walking-calories-calculator" },
};

const faqs = [
  {
    question: "How is this calculated?",
    answer:
      "Using MET (Metabolic Equivalent of Task) values for different walking paces, multiplied by your bodyweight and the duration of your walk. MET values are a standard, well-researched way to estimate energy expenditure across many activities.",
  },
  {
    question: "Does walking pace really change calories burned that much?",
    answer:
      "Yes — a brisk walk can burn 50-70% more calories than a slow stroll over the same duration, since energy cost rises with effort and speed, not just time spent moving.",
  },
  {
    question: "Is walking 'enough' exercise on its own?",
    answer:
      "Regular brisk walking offers genuine, well-documented cardiovascular and metabolic health benefits and is an excellent foundation, especially for people newer to exercise. For additional fitness or body composition goals, pairing it with some resistance training is generally recommended.",
  },
];

export default function WalkingCaloriesCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <WalkingCaloriesForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        How walking pace changes your calorie burn
      </h2>
      <p>
        Walking is one of the most accessible forms of exercise, and its calorie cost scales
        predictably with two main factors: how much you weigh, and how fast you walk. This
        calculator uses MET (Metabolic Equivalent of Task) values — a standard unit researchers
        use to compare the energy cost of different activities — for four walking pace
        categories.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        Calories = MET × weight(kg) × duration(hours)
      </p>
      <p>
        A slow stroll sits around 2.8 METs, a moderate pace around 3.5, a brisk pace around 4.3,
        and a very brisk pace around 5.0 — meaning a brisk walk can burn meaningfully more
        calories than a slow one over the exact same duration, simply because of the increased
        effort involved.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why walking deserves more credit</h3>
      <p>
        Walking is often underrated compared to more intense forms of exercise, but it's
        associated with substantial, well-documented benefits for cardiovascular health, mood,
        and longevity — and crucially, it's sustainable for almost everyone, which matters more
        for long-term health than any single workout's calorie burn. Daily walking also
        contributes to NEAT (non-exercise activity thermogenesis), one of the more variable and
        controllable pieces of total daily calorie expenditure.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Getting more from your walks</h3>
      <p>
        Small adjustments compound. Picking up the pace slightly, adding gentle inclines, or
        carrying light additional load (within reason, and not to the point of joint strain) all
        increase calorie cost without meaningfully increasing perceived difficulty for most
        people — practical ways to get more out of a walk you were going to take anyway.
      </p>
    </article>
  );
}
