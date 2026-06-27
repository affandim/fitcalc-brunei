import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { ConceptionDateForm } from "@/components/calculators/conception-date-form";
import { buildPageMetadata } from "@/lib/seo";

const calculator = calculators.find((c) => c.slug === "conception-date-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Conception Date Calculator",
  description: "Estimate when conception likely occurred, working backwards from a due date.",
  path: "/calculators/conception-date-calculator",
});

const faqs = [
  {
    question: "How is conception date estimated?",
    answer:
      "This calculator works backwards from your due date using the same 280-day pregnancy length assumption as Naegele's rule, subtracting 266 days (accounting for the roughly two-week gap between the last menstrual period and actual ovulation/conception).",
  },
  {
    question: "Why might the actual conception date differ?",
    answer:
      "Cycle length varies between individuals — someone with a longer or shorter cycle than the standard 28 days assumed here will have ovulated, and therefore conceived, at a correspondingly different time than this estimate suggests.",
  },
];

export default function ConceptionDateCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <ConceptionDateForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Working backwards from due date to conception
      </h2>
      <p>
        Most pregnancy dating works forward from the last menstrual period to estimate a due
        date. This calculator runs that process in reverse — if you already know (or have been
        given) a due date, it estimates when conception likely occurred, based on the same
        standard 280-day pregnancy length assumption.
      </p>
      <p>
        Because ovulation typically occurs around two weeks into a standard cycle, conception
        date is estimated as 266 days before the due date (280 days minus the roughly 14-day gap
        between last period and ovulation) — slightly later than the last menstrual period date
        used in due-date calculations.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why this is an estimate, not a fact</h3>
      <p>
        Actual conception timing depends on individual cycle length and ovulation timing, both of
        which vary. This calculator assumes a standard 28-day cycle; anyone with a notably longer
        or shorter cycle conceived at a correspondingly shifted time relative to this estimate.
      </p>
    </article>
  );
}
