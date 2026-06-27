import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { WeightedGradeForm } from "@/components/calculators/weighted-grade-form";
import { buildPageMetadata } from "@/lib/seo";

const calculator = calculators.find((c) => c.slug === "weighted-grade-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Weighted Average Grade Calculator",
  description: "Combine assignment, exam and project scores with different weights into one overall grade.",
  path: "/calculators/weighted-grade-calculator",
});

const faqs = [
  {
    question: "How is this different from the GPA Calculator?",
    answer:
      "GPA combines letter grades across whole courses, weighted by credit hours. This calculator combines percentage scores within a single course — assignments, exams, and projects — weighted by how much each category counts toward the final grade.",
  },
  {
    question: "Why should the weights add up to 100%?",
    answer:
      "Weights represent each category's share of the final grade. If they don't sum to 100%, the calculation still works mathematically (it normalizes automatically), but it's worth double-checking your course syllabus to make sure you've entered the weights correctly.",
  },
  {
    question: "Can I use this to figure out what I need on a final exam?",
    answer:
      "Indirectly — calculate your current weighted average from completed work, then experiment with different scores for the remaining weighted category (like a final exam) to see what result would get you to your target overall grade.",
  },
];

export default function WeightedGradeCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <WeightedGradeForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Combining different assessment types into one grade
      </h2>
      <p>
        Most courses don't weight every assignment equally — a final exam might count for 40% of
        the grade while weekly quizzes count for 10% combined. This calculator handles that
        weighted combination directly, rather than requiring manual calculation for each
        category.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        Weighted average = Σ(score × weight) ÷ Σ(weight)
      </p>
      <p>
        Dividing by the total weight (rather than assuming it's always exactly 100) means the
        calculation still produces a sensible result even if your weights don't sum perfectly to
        100% — useful if you're working with partial information or estimating before all
        category weights are finalized.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Using this to plan ahead</h3>
      <p>
        Beyond calculating a current grade, this tool is useful for forward planning: enter your
        completed work as-is, then add a placeholder entry for an upcoming exam or project with
        different hypothetical scores to see what result each scenario would produce — a quick
        way to understand exactly how much a remaining assessment matters to your final grade.
      </p>
    </article>
  );
}
