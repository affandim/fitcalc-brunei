import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { MenstrualCycleForm } from "@/components/calculators/menstrual-cycle-form";
import { buildPageMetadata } from "@/lib/seo";

const calculator = calculators.find((c) => c.slug === "menstrual-cycle-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Menstrual Cycle Calculator — Predict Your Next Period",
  description: "Predict your next period, the following period, and your estimated ovulation date based on your cycle length.",
  path: "/calculators/menstrual-cycle-calculator",
});

const faqs = [
  {
    question: "What counts as a 'normal' cycle length?",
    answer:
      "Cycle length varies considerably between individuals — anywhere from about 21 to 35 days is generally considered within the typical range, measured from the first day of one period to the first day of the next.",
  },
  {
    question: "Why predict two future periods instead of just one?",
    answer:
      "Seeing two predicted cycles ahead makes it easier to plan around upcoming events and gives a clearer sense of your pattern, especially useful if your cycle isn't perfectly regular.",
  },
  {
    question: "What if my cycle is irregular?",
    answer:
      "This calculator assumes a consistent cycle length, so predictions will be less accurate for irregular cycles. Tracking your actual cycle over several months gives a more personalized average to enter here, and a healthcare provider can help investigate significant irregularity.",
  },
];

export default function MenstrualCycleCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <MenstrualCycleForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Predicting your cycle from a simple pattern
      </h2>
      <p>
        Menstrual cycle prediction relies on one core assumption: that your cycle length is
        reasonably consistent from month to month. Given the first day of your last period and
        your typical cycle length, this calculator projects forward to estimate your next period,
        the one after that, and your likely ovulation day in between.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why ovulation is calculated from the end, not the start</h3>
      <p>
        Ovulation timing is more consistent relative to the end of a cycle (the next period) than
        the beginning — it typically occurs about 14 days before the next period starts,
        regardless of how long the total cycle runs. That's why this calculator works out
        ovulation by counting backward from the predicted next period, rather than forward a
        fixed number of days from the last one.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">When predictions get less reliable</h3>
      <p>
        Stress, illness, travel, significant weight changes, and several health conditions can
        all shift cycle timing in a given month, even for someone with an otherwise consistent
        pattern. Treat these predictions as a useful estimate to plan around, not a guarantee —
        and if cycles are consistently irregular, that's worth discussing with a healthcare
        provider.
      </p>
    </article>
  );
}
