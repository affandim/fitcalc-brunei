import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { FfmiForm } from "@/components/calculators/ffmi-form";

const calculator = calculators.find((c) => c.slug === "ffmi-calculator")!;

export const metadata: Metadata = {
  title: "FFMI Calculator — Fat-Free Mass Index",
  description: "Calculate your Fat-Free Mass Index (FFMI), a benchmark used to assess muscularity relative to height.",
  alternates: { canonical: "/calculators/ffmi-calculator" },
};

const faqs = [
  {
    question: "What is FFMI used for?",
    answer:
      "FFMI normalizes fat-free mass for height, making it possible to compare muscularity between people of different heights. It's commonly used in strength sports research, including studies on the natural limits of muscle growth.",
  },
  {
    question: "What's a 'good' FFMI?",
    answer:
      "For men, an FFMI of 20-22 is typical for a fit, untrained individual, while drug-free, well-trained lifters often top out around 23-25 normalized FFMI. Values significantly above this are uncommon without external assistance, which is part of why FFMI is sometimes used as a rough natural-limit indicator.",
  },
  {
    question: "Why is there a 'normalized' version?",
    answer:
      "Raw FFMI is biased by height — taller people tend to score slightly higher at the same relative muscularity. The normalized version adjusts for this so people of different heights can be compared more fairly.",
  },
];

export default function FfmiCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <FfmiForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Fat-Free Mass Index: muscularity adjusted for height
      </h2>
      <p>
        FFMI takes the same idea as BMI — normalizing a body measurement by height — but applies
        it to fat-free mass instead of total weight. The result is a number that lets you compare
        relative muscularity between people of different heights more fairly than total lean mass
        alone would.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        FFMI = lean body mass(kg) ÷ height(m)²
        <br />
        Normalized FFMI = FFMI + 6.1 × (1.8 − height(m))
      </p>
      <p>
        The normalization term corrects a known quirk where taller people score slightly higher
        FFMI at the same relative muscularity as shorter people — without it, cross-height
        comparisons would be subtly unfair.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Where the reference ranges come from</h3>
      <p>
        FFMI gained attention in sports science research examining the upper limits of natural
        (drug-free) muscle growth. Several studies surveying competitive natural bodybuilders
        found normalized FFMI rarely exceeding the mid-20s, which is part of why the metric is
        sometimes informally used as a rough sanity check, though it's far from a definitive test
        and individual genetic variation is substantial.
      </p>
    </article>
  );
}
