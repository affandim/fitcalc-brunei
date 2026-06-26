import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { DueDateForm } from "@/components/calculators/due-date-form";

const calculator = calculators.find((c) => c.slug === "due-date-calculator")!;

export const metadata: Metadata = {
  title: "Due Date Calculator — Estimate Your Pregnancy Due Date",
  description: "Estimate your pregnancy due date and current week using Naegele's rule.",
  alternates: { canonical: "/calculators/due-date-calculator" },
};

const faqs = [
  {
    question: "How accurate is this due date estimate?",
    answer:
      "Naegele's rule, used here, gives a reasonable estimate for a typical 28-day cycle, but only about 5% of babies actually arrive exactly on their calculated due date. An ultrasound dating scan, usually done early in pregnancy, provides a more individualized estimate.",
  },
  {
    question: "What if my cycle isn't 28 days?",
    answer:
      "Naegele's rule assumes a 28-day cycle with ovulation around day 14. If your cycle is consistently longer or shorter, your actual conception date — and therefore due date — may shift by roughly the same number of days your cycle differs from 28.",
  },
  {
    question: "Why do trimesters matter?",
    answer:
      "Each trimester is associated with different developmental milestones and different common symptoms, which is why healthcare providers often frame check-ins and advice around which trimester you're in.",
  },
];

export default function DueDateCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <DueDateForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        How due dates are estimated — and why they're estimates
      </h2>
      <p>
        A pregnancy due date is calculated, not measured — and despite the precision of a single
        calendar date, it's genuinely an estimate with a fairly wide normal range around it. This
        calculator uses Naegele's rule, the standard method taught in obstetrics: add 280 days (40
        weeks) to the first day of your last menstrual period.
      </p>
      <p>
        The logic behind 280 days: a typical pregnancy lasts about 38 weeks from conception, but
        because ovulation usually happens around day 14 of a 28-day cycle, conception itself is
        about two weeks after the last period started — so counting from the last period (which
        is easier for most people to know precisely) adds two extra weeks, landing on 40 weeks
        total.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why so few babies arrive exactly on time</h3>
      <p>
        Only a small percentage of babies are born precisely on their calculated due date — most
        arrive within a window of about two weeks before or after. This isn't a sign anything is
        wrong; full-term birth is generally considered anywhere from 37 to 42 weeks, a five-week
        range that the single due date doesn't communicate on its own.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">When ultrasound dating differs</h3>
      <p>
        Early ultrasound measurements (typically in the first trimester) measure the embryo or
        fetus directly and are generally considered more accurate than last-period-based
        calculations, particularly for people with irregular cycles. If your healthcare provider's
        ultrasound-based due date differs from this calculator's estimate by a few days, that's
        normal and the ultrasound date is usually the one used going forward.
      </p>
    </article>
  );
}
