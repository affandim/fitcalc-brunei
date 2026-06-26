import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { BaiForm } from "@/components/calculators/bai-form";

const calculator = calculators.find((c) => c.slug === "bai-calculator")!;

export const metadata: Metadata = {
  title: "Body Adiposity Index (BAI) Calculator",
  description: "Estimate body fat percentage from hip circumference and height alone, no scale required.",
  alternates: { canonical: "/calculators/bai-calculator" },
};

const faqs = [
  {
    question: "Why doesn't BAI need a weight measurement?",
    answer:
      "BAI was specifically designed (published in 2011) to estimate body fat percentage without weighing the person, using only hip circumference and height — useful in situations where a reliable scale isn't available.",
  },
  {
    question: "How does BAI compare to BMI?",
    answer:
      "BMI uses weight and height; BAI uses hip circumference and height instead. Research on BAI's accuracy compared to BMI has been mixed — some studies find it comparable, others find it less reliable across diverse populations. Treat it as one more data point, not a replacement for other measures.",
  },
  {
    question: "Should I rely on BAI alone?",
    answer:
      "No single body composition estimate, including BAI, should be relied on in isolation. Combining it with BMI, waist-to-height ratio, or a direct body fat percentage estimate gives a more complete and reliable picture.",
  },
];

export default function BaiCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <BaiForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Estimating body fat without a scale
      </h2>
      <p>
        Body Adiposity Index (BAI) was introduced in a 2011 study as an alternative to BMI for
        estimating body fat percentage, using a method that deliberately avoids needing a weight
        measurement at all — just hip circumference and height.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        BAI = hip circumference(cm) ÷ height(m)<sup>1.5</sup> − 18
      </p>
      <p>
        The researchers behind BAI were motivated partly by the practical reality that reliable
        scales aren't always available, while a tape measure almost always is — making BAI useful
        in settings like field research or resource-limited clinics.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Mixed evidence on accuracy</h3>
      <p>
        Since its introduction, follow-up research comparing BAI against DEXA-measured body fat
        has produced mixed results — accurate for some populations, less so for others,
        particularly across different ethnic groups and age ranges. It's best treated as a
        useful, convenient estimate rather than a definitive measurement.
      </p>
    </article>
  );
}
