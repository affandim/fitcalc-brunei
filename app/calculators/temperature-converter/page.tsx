import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { TemperatureConverterForm } from "@/components/calculators/temperature-converter-form";

const calculator = calculators.find((c) => c.slug === "temperature-converter")!;

export const metadata: Metadata = {
  title: "Temperature Converter — Celsius, Fahrenheit, Kelvin",
  description: "Convert between Celsius, Fahrenheit and Kelvin instantly.",
  alternates: { canonical: "/calculators/temperature-converter" },
};

const faqs = [
  {
    question: "Why isn't temperature a simple multiplication like other conversions?",
    answer:
      "Celsius and Fahrenheit have different zero points (0°C ≈ 32°F), so converting between them requires both a scaling factor and an offset, not just multiplication — unlike length or weight, which only need a single factor.",
  },
  {
    question: "Why does science use Kelvin?",
    answer:
      "Kelvin starts at absolute zero — the theoretical point where molecular motion stops — making it the most natural scale for physics and chemistry calculations, where negative temperatures would otherwise complicate the math.",
  },
];

export default function TemperatureConverterPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <TemperatureConverterForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Why temperature conversion needs more than a multiplication
      </h2>
      <p>
        Most unit conversions — length, weight, volume — are a simple multiplication, because
        every scale shares the same zero point. Temperature is different: 0°C is not the same
        physical temperature as 0°F, so converting between them requires both scaling and
        shifting the number, not just multiplying it.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        °F = °C × 9/5 + 32
        <br />
        K = °C + 273.15
      </p>
      <p>
        Kelvin avoids negative numbers entirely for any physically realistic temperature, since
        0 K represents absolute zero — the coldest temperature theoretically possible — which is
        why it's the standard scale in scientific contexts despite being unfamiliar for everyday
        use.
      </p>
    </article>
  );
}
