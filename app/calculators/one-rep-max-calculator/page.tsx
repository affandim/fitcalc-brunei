import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { OneRepMaxForm } from "@/components/calculators/one-rep-max-form";

const calculator = calculators.find((c) => c.slug === "one-rep-max-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "One Rep Max Calculator — Epley Formula",
  description: "Estimate your one-rep max (1RM) from any working set, plus a training load table by percentage.",
  path: "/calculators/one-rep-max-calculator",
});

const faqs = [
  {
    question: "Why estimate 1RM instead of just testing it directly?",
    answer:
      "Testing a true 1RM requires a maximal, fatiguing effort that carries injury risk and isn't necessary for most training purposes. Estimating from a comfortable working set (1-10 reps) gives a useful number with far less fatigue and risk.",
  },
  {
    question: "How accurate is the Epley formula?",
    answer:
      "It's most accurate for sets of 10 reps or fewer, performed close to failure. Accuracy decreases for higher-rep sets, since the relationship between reps and strength becomes less linear as muscular endurance starts to matter more than pure strength.",
  },
  {
    question: "What do the percentage numbers mean?",
    answer:
      "They translate your estimated 1RM into specific training weights for different goals — heavier percentages (85-95%) for strength and power work, moderate percentages (65-80%) for hypertrophy-focused training.",
  },
];

export default function OneRepMaxCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <OneRepMaxForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Estimating maximum strength without testing it directly
      </h2>
      <p>
        Your one-rep max (1RM) — the most weight you could lift for a single rep — is a useful
        benchmark for programming strength training, but actually testing it requires a maximal,
        fatiguing attempt that carries real injury risk and isn't necessary for most training
        goals. The Epley formula, used here, estimates 1RM from a much safer working set.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        1RM = weight × (1 + reps ÷ 30)
      </p>
      <p>
        The formula is most reliable for sets of roughly 1 to 10 reps performed close to muscular
        failure — the further beyond 10 reps you go, the less accurate the estimate becomes,
        since high-rep sets start to test muscular endurance more than maximal strength.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Using the percentage table for programming</h3>
      <p>
        Most structured strength programs prescribe training weights as a percentage of 1RM
        rather than an absolute number, because it scales automatically as your strength changes.
        Higher percentages (85-95% of 1RM) target maximal strength and power with low reps;
        moderate percentages (65-80%) are common for hypertrophy-focused training with moderate
        rep ranges.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Recalculate as you progress</h3>
      <p>
        Your estimated 1RM will drift as you get stronger, so it's worth recalculating
        periodically — ideally from a recent honest working set close to failure — rather than
        anchoring training percentages to a number calculated months earlier.
      </p>
    </article>
  );
}
