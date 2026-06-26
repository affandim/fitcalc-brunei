import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { FrameSizeForm } from "@/components/calculators/frame-size-form";

const calculator = calculators.find((c) => c.slug === "frame-size-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Body Frame Size Calculator — Wrist Circumference Method",
  description: "Find whether you have a small, medium or large body frame using the height-to-wrist-circumference ratio method.",
  path: "/calculators/frame-size-calculator",
});

const faqs = [
  {
    question: "Why does frame size matter?",
    answer:
      "Some older ideal-weight charts adjust their recommended range based on frame size, since people with a larger skeletal frame naturally carry more bone and muscle mass at a healthy weight than someone with a smaller frame at the same height.",
  },
  {
    question: "Where exactly should I measure my wrist?",
    answer:
      "Measure around the wrist at the narrowest point, just below the wrist bone (where a watch would normally sit), without pulling the tape tight enough to compress the skin.",
  },
  {
    question: "Is this method scientifically precise?",
    answer:
      "It's an informal, traditional method rather than a clinically validated measurement. It's a reasonable rough indicator of skeletal frame size, useful mainly as context for interpreting other body composition numbers.",
  },
];

export default function FrameSizeCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <FrameSizeForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Why frame size adds context to other measurements
      </h2>
      <p>
        Body frame size — small, medium, or large — reflects skeletal structure rather than fat
        or muscle mass directly. It's a traditional, informal classification, most often used as
        context for ideal weight charts: someone with a larger frame naturally carries more bone
        and lean tissue at a healthy weight than someone with a smaller frame at the identical
        height.
      </p>
      <p>
        This calculator uses the classic ratio method: dividing height by wrist circumference,
        with different thresholds for men and women reflecting average differences in skeletal
        proportions.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">An informal tool, not a clinical one</h3>
      <p>
        Unlike more rigorously validated body composition tools elsewhere on this site, frame
        size classification by wrist ratio is a traditional heuristic rather than a method backed
        by extensive clinical research. It's best used as light context — for example, explaining
        why two people of identical height and weight might look noticeably different — rather
        than as a precise measurement.
      </p>
    </article>
  );
}
