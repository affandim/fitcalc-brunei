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

/* ------------------------- Lean Body Mass ------------------------- */

/** Boer formula — lean body mass in kg. */
export function calculateLeanBodyMass(gender: Gender, heightCm: number, weightKg: number): number {
  return gender === "male"
    ? 0.407 * weightKg + 0.267 * heightCm - 19.2
    : 0.252 * weightKg + 0.473 * heightCm - 48.3;
}

/* ------------------------- Muscle Mass ------------------------- */

export interface MuscleMassResult {
  muscleMassKg: number;
  percentOfBodyWeight: number;
}

/**
 * Skeletal muscle mass, estimated as a proportion of lean body mass.
 * This is a population-level approximation, not a clinical measurement —
 * roughly 50-55% of lean mass is skeletal muscle for most adults.
 */
export function calculateMuscleMass(gender: Gender, heightCm: number, weightKg: number): MuscleMassResult {
  const lbm = calculateLeanBodyMass(gender, heightCm, weightKg);
  const muscleMassKg = lbm * 0.52;
  return { muscleMassKg, percentOfBodyWeight: (muscleMassKg / weightKg) * 100 };
}

/* ----------------------------- FFMI ----------------------------- */

export interface FfmiResult {
  ffmi: number;
  normalizedFfmi: number;
}

/** Fat-Free Mass Index, plus a height-normalized version for cross-height comparison. */
export function calculateFfmi(gender: Gender, heightCm: number, weightKg: number): FfmiResult {
  const lbm = calculateLeanBodyMass(gender, heightCm, weightKg);
  const heightM = heightCm / 100;
  const ffmi = lbm / (heightM * heightM);
  const normalizedFfmi = ffmi + 6.1 * (1.8 - heightM);
  return { ffmi, normalizedFfmi };
}

/* ------------------------- Ideal Body Weight ------------------------- */

/** Devine formula — ideal body weight in kg from height in cm. */
export function calculateIdealWeight(gender: Gender, heightCm: number): number {
  const heightInches = heightCm / 2.54;
  const inchesOver5Feet = Math.max(0, heightInches - 60);
  return gender === "male" ? 50 + 2.3 * inchesOver5Feet : 45.5 + 2.3 * inchesOver5Feet;
}

/* ----------------------------- Protein ----------------------------- */

export type ProteinGoal = "sedentary" | "moderate" | "active" | "athlete";

const proteinFactors: Record<ProteinGoal, number> = {
  sedentary: 0.8,
  moderate: 1.2,
  active: 1.6,
  athlete: 2.2,
};

export const proteinGoalLabels: Record<ProteinGoal, string> = {
  sedentary: "Sedentary (general health)",
  moderate: "Moderately active",
  active: "Active / strength training",
  athlete: "Athlete / muscle building",
};

/** Daily protein target in grams, by bodyweight and activity goal. */
export function calculateProtein(weightKg: number, goal: ProteinGoal): number {
  return weightKg * proteinFactors[goal];
}

/* --------------------------- Water Intake --------------------------- */

const waterActivityBonusMl: Record<ActivityLevel, number> = {
  sedentary: 0,
  light: 350,
  moderate: 700,
  active: 1000,
  very_active: 1500,
};

/** Daily water intake target in millilitres. */
export function calculateWaterIntake(weightKg: number, activity: ActivityLevel): number {
  return weightKg * 33 + waterActivityBonusMl[activity];
}

/* ------------------------- Custom Macro Split ------------------------- */

export interface MacroSplitResult {
  proteinG: number;
  carbsG: number;
  fatG: number;
}

/** Split a given total calorie target into grams by custom percentages (must sum to 100). */
export function calculateMacroSplit(
  totalCalories: number,
  proteinPercent: number,
  carbsPercent: number,
  fatPercent: number
): MacroSplitResult {
  return {
    proteinG: (totalCalories * (proteinPercent / 100)) / 4,
    carbsG: (totalCalories * (carbsPercent / 100)) / 4,
    fatG: (totalCalories * (fatPercent / 100)) / 9,
  };
}

/* ------------------------- Body Surface Area ------------------------- */

/** Mosteller formula — body surface area in m². */
export function calculateBodySurfaceArea(heightCm: number, weightKg: number): number {
  return Math.sqrt((heightCm * weightKg) / 3600);
}

/* ------------------------- Waist-to-Height Ratio ------------------------- */

export interface WaistHeightResult {
  ratio: number;
  category: "Healthy" | "Increased risk" | "High risk";
}

