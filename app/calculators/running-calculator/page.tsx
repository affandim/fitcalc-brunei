import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { RunningForm } from "@/components/calculators/running-form";

const calculator = calculators.find((c) => c.slug === "running-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Running Calculator — Predict Your Race Finish Time",
  description: "Predict your 5K, 10K, half marathon and marathon finish times from a recent run, using the Riegel formula.",
  path: "/calculators/running-calculator",
});

const faqs = [
  {
    question: "How accurate are these predictions?",
    answer:
      "The Riegel formula is a well-established starting point, generally most accurate when predicting a target distance reasonably close to your known distance. Predicting a marathon time from a 5K result, for example, carries more uncertainty than predicting a 10K time from the same 5K.",
  },
  {
    question: "What's the Riegel formula?",
    answer:
      "Published by Pete Riegel in 1977, it models how endurance performance degrades with distance: T2 = T1 × (D2/D1)^1.06. The exponent reflects that pace naturally slows somewhat as distance increases, more than a simple linear scaling would suggest.",
  },
  {
    question: "Why might my actual race time differ from the prediction?",
    answer:
      "Training specificity, pacing strategy, course terrain, weather, and race-day nerves or excitement all affect actual performance. Treat the prediction as a useful target to train toward, not a guarantee.",
  },
];

export default function RunningCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <RunningForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Predicting race times with the Riegel formula
      </h2>
      <p>
        If you know how fast you can run one distance, can you predict how fast you'd run
        another? Pete Riegel, an engineer and long-time runner, tackled exactly this question in
        1977 and published a formula that's remained a standard reference in distance running
        ever since:
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        T2 = T1 × (D2 ÷ D1)<sup>1.06</sup>
      </p>
      <p>
        The exponent of 1.06, rather than 1.0, captures something runners know intuitively: pace
        naturally slows as distance increases, even for well-trained athletes. A pure linear
        scaling (exponent of 1.0) would assume you could hold exactly the same pace from a 5K all
        the way to a marathon, which doesn't match real-world endurance physiology.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Where the formula works best</h3>
      <p>
        Riegel's formula tends to be most reliable when predicting a target distance reasonably
        close to the known distance, and for runners with a solid aerobic training base behind
        them. Predicting a marathon time purely from a 5K result introduces more uncertainty,
        since marathon performance depends heavily on long-run-specific endurance and fueling
        strategy that a short race doesn't test.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Using the prediction practically</h3>
      <p>
        Treat these numbers as a training target, not a guarantee. If your predicted marathon
        time looks faster than feels realistic given your actual long-run experience, that's
        useful information too — it may mean dedicating more training time specifically to
        endurance and fueling before race day, rather than assuming raw speed alone will carry
        you through the full distance.
      </p>
    </article>
  );
}
