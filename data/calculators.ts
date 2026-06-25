import type { CalculatorMeta } from "@/types";

export const calculators: CalculatorMeta[] = [
  { slug: "bmi-calculator", title: "BMI Calculator", shortDescription: "Check your Body Mass Index.", category: "health", icon: "HeartPulse", popular: true },
  { slug: "body-fat-calculator", title: "Body Fat Calculator", shortDescription: "Estimate your body fat percentage.", category: "health", icon: "Activity", popular: true },
  { slug: "muscle-mass-calculator", title: "Muscle Mass Calculator", shortDescription: "Estimate skeletal muscle mass.", category: "fitness", icon: "Dumbbell" },
  { slug: "lean-body-mass-calculator", title: "Lean Body Mass Calculator", shortDescription: "Calculate mass excluding fat.", category: "health", icon: "Activity" },
  { slug: "ffmi-calculator", title: "FFMI Calculator", shortDescription: "Fat-Free Mass Index for athletes.", category: "fitness", icon: "Dumbbell" },
  { slug: "ideal-weight-calculator", title: "Ideal Weight Calculator", shortDescription: "Find your ideal body weight range.", category: "health", icon: "Scale" },
  { slug: "calories-calculator", title: "Calories Calculator", shortDescription: "Daily calorie needs by goal.", category: "nutrition", icon: "Flame", popular: true },
  { slug: "protein-calculator", title: "Protein Calculator", shortDescription: "Daily protein target for your goals.", category: "nutrition", icon: "Apple" },
  { slug: "water-intake-calculator", title: "Water Intake Calculator", shortDescription: "How much water you should drink.", category: "nutrition", icon: "GlassWater" },
  { slug: "bmr-calculator", title: "BMR Calculator", shortDescription: "Basal Metabolic Rate at rest.", category: "health", icon: "Flame", popular: true },
  { slug: "tdee-calculator", title: "TDEE Calculator", shortDescription: "Total Daily Energy Expenditure.", category: "nutrition", icon: "Flame", popular: true },
  { slug: "macro-calculator", title: "Macro Calculator", shortDescription: "Protein, carbs and fat split.", category: "nutrition", icon: "PieChart" },
  { slug: "body-surface-area-calculator", title: "Body Surface Area Calculator", shortDescription: "Estimate total skin surface area.", category: "medical", icon: "Stethoscope" },
  { slug: "waist-to-height-ratio-calculator", title: "Waist to Height Ratio", shortDescription: "A simple cardiovascular risk metric.", category: "health", icon: "Ruler" },
  { slug: "waist-hip-ratio-calculator", title: "Waist Hip Ratio Calculator", shortDescription: "Body fat distribution indicator.", category: "health", icon: "Ruler" },
  { slug: "heart-rate-zone-calculator", title: "Heart Rate Zone Calculator", shortDescription: "Training zones for cardio workouts.", category: "fitness", icon: "HeartPulse", isNew: true },
  { slug: "target-heart-rate-calculator", title: "Target Heart Rate Calculator", shortDescription: "Find your optimal training heart rate.", category: "fitness", icon: "HeartPulse" },
  { slug: "pace-calculator", title: "Pace Calculator", shortDescription: "Running and walking pace conversions.", category: "fitness", icon: "Timer", isNew: true },
  { slug: "running-calculator", title: "Running Calculator", shortDescription: "Estimate finish times and splits.", category: "fitness", icon: "Timer" },
  { slug: "walking-calories-calculator", title: "Walking Calories Calculator", shortDescription: "Calories burned while walking.", category: "fitness", icon: "Flame", isNew: true },
  { slug: "loan-emi-calculator", title: "Loan EMI Calculator", shortDescription: "Monthly loan payments and total interest.", category: "finance", icon: "Wallet", popular: true },
  { slug: "compound-interest-calculator", title: "Compound Interest Calculator", shortDescription: "Grow savings with compounding and contributions.", category: "finance", icon: "TrendingUp", popular: true },
  { slug: "simple-interest-calculator", title: "Simple Interest Calculator", shortDescription: "Quick simple interest on a principal amount.", category: "finance", icon: "Percent" },
  { slug: "savings-goal-calculator", title: "Savings Goal Calculator", shortDescription: "Monthly savings needed to hit a target.", category: "finance", icon: "PiggyBank" },
  { slug: "investment-return-calculator", title: "Investment Return Calculator", shortDescription: "Total and annualized investment returns.", category: "finance", icon: "LineChart" },
];

export function getCalculatorsByCategory(category: string) {
  return calculators.filter((c) => c.category === category);
}

export function getPopularCalculators() {
  return calculators.filter((c) => c.popular);
}

export function getLatestCalculators() {
  return calculators.filter((c) => c.isNew);
}
