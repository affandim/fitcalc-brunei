import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { BloodPressureForm } from "@/components/calculators/blood-pressure-form";

const calculator = calculators.find((c) => c.slug === "blood-pressure-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Blood Pressure Category Calculator — AHA Guidelines",
  description: "Check your blood pressure category based on American Heart Association guidelines.",
  path: "/calculators/blood-pressure-calculator",
});

const faqs = [
  {
    question: "What do the two numbers in a blood pressure reading mean?",
    answer:
      "Systolic (the top, higher number) measures pressure in your arteries when your heart beats. Diastolic (the bottom, lower number) measures pressure between beats, when your heart is resting. Both matter for assessing cardiovascular risk.",
  },
  {
    question: "Is one high reading a diagnosis of high blood pressure?",
    answer:
      "No. Blood pressure naturally fluctuates throughout the day with stress, activity, caffeine, and even the anxiety of being measured (sometimes called 'white coat syndrome'). Clinical diagnosis typically requires multiple elevated readings taken on different occasions.",
  },
  {
    question: "What should I do if my reading falls in a high category?",
    answer:
      "A single elevated reading is worth monitoring, not panicking over. If readings are consistently elevated across multiple occasions, or if your reading falls in the 'Crisis' category, contact a healthcare provider — the crisis category in particular warrants prompt medical attention.",
  },
];

export default function BloodPressureCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <BloodPressureForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Reading your blood pressure number properly
      </h2>
      <p>
        Blood pressure is recorded as two numbers — systolic over diastolic — and both carry
        independent clinical significance. This calculator applies the American Heart
        Association's category thresholds, the most widely referenced framework for
        interpreting a blood pressure reading.
      </p>
      <p>
        Normal blood pressure sits below 120/80 mmHg. Elevated readings (120-129 systolic, under
        80 diastolic) suggest a trend worth monitoring without yet meeting the threshold for
        hypertension. Stage 1 and Stage 2 hypertension reflect progressively higher sustained
        risk, while a hypertensive crisis reading (180/120 or higher) warrants prompt medical
        attention.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why a single reading isn't the full picture</h3>
      <p>
        Blood pressure fluctuates throughout the day in response to activity, stress, caffeine,
        and even the simple anxiety of having it measured — a well-documented phenomenon
        sometimes called "white coat syndrome." This is why clinical hypertension diagnoses
        typically require multiple elevated readings across different occasions, rather than
        relying on any single measurement.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Measuring at home accurately</h3>
      <p>
        For the most reliable home readings: sit quietly for five minutes beforehand, keep your
        arm supported at heart level, avoid caffeine or exercise in the prior 30 minutes, and
        take two or three readings a minute apart, using the average. Consistency in technique
        matters more than any single reading's exact number.
      </p>
    </article>
  );
}
