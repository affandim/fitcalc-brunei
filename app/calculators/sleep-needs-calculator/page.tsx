import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { SleepNeedsForm } from "@/components/calculators/sleep-needs-form";
import { buildPageMetadata } from "@/lib/seo";

const calculator = calculators.find((c) => c.slug === "sleep-needs-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Sleep Needs Calculator — Recommended Hours by Age",
  description: "Find the recommended daily sleep hours for any age, from infants to older adults.",
  path: "/calculators/sleep-needs-calculator",
});

const faqs = [
  {
    question: "Where do these sleep recommendations come from?",
    answer:
      "These ranges follow widely cited consensus guidelines from sleep health organizations like the National Sleep Foundation and the American Academy of Sleep Medicine, based on research linking sleep duration to health outcomes across age groups.",
  },
  {
    question: "Why do sleep needs decrease with age?",
    answer:
      "Sleep architecture and biological needs change across the lifespan — infants and children need substantially more sleep to support rapid brain development and growth, while older adults typically need somewhat less total sleep, though sleep quality often becomes more important than quantity alone in later life.",
  },
  {
    question: "What if I sleep less than the recommended range and feel fine?",
    answer:
      "Individual variation exists, but consistently sleeping below the recommended range is associated with measurable health and cognitive effects for most people, even when someone subjectively feels adapted to less sleep. The ranges represent population-level evidence, not an absolute requirement for every individual.",
  },
];

export default function SleepNeedsCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <SleepNeedsForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        How much sleep is actually recommended, by age
      </h2>
      <p>
        Sleep needs change substantially across the lifespan, reflecting different biological
        demands at each stage. Infants need sleep to support extremely rapid brain and physical
        development; older adults typically need somewhat less total sleep, though sleep quality
        and consistency often matter more in later life than duration alone.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        Infant (0-1yr): 12-16 hrs · Toddler (1-3yr): 11-14 hrs · Preschooler (3-6yr): 10-13 hrs
        <br />
        School-age (6-13yr): 9-12 hrs · Teenager (13-18yr): 8-10 hrs
        <br />
        Adult (18-65yr): 7-9 hrs · Older adult (65+): 7-8 hrs
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why teenagers are chronically under-slept</h3>
      <p>
        Teenagers have a well-documented tendency toward a later natural sleep-wake cycle
        (delayed sleep phase), which combined with early school start times means many teens
        fall well short of the recommended 8-10 hours on a typical school night — a mismatch
        between biology and schedule that's been a significant focus of sleep health advocacy.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Quantity isn't the whole picture</h3>
      <p>
        These ranges describe total sleep duration, but sleep quality — consistency, depth,
        minimal disruption — also matters substantially for how restorative that sleep actually
        is. Hitting the recommended hours with frequent fragmented waking provides a different
        benefit than the same duration slept consistently.
      </p>
    </article>
  );
}
