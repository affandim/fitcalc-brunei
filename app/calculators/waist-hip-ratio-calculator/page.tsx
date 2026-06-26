import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { WaistHipForm } from "@/components/calculators/waist-hip-form";

const calculator = calculators.find((c) => c.slug === "waist-hip-ratio-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Waist-Hip Ratio Calculator — Body Fat Distribution",
  description: "Calculate your waist-to-hip ratio, a WHO-recognized indicator of body fat distribution and cardiovascular risk.",
  path: "/calculators/waist-hip-ratio-calculator",
});

const faqs = [
  {
    question: "What does waist-hip ratio actually measure?",
    answer:
      "It measures the distribution of fat between your waist and hips — a higher ratio indicates more 'apple-shaped' central fat storage, while a lower ratio indicates more 'pear-shaped' fat storage around the hips, which generally carries lower cardiovascular risk.",
  },
  {
    question: "Why are the thresholds different for men and women?",
    answer:
      "Men and women have naturally different hip-to-waist proportions due to skeletal structure and typical fat distribution patterns, so the WHO uses separate risk thresholds for each — generally 0.90 for men and 0.85 for women as the high-risk cutoff.",
  },
  {
    question: "How does this compare to waist-to-height ratio?",
    answer:
      "Both are central-fat indicators, but waist-hip ratio adds hip circumference into the picture, which can be useful since it captures body shape rather than just absolute waist size relative to height.",
  },
];

export default function WaistHipRatioCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <WaistHipForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        What your waist-hip ratio says about fat distribution
      </h2>
      <p>
        Waist-to-hip ratio (WHR) compares the circumference of your waist to your hips, producing
        a number that reflects body shape — and by extension, where your body tends to store fat.
        The World Health Organization recognizes WHR as a useful indicator of cardiovascular and
        metabolic risk, distinct from but complementary to BMI.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        WHR = waist circumference ÷ hip circumference
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Apple vs pear shapes</h3>
      <p>
        A higher WHR reflects what's commonly described as an "apple" body shape — fat
        concentrated around the abdomen — while a lower WHR reflects a "pear" shape, with fat
        distributed more toward the hips and thighs. Abdominal (visceral) fat is metabolically
        more active and more strongly linked to cardiovascular disease and type 2 diabetes risk
        than fat stored peripherally, which is the underlying reason WHR is a useful health
        indicator beyond simple aesthetics.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">WHO risk thresholds</h3>
      <p>
        For men, a WHR below 0.90 is generally considered low risk, 0.90 to 0.99 moderate, and
        1.0 or above high risk. For women, the thresholds sit lower — below 0.80 is low risk, 0.80
        to 0.84 moderate, and 0.85 or above high risk — reflecting natural differences in healthy
        fat distribution between sexes.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Measuring accurately</h3>
      <p>
        Measure your hips at their widest point, typically around the buttocks, and your waist at
        its narrowest point, usually just above the belly button. Take both measurements standing
        relaxed, without pulling the tape tight enough to compress soft tissue, for the most
        consistent and accurate result.
      </p>
    </article>
  );
}
