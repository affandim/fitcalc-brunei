import { describe, it, expect } from "vitest";
import {
  calculateDueDate,
  calculatePregnancyWeightGain,
  predictAdultHeight,
  calculateChildCalories,
  categorizeBloodPressure,
  calculatePulsePressure,
  calculateGpa,
  calculateStudyPlan,
  calculateTestScore,
  calculateConceptionDate,
  calculateOvulation,
  calculatePregnancyCalories,
  calculateChildBmi,
  calculateHeightVelocity,
  calculateSleepNeeds,
  calculateWeightedGrade,
  calculateAttendance,
} from "@/lib/life-formulas";

describe("calculateDueDate", () => {
  it("adds 280 days to the last period date", () => {
    const lmp = new Date("2026-01-01");
    const result = calculateDueDate(lmp, lmp);
    const expectedDue = new Date("2026-01-01");
    expectedDue.setDate(expectedDue.getDate() + 280);
    expect(result.dueDate.toDateString()).toBe(expectedDue.toDateString());
    expect(result.currentWeek).toBe(0);
  });

  it("computes the correct trimester from current week", () => {
    const lmp = new Date("2026-01-01");
    const today = new Date(lmp);
    today.setDate(today.getDate() + 7 * 20); // week 20
    const result = calculateDueDate(lmp, today);
    expect(result.trimester).toBe(2);
  });
});

describe("calculatePregnancyWeightGain", () => {
  it("returns the correct IOM range per BMI category", () => {
    expect(calculatePregnancyWeightGain(17).category).toBe("Underweight");
    expect(calculatePregnancyWeightGain(22).category).toBe("Normal weight");
    expect(calculatePregnancyWeightGain(27).category).toBe("Overweight");
    expect(calculatePregnancyWeightGain(32).category).toBe("Obese");
  });
});

describe("predictAdultHeight", () => {
  it("applies the mid-parental height formula for boys and girls", () => {
    const boy = predictAdultHeight(178, 165, "boy");
    const girl = predictAdultHeight(178, 165, "girl");
    expect(boy).toBeCloseTo((178 + 165 + 13) / 2, 5);
    expect(girl).toBeCloseTo((178 + 165 - 13) / 2, 5);
    expect(boy).toBeGreaterThan(girl);
  });
});

describe("calculateChildCalories", () => {
  it("increases with activity level", () => {
    const sedentary = calculateChildCalories(10, "boy", "sedentary");
    const active = calculateChildCalories(10, "boy", "active");
    expect(active).toBeGreaterThan(sedentary);
  });
});

describe("categorizeBloodPressure", () => {
  it("categorizes across the AHA bands correctly", () => {
    expect(categorizeBloodPressure(110, 70)).toBe("Normal");
    expect(categorizeBloodPressure(125, 75)).toBe("Elevated");
    expect(categorizeBloodPressure(135, 85)).toBe("Hypertension Stage 1");
    expect(categorizeBloodPressure(145, 95)).toBe("Hypertension Stage 2");
    expect(categorizeBloodPressure(185, 100)).toBe("Hypertensive Crisis");
  });
});

describe("calculatePulsePressure", () => {
  it("computes pulse pressure and MAP correctly", () => {
    const result = calculatePulsePressure(120, 80);
    expect(result.pulsePressure).toBe(40);
    expect(result.meanArterialPressure).toBeCloseTo(80 + 40 / 3, 5);
  });
});

describe("calculateGpa", () => {
  it("computes a credit-weighted GPA", () => {
    const gpa = calculateGpa([
      { grade: 4.0, creditHours: 3 },
      { grade: 3.0, creditHours: 3 },
    ]);
    expect(gpa).toBeCloseTo(3.5, 5);
  });

  it("returns 0 for an empty course list", () => {
    expect(calculateGpa([])).toBe(0);
  });
});

describe("calculateStudyPlan", () => {
  it("splits hours evenly across remaining days", () => {
    const result = calculateStudyPlan(20, 4);
    expect(result.hoursPerDay).toBeCloseTo(5, 5);
    expect(result.pomodoroSessionsPerDay).toBeGreaterThan(0);
  });
});

describe("calculateTestScore", () => {
  it("computes percentage and letter grade correctly", () => {
    expect(calculateTestScore(45, 50)).toEqual({ percentage: 90, letterGrade: "A" });
    expect(calculateTestScore(33, 50).letterGrade).toBe("D");
    expect(calculateTestScore(10, 50).letterGrade).toBe("F");
  });

  it("handles zero total questions without dividing by zero", () => {
    expect(calculateTestScore(0, 0).percentage).toBe(0);
  });
});

describe("calculateConceptionDate", () => {
  it("subtracts 266 days from the due date", () => {
    const due = new Date("2026-10-08");
    const conception = calculateConceptionDate(due);
    const expected = new Date("2026-10-08");
    expected.setDate(expected.getDate() - 266);
    expect(conception.toDateString()).toBe(expected.toDateString());
  });
});

describe("calculateOvulation", () => {
  it("estimates ovulation 14 days before the next period", () => {
    const lmp = new Date("2026-01-01");
    const result = calculateOvulation(lmp, 28);
    const expectedOvulation = new Date("2026-01-01");
    expectedOvulation.setDate(expectedOvulation.getDate() + 14);
    expect(result.ovulationDate.toDateString()).toBe(expectedOvulation.toDateString());
    expect(result.fertileWindowStart.getTime()).toBeLessThan(result.ovulationDate.getTime());
    expect(result.fertileWindowEnd.getTime()).toBeGreaterThan(result.ovulationDate.getTime());
  });
});

describe("calculatePregnancyCalories", () => {
  it("adds the correct bonus per trimester", () => {
    expect(calculatePregnancyCalories(2000, 1)).toBe(2000);
    expect(calculatePregnancyCalories(2000, 2)).toBe(2340);
    expect(calculatePregnancyCalories(2000, 3)).toBe(2450);
  });
});

describe("calculateChildBmi", () => {
  it("categorizes a child's BMI across the simplified bands", () => {
    expect(calculateChildBmi(110, 16).category).toBe("Underweight");
    expect(calculateChildBmi(110, 20).category).toBe("Healthy weight");
    expect(calculateChildBmi(110, 27).category).toBe("Obese");
  });
});

describe("calculateHeightVelocity", () => {
  it("computes growth rate in cm/year", () => {
    const rate = calculateHeightVelocity(100, 106, 12);
    expect(rate).toBeCloseTo(6, 5);
  });
});

describe("calculateSleepNeeds", () => {
  it("returns appropriate ranges across age bands", () => {
    expect(calculateSleepNeeds(0.5).label).toBe("Infant");
    expect(calculateSleepNeeds(10).label).toBe("School-age child");
    expect(calculateSleepNeeds(30).label).toBe("Adult");
    expect(calculateSleepNeeds(70).label).toBe("Older adult");
  });
});

describe("calculateWeightedGrade", () => {
  it("computes a weight-adjusted average", () => {
    const result = calculateWeightedGrade([
      { scorePercent: 90, weightPercent: 60 },
      { scorePercent: 70, weightPercent: 40 },
    ]);
    expect(result).toBeCloseTo(82, 5);
  });

  it("returns 0 when total weight is zero", () => {
    expect(calculateWeightedGrade([])).toBe(0);
  });
});

describe("calculateAttendance", () => {
  it("flags whether the attendance requirement is met", () => {
    expect(calculateAttendance(80, 100, 75).meetsRequirement).toBe(true);
    expect(calculateAttendance(70, 100, 75).meetsRequirement).toBe(false);
  });
});