export function calculateWaistToHeightRatio(waistCm: number, heightCm: number): WaistHeightResult {
  const ratio = waistCm / heightCm;
  let category: WaistHeightResult["category"];
  if (ratio < 0.5) category = "Healthy";
  else if (ratio < 0.6) category = "Increased risk";
  else category = "High risk";
  return { ratio, category };
}

/* ------------------------- Waist-Hip Ratio ------------------------- */

export interface WaistHipResult {
  ratio: number;
  category: "Low risk" | "Moderate risk" | "High risk";
}

export function calculateWaistHipRatio(gender: Gender, waistCm: number, hipCm: number): WaistHipResult {
  const ratio = waistCm / hipCm;
  let category: WaistHipResult["category"];
  if (gender === "male") {
    if (ratio < 0.9) category = "Low risk";
    else if (ratio < 1.0) category = "Moderate risk";
    else category = "High risk";
  } else {
    if (ratio < 0.8) category = "Low risk";
    else if (ratio < 0.85) category = "Moderate risk";
    else category = "High risk";
  }
  return { ratio, category };
}

/* ------------------------- Heart Rate Zones ------------------------- */

export interface HeartRateZone {
  zone: number;
  label: string;
  low: number;
  high: number;
}

/** Max heart rate via the Tanaka formula (more accurate than 220-age for most adults). */
export function calculateMaxHeartRate(ageYears: number): number {
  return 208 - 0.7 * ageYears;
}

const zoneRanges: { label: string; from: number; to: number }[] = [
  { label: "Warm up", from: 0.5, to: 0.6 },
  { label: "Fat burn", from: 0.6, to: 0.7 },
  { label: "Aerobic", from: 0.7, to: 0.8 },
  { label: "Anaerobic", from: 0.8, to: 0.9 },
  { label: "Max effort", from: 0.9, to: 1.0 },
];

export function calculateHeartRateZones(ageYears: number): HeartRateZone[] {
  const maxHr = calculateMaxHeartRate(ageYears);
  return zoneRanges.map((z, i) => ({
    zone: i + 1,
    label: z.label,
    low: Math.round(maxHr * z.from),
    high: Math.round(maxHr * z.to),
  }));
}

/* ------------------------- Target Heart Rate (Karvonen) ------------------------- */

export interface TargetHeartRateResult {
  low: number;
  high: number;
}

/** Karvonen formula — target heart rate range accounting for resting heart rate. */
export function calculateTargetHeartRate(
  ageYears: number,
  restingHr: number,
  intensityLow: number,
  intensityHigh: number
): TargetHeartRateResult {
  const maxHr = calculateMaxHeartRate(ageYears);
  const reserve = maxHr - restingHr;
  return {
    low: Math.round(reserve * intensityLow + restingHr),
    high: Math.round(reserve * intensityHigh + restingHr),
  };
}

/* ----------------------------- Pace ----------------------------- */

export interface PaceResult {
  paceMinPerKm: number;
  paceMinPerMile: number;
  speedKmh: number;
}

/** Pace and speed from a distance (km) covered in a given time (minutes). */
export function calculatePace(distanceKm: number, timeMinutes: number): PaceResult {
  const paceMinPerKm = timeMinutes / distanceKm;
  const paceMinPerMile = paceMinPerKm * 1.60934;
  const speedKmh = distanceKm / (timeMinutes / 60);
  return { paceMinPerKm, paceMinPerMile, speedKmh };
}

/* ------------------------- Running Finish Time ------------------------- */

/**
 * Riegel formula — predicts finish time for a new distance from a known
 * recent performance. Both distances in the same unit (km or miles).
 */
export function predictRaceTime(knownDistance: number, knownTimeMinutes: number, targetDistance: number): number {
  return knownTimeMinutes * Math.pow(targetDistance / knownDistance, 1.06);
}

/* ------------------------- Walking Calories ------------------------- */

export type WalkingPace = "slow" | "moderate" | "brisk" | "very_brisk";

const walkingMets: Record<WalkingPace, number> = {
  slow: 2.8,
  moderate: 3.5,
  brisk: 4.3,
  very_brisk: 5.0,
};

export const walkingPaceLabels: Record<WalkingPace, string> = {
  slow: "Slow (under 4 km/h)",
  moderate: "Moderate (~5 km/h)",
  brisk: "Brisk (~6 km/h)",
  very_brisk: "Very brisk (6.5+ km/h)",
};

/** Calories burned walking = MET x weight(kg) x duration(hours). */
export function calculateWalkingCalories(weightKg: number, pace: WalkingPace, durationMinutes: number): number {
  return walkingMets[pace] * weightKg * (durationMinutes / 60);
}
