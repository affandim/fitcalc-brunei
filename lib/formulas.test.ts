import { describe, it, expect } from "vitest";
import {
  calculateBmi,
  calculateBodyFat,
  calculateBmr,
  calculateTdee,
  calculateCalories,
  calculateLeanBodyMass,
  calculateMuscleMass,
  calculateFfmi,
  calculateIdealWeight,
  calculateProtein,
  calculateWaterIntake,
  calculateMacroSplit,
  calculateBodySurfaceArea,
  calculateWaistToHeightRatio,
  calculateWaistHipRatio,
  calculateHeartRateZones,
  calculateMaxHeartRate,
  calculateTargetHeartRate,
  calculatePace,
  predictRaceTime,
  calculateWalkingCalories,
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

describe("calculateLeanBodyMass", () => {
  it("is less than total weight for a realistic adult", () => {
    const lbm = calculateLeanBodyMass("male", 178, 80);
    expect(lbm).toBeGreaterThan(0);
    expect(lbm).toBeLessThan(80);
  });
});

describe("calculateMuscleMass", () => {
  it("estimates muscle mass below lean body mass", () => {
    const lbm = calculateLeanBodyMass("male", 178, 80);
    const result = calculateMuscleMass("male", 178, 80);
    expect(result.muscleMassKg).toBeLessThan(lbm);
    expect(result.percentOfBodyWeight).toBeGreaterThan(0);
  });
});

describe("calculateFfmi", () => {
  it("computes a plausible FFMI for an average adult male", () => {
    const result = calculateFfmi("male", 178, 80);
    expect(result.ffmi).toBeGreaterThan(15);
    expect(result.ffmi).toBeLessThan(30);
  });
});

describe("calculateIdealWeight", () => {
  it("increases with height", () => {
    const shorter = calculateIdealWeight("male", 165);
    const taller = calculateIdealWeight("male", 185);
    expect(taller).toBeGreaterThan(shorter);
  });
});

describe("calculateProtein", () => {
  it("scales with both bodyweight and goal intensity", () => {
    const sedentary = calculateProtein(70, "sedentary");
    const athlete = calculateProtein(70, "athlete");
    expect(athlete).toBeGreaterThan(sedentary);
  });
});

describe("calculateWaterIntake", () => {
  it("increases with activity level", () => {
    const low = calculateWaterIntake(70, "sedentary");
    const high = calculateWaterIntake(70, "very_active");
    expect(high).toBeGreaterThan(low);
  });
});

describe("calculateMacroSplit", () => {
  it("splits calories proportionally to the given percentages", () => {
    const result = calculateMacroSplit(2000, 30, 40, 30);
    const recombined = result.proteinG * 4 + result.carbsG * 4 + result.fatG * 9;
    expect(recombined).toBeCloseTo(2000, 0);
  });
});

describe("calculateBodySurfaceArea", () => {
  it("matches the Mosteller formula for a known input", () => {
    const bsa = calculateBodySurfaceArea(180, 80);
    expect(bsa).toBeCloseTo(Math.sqrt((180 * 80) / 3600), 5);
  });
});

describe("calculateWaistToHeightRatio", () => {
  it("categorises healthy vs high risk correctly", () => {
    expect(calculateWaistToHeightRatio(80, 180).category).toBe("Healthy");
    expect(calculateWaistToHeightRatio(120, 170).category).toBe("High risk");
  });
});

describe("calculateWaistHipRatio", () => {
  it("uses different thresholds for men and women", () => {
    expect(calculateWaistHipRatio("male", 80, 95).category).toBe("Low risk");
    expect(calculateWaistHipRatio("female", 65, 90).category).toBe("Low risk");
  });
});

describe("calculateHeartRateZones", () => {
  it("returns five ascending zones below max heart rate", () => {
    const zones = calculateHeartRateZones(30);
    expect(zones).toHaveLength(5);
    const maxHr = calculateMaxHeartRate(30);
    expect(zones[4].high).toBeLessThanOrEqual(Math.round(maxHr));
    expect(zones[0].low).toBeLessThan(zones[4].high);
  });
});

describe("calculateTargetHeartRate", () => {
  it("applies the Karvonen formula within max heart rate bounds", () => {
    const result = calculateTargetHeartRate(30, 60, 0.5, 0.85);
    const maxHr = calculateMaxHeartRate(30);
    expect(result.low).toBeGreaterThan(60);
    expect(result.high).toBeLessThanOrEqual(Math.round(maxHr));
  });
});

describe("calculatePace", () => {
  it("computes consistent pace and speed for 10km in 50 minutes", () => {
    const result = calculatePace(10, 50);
    expect(result.paceMinPerKm).toBeCloseTo(5, 5);
    expect(result.speedKmh).toBeCloseTo(12, 5);
  });
});

describe("predictRaceTime", () => {
  it("predicts a longer time for a longer distance", () => {
    const time10k = predictRaceTime(5, 25, 10);
    expect(time10k).toBeGreaterThan(25);
  });
});

describe("calculateWalkingCalories", () => {
  it("burns more calories at a brisker pace for the same duration", () => {
    const slow = calculateWalkingCalories(70, "slow", 30);
    const brisk = calculateWalkingCalories(70, "brisk", 30);
    expect(brisk).toBeGreaterThan(slow);
  });
});
