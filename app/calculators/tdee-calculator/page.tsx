import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { TdeeForm } from "@/components/calculators/tdee-form";

const calculator = calculators.find((c) => c.slug === "tdee-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "TDEE Calculator — Total Daily Energy Expenditure",
  description: "Calculate your Total Daily Energy Expenditure (TDEE) — the real number of calories you burn per day once activity is factored in.",
  path: "/calculators/tdee-calculator",
});

const faqs = [
  {
    question: "What's the difference between TDEE and BMR?",
    answer:
      "BMR is the calories you'd burn lying still all day. TDEE adds your actual activity on top — walking, exercise, even fidgeting — to give the real number of calories your body uses in a typical day. TDEE is always higher than BMR.",
  },
  {
    question: "Which activity level should I pick?",
    answer:
      "Be honest rather than aspirational. Most people with a desk job and a few weekly gym sessions fall under 'light' or 'moderate', not 'very active'. Overestimating activity level is the most common reason TDEE-based calorie plans don't work as expected.",
  },
  {
    question: "Should I eat exactly at my TDEE?",
    answer:
      "Eating at TDEE maintains your current weight. To lose weight, eat below it (a deficit); to gain, eat above it (a surplus). A common, sustainable starting point is a 10-20% adjustment in either direction rather than a drastic swing.",
  },
  {
    question: "Does TDEE change over time?",
    answer:
      "Yes. As your weight, activity level, or age change, your TDEE shifts too — which is why it's worth recalculating every few weeks during an active weight loss or gain phase, rather than treating one number as fixed forever.",
  },
];

export default function TdeeCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<TdeeArticle />}>
      <TdeeForm />
    </CalculatorShell>
  );
}

function TdeeArticle() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        TDEE: the number that actually drives weight change
      </h2>
      <p>
        Total Daily Energy Expenditure, or TDEE, is the full count of calories your body burns in
        a typical 24-hour day — not just the baseline cost of staying alive (that's BMR), but
        everything on top of it: digesting food, walking to the kitchen, climbing stairs,
        exercising, fidgeting, even shivering if you're cold. If you want to know how many
        calories to eat to lose, maintain, or gain weight, TDEE — not BMR — is the number that
        actually answers the question.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">How TDEE is built from BMR</h3>
      <p>
        This calculator starts by estimating your BMR using the Mifflin-St Jeor equation, then
        multiplies it by an activity factor that reflects how much you move in an average week:
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        TDEE = BMR × activity multiplier
      </p>
      <p>
        The multipliers range from 1.2 for a sedentary lifestyle (little or no exercise, a
        desk-based job, minimal walking) up to 1.9 for extremely active people — think manual
        labourers who also train intensely, or athletes in a heavy training block. Most people who
        exercise a few times a week alongside an otherwise normal lifestyle fall into the "light"
        or "moderate" categories, which is a more common mistake to underestimate than overstate.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">
        The four components hiding inside TDEE
      </h3>
      <p>
        Researchers typically break total daily burn into four components. Basal metabolism, as
        covered above, is the largest at roughly 60-75% of the total. Thermic effect of food —
        the energy cost of digesting what you eat — accounts for around 10%, and varies slightly
        by macronutrient (protein costs more to digest than fat or carbs). Exercise activity
        thermogenesis covers deliberate workouts, while non-exercise activity thermogenesis
        (NEAT) — all the incidental movement of daily life, from walking to standing to typing —
        can vary enormously between people and is one of the biggest hidden levers in weight
        management.
      </p>
      <p>
        NEAT in particular helps explain why two people with seemingly similar lifestyles can have
        meaningfully different real-world calorie needs. Someone who paces while on the phone,
        takes the stairs, and stands frequently throughout the day can burn several hundred more
        calories than someone equally "sedentary" by job description who sits still most of the
        time.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">Using TDEE to set a calorie target</h3>
      <p>
        Once you know your TDEE, weight management becomes a matter of adjusting intake relative
        to it. Eating at TDEE maintains weight. A moderate 15-20% deficit below TDEE is a
        well-supported, sustainable rate for fat loss without excessive muscle loss or metabolic
        adaptation; a similar surplus above TDEE supports lean weight gain without excessive fat
        gain. Very large deficits or surpluses tend to be harder to sustain and can backfire —
        extreme restriction often triggers stronger hunger signals and a higher chance of
        rebounding.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">Why TDEE estimates drift over time</h3>
      <p>
        TDEE isn't a fixed number. As you lose or gain weight, your BMR shifts (a smaller body
        generally burns somewhat fewer calories at rest), and your NEAT can also change — some
        research suggests the body subtly reduces incidental movement during sustained calorie
        restriction, a phenomenon sometimes called adaptive thermogenesis. This is the practical
        reason many nutrition coaches recommend recalculating TDEE every few weeks during an active
        cutting or bulking phase, adjusting intake based on real-world weight trends rather than
        relying on a single calculation made at the start.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">Common mistakes</h3>
      <p>
        Beyond overestimating activity level, the next most common mistake is treating TDEE as
        perfectly precise rather than a solid estimate with a margin of error of roughly 10%. The
        most reliable approach is to use the calculated number as a starting point, track actual
        weight change over two to three weeks, and adjust intake based on what's really happening
        rather than the formula alone.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">References</h3>
      <p className="text-sm text-foreground/55">
        Levine, J.A. — Non-exercise activity thermogenesis (NEAT), Best Practice & Research
        Clinical Endocrinology & Metabolism · Academy of Nutrition and Dietetics — Energy
        Expenditure resources
      </p>
    </article>
  );
}
