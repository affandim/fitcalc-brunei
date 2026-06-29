import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { PregnancyWeeksToMonthsForm } from "@/components/calculators/pregnancy-weeks-to-months-form";
import { buildPageMetadata } from "@/lib/seo";

const calculator = calculators.find((c) => c.slug === "pregnancy-weeks-to-months-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Pregnancy Weeks to Months Calculator",
  description: "Convert how many weeks pregnant you are into months and trimester.",
  path: "/calculators/pregnancy-weeks-to-months-calculator",
});

const faqs = [
  {
    question: "Why isn't pregnancy exactly 9 months?",
    answer:
      "A full-term pregnancy (40 weeks) works out to roughly 9.2 months using a standard 4.345-weeks-per-month average — slightly longer than a flat '9 months,' which is more of a convenient rounding than an exact figure.",
  },
  {
    question: "Why do weeks and months sometimes feel inconsistent when people talk about pregnancy?",
    answer:
      "Medical tracking uses weeks because they're more precise for monitoring development, while everyday conversation often defaults to months because it's a more familiar unit — the two systems don't divide evenly into each other, which is exactly why a quick conversion tool is useful.",
  },
];

export default function PregnancyWeeksToMonthsCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <PregnancyWeeksToMonthsForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Why "9 months" is really an approximation
      </h2>
      <p>
        Medical professionals track pregnancy in weeks because it's a more precise unit for
        monitoring fetal development and timing care milestones. Everyday conversation, on the
        other hand, defaults to months — but the two units don't divide into each other evenly,
        which is why "how many months is that?" doesn't have a perfectly round answer.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        Months ≈ weeks ÷ 4.345
      </p>
      <p>
        A full-term pregnancy at 40 weeks works out to roughly 9.2 months — slightly more than
        the commonly used "9 months" shorthand, which is a convenient rounding rather than an
        exact figure.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">How trimesters line up</h3>
      <p>
        The first trimester runs through week 12, the second from week 13 through week 26, and
        the third from week 27 through delivery. These boundaries are widely used reference
        points for tracking which stage of development and which common symptoms are typical at
        any given point.
      </p>
    </article>
  );
}
