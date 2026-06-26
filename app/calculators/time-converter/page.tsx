import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { UnitConverterForm } from "@/components/calculators/unit-converter-form";
import { timeUnits } from "@/lib/converters";

const calculator = calculators.find((c) => c.slug === "time-converter")!;

export const metadata: Metadata = {
  title: "Time Converter — Seconds, Hours, Days, Weeks",
  description: "Convert between seconds, minutes, hours, days and weeks instantly.",
  alternates: { canonical: "/calculators/time-converter" },
};

const faqs = [
  {
    question: "Why are there 60 seconds in a minute instead of a rounder number?",
    answer:
      "The 60-based (sexagesimal) system for time dates back to ancient Babylonian mathematics, which used base-60 counting. It stuck around for time and angle measurement long after most other measurement systems moved to base-10.",
  },
];

export default function TimeConverterPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <UnitConverterForm units={timeUnits} defaultFromId="hr" defaultToId="min" />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Why time conversion still uses base-60
      </h2>
      <p>
        Unlike most modern measurement systems, which moved to base-10 for ease of conversion,
        time measurement still runs on base-60 for seconds and minutes — a holdover from ancient
        Babylonian mathematics that proved durable enough to survive into the modern world
        largely unchanged.
      </p>
      <p>
        This converter handles the arithmetic across seconds, minutes, hours, days and weeks, so
        you don't need to remember that there are 86,400 seconds in a day or 604,800 in a week.
      </p>
    </article>
  );
}
