import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { FiberIntakeForm } from "@/components/calculators/fiber-intake-form";

const calculator = calculators.find((c) => c.slug === "fiber-intake-calculator")!;

export const metadata: Metadata = {
  title: "Fiber Intake Calculator — Daily Fiber Target",
  description: "Find your recommended daily fiber intake by age and gender, based on Institute of Medicine guidelines.",
  alternates: { canonical: "/calculators/fiber-intake-calculator" },
};

const faqs = [
  {
    question: "Why does the recommended amount decrease with age?",
    answer:
      "The guideline is based partly on typical calorie intake, which tends to decrease with age. Since the recommendation is calculated relative to calorie consumption, the absolute fiber target decreases somewhat for older adults.",
  },
  {
    question: "Most people don't hit this target — does that matter?",
    answer:
      "Average fiber intake in many countries falls noticeably below recommended levels. Adequate fiber is associated with digestive health, more stable blood sugar response, and satiety, so closing the gap — gradually, to avoid digestive discomfort — is generally a reasonable goal.",
  },
  {
    question: "What foods are high in fiber?",
    answer:
      "Whole grains, legumes (beans, lentils), fruits with the skin on, vegetables, nuts and seeds are all good fiber sources. Spreading intake across meals rather than one large fiber-heavy meal tends to be more comfortable digestively.",
  },
];

export default function FiberIntakeCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <FiberIntakeForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Why fiber recommendations vary by age and gender
      </h2>
      <p>
        Dietary fiber recommendations from the Institute of Medicine are calculated relative to
        typical calorie intake — roughly 14 grams of fiber per 1,000 calories consumed — which is
        why the absolute gram targets differ by gender and age group, tracking average calorie
        needs for each group.
      </p>
      <p>
        This works out to roughly 38g/day for younger men, 30g/day for older men, 25g/day for
        younger women, and 21g/day for older women — noticeably higher than what most people in
        many countries typically consume.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why fiber matters</h3>
      <p>
        Adequate fiber intake is associated with healthier digestion, more stable post-meal blood
        sugar response, and improved satiety, which can support weight management indirectly by
        making it easier to feel satisfied with appropriate portions.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Increasing intake comfortably</h3>
      <p>
        Increasing fiber intake gradually, alongside adequate water intake, generally minimizes
        digestive discomfort (bloating, gas) that can come from a sudden large jump in fiber
        consumption. Spreading fiber-rich foods across multiple meals throughout the day tends to
        be more comfortable than concentrating them all in one sitting.
      </p>
    </article>
  );
}
