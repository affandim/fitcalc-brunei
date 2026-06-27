import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { BloodVolumeForm } from "@/components/calculators/blood-volume-form";
import { buildPageMetadata } from "@/lib/seo";

const calculator = calculators.find((c) => c.slug === "blood-volume-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Estimated Blood Volume Calculator",
  description: "Estimate total blood volume from bodyweight, using standard ml/kg reference factors.",
  path: "/calculators/blood-volume-calculator",
});

const faqs = [
  {
    question: "Why is the ml/kg factor different for men and women?",
    answer:
      "Men generally have a higher proportion of lean muscle mass relative to total body weight, and blood volume correlates more closely with lean mass than with total weight — leading to a higher average ml/kg factor for men in most reference tables.",
  },
  {
    question: "What is this estimate used for?",
    answer:
      "Estimated blood volume is referenced in various clinical and educational contexts — for instance, understanding blood donation volume as a percentage of total volume, or general physiology education. It's an estimate based on population averages, not a measured individual value.",
  },
  {
    question: "How accurate is this for someone with an atypical body composition?",
    answer:
      "Less accurate — these ml/kg factors are population averages. Someone with unusually high muscle mass, or conversely a higher body fat percentage than average, will have an actual blood volume that deviates somewhat from this weight-based estimate.",
  },
];

export default function BloodVolumeCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <BloodVolumeForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Estimating blood volume from bodyweight
      </h2>
      <p>
        Total blood volume isn't something measured in routine clinical settings — it's
        typically estimated using standard reference factors relating blood volume to
        bodyweight, since direct measurement requires specialized techniques rarely needed
        outside specific research or clinical contexts.
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        Blood volume (L) = weight (kg) × ml/kg factor ÷ 1000
      </p>
      <p>
        Commonly cited reference factors are approximately 75 ml/kg for men and 65 ml/kg for
        women, reflecting average differences in body composition — blood volume correlates
        more closely with lean tissue mass than with total weight, and men typically carry a
        higher proportion of lean mass at the same total weight.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Where this estimate is used</h3>
      <p>
        Estimated blood volume comes up in contexts like understanding what percentage of total
        volume a blood donation represents, dosing calculations in some clinical contexts, and
        general physiology education. As with any weight-based estimate, individual variation in
        body composition means the true value can differ somewhat from this calculation.
      </p>
    </article>
  );
}
