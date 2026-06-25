import type { CategoryMeta } from "@/types";

export const categories: CategoryMeta[] = [
  {
    slug: "health",
    title: "Health",
    description: "BMI, body fat, ideal weight and vital health metrics.",
    icon: "HeartPulse",
    color: "var(--emerald)",
  },
  {
    slug: "fitness",
    title: "Fitness",
    description: "Heart rate zones, pace, running and training calculators.",
    icon: "Dumbbell",
    color: "var(--teal)",
  },
  {
    slug: "nutrition",
    title: "Nutrition",
    description: "Calories, macros, protein and water intake planning.",
    icon: "Apple",
    color: "var(--mint)",
  },
  {
    slug: "pregnancy",
    title: "Pregnancy",
    description: "Due dates, weight gain and pregnancy milestones.",
    icon: "Baby",
    color: "var(--teal)",
  },
  {
    slug: "children",
    title: "Children",
    description: "Growth charts and child health calculators.",
    icon: "PersonStanding",
    color: "var(--emerald)",
  },
  {
    slug: "medical",
    title: "Medical",
    description: "Clinical reference calculators for general use.",
    icon: "Stethoscope",
    color: "var(--emerald-deep)",
  },
  {
    slug: "finance",
    title: "Finance",
    description: "Loans, savings, tax and everyday money calculators.",
    icon: "Wallet",
    color: "var(--ink-soft)",
  },
  {
    slug: "converters",
    title: "Unit Converters",
    description: "Length, weight, volume and temperature conversions.",
    icon: "ArrowLeftRight",
    color: "var(--teal)",
  },
  {
    slug: "education",
    title: "Education",
    description: "GPA, grade and study-related calculators.",
    icon: "GraduationCap",
    color: "var(--mint)",
  },
];
