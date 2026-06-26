import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { TipForm } from "@/components/calculators/tip-form";

const calculator = calculators.find((c) => c.slug === "tip-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Tip Calculator — Split a Bill Between Any Number of People",
  description: "Calculate the tip amount and split the total bill evenly between any number of people.",
  path: "/calculators/tip-calculator",
});

const faqs = [
  {
    question: "What's a typical tip percentage?",
    answer:
      "Conventions vary widely by country and even by service type. In the US, 15-20% is common for restaurant service. Many other countries have little to no tipping culture, or tipping conventions closer to 5-10%. Check local norms if you're unsure.",
  },
  {
    question: "Does this split the bill or just the tip?",
    answer:
      "It splits the total — bill plus tip — evenly across everyone. If you'd rather split only specific items unevenly (someone ordered something more expensive), you'd need to adjust each person's share manually after using this for the overall tip calculation.",
  },
];

export default function TipCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <TipForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Quick tip math for any group size
      </h2>
      <p>
        Splitting a bill with tip across a group involves two simple steps that are still easy to
        get wrong doing quick mental math at the table: calculate the tip on the original bill,
        add it to get the total, then divide by the number of people.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        Tip = Bill × (tip % ÷ 100)
        <br />
        Per person = (Bill + Tip) ÷ number of people
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Tipping conventions vary widely</h3>
      <p>
        There's no universal "correct" tip percentage — conventions differ significantly by
        country, and even within a country, by type of service. When traveling or eating
        somewhere unfamiliar, a quick check of local tipping norms avoids both under-tipping
        (which can be seen as rude in tip-dependent service cultures) and over-tipping
        unnecessarily where it isn't expected.
      </p>
    </article>
  );
}
