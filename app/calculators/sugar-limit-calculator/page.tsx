import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { SugarLimitForm } from "@/components/calculators/sugar-limit-form";

const calculator = calculators.find((c) => c.slug === "sugar-limit-calculator")!;

export const metadata: Metadata = {
  title: "Sugar Limit Calculator — Daily Added-Sugar Guideline",
  description: "Find your recommended daily added-sugar limit based on American Heart Association guidance.",
  alternates: { canonical: "/calculators/sugar-limit-calculator" },
};

const faqs = [
  {
    question: "What counts as 'added sugar'?",
    answer:
      "Added sugar refers to sugars and syrups added during food processing or preparation — not sugar that's naturally present in whole foods like fruit, vegetables, or plain dairy. A can of soda's sugar is added; an apple's sugar isn't, even though both are chemically similar.",
  },
  {
    question: "Why is the limit different for men and women?",
    answer:
      "The American Heart Association's guideline is based on a percentage of typical calorie intake, which differs by gender on average — resulting in a higher gram limit for men than women.",
  },
  {
    question: "How much sugar is in a typical can of soda?",
    answer:
      "A standard 355ml can of regular soda typically contains around 39g of added sugar — more than the entire daily recommended limit for most women in a single drink, which illustrates how quickly sweetened beverages can add up.",
  },
];

export default function SugarLimitCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <SugarLimitForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Added sugar: a different category from natural sugar
      </h2>
      <p>
        Not all dietary sugar is treated equally in nutrition guidance. Added sugar — sugar and
        syrups introduced during food processing, cooking, or at the table — is the category
        public health guidelines specifically target, while sugar naturally present in whole
        fruits, vegetables, and dairy isn't counted the same way, since it arrives packaged with
        fiber, water, and nutrients that change how the body processes it.
      </p>
      <p>
        The American Heart Association recommends no more than 36g of added sugar per day for
        men and 25g for women — both noticeably below what many processed foods and sweetened
        beverages contribute on their own.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Where added sugar hides</h3>
      <p>
        Beyond the obvious sources — candy, desserts, sweetened drinks — added sugar shows up in
        less obviously sweet products: flavored yogurt, sauces, granola bars, and bread can all
        contribute meaningful added sugar without tasting overtly sweet. Checking nutrition labels
        for "added sugars" specifically (now a separate line on many labels) is the most reliable
        way to track actual intake.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why sweetened beverages matter most</h3>
      <p>
        Liquid sugar from soda, juice, and sweetened coffee or tea drinks is one of the largest
        single contributors to added sugar intake for most people, partly because it's easy to
        consume a large amount quickly without the same satiety signal that solid food provides.
        Reducing sweetened beverages is often the single highest-impact change for bringing intake
        closer to the recommended limit.
      </p>
    </article>
  );
}
