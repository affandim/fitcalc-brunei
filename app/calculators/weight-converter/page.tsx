import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { UnitConverterForm } from "@/components/calculators/unit-converter-form";
import { weightUnits } from "@/lib/converters";

const calculator = calculators.find((c) => c.slug === "weight-converter")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Weight Converter — kg, lb, oz, Stone",
  description: "Convert between milligrams, grams, kilograms, ounces, pounds and stone instantly.",
  path: "/calculators/weight-converter",
});

const faqs = [
  {
    question: "Why does the UK use stone for body weight?",
    answer:
      "Stone (14 pounds) has been a traditional British unit for body weight for centuries and remains common in everyday conversation in the UK and Ireland, even though kilograms are the official metric standard used in medical and scientific contexts.",
  },
  {
    question: "How precise is the kg-to-lb conversion?",
    answer:
      "1 kilogram equals exactly 2.20462 pounds — this calculator uses that full precision factor, so results stay accurate even for larger values.",
  },
];

export default function WeightConverterPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <UnitConverterForm units={weightUnits} defaultFromId="kg" defaultToId="lb" />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Why weight units vary so much by region
      </h2>
      <p>
        Kilograms are the standard scientific and medical unit worldwide, but everyday usage
        still varies: pounds dominate casual conversation in the United States, stone is common
        for body weight in the UK, and grams are used for smaller quantities almost everywhere,
        including cooking and nutrition labels.
      </p>
      <p>
        This converter runs every unit through kilograms as a common base, so converting directly
        between any two units — say, stone to pounds — stays accurate and consistent.
      </p>
    </article>
  );
}
