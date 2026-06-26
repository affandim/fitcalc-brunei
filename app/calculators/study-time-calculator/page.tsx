import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { StudyTimeForm } from "@/components/calculators/study-time-form";

const calculator = calculators.find((c) => c.slug === "study-time-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Study Time Planner — Daily Study Hours Before an Exam",
  description: "Plan how many hours to study per day before an exam, broken into Pomodoro sessions.",
  path: "/calculators/study-time-calculator",
});

const faqs = [
  {
    question: "How do I estimate total study hours needed?",
    answer:
      "This varies by subject and how well you already know the material. A common rough starting point is estimating based on past exams of similar difficulty, or asking how many hours of focused review historically got you to a comfortable level of preparation.",
  },
  {
    question: "What is the Pomodoro technique?",
    answer:
      "A time-management method using focused 25-minute work intervals followed by short breaks (typically 5 minutes), with a longer break after every four intervals. It's designed to maintain concentration and avoid burnout during long study sessions.",
  },
  {
    question: "What if the daily hours needed feels unrealistic?",
    answer:
      "That's useful information early rather than a problem to ignore — it usually means starting sooner, narrowing the scope of what you review, or being more realistic about how many hours you can sustainably study each day without diminishing returns.",
  },
];

export default function StudyTimeCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <StudyTimeForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Turning exam prep into a daily, achievable plan
      </h2>
      <p>
        "Study more" is rarely the problem — most students already know they should study more.
        The more useful question is how to translate a vague intention into a specific daily
        plan that actually fits into the time remaining before an exam. This calculator does that
        simple division, then breaks the result into Pomodoro-style sessions for a more concrete
        sense of what the day looks like.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why break time into Pomodoro sessions</h3>
      <p>
        The Pomodoro technique — 25 minutes of focused work followed by a short break — exists
        because sustained, unbroken concentration is hard to maintain, and most people's
        attention naturally drifts well before an hour passes. Breaking a large total into
        discrete sessions makes the work feel more achievable and gives natural checkpoints to
        assess progress and take a genuine break.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Start earlier than feels necessary</h3>
      <p>
        The daily hours figure drops quickly as the number of days remaining increases — starting
        preparation even a few days earlier can meaningfully reduce daily intensity. Cramming a
        large total into a short window not only requires more hours per day, but research on
        learning consistently shows distributed practice (spreading study across more sessions
        over more days) produces better retention than the same total hours compressed into a
        shorter cramming period.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Adjust the plan as you go</h3>
      <p>
        Treat the daily number as a starting plan, not a fixed rule. If you find certain topics
        take longer than expected, recalculate with an updated total — flexibility in execution
        matters more than rigid adherence to an initial estimate.
      </p>
    </article>
  );
}
