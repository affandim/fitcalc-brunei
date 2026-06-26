import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { InvestmentReturnForm } from "@/components/calculators/investment-return-form";

const calculator = calculators.find((c) => c.slug === "investment-return-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Investment Return Calculator — Total & Annualized Return",
  description: "Calculate the total return and annualized (CAGR) return on an investment over any holding period.",
  path: "/calculators/investment-return-calculator",
});

const faqs = [
  {
    question: "What's the difference between total return and annualized return?",
    answer:
      "Total return is the overall percentage gain over the entire holding period. Annualized return (CAGR) converts that into an equivalent constant yearly rate, making it possible to fairly compare investments held for different lengths of time.",
  },
  {
    question: "Why does annualized return matter more for comparisons?",
    answer:
      "A 50% total return over 10 years and a 50% total return over 2 years represent very different performance — annualizing reveals that the second investment grew much faster per year, even though the total gain looks identical.",
  },
  {
    question: "Does this account for dividends or additional contributions?",
    answer:
      "No — this calculator compares a single initial and final value. If you made additional contributions along the way, the Compound Interest Calculator's regular-contribution model will give a more accurate picture.",
  },
];

export default function InvestmentReturnCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <InvestmentReturnForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Total return vs annualized return: why both matter
      </h2>
      <p>
        If an investment grows from $10,000 to $15,000, the total return is a straightforward
        50%. But that number alone hides an important detail: did it happen over 2 years or 20?
        Annualized return — also called CAGR, Compound Annual Growth Rate — answers that by
        expressing the gain as an equivalent constant yearly rate, making it possible to compare
        investments fairly regardless of how long each was held.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        CAGR = (Final Value ÷ Initial Value)^(1 ÷ years) − 1
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why this matters for comparing investments</h3>
      <p>
        Two investments with identical total returns can have very different annualized returns
        if held for different lengths of time, and two investments with very different total
        returns can have surprisingly similar annualized returns if their holding periods differ
        enough. CAGR is the standard way investors normalize for this when comparing options.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">What CAGR doesn't capture</h3>
      <p>
        CAGR smooths an investment's actual path into a single constant rate, which means it
        hides volatility entirely. An investment that grew steadily and one that dropped sharply
        then recovered can show the identical CAGR despite a very different — and very
        differently risky — experience along the way. It's a useful summary statistic, not a
        complete picture of an investment's risk profile.
      </p>
    </article>
  );
}
