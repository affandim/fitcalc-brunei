import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { BmiForm } from "@/components/calculators/bmi-form";

const calculator = calculators.find((c) => c.slug === "bmi-calculator")!;

export const metadata: Metadata = {
  title: "BMI Calculator — Check Your Body Mass Index Instantly",
  description:
    "Free BMI calculator with instant results, WHO classification ranges, and a plain-language explanation of what your number means.",
  alternates: { canonical: "/calculators/bmi-calculator" },
};

const faqs = [
  {
    question: "What is a healthy BMI range?",
    answer:
      "For most adults, the World Health Organization defines a BMI between 18.5 and 24.9 as the normal weight range. Below 18.5 is classed as underweight, 25 to 29.9 as overweight, and 30 or above as obese.",
  },
  {
    question: "Is BMI accurate for everyone?",
    answer:
      "BMI is a useful screening tool at a population level, but it doesn't distinguish muscle from fat. Athletes, older adults, and people with very high or low muscle mass may get a BMI reading that doesn't reflect their actual health risk.",
  },
  {
    question: "Does BMI differ for men and women?",
    answer:
      "The BMI formula itself is the same for everyone, but body composition naturally differs between men and women at the same BMI. That's one reason BMI is best read alongside other measures like waist circumference or body fat percentage.",
  },
  {
    question: "How is BMI calculated?",
    answer:
      "BMI is your weight in kilograms divided by the square of your height in metres (kg/m²). This calculator does the conversion for you if you enter measurements in imperial units.",
  },
];

export default function BmiCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<BmiArticle />}>
      <BmiForm />
    </CalculatorShell>
  );
}

function BmiArticle() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Understanding Body Mass Index
      </h2>
      <p>
        Body Mass Index, or BMI, is one of the oldest and most widely used screening tools in
        public health. It was developed in the 1830s by the Belgian mathematician Adolphe
        Quetelet, who was looking for a simple way to describe the "normal" relationship between
        height and weight across a population. Almost two centuries later, it remains the
        starting point doctors, researchers, and health systems around the world use to flag
        whether someone's weight might be putting their health at risk.
      </p>
      <p>
        The appeal of BMI is its simplicity. It only needs two measurements — height and weight —
        and a short calculation. That makes it fast, free, and consistent enough to track at a
        population level, which is why organisations like the World Health Organization use it to
        compare obesity trends between countries and over time.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">The formula behind the number</h3>
      <p>
        BMI is calculated by dividing weight in kilograms by height in metres squared:
      </p>
      <p className="rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm">
        BMI = weight (kg) ÷ height (m)²
      </p>
      <p>
        If you measure in pounds and inches, the calculator above converts automatically, but the
        underlying imperial formula multiplies weight in pounds by 703, then divides by height in
        inches squared. Both versions of the formula produce the same result — they're just
        scaled for different units.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">How to interpret your result</h3>
      <p>
        Once you have a number, the WHO classification splits adult BMI into four broad bands:
        under 18.5 is considered underweight, 18.5 to 24.9 is the normal weight range, 25 to 29.9
        is overweight, and 30 and above is classified as obese, which is further divided into
        three sub-classes by most clinical guidelines. These thresholds were built from large
        population studies linking BMI to the risk of conditions like type 2 diabetes,
        cardiovascular disease, and certain cancers.
      </p>
      <p>
        It's worth being clear about what a BMI result is, and isn't. It is a screening number —
        a quick flag that something may be worth a closer look. It is not a diagnosis, and it
        doesn't directly measure body fat, muscle mass, or where fat is distributed on the body,
        all of which matter for actual health risk.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">Where BMI falls short</h3>
      <p>
        Because BMI only looks at total weight relative to height, it can't tell the difference
        between a kilogram of muscle and a kilogram of fat. A heavily muscled athlete and a person
        carrying excess fat can land on an identical BMI despite having very different body
        compositions and very different health risks. This is the most common criticism of BMI,
        and it's a fair one — particularly for strength athletes, bodybuilders, and some very fit
        individuals who are technically classified as "overweight" or "obese" by BMI alone.
      </p>
      <p>
        BMI also doesn't account for where fat is stored. Visceral fat around the abdomen carries
        a meaningfully higher cardiovascular risk than fat stored elsewhere, yet two people with
        identical BMI scores can have very different waist measurements. This is part of why many
        clinicians now recommend pairing BMI with a waist circumference or waist-to-height ratio
        measurement for a fuller picture — both of which you'll find as separate calculators on
        this site.
      </p>
      <p>
        Age and ethnicity also shift how BMI thresholds should be read. Older adults tend to carry
        more fat at the same BMI as younger adults, partly due to natural muscle loss with age.
        Several population studies have also found that some ethnic groups, particularly people of
        South and East Asian descent, face elevated health risks at lower BMI thresholds than the
        standard WHO cut-offs suggest, which has led some national health bodies to recommend
        adjusted reference ranges for these populations.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">What to do with your BMI result</h3>
      <p>
        If your BMI falls outside the normal range, the most useful next step usually isn't to
        fixate on the number itself, but to look at the broader picture: your waist
        circumference, your activity level, your diet quality, your family health history, and how
        you actually feel day to day. A single BMI reading taken in isolation tells you very
        little; a BMI tracked over months or years, alongside how your clothes fit and how your
        energy levels are trending, tells you a lot more.
      </p>
      <p>
        If you're concerned about your result, a doctor or registered dietitian can interpret it
        properly in the context of your full health picture, rather than as a number in isolation.
        Calculators like this one are designed to inform that conversation, not replace it.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">Common mistakes when using BMI</h3>
      <p>
        A few mistakes come up often. The first is comparing BMI across very different body types
        — using an athlete's BMI as a benchmark for a sedentary person, or vice versa, ignores how
        differently muscle and fat contribute to the same number. The second is treating a single
        reading as a verdict rather than a data point; weight naturally fluctuates day to day with
        hydration, food intake, and hormonal cycles, so a trend over weeks matters far more than
        any one measurement. The third is applying adult BMI thresholds to children and teenagers,
        whose healthy BMI ranges shift with age and require dedicated paediatric growth charts
        rather than the fixed adult bands used here.
      </p>

      <h3 className="font-display text-xl font-medium text-foreground">References</h3>
      <p className="text-sm text-foreground/55">
        World Health Organization — Obesity and overweight fact sheet · Centers for Disease
        Control and Prevention — About Adult BMI · National Institutes of Health — Body Mass
        Index Tables
      </p>
    </article>
  );
}
