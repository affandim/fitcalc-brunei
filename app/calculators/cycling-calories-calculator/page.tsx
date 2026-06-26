import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { CyclingCaloriesForm } from "@/components/calculators/cycling-calories-form";

const calculator = calculators.find((c) => c.slug === "cycling-calories-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Cycling Calories Calculator — Calories Burned by Intensity",
  description: "Estimate how many calories you burn cycling, based on your weight, intensity, and duration.",
  path: "/calculators/cycling-calories-calculator",
});

const faqs = [
  {
    question: "Why does terrain and wind affect calorie burn beyond just speed?",
    answer:
      "Riding into a headwind or up a hill requires more effort than the same speed on flat, sheltered ground — this calculator's intensity categories are a simplification based on typical speed bands, and real-world effort (and therefore calorie burn) can shift meaningfully with terrain and conditions.",
  },
  {
    question: "Is cycling easier on joints than running?",
    answer:
      "Generally yes — cycling is a lower-impact activity since the bike supports your body weight, which is part of why it's often recommended as an option for people managing joint issues while still wanting a substantial cardiovascular workout.",
  },
];

export default function CyclingCaloriesCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <CyclingCaloriesForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Cycling intensity and calorie burn
      </h2>
      <p>
        Cycling calorie burn scales with intensity even more dramatically than many other
        activities, since speed on a bike is strongly influenced by effort level. This calculator
        uses four intensity bands, from leisure riding under 16 km/h up to racing pace above 22
        km/h, each with a distinct MET value reflecting typical effort at that speed.
      </p>
      <p>
        Because cycling is lower-impact than running — the bike bears your body weight rather than
        your joints absorbing each stride's impact — it's often recommended as a cardiovascular
        option for people managing joint concerns while still wanting a substantial calorie burn
        and fitness benefit.
      </p>
    </article>
  );
}
