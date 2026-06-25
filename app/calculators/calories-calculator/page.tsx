import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { CaloriesForm } from "@/components/calculators/calories-form";

const calculator = calculators.find((c) => c.slug === "calories-calculator")!;

export const metadata: Metadata = {
  title: "Calories Calculator — Daily Calorie Needs by Goal",
  description:
    "Find your daily calorie target to lose, maintain, or gain weight, plus a balanced macro split based on your activity level.",
  alternates: { canonical: "/calculators/calories-calculator" },
};

const faqs = [
  {
    question: "How is my calorie target calculated?",
    answer:
      "We calculate your BMR with the Mifflin-St Jeor equation, multiply it by your activity level to get TDEE, then adjust by roughly 500 calories below TDEE for weight loss or 350 above for weight gain — both moderate, sustainable adjustments rather than extreme swings.",
  },
  {
    question: "Why a 500-calorie deficit for weight loss?",
    answer:
      "A 500-calorie daily deficit creates an approximate weekly deficit of 3,500 calories, historically associated with roughly 0.5kg of fat loss per week. It's a widely used, moderate starting point — individual results vary based on metabolism, adherence, and body composition.",
  },
  {
    question: "What macro split does this calculator use?",
    answer:
      "A balanced 30% protein, 40% carbohydrate, 30% fat split, suitable as a general starting point for most goals. Specific situations — strength training, medical conditions, personal preference — may call for a different ratio, which a dietitian can help tailor.",
  },
  {
    question: "Should I eat exactly this number every day?",
    answer:
      "Treat it as a weekly average rather than a rigid daily rule. Day-to-day variation of a few hundred calories is normal and won't meaningfully affect progress as long as your weekly average lines up with your target.",
  },
];

export default function CaloriesCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<CaloriesArticle />}>
      <CaloriesForm />
    </CalculatorShell>
  );
}

function CaloriesArticle() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Turning your energy needs into a daily calorie target
      </h2>
      <p>
        Knowing your TDEE is useful, but most people want a single actionable number: how many
        calories should I actually eat today to reach my goal? This calculator takes that extra
        step, starting from the same BMR and TDEE foundation used elsewhere on this site, then
        applying a goal-based adjustment to land on a practical daily target.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">How the adjustment works</h3>
      <p>
        For weight loss, the calculator subtracts roughly 500 calories from TDEE — a moderate
        deficit that, based on the long-standing (if imperfect) "3,500 calories per pound of fat"
        rule of thumb, corresponds to losing around 0.5kg per week for most people. For weight
        gain, it adds about 350 calories, a smaller surplus chosen to favour lean tissue gain over
        rapid fat gain. Maintenance simply targets TDEE itself.
      </p>
      <p>
        These are starting points, not universal laws. Actual fat loss or gain per calorie of
        deficit or surplus varies by individual — metabolic adaptation, water retention,
        digestive efficiency, and even sleep quality all nudge the real-world number in either
        direction. The right move is always to track results over two to three weeks and adjust
        the target based on what's actually happening on the scale and in the mirror, not to treat
        the formula's output as gospel.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">Why macros matter alongside total calories</h3>
      <p>
        Total calories determine whether you gain, lose, or maintain weight — but macronutrient
        split shapes how that weight change feels and what kind of tissue you gain or lose.
        Protein is particularly important during a calorie deficit, helping preserve muscle mass
        that might otherwise be lost alongside fat; it's also the most satiating macronutrient,
        which helps with appetite control. The default 30/40/30 split (protein/carbs/fat) used
        here is a reasonable general-purpose starting point, weighted slightly toward protein
        compared to a typical Western diet.
      </p>
      <p>
        Carbohydrates fuel high-intensity exercise and support training performance and recovery,
        while dietary fat is essential for hormone production and the absorption of fat-soluble
        vitamins. None of the three macronutrients should be eliminated entirely for most people
        — the right split is about balance and personal context (training style, medical
        considerations, food preferences) more than chasing a single "perfect" ratio.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">
        Translating grams into a real day of eating
      </h3>
      <p>
        The macro numbers above are a planning tool, not a precision requirement. Hitting your
        protein target consistently matters more than hitting carbs or fat to the exact gram —
        protein is the macronutrient most strongly linked to muscle preservation and satiety, and
        the easiest one to fall short on without deliberate effort. A simple approach is to build
        meals around a protein source first, then fill in carbohydrates and fats around it based
        on appetite, training schedule, and food preference.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">Common mistakes</h3>
      <p>
        The biggest mistake is picking too aggressive a deficit in pursuit of faster results.
        Very large deficits tend to increase hunger, reduce training performance, and raise the
        risk of losing muscle alongside fat — and they're harder to sustain for more than a few
        weeks, which often leads to rebounding. A second common mistake is recalculating the
        target too rarely; as weight changes meaningfully (5kg or more), BMR and TDEE shift too,
        and the original calorie target should be revisited.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">References</h3>
      <p className="text-sm text-foreground/55">
        Hall, K.D. & Guo, J. — Obesity Energetics: Body Weight Regulation and the Effects of Diet
        Composition, Gastroenterology · Academy of Nutrition and Dietetics — Macronutrient
        guidance
      </p>
    </article>
  );
}
