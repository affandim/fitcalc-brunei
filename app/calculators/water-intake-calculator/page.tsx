import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { WaterIntakeForm } from "@/components/calculators/water-intake-form";

const calculator = calculators.find((c) => c.slug === "water-intake-calculator")!;

export const metadata: Metadata = {
  title: "Water Intake Calculator — Daily Hydration Target",
  description: "Calculate how much water you should drink per day, adjusted for bodyweight and activity level.",
  alternates: { canonical: "/calculators/water-intake-calculator" },
};

const faqs = [
  {
    question: "Is the '8 glasses a day' rule accurate?",
    answer:
      "It's a reasonable rough average but doesn't account for bodyweight, climate, or activity level. A 50kg sedentary adult and a 100kg athlete have very different real hydration needs, which this calculator accounts for.",
  },
  {
    question: "Does this include water from food?",
    answer:
      "No — this estimates fluid intake from drinks specifically. Food typically contributes another 20% or so of total water intake, so your true total hydration is somewhat higher than this number alone.",
  },
  {
    question: "Does climate affect how much I should drink?",
    answer:
      "Yes, significantly. Hot, humid climates — including much of Brunei and Southeast Asia year-round — increase fluid loss through sweat, so treat this calculator's result as a baseline to adjust upward on particularly hot or active days.",
  },
];

export default function WaterIntakeCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <WaterIntakeForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Why "8 glasses a day" isn't quite right for everyone
      </h2>
      <p>
        The commonly repeated advice to drink eight 8-ounce glasses of water a day is easy to
        remember, but it's a rough population average rather than a number tailored to the
        individual. Hydration needs scale with body size and activity level — a 50kg sedentary
        adult and a 100kg active adult have meaningfully different fluid requirements, which a
        single flat number can't capture.
      </p>
      <p>
        This calculator uses a simple bodyweight-based formula (roughly 33ml per kilogram of
        bodyweight) as a baseline, then adds an activity bonus to account for additional fluid
        lost through sweat during exercise.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Climate matters too</h3>
      <p>
        Hot and humid conditions — a near-constant feature of Brunei's climate — increase fluid
        loss through sweat well beyond what a temperate-climate formula accounts for. On
        particularly hot, humid, or active days, treat the calculator's number as a floor rather
        than a ceiling, and pay attention to thirst and urine colour as practical real-time
        signals alongside the calculated target.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Signs you're not drinking enough</h3>
      <p>
        Dark yellow urine, persistent thirst, headaches, and reduced exercise performance are all
        common signs of mild dehydration. Pale straw-coloured urine and rarely feeling thirsty are
        generally good signs that fluid intake is adequate — a more practical day-to-day check
        than tracking exact millilitres.
      </p>
    </article>
  );
}
