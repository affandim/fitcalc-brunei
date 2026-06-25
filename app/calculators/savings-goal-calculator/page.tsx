import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { SavingsGoalForm } from "@/components/calculators/savings-goal-form";

const calculator = calculators.find((c) => c.slug === "savings-goal-calculator")!;

export const metadata: Metadata = {
  title: "Savings Goal Calculator — Monthly Contribution Needed",
  description: "Find out how much to save each month to reach a specific savings target by a target date.",
  alternates: { canonical: "/calculators/savings-goal-calculator" },
};

const faqs = [
  {
    question: "How does this calculator work backwards from a goal?",
    answer:
      "It takes your target amount, subtracts the projected future value of what you've already saved (grown at your expected return), then solves for the monthly contribution that would close the remaining gap by your deadline.",
  },
  {
    question: "What return rate should I assume?",
    answer:
      "This depends entirely on where the money will be held. A standard savings account might earn a low single-digit rate; a diversified investment portfolio held for many years has historically returned more, but with volatility a savings account doesn't have. Use a conservative estimate for near-term goals.",
  },
  {
    question: "What if the required monthly contribution feels too high?",
    answer:
      "Three levers can help: extending the time horizon, reducing the target amount, or increasing your starting savings before the contribution period begins. Adjusting any of these will lower the monthly figure shown.",
  },
];

export default function SavingsGoalCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <SavingsGoalForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Working backwards from a savings target
      </h2>
      <p>
        Most savings calculators ask "how much will I have?" This one flips the question: "how
        much do I need to save each month to reach a specific number by a specific date?" That's
        often the more useful framing for a concrete goal — a house down payment, a wedding, an
        emergency fund target — where the deadline and target amount are fixed and the unknown is
        the monthly habit needed to get there.
      </p>
      <p>
        The calculation first projects your current savings forward at your expected rate of
        return, then works out what additional monthly contribution — also growing at that same
        rate — would close the gap to your target by the deadline.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Matching the rate to the goal</h3>
      <p>
        The assumed rate of return should match where the money will actually sit. A near-term
        goal (under 2-3 years) is usually better held in a savings account or similarly stable
        instrument, where a conservative low rate is appropriate. A longer-term goal might
        reasonably use money market or investment returns, but those come with volatility that a
        savings account doesn't — a number this calculator can't capture on its own.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">If the number feels unrealistic</h3>
      <p>
        A monthly contribution that feels out of reach is useful information, not a failure of
        the plan. It usually means one of three things needs to adjust: a longer timeline, a
        smaller target, or building up the starting balance before the regular contribution phase
        begins — all of which the calculator will reflect immediately if you change the inputs.
      </p>
    </article>
  );
}
