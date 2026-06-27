import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { AttendanceForm } from "@/components/calculators/attendance-form";
import { buildPageMetadata } from "@/lib/seo";

const calculator = calculators.find((c) => c.slug === "attendance-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Attendance Percentage Calculator",
  description: "Check whether you meet a minimum attendance requirement for school or work.",
  path: "/calculators/attendance-calculator",
});

const faqs = [
  {
    question: "Why is 75% a common attendance threshold?",
    answer:
      "Many educational institutions set minimum attendance requirements, often around 75-80%, as a policy threshold for course credit or exam eligibility. The exact requirement varies significantly by institution, country, and program — check your specific policy.",
  },
  {
    question: "How many more days can I miss and still meet the requirement?",
    answer:
      "This calculator shows your current percentage against the threshold. If you're already below it, you'd need a streak of full attendance going forward to bring the average back up — the exact number of days depends on how many total course days remain.",
  },
];

export default function AttendanceCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <AttendanceForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Tracking attendance against a minimum requirement
      </h2>
      <p>
        Many schools, universities, and some workplaces set a minimum attendance percentage as a
        condition for credit, certification, or continued enrollment. This calculator does the
        simple arithmetic — days attended over total days — and checks it against whatever
        threshold applies to your specific situation.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        Attendance % = (days attended ÷ total days) × 100
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Catching up after falling behind</h3>
      <p>
        If your current percentage falls below the required threshold, recovering it requires a
        run of consistent attendance — the more total days remaining in the term, the more
        "room" there is to recover the average, while a requirement late in a term with few days
        left is harder to recover from. Recalculating periodically as the term progresses gives
        a clearer, updated picture than a single calculation early on.
      </p>
    </article>
  );
}
