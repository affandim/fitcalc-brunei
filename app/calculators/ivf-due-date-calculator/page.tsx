import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { IvfDueDateForm } from "@/components/calculators/ivf-due-date-form";
import { buildPageMetadata } from "@/lib/seo";

const calculator = calculators.find((c) => c.slug === "ivf-due-date-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "IVF Due Date Calculator — Day 3 & Day 5 Transfers",
  description: "Estimate your due date from an IVF embryo transfer date, for both day-3 and day-5 transfers.",
  path: "/calculators/ivf-due-date-calculator",
});

const faqs = [
  {
    question: "Why does the transfer day (3 vs 5) change the calculation?",
    answer:
      "A day-5 (blastocyst) embryo is more developmentally advanced than a day-3 (cleavage-stage) embryo at the moment of transfer, so fewer days need to be added to reach the same 40-week gestational milestone — that's why day-5 transfers add 261 days and day-3 transfers add 263.",
  },
  {
    question: "How does this differ from a regular LMP-based due date calculation?",
    answer:
      "Standard due date calculators work from the last menstrual period, which is an approximation since the exact ovulation/fertilization date isn't directly known. IVF removes that uncertainty — the embryo's exact age is known precisely at transfer, making this calculation more individually precise than a typical LMP-based estimate.",
  },
  {
    question: "Will my fertility clinic's due date match this exactly?",
    answer:
      "It should be very close, since this uses the same standard counting convention clinics typically use. Your clinic's estimate, confirmed and adjusted with early ultrasound dating, remains the authoritative reference for your specific pregnancy.",
  },
];

export default function IvfDueDateCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <IvfDueDateForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Why IVF due dates are calculated differently
      </h2>
      <p>
        Standard pregnancy due date calculations work from the last menstrual period, adding 280
        days under the assumption of a typical cycle — an approximation, since the exact
        conception date isn't directly observed. IVF removes most of that uncertainty: the
        embryo's precise age is known at the moment of transfer, since it was fertilized and
        cultured under direct observation.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">The day-3 vs day-5 difference</h3>
      <p>
        Embryos can be transferred at different developmental stages. A day-5 transfer
        (blastocyst stage) is more developed than a day-3 transfer (cleavage stage) at the moment
        it's placed in the uterus — so reaching the standard 40-week gestational milestone
        requires counting fewer additional days forward from a day-5 transfer than from a day-3
        one.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        Day 3 transfer: due date = transfer date + 263 days
        <br />
        Day 5 transfer: due date = transfer date + 261 days
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why this estimate tends to be more precise</h3>
      <p>
        Because the embryo's exact age is known rather than estimated from a last period date,
        IVF-based due date calculations are generally considered more individually accurate than
        typical LMP-based estimates — though as with any pregnancy, an early ultrasound and your
        fertility clinic's ongoing monitoring remain the most authoritative source for your
        specific case.
      </p>
    </article>
  );
}
