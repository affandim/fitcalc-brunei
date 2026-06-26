import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { GpaForm } from "@/components/calculators/gpa-form";

const calculator = calculators.find((c) => c.slug === "gpa-calculator")!;

export const metadata: Metadata = {
  title: "GPA Calculator — Credit-Weighted Grade Point Average",
  description: "Calculate your cumulative GPA by adding each course's grade and credit hours.",
  alternates: { canonical: "/calculators/gpa-calculator" },
};

const faqs = [
  {
    question: "Why are credit hours part of the calculation?",
    answer:
      "A 4-credit course with an A should count for more than a 1-credit course with an A — credit-weighting ensures larger courses have proportionally more influence on your overall GPA, matching how most universities actually calculate it.",
  },
  {
    question: "Does this match my university's exact grading scale?",
    answer:
      "This calculator uses the common US 4.0 scale with standard plus/minus increments. Some institutions use slightly different scales (no plus/minus, a 5.0 scale for honors courses, etc.) — check your school's specific policy if you need an exact official match.",
  },
  {
    question: "How is cumulative GPA different from semester GPA?",
    answer:
      "Semester GPA only includes courses from one term. Cumulative GPA includes every course across your entire academic record. Add all your courses here for a cumulative figure, or just one term's courses for a semester-specific GPA.",
  },
];

export default function GpaCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <GpaForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        How credit-weighted GPA actually works
      </h2>
      <p>
        Grade Point Average converts letter grades into a single numerical summary of academic
        performance, but a simple average of grades would treat every course equally regardless
        of its size. Credit-weighting fixes this by giving larger courses proportionally more
        influence on the final number.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        GPA = Σ(grade points × credit hours) ÷ Σ(credit hours)
      </p>
      <p>
        In practice, this means a 4-credit course contributes four times as much to your GPA as
        a 1-credit course with the same letter grade — which matches how most universities
        actually calculate the figure that appears on an official transcript.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Grade scales vary by institution</h3>
      <p>
        This calculator uses the standard US 4.0 scale with plus/minus increments (A = 4.0, A− =
        3.7, B+ = 3.3, and so on), the most common convention. Some schools use a flat scale
        without plus/minus distinctions, and some use scales that go above 4.0 for honors or AP
        courses — if your institution differs, the underlying credit-weighting principle still
        applies even if the specific grade-point values need adjusting.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why one bad semester rarely sinks a GPA</h3>
      <p>
        Because cumulative GPA averages across every credit hour ever taken, a single difficult
        semester has a diminishing effect on the overall number as more credits accumulate over
        time — which is part of why academic advisors often emphasize that an early rough patch
        is more recoverable than it might feel in the moment.
      </p>
    </article>
  );
}
