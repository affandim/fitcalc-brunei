import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { AlcoholCaloriesForm } from "@/components/calculators/alcohol-calories-form";

const calculator = calculators.find((c) => c.slug === "alcohol-calories-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Alcohol Calories Calculator — Beer, Wine & Spirits",
  description: "Estimate how many calories you're consuming from beer, wine or spirits.",
  path: "/calculators/alcohol-calories-calculator",
});

const faqs = [
  {
    question: "Why does alcohol have calories without a nutrition label on most drinks?",
    answer:
      "Alcohol itself provides about 7 calories per gram — close to fat's 9 calories per gram — but unlike packaged food, most alcoholic beverages aren't legally required to display nutrition labels in many countries, which is part of why alcohol's calorie contribution is easy to underestimate.",
  },
  {
    question: "Are these calories 'empty' calories?",
    answer:
      "Often described that way because alcohol provides energy without the vitamins, minerals, or fiber that calorically-equivalent whole foods provide. It's a meaningful source of calories that's easy to consume quickly, especially across multiple drinks in one evening.",
  },
  {
    question: "Do mixed drinks have more calories than straight spirits?",
    answer:
      "Often yes — mixers like soda, juice, or simple syrup add their own calories on top of the alcohol itself, sometimes substantially. This calculator estimates the alcohol component alone; sweetened mixers would add to the total.",
  },
];

export default function AlcoholCaloriesCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <AlcoholCaloriesForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        The calories hiding in alcoholic drinks
      </h2>
      <p>
        Alcohol provides roughly 7 calories per gram — more than carbohydrate or protein (4
        calories per gram) and not far behind fat (9 calories per gram). Combined with the fact
        that most alcoholic drinks aren't required to carry nutrition labels in many
        jurisdictions, it's an easy source of calories to underestimate.
      </p>
      <p>
        This calculator uses approximate calorie values for standard serving sizes: a 355ml beer
        (~5% ABV) at roughly 150 calories, a 150ml glass of wine (~12% ABV) at roughly 125
        calories, and a 45ml spirit shot (~40% ABV) at roughly 100 calories — though actual values
        vary by specific brand and alcohol content.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Beyond the alcohol itself</h3>
      <p>
        This estimate covers the alcohol component only. Mixed drinks with sweetened sodas,
        juices, or syrups add substantial additional calories on top — a sugary cocktail can
        easily double or triple the calorie count of the alcohol alone.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why these are sometimes called "empty" calories</h3>
      <p>
        Alcohol provides energy without the vitamins, minerals, or fiber that an equivalent
        amount of whole food would typically provide — a reason it's sometimes described as a
        source of "empty" calories, contributing to energy intake without much additional
        nutritional value.
      </p>
    </article>
  );
}
