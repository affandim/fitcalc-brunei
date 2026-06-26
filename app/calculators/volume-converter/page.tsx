import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { UnitConverterForm } from "@/components/calculators/unit-converter-form";
import { volumeUnits } from "@/lib/converters";

const calculator = calculators.find((c) => c.slug === "volume-converter")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Volume Converter — Litres, Cups, Gallons & More",
  description: "Convert between millilitres, litres, teaspoons, cups, fluid ounces and gallons instantly.",
  path: "/calculators/volume-converter",
});

const faqs = [
  {
    question: "Why is a US gallon different from a UK gallon?",
    answer:
      "The US and UK historically defined the gallon differently — a US gallon (3.785 litres) is smaller than a UK imperial gallon (4.546 litres). This calculator uses the US gallon, the more commonly referenced version in recipes and US-published content.",
  },
  {
    question: "Why do recipes mix cups, tablespoons and millilitres?",
    answer:
      "Cooking measurement conventions vary by country and by recipe source — US recipes lean on cups and tablespoons, while most other countries default to millilitres and litres, which is exactly the kind of mismatch this converter is built to resolve quickly.",
  },
];

export default function VolumeConverterPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <UnitConverterForm units={volumeUnits} defaultFromId="l" defaultToId="cup" />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Volume units: a common source of recipe confusion
      </h2>
      <p>
        Volume conversion comes up constantly in cooking, where recipe sources mix units almost
        arbitrarily — a US recipe might call for cups and tablespoons, while a European one uses
        millilitres and litres. None of these is more "correct" than another; they're just
        different regional conventions.
      </p>
      <p>
        This converter uses litres as the common base unit, with cup and tablespoon definitions
        based on the standard US customary measurements most commonly referenced online.
      </p>
    </article>
  );
}
