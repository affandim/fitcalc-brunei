import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { ProteinForm } from "@/components/calculators/protein-form";

const calculator = calculators.find((c) => c.slug === "protein-calculator")!;

export const metadata: Metadata = {
  title: "Protein Calculator — Daily Protein Target by Goal",
  description: "Calculate your daily protein target in grams based on your bodyweight and activity goal.",
  alternates: { canonical: "/calculators/protein-calculator" },
};

const faqs = [
  {
    question: "Why does protein need vary by activity level?",
    answer:
      "Resistance training and higher activity levels increase muscle protein breakdown and the body's capacity to use protein for repair and growth, raising the optimal intake well above the minimum needed to simply prevent deficiency.",
  },
  {
    question: "Is more protein always better?",
    answer:
      "Not necessarily. Intake beyond roughly 2.2g/kg shows diminishing returns for muscle building in most research, and very high intakes simply get used for energy rather than additional muscle protein synthesis.",
  },
  {
    question: "Should I eat protein at every meal?",
    answer:
      "Spreading protein across 3-4 meals, with 20-40g per meal, is generally well-supported for maximizing muscle protein synthesis throughout the day, compared to consuming most of it in one large meal.",
  },
];

export default function ProteinCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <ProteinForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        How much protein do you actually need?
      </h2>
      <p>
        The official dietary reference intake for protein — 0.8g per kilogram of bodyweight — is
        set to prevent deficiency in a sedentary adult, not to optimize muscle, recovery, or body
        composition. For anyone training regularly, the useful range sits considerably higher,
        which is why this calculator scales the target with activity level rather than using a
        single fixed number.
      </p>
      <p>
        Sports nutrition research generally supports 1.6-2.2g/kg for people doing regular
        resistance training, with intake above roughly 2.2g/kg showing little additional benefit
        for muscle protein synthesis in most studies — the body has a practical ceiling for how
        much dietary protein it can use for muscle building at any given time.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Distributing protein across the day</h3>
      <p>
        Total daily protein matters most, but timing isn't irrelevant. Spreading intake across
        three to four meals, each contributing roughly 20-40g, tends to maximize muscle protein
        synthesis more effectively than consuming the same total in one or two large meals,
        because the body can only use so much protein for muscle building in any single feeding
        window.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">During a calorie deficit</h3>
      <p>
        Protein needs typically rise, not fall, during a weight-loss phase — higher protein intake
        helps preserve lean mass while in a calorie deficit, which is part of why the "active" and
        "athlete" presets above sit toward the higher end of the typical research range.
      </p>
    </article>
  );
}
