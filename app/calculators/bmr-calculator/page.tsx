import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { BmrForm } from "@/components/calculators/bmr-form";

const calculator = calculators.find((c) => c.slug === "bmr-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "BMR Calculator — Basal Metabolic Rate (Mifflin-St Jeor)",
  description: "Calculate your Basal Metabolic Rate using the Mifflin-St Jeor equation and see how your calorie burn changes across activity levels.",
  path: "/calculators/bmr-calculator",
});

const faqs = [
  {
    question: "What is BMR exactly?",
    answer:
      "Basal Metabolic Rate is the number of calories your body needs to maintain basic functions — breathing, circulation, cell repair — while completely at rest, with no digestion or movement involved. It typically accounts for 60-75% of total daily calorie burn.",
  },
  {
    question: "Why does this calculator use the Mifflin-St Jeor equation?",
    answer:
      "Mifflin-St Jeor (1990) is consistently shown in validation studies to be more accurate than the older Harris-Benedict equation for most modern populations, which is why it's the formula recommended by the Academy of Nutrition and Dietetics.",
  },
  {
    question: "Is BMR the same as how many calories I should eat?",
    answer:
      "No — BMR only covers calories burned at complete rest. Add your activity level on top (this is your TDEE) to find your actual daily calorie needs. Use the TDEE or Calories calculator for that next step.",
  },
  {
    question: "Does muscle mass affect BMR?",
    answer:
      "Yes, significantly. Muscle tissue burns more calories at rest than fat tissue, so two people with the same weight but different muscle mass will have different BMRs. Formulas like Mifflin-St Jeor estimate this indirectly through height, weight, age and gender rather than measuring muscle directly.",
  },
];

export default function BmrCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<BmrArticle />}>
      <BmrForm />
    </CalculatorShell>
  );
}

function BmrArticle() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        What your Basal Metabolic Rate really represents
      </h2>
      <p>
        Your Basal Metabolic Rate, or BMR, is the energy your body needs just to stay alive — no
        walking, no digestion, no exercise, just the baseline cost of breathing, pumping blood,
        repairing cells, and keeping your brain and organs running. For most people, BMR accounts
        for somewhere between 60% and 75% of total daily calorie burn, making it by far the
        largest single piece of the energy equation.
      </p>
      <p>
        Because it's so dominant, BMR is the natural starting point for any calorie or nutrition
        plan. Get this number roughly right, and the rest — adding activity, setting a deficit or
        surplus for weight goals — becomes a matter of fairly simple arithmetic on top.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">Why Mifflin-St Jeor</h3>
      <p>
        Several equations exist for estimating BMR, but this calculator uses Mifflin-St Jeor,
        published in 1990, because repeated validation studies since then have found it
        consistently more accurate for the general population than the older Harris-Benedict
        equation from 1919 — particularly for people who are overweight, where Harris-Benedict
        tends to overestimate. The Academy of Nutrition and Dietetics now recommends Mifflin-St
        Jeor as the preferred equation for healthy adults when body fat percentage isn't known.
      </p>
      <p>The formula is:</p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        Men: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5
        <br />
        Women: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161
      </p>
      <p>
        The only difference between the male and female versions is a constant adjustment at the
        end, reflecting average differences in body composition and resting metabolism between
        men and women at the same height, weight and age.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">From BMR to real daily burn</h3>
      <p>
        BMR on its own understates how many calories you actually burn in a day, because it
        excludes movement entirely. To get your Total Daily Energy Expenditure (TDEE) — the
        number that actually matters for weight management — multiply your BMR by an activity
        factor ranging from 1.2 for a sedentary lifestyle up to 1.9 for extremely active people
        with physically demanding jobs or daily intense training. The chart on this page shows
        exactly how much that multiplier changes your real-world calorie burn at each activity
        level.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">What actually moves your BMR</h3>
      <p>
        Four factors dominate BMR: body size (taller, heavier people generally have a higher
        BMR, simply because there's more tissue to maintain), muscle mass (muscle is more
        metabolically active than fat, so two people at the same weight with different muscle
        mass will have different BMRs), age (BMR tends to decline gradually with age, largely
        due to gradual muscle loss), and sex (men typically carry more muscle mass than women at
        the same height and weight, which is reflected in the formula's constant).
      </p>
      <p>
        Genetics, thyroid function, and certain medications can shift BMR up or down by a
        meaningful margin in either direction, which is part of why two people who look similar
        on paper can have noticeably different calorie needs in practice. A formula like
        Mifflin-St Jeor gives a solid population-level estimate, not a lab-measured guarantee.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">Common mistakes</h3>
      <p>
        The most frequent mistake is confusing BMR with the number of calories to actually eat —
        BMR is a baseline, not a target; eating at BMR alone, with no allowance for daily
        movement, will typically create a larger calorie deficit than intended. A second common
        mistake is ignoring how meaningfully different activity levels shift the final number; the
        gap between a sedentary office job and a physically active one can easily be 500-700
        calories a day, which is the difference between weight loss and weight maintenance at the
        same food intake.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">References</h3>
      <p className="text-sm text-foreground/55">
        Mifflin, M.D. et al. — A new predictive equation for resting energy expenditure in healthy
        individuals, American Journal of Clinical Nutrition, 1990 · Academy of Nutrition and
        Dietetics — Evidence Analysis Library
      </p>
    </article>
  );
}
