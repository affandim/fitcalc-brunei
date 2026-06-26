import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { UnitConverterForm } from "@/components/calculators/unit-converter-form";
import { lengthUnits } from "@/lib/converters";

const calculator = calculators.find((c) => c.slug === "length-converter")!;

export const metadata: Metadata = {
  title: "Length Converter — Metres, Feet, Miles & More",
  description: "Convert between millimetres, centimetres, metres, kilometres, inches, feet, yards and miles instantly.",
  alternates: { canonical: "/calculators/length-converter" },
};

const faqs = [
  {
    question: "How accurate are these conversions?",
    answer:
      "Each conversion uses internationally standardized factors (e.g. 1 inch = 2.54cm exactly), so results are precise to the decimal places shown.",
  },
  {
    question: "Why do some countries use feet and miles instead of metres?",
    answer:
      "Most of the world uses the metric system, but a handful of countries — notably the United States — still primarily use imperial units for everyday measurements, a legacy of historical measurement systems that metric later replaced almost everywhere else.",
  },
];

export default function LengthConverterPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <UnitConverterForm units={lengthUnits} defaultFromId="m" defaultToId="ft" />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Converting between metric and imperial length
      </h2>
      <p>
        Length is one of the most commonly converted measurements, mostly because the world
        runs on two different systems at once: metric (millimetres through kilometres), used by
        nearly every country, and imperial (inches through miles), still used for everyday
        measurement primarily in the United States, with partial use in the UK and a few other
        countries.
      </p>
      <p>
        All conversions here run through metres as a common base unit — converting any unit to
        metres, then from metres to the target unit — which keeps the underlying math simple and
        consistent regardless of which two units you're converting between.
      </p>
    </article>
  );
}
