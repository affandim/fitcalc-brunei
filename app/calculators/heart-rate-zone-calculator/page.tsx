import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { HeartRateZoneForm } from "@/components/calculators/heart-rate-zone-form";

const calculator = calculators.find((c) => c.slug === "heart-rate-zone-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Heart Rate Zone Calculator — 5 Training Zones",
  description: "Find your five heart rate training zones, from warm-up to max effort, based on the Tanaka max heart rate formula.",
  path: "/calculators/heart-rate-zone-calculator",
});

const faqs = [
  {
    question: "Why use the Tanaka formula instead of '220 minus age'?",
    answer:
      "The classic '220 minus age' formula was never based on a rigorous study and tends to be less accurate, especially for older adults. The Tanaka formula (208 − 0.7 × age), published in 2001 from a meta-analysis of over 18,000 people, is more consistently accurate across age groups.",
  },
  {
    question: "Which zone should I train in?",
    answer:
      "It depends on your goal. Zones 1-2 build aerobic base and aid recovery, zone 3 improves general cardiovascular fitness, and zones 4-5 build high-intensity capacity and speed. Most well-rounded training plans spend the majority of time in zones 1-3.",
  },
  {
    question: "Is this as accurate as a lab test?",
    answer:
      "No formula based on age alone is as accurate as a measured max heart rate from a graded exercise test, but it's a solid practical estimate for everyday training purposes.",
  },
];

export default function HeartRateZoneCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <HeartRateZoneForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Training with purpose: understanding heart rate zones
      </h2>
      <p>
        Heart rate zones divide your training intensity into bands, each associated with
        different physiological adaptations. Training entirely at one intensity — typically
        moderate, "comfortable" effort — is one of the most common reasons people plateau despite
        consistent training; deliberately varying intensity across zones tends to produce better
        results for most goals.
      </p>
      <p>
        This calculator estimates your maximum heart rate using the Tanaka formula (208 − 0.7 ×
        age), published in 2001 from a large meta-analysis and generally found to be more
        accurate across age groups than the older "220 minus age" rule of thumb still seen on
        many gym cardio machines.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">What each zone does</h3>
      <p>
        Zone 1 (50-60% of max) is light, conversational-pace effort, used for warm-ups, recovery,
        and active rest days. Zone 2 (60-70%) is the classic "fat-burning" zone — sustainable for
        long durations and a major contributor to aerobic base fitness. Zone 3 (70-80%) is
        moderately hard, improving cardiovascular efficiency, while zone 4 (80-90%) is genuinely
        challenging, anaerobic-threshold-style effort that builds speed and lactate tolerance.
        Zone 5 (90-100%) is maximal effort, sustainable only briefly, used for sprint and
        high-intensity interval work.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">A practical training split</h3>
      <p>
        Many evidence-informed training plans for general fitness or endurance allocate roughly
        70-80% of weekly training time to zones 1-2, with the remainder split between zone 3 and
        the harder zone 4-5 work — often called a "polarized" approach. This avoids the common
        trap of doing too much moderate-intensity (zone 3) training, which can be fatiguing
        without delivering the strongest aerobic or high-intensity adaptations of either extreme.
      </p>
    </article>
  );
}
