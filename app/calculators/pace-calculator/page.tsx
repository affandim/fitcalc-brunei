import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { PaceForm } from "@/components/calculators/pace-form";

const calculator = calculators.find((c) => c.slug === "pace-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Pace Calculator — Running and Walking Pace Conversions",
  description: "Convert distance and time into pace per kilometre, pace per mile, and speed.",
  path: "/calculators/pace-calculator",
});

const faqs = [
  {
    question: "How do I use my pace to plan a race?",
    answer:
      "Once you know your pace per kilometre, multiply it by your target race distance to estimate finish time — or use the Running Calculator on this site, which does that prediction automatically using the Riegel formula.",
  },
  {
    question: "Why does pace matter more than speed for runners?",
    answer:
      "Pace (time per distance) maps directly onto how runners think about effort during a race — 'can I hold 5:00/km for 10km?' — which is why most training plans and race splits are expressed in pace rather than speed.",
  },
  {
    question: "What's a good pace for a beginner?",
    answer:
      "There's no universal answer — it depends heavily on age, fitness level, and goals. A more useful approach is tracking your own pace over time and aiming for gradual, consistent improvement rather than comparing to a generic benchmark.",
  },
];

export default function PaceCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <PaceForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Pace: the runner&apos;s most useful number
      </h2>
      <p>
        Pace expresses how fast you're moving as time per unit distance — minutes per kilometre
        or per mile — which is generally more intuitive for runners than speed (distance per
        unit time), since it maps directly onto how training plans, race splits, and personal
        bests are usually discussed and tracked.
      </p>
      <p>
        This calculator converts between the two: enter any distance and the time it took, and
        it works out your pace per kilometre, pace per mile, and equivalent speed in kilometres
        per hour — useful whether you're checking a recent run, planning splits for an upcoming
        race, or converting between metric and imperial training plans.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Using pace to plan training</h3>
      <p>
        Many structured training plans prescribe specific paces for different session types —
        easy runs at a conversational pace, tempo runs at a "comfortably hard" pace, and interval
        work at a much faster pace relative to current fitness. Knowing your current pace across
        different distances and efforts is the starting point for following any pace-based
        training plan accurately.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">From pace to race prediction</h3>
      <p>
        A known pace at one distance can help estimate performance at another, though the
        relationship isn't perfectly linear — pace naturally slows somewhat as distance increases
        due to fatigue and pacing strategy. The Running Calculator on this site uses the Riegel
        formula to make that longer-distance prediction more accurately than a simple linear
        scaling would.
      </p>
    </article>
  );
}
