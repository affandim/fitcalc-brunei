import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { HeightVelocityForm } from "@/components/calculators/height-velocity-form";
import { buildPageMetadata } from "@/lib/seo";

const calculator = calculators.find((c) => c.slug === "height-velocity-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Child Height Velocity Calculator — Growth Rate (cm/year)",
  description: "Calculate your child's height growth rate in cm/year from two measurements taken months apart.",
  path: "/calculators/height-velocity-calculator",
});

const faqs = [
  {
    question: "Why measure growth velocity instead of just height?",
    answer:
      "A single height measurement only shows where a child currently stands. Growth velocity — the rate of change over time — can flag a slowing or accelerating growth pattern earlier than waiting to see where a single percentile lands, which is part of why pediatricians track it across visits.",
  },
  {
    question: "What's a typical growth rate?",
    answer:
      "After the rapid growth of infancy, most children grow at a fairly steady 5-6 cm per year through mid-childhood, before a pubertal growth spurt (which varies in timing and intensity) that brings them to adult height.",
  },
  {
    question: "When should slowing growth be a concern?",
    answer:
      "A consistently low growth velocity across multiple measurements is something a pediatrician should evaluate, since various medical causes can affect growth rate. A single calculation here is informational, not diagnostic.",
  },
];

export default function HeightVelocityCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <HeightVelocityForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Why growth rate tells a different story than a single height
      </h2>
      <p>
        A child's height at any one point in time is a snapshot. Growth velocity — how fast that
        height is changing — adds the dimension of trend, which is often more informative for
        spotting a developing issue early than a single measurement against a percentile chart.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        Growth velocity (cm/year) = (height2 − height1) ÷ (months between ÷ 12)
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">What typical growth looks like</h3>
      <p>
        Growth velocity isn't constant across childhood. Infants grow extremely fast in the first
        year, growth slows to a steadier pace through early and mid-childhood (commonly cited
        around 5-6 cm/year), then accelerates again during the pubertal growth spurt before
        leveling off as adult height is reached.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">A tool for tracking, not diagnosing</h3>
      <p>
        This calculator is useful for understanding a growth trend between two specific
        measurements. It isn't a diagnostic tool — a pediatrician evaluating growth velocity
        across an established growth chart, with full context on a child's age and health
        history, is the appropriate resource for any genuine concern.
      </p>
    </article>
  );
}
