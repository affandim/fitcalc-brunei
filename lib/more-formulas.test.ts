import { describe, it, expect } from "vitest";
import {
  calculateBai,
  calculateFrameSize,
  calculateOneRepMax,
  calculateRunningCalories,
  calculateCyclingCalories,
  calculateFiberTarget,
  calculateSugarLimit,
  calculateAlcoholCalories,
  calculateAnionGap,
  calculateBloodVolume,
} from "@/lib/more-formulas";

describe("calculateBai", () => {
  it("computes a plausible BAI value", () => {
    const bai = calculateBai(100, 170);
    expect(bai).toBeGreaterThan(0);
    expect(bai).toBeLessThan(60);
  });
});

describe("calculateFrameSize", () => {
  it("categorizes frame size using different thresholds for men and women", () => {
    expect(calculateFrameSize("male", 180, 16)).toBe("Small");
    expect(calculateFrameSize("male", 180, 19)).toBe("Large");
    expect(calculateFrameSize("female", 165, 14)).toBe("Small");
  });
});

describe("calculateOneRepMax", () => {
  it("matches the Epley formula and produces a descending load table", () => {
    const result = calculateOneRepMax(100, 5);
    expect(result.oneRepMax).toBeCloseTo(100 * (1 + 5 / 30), 5);
    expect(result.trainingLoads[0].weight).toBeGreaterThan(result.trainingLoads[1].weight);
  });
});

describe("calculateRunningCalories", () => {
  it("burns more calories at a faster pace for the same duration", () => {
    const jog = calculateRunningCalories(70, "jog", 30);
    const fast = calculateRunningCalories(70, "fast", 30);
    expect(fast).toBeGreaterThan(jog);
  });
});

describe("calculateCyclingCalories", () => {
  it("burns more calories at higher intensity", () => {
    const leisure = calculateCyclingCalories(70, "leisure", 30);
    const racing = calculateCyclingCalories(70, "racing", 30);
    expect(racing).toBeGreaterThan(leisure);
  });
});

describe("calculateFiberTarget", () => {
  it("returns higher targets for younger adults than older adults", () => {
    expect(calculateFiberTarget("male", 30)).toBeGreaterThan(calculateFiberTarget("male", 60));
    expect(calculateFiberTarget("female", 30)).toBeGreaterThan(calculateFiberTarget("female", 60));
  });
});

describe("calculateSugarLimit", () => {
  it("gives a higher limit for men than women per AHA guidance", () => {
    const male = calculateSugarLimit("male");
    const female = calculateSugarLimit("female");
    expect(male.gramsPerDay).toBeGreaterThan(female.gramsPerDay);
    expect(male.teaspoonsPerDay).toBeCloseTo(male.gramsPerDay / 4, 5);
  });
});

describe("calculateAlcoholCalories", () => {
  it("scales linearly with quantity", () => {
    expect(calculateAlcoholCalories("beer", 2)).toBe(300);
    expect(calculateAlcoholCalories("wine", 1)).toBe(125);
  });
});

describe("calculateAnionGap", () => {
  it("categorizes normal, low and high anion gap correctly", () => {
    expect(calculateAnionGap(140, 104, 24).category).toBe("Normal");
    expect(calculateAnionGap(140, 110, 28).category).toBe("Low");
    expect(calculateAnionGap(140, 95, 20).category).toBe("High");
  });
});

describe("calculateBloodVolume", () => {
  it("uses different ml/kg factors for men and women", () => {
    const male = calculateBloodVolume(70, "male");
    const female = calculateBloodVolume(70, "female");
    expect(male).toBeGreaterThan(female);
    expect(male).toBeCloseTo(5.25, 5);
  });
});
