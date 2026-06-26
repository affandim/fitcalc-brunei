import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { BodySurfaceAreaForm } from "@/components/calculators/body-surface-area-form";

const calculator = calculators.find((c) => c.slug === "body-surface-area-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Body Surface Area Calculator — Mosteller Formula",
  description: "Calculate body surface area (BSA) in square metres using the Mosteller formula.",
  path: "/calculators/body-surface-area-calculator",
});

const faqs = [
  {
    question: "What is body surface area used for?",
    answer:
      "BSA is mainly used clinically to calculate medication dosages — particularly chemotherapy drugs — more precisely than weight alone, since drug distribution and clearance often correlate more closely with body surface area than with weight.",
  },
  {
    question: "Why the Mosteller formula specifically?",
    answer:
      "Mosteller's formula is simple, requires only height and weight, and is widely validated against more complex methods, which is why it's one of the most commonly used BSA formulas in clinical practice today.",
  },
  {
    question: "What's a typical adult BSA?",
    answer:
      "Most adults fall between roughly 1.6 and 2.0 m², with men typically toward the higher end of that range and women toward the lower end, reflecting average differences in height and weight.",
  },
];

export default function BodySurfaceAreaCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <BodySurfaceAreaForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        What body surface area measures, and why it matters
      </h2>
      <p>
        Body surface area (BSA) estimates the total external surface area of your body in square
        metres. It's primarily a clinical tool rather than a fitness one — its biggest real-world
        use is dosing certain medications, especially chemotherapy agents, where the relationship
        between drug effectiveness, toxicity, and body size correlates more closely with surface
        area than with weight alone.
      </p>
      <p>This calculator uses the Mosteller formula:</p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        BSA(m²) = √(height(cm) × weight(kg) ÷ 3600)
      </p>
      <p>
        It's valued for its simplicity — just two inputs — while remaining closely aligned with
        more complex formulas like Du Bois across most adult body sizes, which is why it's seen
        widespread clinical adoption since being published in 1987.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Should you track this for fitness?</h3>
      <p>
        For most people outside a clinical context, BSA isn't a particularly actionable number —
        it doesn't change much in response to training or diet the way weight, body fat, or waist
        circumference do. It's included here mainly as a reference tool for anyone who needs it
        for medical or academic purposes rather than as a fitness-tracking metric.
      </p>
    </article>
  );
}
