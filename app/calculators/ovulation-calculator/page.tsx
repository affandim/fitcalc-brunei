import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { OvulationForm } from "@/components/calculators/ovulation-form";
import { buildPageMetadata } from "@/lib/seo";

const calculator = calculators.find((c) => c.slug === "ovulation-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Ovulation Calculator — Fertile Window Estimator",
  description: "Estimate your ovulation day and fertile window based on your last period and cycle length.",
  path: "/calculators/ovulation-calculator",
});

const faqs = [
  {
    question: "How is ovulation day estimated?",
    answer:
      "Ovulation typically occurs about 14 days before the next period starts, regardless of total cycle length — so this calculator adds (cycle length minus 14) days to your last period's start date.",
  },
  {
    question: "Why is the fertile window several days, not just one day?",
    answer:
      "Sperm can survive in the reproductive tract for up to 5 days, while the egg is typically viable for about 24 hours after ovulation. The fertile window captures this combined period, not just ovulation day itself.",
  },
  {
    question: "How accurate is this for irregular cycles?",
    answer:
      "Less accurate — this calculator assumes a consistent cycle length. For irregular cycles, tracking methods like basal body temperature or ovulation predictor kits give more individualized, real-time information than a date-based calculation alone.",
  },
];

export default function OvulationCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <OvulationForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Estimating your fertile window
      </h2>
      <p>
        Ovulation timing is the foundation of most fertility tracking, and it follows a more
        predictable pattern relative to the END of a cycle than the beginning — ovulation
        typically occurs about 14 days before the next period starts, regardless of how long the
        overall cycle is. This calculator uses that relationship to estimate both ovulation day
        and the broader fertile window around it.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why the fertile window spans several days</h3>
      <p>
        Sperm can survive in the female reproductive tract for up to five days under favorable
        conditions, while the egg itself is typically viable for only about 24 hours after
        release. Combining both windows gives a fertile period that starts several days before
        ovulation and ends shortly after it — not just a single day.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Limitations of date-based estimation</h3>
      <p>
        This method works best with a consistent, well-tracked cycle length. Stress, illness,
        travel, and many other factors can shift ovulation earlier or later than a pure
        date-based calculation predicts. For more precise, real-time tracking, methods like
        basal body temperature charting or ovulation predictor kits (which detect a hormone
        surge directly) complement this calculator's broader estimate.
      </p>
    </article>
  );
}
