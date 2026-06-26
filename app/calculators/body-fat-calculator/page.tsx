import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { BodyFatForm } from "@/components/calculators/body-fat-form";

const calculator = calculators.find((c) => c.slug === "body-fat-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Body Fat Calculator — US Navy Method",
  description: "Estimate your body fat percentage using the US Navy circumference method. Just three or four simple tape measurements, no scale required.",
  path: "/calculators/body-fat-calculator",
});

const faqs = [
  {
    question: "How accurate is the US Navy body fat method?",
    answer:
      "Studies comparing it against underwater weighing (hydrostatic testing), considered a gold-standard method, typically find the US Navy formula accurate to within about 3-4% body fat for most adults, which is good enough for tracking trends over time.",
  },
  {
    question: "Why does the formula need different measurements for men and women?",
    answer:
      "Men and women carry fat differently — men tend to store more around the abdomen, while women store relatively more around the hips. The Navy method accounts for this by adding a hip measurement for women, which improves accuracy for typical female fat distribution.",
  },
  {
    question: "Where exactly should I measure my waist and neck?",
    answer:
      "Measure your neck just below the larynx (Adam's apple), with the tape sloping slightly downward at the front. Measure your waist at the narrowest point, usually just above the belly button, without compressing the skin.",
  },
  {
    question: "Is this more useful than BMI?",
    answer:
      "It answers a different question. BMI compares weight to height; this estimates the actual proportion of your body that is fat. They're complementary — many people use both alongside a waist-to-height ratio for a fuller picture.",
  },
];

export default function BodyFatCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<BodyFatArticle />}>
      <BodyFatForm />
    </CalculatorShell>
  );
}

function BodyFatArticle() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        What body fat percentage actually tells you
      </h2>
      <p>
        Body fat percentage measures the proportion of your total body weight that comes from
        fat, with the remainder — muscle, bone, organs, and water — known as lean mass. Unlike
        weight or BMI, which treat a kilogram of muscle the same as a kilogram of fat, body fat
        percentage gets at something closer to actual body composition, which is why many
        coaches, clinicians, and athletes prefer it as a tracking metric over the scale alone.
      </p>
      <p>
        The calculator above uses the US Navy circumference method, developed in the early 1980s
        as a fast, equipment-free way to estimate body fat for military fitness assessments. It
        works by comparing waist (and, for women, hip) circumference against neck circumference
        and height, using a logarithmic formula tuned from comparisons against hydrostatic
        (underwater) weighing — at the time, one of the most accurate body composition methods
        available outside a research lab.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">The formula, explained</h3>
      <p>
        For men, the formula is:
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        BF% = 495 / (1.0324 − 0.19077 × log₁₀(waist − neck) + 0.15456 × log₁₀(height)) − 450
      </p>
      <p>For women, hip circumference is added to account for typical fat distribution:</p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        BF% = 495 / (1.29579 − 0.35004 × log₁₀(waist + hip − neck) + 0.221 × log₁₀(height)) − 450
      </p>
      <p>
        All measurements go in as centimetres. The logarithmic terms exist because the
        relationship between circumference measurements and actual fat mass isn't linear — the
        formula was statistically fitted to match real body composition data as closely as
        possible within a simple equation.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">Reading your category</h3>
      <p>
        Body fat ranges are typically split into five bands: essential fat (the minimum needed for
        basic physiological function), athletic, fitness, average, and obese, with the exact
        thresholds differing between men and women because healthy female body fat is naturally
        higher than healthy male body fat — partly due to hormonal and reproductive biology.
        Essential fat for men sits around 2-5%, while for women it's closer to 10-13%, which is
        why the categories on the chart above shift accordingly.
      </p>
      <p>
        Falling in the "average" band isn't a cause for alarm on its own — it reflects where most
        adults in the general population land, not necessarily an unhealthy state. The "athletic"
        and "fitness" bands reflect the leaner end of the spectrum typically seen in people who
        train consistently, while levels below the essential fat threshold are genuinely
        unhealthy and associated with hormonal disruption, regardless of gender.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">Limitations to keep in mind</h3>
      <p>
        Circumference-based methods are convenient, but they're still an estimate, not a direct
        measurement. They tend to be less accurate at the extremes — very lean athletes and people
        with obesity both see larger margins of error than someone in the middle of the
        distribution. Body shape also matters: someone who carries fat more centrally (around the
        waist) versus more peripherally (hips, thighs) can get a slightly different reading than
        their true body fat, even at an identical total fat mass.
      </p>
      <p>
        For most people tracking progress over weeks or months, this level of precision is more
        than sufficient — what matters is the trend, not the exact decimal point. If you need
        clinical-grade precision, methods like DEXA scanning or air displacement plethysmography
        (Bod Pod) offer tighter margins of error, but at significantly higher cost and lower
        accessibility.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">Common measurement mistakes</h3>
      <p>
        The most common error is measuring waist circumference inconsistently — over clothing,
        after a meal, or at a different point on the torso each time. For comparable results
        across weeks, measure at the same time of day (ideally first thing in the morning),
        without clothing, and at the same anatomical landmark each time. Pulling the tape too
        tight, which artificially compresses the skin, is the second most common mistake and will
        understate your true measurement.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">References</h3>
      <p className="text-sm text-foreground/55">
        Hodgdon, J.A. & Beckett, M.B. — Prediction of Percent Body Fat for U.S. Navy Men and Women
        · American Council on Exercise — Body Fat Percentage Norms
      </p>
    </article>
  );
}
