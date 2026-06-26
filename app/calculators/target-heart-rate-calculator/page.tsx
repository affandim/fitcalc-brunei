import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { TargetHeartRateForm } from "@/components/calculators/target-heart-rate-form";

const calculator = calculators.find((c) => c.slug === "target-heart-rate-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Target Heart Rate Calculator — Karvonen Formula",
  description: "Calculate your target training heart rate range using the Karvonen formula, which accounts for your resting heart rate.",
  path: "/calculators/target-heart-rate-calculator",
});

const faqs = [
  {
    question: "How is this different from the Heart Rate Zone Calculator?",
    answer:
      "The Heart Rate Zone Calculator uses a simple percentage of max heart rate. This one uses the Karvonen formula, which also factors in your resting heart rate — generally considered more personalized and accurate, especially for people with notably high or low resting heart rates.",
  },
  {
    question: "How do I measure my resting heart rate?",
    answer:
      "Measure it first thing in the morning, before getting out of bed, ideally for a full 60 seconds using two fingers on your wrist or neck (not a thumb, which has its own pulse). Average it over a few mornings for a more reliable number.",
  },
  {
    question: "What is heart rate reserve?",
    answer:
      "It's the gap between your maximum and resting heart rate — the total range your heart rate can move through during exercise. The Karvonen formula calculates target zones as a percentage of this reserve, added back to resting heart rate.",
  },
];

export default function TargetHeartRateCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <TargetHeartRateForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Why the Karvonen formula accounts for more than just age
      </h2>
      <p>
        Most simple heart rate zone calculators use a flat percentage of maximum heart rate,
        which ignores an important individual factor: resting heart rate. Two people of the same
        age can have very different resting heart rates — a well-trained endurance athlete might
        rest at 50bpm, while a less active person of the same age might rest at 75bpm — and a
        flat percentage of max heart rate doesn't account for that difference.
      </p>
      <p>
        The Karvonen formula, developed by Finnish physiologist Martti Karvonen in the 1950s,
        solves this by working from heart rate reserve — the gap between resting and maximum
        heart rate — rather than maximum heart rate alone:
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        Target HR = ((max HR − resting HR) × intensity%) + resting HR
      </p>
      <p>
        Because it incorporates resting heart rate, the Karvonen method tends to produce a
        slightly more personalized — and for most people, slightly higher — target range than a
        flat percentage of max heart rate, particularly for people with a lower resting heart
        rate from regular cardiovascular training.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Getting a reliable resting heart rate</h3>
      <p>
        Measure it in the morning before getting out of bed, when your body is most settled and
        hasn't yet been affected by caffeine, movement, or stress. A single reading can vary by a
        few beats due to normal day-to-day fluctuation, so averaging several mornings gives a
        more stable, reliable number to base your training zones on.
      </p>
    </article>
  );
}
