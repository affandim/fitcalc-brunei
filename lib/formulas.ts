/**
 * FitCalc Brunei — Calculation Engine
 * Pure, dependency-free formula functions. Every calculator imports from
 * here so the math lives in exactly one place and is unit-testable in
 * isolation from any UI.
 */

export type Gender = "male" | "female";
export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

export const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export const activityLabels: Record<ActivityLevel, string> = {
  sedentary: "Sedentary (little or no exercise)",
  light: "Lightly active (1-3 days/week)",
  moderate: "Moderately active (3-5 days/week)",
  active: "Very active (6-7 days/week)",
  very_active: "Extremely active (athlete, physical job)",
};

/* ---------------------------- BMI ---------------------------- */

export interface BmiResult {
  bmi: number;
  category: "Underweight" | "Normal weight" | "Overweight" | "Obese";
}

/** Body Mass Index — WHO formula. heightCm in centimetres, weightKg in kilograms. */
export function calculateBmi(heightCm: number, weightKg: number): BmiResult {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let category: BmiResult["category"];
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal weight";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  return { bmi, category };
}

/* ------------------------- Body Fat % ------------------------- */

export interface BodyFatInput {
  gender: Gender;
  heightCm: number;
  neckCm: number;
  waistCm: number;
  hipCm?: number; // required for female
}

export interface BodyFatResult {
  bodyFatPercent: number;
  category: "Essential" | "Athletic" | "Fitness" | "Average" | "Obese";
}

/** US Navy circumference method. All measurements in centimetres. */
export function calculateBodyFat(input: BodyFatInput): BodyFatResult {
  const { gender, heightCm, neckCm, waistCm, hipCm = 0 } = input;

  let bodyFatPercent: number;
  if (gender === "male") {
    bodyFatPercent =
      495 /
        (1.0324 -
          0.19077 * Math.log10(waistCm - neckCm) +
          0.15456 * Math.log10(heightCm)) -
      450;
  } else {
    bodyFatPercent =
      495 /
        (1.29579 -
          0.35004 * Math.log10(waistCm + hipCm - neckCm) +
          0.221 * Math.log10(heightCm)) -
      450;
  }

  bodyFatPercent = Math.max(2, Math.min(60, bodyFatPercent));

  let category: BodyFatResult["category"];
  if (gender === "male") {
    if (bodyFatPercent < 6) category = "Essential";
    else if (bodyFatPercent < 14) category = "Athletic";
    else if (bodyFatPercent < 18) category = "Fitness";
    else if (bodyFatPercent < 25) category = "Average";
    else category = "Obese";
  } else {
    if (bodyFatPercent < 14) category = "Essential";
    else if (bodyFatPercent < 21) category = "Athletic";
    else if (bodyFatPercent < 25) category = "Fitness";
    else if (bodyFatPercent < 32) category = "Average";
    else category = "Obese";
  }

  return { bodyFatPercent, category };
}

/* ----------------------------- BMR ----------------------------- */

export interface BmrInput {
  gender: Gender;
  ageYears: number;
  heightCm: number;
  weightKg: number;
}

/** Basal Metabolic Rate — Mifflin-St Jeor equation (calories/day). */
export function calculateBmr(input: BmrInput): number {
  const { gender, ageYears, heightCm, weightKg } = input;
  const base = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  return gender === "male" ? base + 5 : base - 161;
}

/* ----------------------------- TDEE ----------------------------- */

/** Total Daily Energy Expenditure = BMR x activity multiplier. */
export function calculateTdee(bmr: number, activity: ActivityLevel): number {
  return bmr * activityMultipliers[activity];
}

/* --------------------------- Calories --------------------------- */

export type CalorieGoal = "lose" | "maintain" | "gain";

export interface CalorieResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  macros: { proteinG: number; carbsG: number; fatG: number };
}

const goalAdjustment: Record<CalorieGoal, number> = {
  lose: -500,
  maintain: 0,
  gain: 350,
};

/**
 * Daily calorie target by goal, plus a balanced macro split
 * (30% protein / 40% carbs / 30% fat) derived from the target calories.
 */
export function calculateCalories(
  bmrInput: BmrInput,
  activity: ActivityLevel,
  goal: CalorieGoal
): CalorieResult {
  const bmr = calculateBmr(bmrInput);
  const tdee = calculateTdee(bmr, activity);
  const targetCalories = Math.max(1200, tdee + goalAdjustment[goal]);

  const proteinG = (targetCalories * 0.3) / 4;
  const carbsG = (targetCalories * 0.4) / 4;
  const fatG = (targetCalories * 0.3) / 9;

  return { bmr, tdee, targetCalories, macros: { proteinG, carbsG, fatG } };
}
