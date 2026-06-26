import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { ChildCalorieForm } from "@/components/calculators/child-calorie-form";

const calculator = calculators.find((c) => c.slug === "child-calorie-calculator")!;

export const metadata: Metadata = {
  title: "Child Calorie Needs Calculator (Ages 3-18)",
  description: "Estimate daily calorie needs for children and teenagers aged 3 to 18, by age, gender and activity level.",
  alternates: { canonical: "/calculators/child-calorie-calculator" },
};

const faqs = [
  {
    question: "Why does this calculator only cover ages 3-18?",
    answer:
      "Energy needs for infants and toddlers under 3 are calculated very differently, with much closer medical supervision typically involved. This calculator focuses on the age range where general activity-based estimates are most commonly useful for parents.",
  },
  {
    question: "Should I use this to restrict my child's food intake?",
    answer:
      "No — this calculator is meant as a general guide for understanding typical energy needs, not as a basis for restricting a growing child's diet. Children's nutrition needs involve more than calories alone, and any specific dietary concerns are best discussed with a pediatrician.",
  },
  {
    question: "Why do calorie needs increase so much with activity level?",
    answer:
      "Active children burn substantially more energy through play and sport, and growing bodies have higher baseline energy demands than adults relative to size — both factors mean activity level has an outsized effect on a child's total energy needs compared to a sedentary adult.",
  },
];

export default function ChildCalorieCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <ChildCalorieForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Understanding a child's daily energy needs
      </h2>
      <p>
        Children's calorie needs scale differently than adults' — growth itself requires energy,
        on top of the basic metabolic and activity costs that apply to everyone. This calculator
        offers a simplified estimate based on the general shape of Institute of Medicine
        Estimated Energy Requirement guidance for children aged 3 to 18.
      </p>
      <p>
        Three factors drive the estimate: age (older children generally need more total energy),
        gender (reflecting average differences in body composition and growth patterns), and
        activity level (which has an outsized effect for children, since play and sport burn a
        meaningful share of daily energy for an active child).
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why this is a guide, not a target</h3>
      <p>
        Unlike adult calorie calculators often used to set a specific intake goal, this tool is
        meant purely as context — to understand roughly how much energy a child of a given age and
        activity level typically needs, not as a number to actively manage or restrict toward. A
        growing child's appetite naturally fluctuates, and forcing intake toward a specific number
        isn't generally recommended.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">When to involve a pediatrician</h3>
      <p>
        If you have specific concerns about your child's growth, weight, or eating patterns, a
        pediatrician can assess these properly using growth charts and a full clinical picture —
        which this general calculator, by design, doesn't have access to.
      </p>
    </article>
  );
}
