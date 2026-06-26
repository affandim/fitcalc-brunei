import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { UnitConverterForm } from "@/components/calculators/unit-converter-form";
import { speedUnits } from "@/lib/converters";

const calculator = calculators.find((c) => c.slug === "speed-converter")!;

export const metadata: Metadata = {
  title: "Speed Converter — km/h, mph, Knots",
  description: "Convert between metres/second, km/h, mph and knots instantly.",
  alternates: { canonical: "/calculators/speed-converter" },
};

const faqs = [
  {
    question: "What's a knot, and why do ships and planes use it?",
    answer:
      "A knot is one nautical mile per hour. Aviation and maritime navigation use it because nautical miles relate directly to degrees of latitude, making navigation calculations more convenient than with km/h or mph.",
  },
  {
    question: "Why do car speedometers show both km/h and mph?",
    answer:
      "Vehicles sold across multiple regions often display both, since some countries (most of the world) use km/h while others (the US, UK to a lesser extent) use mph — manufacturers build one speedometer design for multiple markets.",
  },
];

export default function SpeedConverterPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <UnitConverterForm units={speedUnits} defaultFromId="kmh" defaultToId="mph" />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Speed units across travel, sport and science
      </h2>
      <p>
        Speed conversion shows up everywhere from road travel (km/h vs mph) to sailing and
        aviation (knots) to physics (metres per second, the SI base unit). Each field settled on
        the unit most convenient for its own calculations and instruments, rather than all
        converging on one standard.
      </p>
      <p>
        This converter treats metres per second as the common base, since it's the most direct
        SI unit, then converts to and from the other three on request.
      </p>
    </article>
  );
}
