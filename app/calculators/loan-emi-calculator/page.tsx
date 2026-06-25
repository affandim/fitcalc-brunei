import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { LoanEmiForm } from "@/components/calculators/loan-emi-form";

const calculator = calculators.find((c) => c.slug === "loan-emi-calculator")!;

export const metadata: Metadata = {
  title: "Loan EMI Calculator — Monthly Payment & Total Interest",
  description: "Calculate your monthly loan payment (EMI), total repayment, and total interest for any loan amount, rate and term.",
  alternates: { canonical: "/calculators/loan-emi-calculator" },
};

const faqs = [
  {
    question: "What does EMI stand for?",
    answer:
      "Equated Monthly Installment — a fixed payment made every month that covers both principal and interest, structured so the loan is fully paid off by the end of the term.",
  },
  {
    question: "Why is more interest paid early in the loan?",
    answer:
      "In a standard amortizing loan, each payment is split between interest and principal, but the interest portion is calculated on the remaining balance — which is highest at the start. As the balance shrinks, more of each payment goes toward principal.",
  },
  {
    question: "Does a longer loan term always cost more?",
    answer:
      "In total interest paid, yes — a longer term means more time for interest to accrue on the outstanding balance, even though the monthly payment is lower. It's a trade-off between monthly affordability and total cost.",
  },
];

export default function LoanEmiCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <LoanEmiForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        How loan payments are actually calculated
      </h2>
      <p>
        Most loans — mortgages, car loans, personal loans — use a structure called amortization,
        where you pay the same fixed amount every month for the life of the loan, but the mix of
        principal and interest within that payment shifts over time. Early payments are weighted
        more heavily toward interest; later payments are weighted more toward principal.
      </p>
      <p>The standard formula for the fixed monthly payment is:</p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)
      </p>
      <p>
        Where P is the loan principal, r is the monthly interest rate (annual rate ÷ 12), and n
        is the total number of monthly payments. This formula guarantees the loan balance reaches
        exactly zero after the final payment, regardless of the rate or term.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why total interest can surprise people</h3>
      <p>
        On a long-term loan, total interest paid over the life of the loan can be a significant
        fraction of the original principal — sometimes more than the principal itself on a
        30-year mortgage at a moderate rate. This isn't a sign of anything being wrong; it's the
        mathematical consequence of borrowing money for a long time at a non-zero interest rate.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Ways to reduce total interest</h3>
      <p>
        Three main levers affect total interest: a shorter term (less time for interest to
        accrue, though higher monthly payments), a lower rate (often achieved through a larger
        down payment, improved credit, or refinancing), and extra principal payments (paying more
        than the required EMI when possible, which directly reduces the balance interest is
        calculated on).
      </p>
    </article>
  );
}
