import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { DiscountForm } from "@/components/calculators/discount-form";

const calculator = calculators.find((c) => c.slug === "discount-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Discount Calculator — Final Price & Savings",
  description: "Calculate the final sale price and total savings on any discounted item.",
  path: "/calculators/discount-calculator",
});

const faqs = [
  {
    question: "How do I calculate a stacked discount (e.g. 20% off, then an extra 10%)?",
    answer:
      "Apply them sequentially, not by adding the percentages together. Calculate the first discount here, then use the resulting final price as the new 'original price' for the second discount calculation — stacked percentage discounts compound rather than simply add.",
  },
  {
    question: "Why doesn't 50% off twice equal 100% off?",
    answer:
      "Each discount applies to the already-reduced price, not the original. 50% off, then another 50% off the new price, leaves you paying 25% of the original — not 0% — because the second discount is calculated on a smaller base.",
  },
];

export default function DiscountCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <DiscountForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Quick discount math, including the stacked-discount trap
      </h2>
      <p>
        Calculating a single discount is straightforward: multiply the original price by the
        discount percentage to find your savings, then subtract that from the original price for
        the final cost.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        Savings = Original price × (discount % ÷ 100)
        <br />
        Final price = Original price − Savings
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Stacked discounts don't simply add</h3>
      <p>
        A common mistake is assuming two discounts — say, 20% off plus an extra 10% off — combine
        into a flat 30% off. They don't. Each discount applies to the already-reduced price from
        the previous step, so the combined effect is always slightly less than simply adding the
        percentages together. Calculating each step separately, using the previous result as the
        new starting price, gives the accurate final number.
      </p>
    </article>
  );
}
