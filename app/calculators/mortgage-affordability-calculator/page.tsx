import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { MortgageAffordabilityForm } from "@/components/calculators/mortgage-affordability-form";

const calculator = calculators.find((c) => c.slug === "mortgage-affordability-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Mortgage Affordability Calculator — 28/36 Rule",
  description: "Find out how much home you can afford based on your income, debts, and the standard 28/36 affordability rule.",
  path: "/calculators/mortgage-affordability-calculator",
});

const faqs = [
  {
    question: "What is the 28/36 rule?",
    answer:
      "A traditional mortgage lending guideline: housing costs (mortgage payment, taxes, insurance) shouldn't exceed 28% of gross monthly income, and total debt payments (housing plus all other debts) shouldn't exceed 36%. Many lenders use a variation of this rule when assessing affordability.",
  },
  {
    question: "Why does existing debt reduce my affordability so much?",
    answer:
      "The back-end ratio (36%) covers all debt combined, not just housing. The more you already pay toward car loans, student loans, or credit cards each month, the less room remains under that combined cap for a mortgage payment.",
  },
  {
    question: "Does this account for property taxes and insurance?",
    answer:
      "This calculator estimates principal and interest only, the core loan payment. Actual monthly housing costs also typically include property taxes, homeowners insurance, and sometimes HOA fees — all of which count toward the 28% housing cap in a full affordability assessment.",
  },
];

export default function MortgageAffordabilityCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <MortgageAffordabilityForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        How lenders estimate what you can afford
      </h2>
      <p>
        Mortgage affordability isn't just about how large a loan you'd like — lenders apply
        structured guidelines to assess how much you can reasonably repay without overextending.
        The most widely referenced framework is the 28/36 rule, used here to estimate a
        reasonable home price range.
      </p>
      <p>
        The "28" refers to the front-end ratio: housing costs shouldn't exceed 28% of gross
        monthly income. The "36" refers to the back-end ratio: total debt payments, including
        housing, shouldn't exceed 36% of gross monthly income. Your actual affordable mortgage
        payment is capped by whichever of these two limits is more restrictive given your
        specific debt situation.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Working backward to a home price</h3>
      <p>
        Once the maximum monthly payment is known, this calculator reverses the standard loan
        amortization formula to solve for the largest loan amount that fits within that payment,
        at your specified interest rate and term. Adding your down payment to that loan amount
        gives the maximum home price.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">This is a guideline, not a guarantee</h3>
      <p>
        Actual lending decisions also weigh credit history, employment stability, cash reserves,
        and lender-specific policies that vary by institution and loan program. Treat this
        calculator as a reasonable starting estimate for your own planning, not a substitute for
        a formal mortgage pre-approval.
      </p>
    </article>
  );
}
