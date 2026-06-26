import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { PulsePressureForm } from "@/components/calculators/pulse-pressure-form";

const calculator = calculators.find((c) => c.slug === "pulse-pressure-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Pulse Pressure & MAP Calculator",
  description: "Calculate pulse pressure and mean arterial pressure (MAP) from a blood pressure reading.",
  path: "/calculators/pulse-pressure-calculator",
});

const faqs = [
  {
    question: "What is pulse pressure?",
    answer:
      "Pulse pressure is the difference between systolic and diastolic blood pressure. A normal pulse pressure is roughly 40 mmHg; values that are consistently much higher or lower can be a marker worth discussing with a healthcare provider.",
  },
  {
    question: "What is mean arterial pressure (MAP)?",
    answer:
      "MAP represents the average pressure in your arteries during one full cardiac cycle. Because diastole (the resting phase) lasts longer than systole (the contraction phase), MAP is calculated closer to diastolic than to the simple average of the two numbers.",
  },
  {
    question: "Who actually uses these numbers?",
    answer:
      "Pulse pressure and MAP come up more often in clinical and research contexts than everyday self-monitoring — they're useful additional data points alongside the standard systolic/diastolic reading, particularly for tracking cardiovascular health over time.",
  },
];

export default function PulsePressureCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <PulsePressureForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Two numbers hiding inside your blood pressure reading
      </h2>
      <p>
        A standard blood pressure reading reports systolic and diastolic pressure, but two
        additional derived values — pulse pressure and mean arterial pressure (MAP) — offer extra
        context that clinicians sometimes find useful alongside the basic reading.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Pulse pressure</h3>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        Pulse pressure = Systolic − Diastolic
      </p>
      <p>
        A typical resting pulse pressure is around 40 mmHg. A consistently narrow pulse pressure
        can sometimes reflect reduced heart pumping function, while a consistently wide one is
        sometimes associated with stiffened arteries, particularly in older adults. Neither is a
        diagnosis on its own — both are data points for a clinician to interpret in context.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Mean arterial pressure (MAP)</h3>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        MAP = Diastolic + ⅓ × (Systolic − Diastolic)
      </p>
      <p>
        MAP represents average arterial pressure across a full heartbeat cycle. It's weighted
        closer to diastolic rather than splitting the difference evenly, because the diastolic
        (resting) phase of each heartbeat takes up roughly twice as long as the systolic
        (contracting) phase. A MAP between 70 and 100 mmHg is generally considered adequate to
        perfuse the body's organs in clinical settings.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Context, not diagnosis</h3>
      <p>
        Both figures are most useful as additional context alongside a full blood pressure
        picture and broader health history, rather than as standalone numbers to interpret in
        isolation. A healthcare provider is best positioned to explain what your specific values
        mean for you.
      </p>
    </article>
  );
}
