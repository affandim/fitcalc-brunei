import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { UnitConverterForm } from "@/components/calculators/unit-converter-form";
import { areaUnits } from "@/lib/converters";

const calculator = calculators.find((c) => c.slug === "area-converter")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Area Converter — m², Acres, Hectares & More",
  description: "Convert between square metres, square kilometres, square feet, acres and hectares instantly.",
  path: "/calculators/area-converter",
});

const faqs = [
  {
    question: "Why do real estate listings use acres in some countries and hectares in others?",
    answer:
      "Acres are a traditional imperial unit still used for land in the US and a few other countries, while hectares are the metric standard used almost everywhere else, including most of Europe and Asia. Neither is more accurate — they're just different regional conventions.",
  },
  {
    question: "How big is an acre, roughly?",
    answer:
      "An acre is about 4,047 square metres — roughly the size of a standard American football field, including the end zones.",
  },
];

export default function AreaConverterPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <UnitConverterForm units={areaUnits} defaultFromId="m2" defaultToId="ft2" />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Land and area units across property and geography
      </h2>
      <p>
        Area conversion comes up most often around property and land — square metres and
        hectares dominate metric countries, while square feet and acres remain standard in real
        estate listings in the United States. This converter runs every unit through square
        metres as a common base for consistent results across any pair.
      </p>
    </article>
  );
}
