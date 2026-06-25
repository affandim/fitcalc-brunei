import { describe, it, expect } from "vitest";
import {
  calculateBmi,
  calculateBodyFat,
  calculateBmr,
  calculateTdee,
  calculateCalories,
} from "@/lib/formulas";

describe("calculateBmi", () => {
  it("computes BMI and categorises normal weight", () => {
    const result = calculateBmi(170, 65);
    expect(result.bmi).toBeCloseTo(22.49, 1);
    expect(result.category).toBe("Normal weight");
  });

  it("categorises underweight and obese correctly", () => {
    expect(calculateBmi(170, 45).category).toBe("Underweight");
    expect(calculateBmi(170, 95).category).toBe("Obese");
  });
});

describe("calculateBodyFat", () => {
  it("computes body fat for a male using the US Navy method", () => {
    const result = calculateBodyFat({
      gender: "male",
      heightCm: 178,
      neckCm: 38,
      waistCm: 85,
    });
    expect(result.bodyFatPercent).toBeGreaterThan(0);
    expect(result.bodyFatPercent).toBeLessThan(60);
  });

  it("computes body fat for a female including hip measurement", () => {
    const result = calculateBodyFat({
      gender: "female",
      heightCm: 165,
      neckCm: 32,
      waistCm: 70,
      hipCm: 95,
    });
    expect(result.bodyFatPercent).toBeGreaterThan(0);
  });
});

describe("calculateBmr", () => {
  it("matches Mifflin-St Jeor for a male", () => {
    const bmr = calculateBmr({ gender: "male", ageYears: 30, heightCm: 180, weightKg: 80 });
    // 10*80 + 6.25*180 - 5*30 + 5 = 800 + 1125 - 150 + 5
    expect(bmr).toBeCloseTo(1780, 0);
  });

  it("matches Mifflin-St Jeor for a female", () => {
    const bmr = calculateBmr({ gender: "female", ageYears: 30, heightCm: 165, weightKg: 60 });
    // 10*60 + 6.25*165 - 5*30 - 161 = 600 + 1031.25 - 150 - 161
    expect(bmr).toBeCloseTo(1320.25, 1);
  });
});

describe("calculateTdee", () => {
  it("applies the activity multiplier to BMR", () => {
    expect(calculateTdee(1500, "sedentary")).toBeCloseTo(1800, 0);
    expect(calculateTdee(1500, "very_active")).toBeCloseTo(2850, 0);
  });
});

describe("calculateCalories", () => {
  it("adjusts target calories by goal and never drops below 1200", () => {
    const input = { gender: "female" as const, ageYears: 25, heightCm: 160, weightKg: 50 };
    const lose = calculateCalories(input, "sedentary", "lose");
    const gain = calculateCalories(input, "sedentary", "gain");

    expect(lose.targetCalories).toBeGreaterThanOrEqual(1200);
    expect(gain.targetCalories).toBeGreaterThan(lose.targetCalories);
  });

  it("splits macros that roughly sum back to the target calories", () => {
    const input = { gender: "male" as const, ageYears: 28, heightCm: 178, weightKg: 75 };
    const result = calculateCalories(input, "moderate", "maintain");
    const { proteinG, carbsG, fatG } = result.macros;
    const recombined = proteinG * 4 + carbsG * 4 + fatG * 9;
    expect(recombined).toBeCloseTo(result.targetCalories, 0);
  });
});
