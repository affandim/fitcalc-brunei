import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { PregnancyCalorieForm } from "@/components/calculators/pregnancy-calorie-form";
import { buildPageMetadata } from "@/lib/seo";

const calculator = calculators.find((c) => c.slug === "pregnancy-calorie-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Pregnancy Calorie Calculator — Extra Calories by Trimester",
  description: "Find how many extra calories you need each trimester of pregnancy, on top of your pre-pregnancy TDEE.",
  path: "/calculators/pregnancy-calorie-calculator",
});

const faqs = [
  {
    question: "Why isn't there an extra calorie need in the first trimester?",
    answer:
      "Most guidelines, including those from the Institute of Medicine, don't recommend additional calories in the first trimester — early fetal energy needs are minimal, and many people experience reduced appetite or nausea during this period anyway.",
  },
  {
    question: "Why do calorie needs increase more in the third trimester?",
    answer:
      "Fetal growth accelerates significantly in the third trimester, which is reflected in the higher recommended calorie bonus (+450 kcal/day) compared to the second trimester (+340 kcal/day).",
  },
  {
    question: "Should I track these calories strictly?",
    answer:
      "Treat this as general guidance rather than a strict target. Appetite, nausea, and individual circumstances vary considerably during pregnancy — your healthcare provider can offer guidance tailored to your specific situation.",
  },
];

export default function PregnancyCalorieCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <PregnancyCalorieForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Calorie needs change by trimester, not all at once
      </h2>
      <p>
        "Eating for two" is a popular phrase, but it overstates how much extra energy pregnancy
        actually requires — and the increase isn't constant throughout pregnancy. Energy needs
        rise gradually as the pregnancy progresses, reflecting accelerating fetal growth in later
        trimesters.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        1st trimester: +0 kcal/day
        <br />
        2nd trimester: +340 kcal/day
        <br />
        3rd trimester: +450 kcal/day
      </p>
      <p>
        These additions are on top of pre-pregnancy TDEE (Total Daily Energy Expenditure) — not
        a fixed number for everyone, since baseline energy needs already vary by height, weight,
        age, and activity level.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Quality matters alongside quantity</h3>
      <p>
        The additional calories during pregnancy are most valuable when they come from
        nutrient-dense foods — the body's needs for protein, iron, folate, calcium, and other
        nutrients increase more proportionally than total calorie needs do, making nutrient
        density an important consideration alongside the calorie number itself.
      </p>
    </article>
  );
}
