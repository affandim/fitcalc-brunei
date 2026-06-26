/**
 * Calckoo — Additional Health/Fitness/Nutrition Calculation Engine
 * Same pure-function pattern as lib/formulas.ts.
 */

import type { Gender } from "@/lib/formulas";

/* ------------------------ Body Adiposity Index ------------------------ */

/** BAI estimates body fat % from hip circumference and height alone (no weight needed). */
export function calculateBai(hipCm: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return hipCm / Math.pow(heightM, 1.5) - 18;
}

/* ------------------------ Body Frame Size ------------------------ */

export type FrameSize = "Small" | "Medium" | "Large";

/** Classic height-to-wrist-circumference ratio method for body frame size. */
export function calculateFrameSize(gender: Gender, heightCm: number, wristCm: number): FrameSize {
  const ratio = heightCm / wristCm;
  if (gender === "male") {
    if (ratio > 10.4) return "Small";
    if (ratio >= 9.6) return "Medium";
    return "Large";
  }
  if (ratio > 11.0) return "Small";
  if (ratio >= 10.1) return "Medium";
  return "Large";
}

/* ------------------------------ One Rep Max ------------------------------ */

export interface OneRepMaxResult {
  oneRepMax: number;
  trainingLoads: { percent: number; weight: number }[];
}

/** Epley formula: 1RM = weight x (1 + reps/30), plus a standard training percentage table. */
export function calculateOneRepMax(weight: number, reps: number): OneRepMaxResult {
  const oneRepMax = weight * (1 + reps / 30);
  const percentages = [95, 90, 85, 80, 75, 70, 65];
  const trainingLoads = percentages.map((percent) => ({
    percent,
    weight: oneRepMax * (percent / 100),
  }));
  return { oneRepMax, trainingLoads };
}

/* ------------------------ Running Calories ------------------------ */

export type RunningPace = "jog" | "moderate" | "fast" | "very_fast";

const runningMets: Record<RunningPace, number> = {
  jog: 6.0,
  moderate: 9.8,
  fast: 11.5,
  very_fast: 14.8,
};

export const runningPaceLabels: Record<RunningPace, string> = {
  jog: "Easy jog (~8 km/h)",
  moderate: "Moderate run (~10 km/h)",
  fast: "Fast run (~12 km/h)",
  very_fast: "Very fast (~14+ km/h)",
};

export function calculateRunningCalories(weightKg: number, pace: RunningPace, durationMinutes: number): number {
  return runningMets[pace] * weightKg * (durationMinutes / 60);
}

/* ------------------------ Cycling Calories ------------------------ */

export type CyclingIntensity = "leisure" | "moderate" | "vigorous" | "racing";

const cyclingMets: Record<CyclingIntensity, number> = {
  leisure: 4.0,
  moderate: 6.0,
  vigorous: 8.0,
  racing: 10.0,
};

export const cyclingIntensityLabels: Record<CyclingIntensity, string> = {
  leisure: "Leisure (<16 km/h)",
  moderate: "Moderate (16-19 km/h)",
  vigorous: "Vigorous (19-22 km/h)",
  racing: "Racing (22+ km/h)",
};

export function calculateCyclingCalories(weightKg: number, intensity: CyclingIntensity, durationMinutes: number): number {
  return cyclingMets[intensity] * weightKg * (durationMinutes / 60);
}

/* ------------------------------ Fiber Intake ------------------------------ */

/** IOM Adequate Intake for fiber, by gender and age. */
export function calculateFiberTarget(gender: Gender, ageYears: number): number {
  if (gender === "male") return ageYears <= 50 ? 38 : 30;
  return ageYears <= 50 ? 25 : 21;
}

/* ------------------------------ Sugar Limit ------------------------------ */

export interface SugarLimitResult {
  gramsPerDay: number;
  teaspoonsPerDay: number;
}

/** American Heart Association added-sugar limit, by gender. */
export function calculateSugarLimit(gender: Gender): SugarLimitResult {
  const gramsPerDay = gender === "male" ? 36 : 25;
  return { gramsPerDay, teaspoonsPerDay: gramsPerDay / 4 };
}

/* ------------------------------ Alcohol Calories ------------------------------ */

export type DrinkType = "beer" | "wine" | "spirit";

const drinkCalories: Record<DrinkType, number> = {
  beer: 150,
  wine: 125,
  spirit: 100,
};

export const drinkTypeLabels: Record<DrinkType, string> = {
  beer: "Beer (355ml, ~5% ABV)",
  wine: "Wine (150ml glass, ~12% ABV)",
  spirit: "Spirit shot (45ml, ~40% ABV)",
};

export function calculateAlcoholCalories(drinkType: DrinkType, quantity: number): number {
  return drinkCalories[drinkType] * quantity;
}
