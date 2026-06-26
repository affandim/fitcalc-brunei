import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { MuscleMassForm } from "@/components/calculators/muscle-mass-form";

const calculator = calculators.find((c) => c.slug === "muscle-mass-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Muscle Mass Calculator — Estimate Skeletal Muscle Mass",
  description: "Estimate your skeletal muscle mass and what percentage of your body weight it represents.",
  path: "/calculators/muscle-mass-calculator",
});

const faqs = [
  {
    question: "How is muscle mass different from lean body mass?",
    answer:
      "Lean body mass includes everything that isn't fat — muscle, bone, organs, and water. Skeletal muscle mass is a narrower subset: just the muscle tissue attached to bone that you can train and grow, roughly half of total lean mass for most adults.",
  },
  {
    question: "Can this calculator replace a body composition scan?",
    answer:
      "No. It gives a useful population-level estimate from height and weight, but tools like DEXA scans or bioelectrical impedance devices measure muscle mass far more directly and precisely.",
  },
  {
    question: "What's a typical muscle mass percentage?",
    answer:
      "Untrained adult men often sit around 38-42% of body weight as skeletal muscle, and women around 28-32%, with well-trained individuals running higher. These are broad averages, not strict targets.",
  },
];

export default function MuscleMassCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <MuscleMassForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Estimating skeletal muscle mass from height and weight
      </h2>
      <p>
        Skeletal muscle — the muscle attached to your bones that you can deliberately train and
        grow — makes up roughly half of total lean body mass in most adults. This calculator
        builds on the Boer lean body mass formula and applies a typical skeletal-muscle
        proportion to estimate the muscle component specifically, rather than all lean tissue.
      </p>
      <p>
        It's worth being clear-eyed about the limits here: this is a population-average estimate,
        not a tissue-level measurement. Someone with an unusually high or low muscle-to-lean-mass
        ratio — a powerlifter versus someone recovering from prolonged bed rest, for example —
        will see a less accurate result than someone closer to typical body composition.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why track this over time</h3>
      <p>
        The real value of a muscle mass estimate isn't the absolute number on day one — it's the
        trend across weeks and months of training. If your weight is stable but your estimated
        muscle mass is trending up, that's a good signal your training and protein intake are
        working in the right direction, regardless of how precise the underlying formula is in
        absolute terms.
      </p>
    </article>
  );
}
