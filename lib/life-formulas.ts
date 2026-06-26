/**
 * Calckoo — Pregnancy, Children, Medical & Education Calculation Engine
 * Pure functions, same pattern as lib/formulas.ts and lib/finance-formulas.ts.
 */

/* ----------------------------- Due Date ----------------------------- */

export interface DueDateResult {
  dueDate: Date;
  currentWeek: number;
  currentDay: number;
  trimester: 1 | 2 | 3;
}

/** Naegele's rule: due date = last menstrual period + 280 days (40 weeks). */
export function calculateDueDate(lastPeriodDate: Date, today: Date = new Date()): DueDateResult {
  const dueDate = new Date(lastPeriodDate);
  dueDate.setDate(dueDate.getDate() + 280);

  const diffMs = today.getTime() - lastPeriodDate.getTime();
  const totalDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  const currentWeek = Math.floor(totalDays / 7);
  const currentDay = totalDays % 7;

  let trimester: 1 | 2 | 3 = 1;
  if (currentWeek >= 27) trimester = 3;
  else if (currentWeek >= 13) trimester = 2;

  return { dueDate, currentWeek, currentDay, trimester };
}

/* ------------------------ Pregnancy Weight Gain ------------------------ */

export interface WeightGainRange {
  minKg: number;
  maxKg: number;
  category: "Underweight" | "Normal weight" | "Overweight" | "Obese";
}

/** IOM (Institute of Medicine) total pregnancy weight gain guidelines, by pre-pregnancy BMI. */
export function calculatePregnancyWeightGain(prePregnancyBmi: number): WeightGainRange {
  if (prePregnancyBmi < 18.5) return { minKg: 12.5, maxKg: 18, category: "Underweight" };
  if (prePregnancyBmi < 25) return { minKg: 11.5, maxKg: 16, category: "Normal weight" };
  if (prePregnancyBmi < 30) return { minKg: 7, maxKg: 11.5, category: "Overweight" };
  return { minKg: 5, maxKg: 9, category: "Obese" };
}

/* ------------------------ Mid-Parental Height Prediction ------------------------ */

export type ChildGender = "boy" | "girl";

/** Mid-parental height method — predicted adult height in cm. */
export function predictAdultHeight(fatherHeightCm: number, motherHeightCm: number, gender: ChildGender): number {
  return gender === "boy"
    ? (fatherHeightCm + motherHeightCm + 13) / 2
    : (fatherHeightCm + motherHeightCm - 13) / 2;
}

/* ------------------------ Child Calorie Needs ------------------------ */

export type ChildActivityLevel = "sedentary" | "moderate" | "active";

/**
 * Simplified Estimated Energy Requirement (EER) for children 3-18 years,
 * based on Institute of Medicine equations (age, gender, weight-aware,
 * height not required for this simplified version).
 */
export function calculateChildCalories(
  ageYears: number,
  gender: ChildGender,
  activity: ChildActivityLevel
): number {
  const activityFactor: Record<ChildGender, Record<ChildActivityLevel, number>> = {
    boy: { sedentary: 1.0, moderate: 1.13, active: 1.26 },
    girl: { sedentary: 1.0, moderate: 1.16, active: 1.31 },
  };

  // Simplified baseline EER curve by age (kcal/day), approximated from IOM reference
  // values for average-weight children before the activity multiplier is applied.
  const baseEER = gender === "boy" ? 1000 + ageYears * 90 : 950 + ageYears * 80;

  return Math.round(baseEER * activityFactor[gender][activity]);
}

/* ------------------------ Blood Pressure Category ------------------------ */

export type BloodPressureCategory =
  | "Normal"
  | "Elevated"
  | "Hypertension Stage 1"
  | "Hypertension Stage 2"
  | "Hypertensive Crisis";

/** American Heart Association blood pressure categories. */
export function categorizeBloodPressure(systolic: number, diastolic: number): BloodPressureCategory {
  if (systolic >= 180 || diastolic >= 120) return "Hypertensive Crisis";
  if (systolic >= 140 || diastolic >= 90) return "Hypertension Stage 2";
  if (systolic >= 130 || diastolic >= 80) return "Hypertension Stage 1";
  if (systolic >= 120 && diastolic < 80) return "Elevated";
  return "Normal";
}

/* ------------------------ Pulse Pressure & MAP ------------------------ */

export interface PulsePressureResult {
  pulsePressure: number;
  meanArterialPressure: number;
}

export function calculatePulsePressure(systolic: number, diastolic: number): PulsePressureResult {
  const pulsePressure = systolic - diastolic;
  const meanArterialPressure = diastolic + pulsePressure / 3;
  return { pulsePressure, meanArterialPressure };
}

/* ------------------------------ GPA ------------------------------ */

export interface GpaCourse {
  grade: number; // grade points, e.g. 4.0, 3.7, 3.3...
  creditHours: number;
}

export function calculateGpa(courses: GpaCourse[]): number {
  const totalCredits = courses.reduce((sum, c) => sum + c.creditHours, 0);
  if (totalCredits === 0) return 0;
  const totalPoints = courses.reduce((sum, c) => sum + c.grade * c.creditHours, 0);
  return totalPoints / totalCredits;
}

/* ------------------------ Study Time Planning ------------------------ */

export interface StudyPlanResult {
  hoursPerDay: number;
  pomodoroSessionsPerDay: number;
}

/** Splits total study hours needed evenly across the days remaining, in 25-minute Pomodoro sessions. */
export function calculateStudyPlan(totalHoursNeeded: number, daysRemaining: number): StudyPlanResult {
  const days = Math.max(1, daysRemaining);
  const hoursPerDay = totalHoursNeeded / days;
  const pomodoroSessionsPerDay = Math.ceil((hoursPerDay * 60) / 25);
  return { hoursPerDay, pomodoroSessionsPerDay };
}

/* ------------------------ Test Score / Letter Grade ------------------------ */

export interface TestScoreResult {
  percentage: number;
  letterGrade: "A" | "B" | "C" | "D" | "F";
}

/** Standard US 90/80/70/60 letter-grade bands. */
export function calculateTestScore(correctAnswers: number, totalQuestions: number): TestScoreResult {
  const percentage = totalQuestions === 0 ? 0 : (correctAnswers / totalQuestions) * 100;
  let letterGrade: TestScoreResult["letterGrade"];
  if (percentage >= 90) letterGrade = "A";
  else if (percentage >= 80) letterGrade = "B";
  else if (percentage >= 70) letterGrade = "C";
  else if (percentage >= 60) letterGrade = "D";
  else letterGrade = "F";
  return { percentage, letterGrade };
}
