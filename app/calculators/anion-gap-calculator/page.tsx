import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { AnionGapForm } from "@/components/calculators/anion-gap-form";
import { buildPageMetadata } from "@/lib/seo";

const calculator = calculators.find((c) => c.slug === "anion-gap-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Anion Gap Calculator — Serum Anion Gap from Electrolytes",
  description: "Calculate serum anion gap from sodium, chloride and bicarbonate lab values.",
  path: "/calculators/anion-gap-calculator",
});

const faqs = [
  {
    question: "What is anion gap used for?",
    answer:
      "Anion gap is a calculated value, derived from routine electrolyte panel results, used in clinical settings as a starting point for investigating certain metabolic acid-base disorders. It's a screening calculation, not a diagnosis on its own.",
  },
  {
    question: "What does a high anion gap suggest?",
    answer:
      "An elevated anion gap can be associated with several conditions, including certain types of metabolic acidosis. Interpretation always requires clinical context — this calculator performs the arithmetic, not the diagnosis.",
  },
  {
    question: "Is this tool a substitute for clinical interpretation?",
    answer:
      "No. This is a reference calculation tool for the underlying arithmetic. Interpreting lab values, including anion gap, in the context of a patient's full clinical picture should always involve a qualified healthcare professional.",
  },
];

export default function AnionGapCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <AnionGapForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        A standard calculation from routine lab values
      </h2>
      <p>
        Anion gap is not measured directly — it's calculated from three values that typically
        already appear together on a basic metabolic panel: sodium, chloride, and bicarbonate.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        Anion gap = Na − (Cl + HCO3)
      </p>
      <p>
        The calculation reflects unmeasured anions in the blood (since labs don't routinely
        measure every ion present) and is used clinically as a starting point for narrowing down
        possible causes of certain acid-base disturbances.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">A reference calculation, not a diagnosis</h3>
      <p>
        A normal anion gap is generally considered to fall roughly between 8 and 16 mEq/L,
        though reference ranges can vary slightly between labs and measurement methods. Values
        outside this range warrant clinical interpretation in context — by itself, this number
        narrows a differential rather than pointing to a single specific cause.
      </p>
    </article>
  );
}
