import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { PregnancyWeightGainForm } from "@/components/calculators/pregnancy-weight-gain-form";

const calculator = calculators.find((c) => c.slug === "pregnancy-weight-gain-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Pregnancy Weight Gain Calculator — IOM Guidelines",
  description: "Find your recommended total pregnancy weight gain range based on pre-pregnancy BMI, using IOM guidelines.",
  path: "/calculators/pregnancy-weight-gain-calculator",
});

const faqs = [
  {
    question: "Why does recommended weight gain depend on pre-pregnancy BMI?",
    answer:
      "Starting weight affects pregnancy risk in different ways. People starting at a lower BMI generally benefit from a larger total gain to support healthy fetal growth, while people starting at a higher BMI are typically advised to gain less to reduce certain pregnancy complications.",
  },
  {
    question: "Is gaining outside this range automatically a problem?",
    answer:
      "Not necessarily — these are population-level guidelines, and individual circumstances (multiples, pre-existing conditions, etc.) can shift what's appropriate. Your healthcare provider can give personalized guidance based on your specific situation.",
  },
  {
    question: "Is weight gain spread evenly across pregnancy?",
    answer:
      "No — most guidelines suggest a smaller amount in the first trimester (roughly 0.5-2kg total) and a steadier weekly gain through the second and third trimesters, which is what the average weekly figure on this calculator approximates.",
  },
];

export default function PregnancyWeightGainCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <PregnancyWeightGainForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        How much weight gain is considered healthy during pregnancy
      </h2>
      <p>
        Healthy weight gain during pregnancy isn't a single universal number — it depends on your
        weight before becoming pregnant, captured here through pre-pregnancy BMI. This calculator
        uses the Institute of Medicine (IOM) guidelines, widely referenced by obstetric
        practitioners internationally.
      </p>
      <p>
        The guidelines recommend a larger total gain for people starting at a lower BMI — roughly
        12.5 to 18kg for underweight starting points — down to a smaller recommended gain of
        roughly 5 to 9kg for people starting at a higher BMI. The logic is that someone starting
        with fewer energy reserves benefits more from additional gain to support healthy fetal
        development, while someone starting with more reserves needs comparatively less.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why the rate of gain matters too</h3>
      <p>
        Total gain matters, but so does pacing. Most of the recommended weight gain happens during
        the second and third trimesters, with a much smaller amount — often just a kilogram or two
        — expected in the first trimester. A roughly steady weekly gain through the remaining two
        trimesters is generally considered a healthy pattern, rather than gaining the bulk of the
        total very early or very late.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why individual guidance still matters</h3>
      <p>
        These ranges are population guidelines, not individualized medical advice. Multiple
        pregnancies, pre-existing health conditions, and other personal factors can shift what's
        appropriate for any specific person — which is why ongoing conversations with a
        healthcare provider remain the most reliable source of guidance throughout pregnancy.
      </p>
    </article>
  );
}
