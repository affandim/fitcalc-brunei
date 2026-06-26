import { describe, it, expect } from "vitest";
import {
  calculateLoanPayment,
  calculateCompoundInterest,
  calculateSimpleInterest,
  calculateSavingsGoal,
  calculateInvestmentReturn,
  calculateTip,
  calculateDiscount,
  calculateNetWorth,
  calculateMortgageAffordability,
} from "@/lib/finance-formulas";

describe("calculateLoanPayment", () => {
  it("computes a sensible monthly payment for a typical loan", () => {
    const result = calculateLoanPayment(100000, 5, 30);
    expect(result.monthlyPayment).toBeCloseTo(536.82, 1);
    expect(result.totalInterest).toBeGreaterThan(0);
  });

  it("handles a zero interest rate as a simple division", () => {
    const result = calculateLoanPayment(12000, 0, 1);
    expect(result.monthlyPayment).toBeCloseTo(1000, 5);
    expect(result.totalInterest).toBeCloseTo(0, 5);
  });
});

describe("calculateCompoundInterest", () => {
  it("grows a lump sum with no contributions", () => {
    const result = calculateCompoundInterest(1000, 0, 10, 1, 1);
    expect(result.futureValue).toBeCloseTo(1100, 2);
  });

  it("includes contribution growth when monthly contributions are added", () => {
    const noContrib = calculateCompoundInterest(1000, 0, 6, 10);
    const withContrib = calculateCompoundInterest(1000, 100, 6, 10);
    expect(withContrib.futureValue).toBeGreaterThan(noContrib.futureValue);
  });
});

describe("calculateSimpleInterest", () => {
  it("matches the basic simple interest formula", () => {
    const result = calculateSimpleInterest(1000, 5, 3);
    expect(result.interest).toBeCloseTo(150, 5);
    expect(result.totalAmount).toBeCloseTo(1150, 5);
  });
});

describe("calculateSavingsGoal", () => {
  it("requires zero contribution if current savings already meets the goal", () => {
    const result = calculateSavingsGoal(1000, 5000, 5, 5);
    expect(result.monthlyContributionNeeded).toBe(0);
  });

  it("requires a positive monthly contribution for an unmet goal", () => {
    const result = calculateSavingsGoal(50000, 1000, 5, 10);
    expect(result.monthlyContributionNeeded).toBeGreaterThan(0);
  });
});

describe("calculateInvestmentReturn", () => {
  it("computes total and annualized return correctly", () => {
    const result = calculateInvestmentReturn(10000, 16000, 5);
    expect(result.totalReturnPercent).toBeCloseTo(60, 2);
    expect(result.annualizedReturnPercent).toBeGreaterThan(0);
    expect(result.profit).toBeCloseTo(6000, 5);
  });
});

describe("calculateTip", () => {
  it("splits the total bill including tip across people", () => {
    const result = calculateTip(100, 20, 4);
    expect(result.tipAmount).toBeCloseTo(20, 5);
    expect(result.totalAmount).toBeCloseTo(120, 5);
    expect(result.perPerson).toBeCloseTo(30, 5);
  });
});

describe("calculateDiscount", () => {
  it("computes savings and final price correctly", () => {
    const result = calculateDiscount(200, 25);
    expect(result.savings).toBeCloseTo(50, 5);
    expect(result.finalPrice).toBeCloseTo(150, 5);
  });
});

describe("calculateNetWorth", () => {
  it("subtracts liabilities from assets", () => {
    expect(calculateNetWorth(50000, 20000)).toBe(30000);
    expect(calculateNetWorth(10000, 25000)).toBe(-15000);
  });
});

describe("calculateMortgageAffordability", () => {
  it("caps the monthly payment at the lower of the front-end and back-end limits", () => {
    const result = calculateMortgageAffordability(60000, 500, 20000, 5, 30);
    expect(result.maxMonthlyPayment).toBeGreaterThan(0);
    expect(result.maxLoanAmount).toBeGreaterThan(0);
    expect(result.maxHomePrice).toBeCloseTo(result.maxLoanAmount + 20000, 5);
  });

  it("reduces affordability as existing monthly debts increase", () => {
    const lowDebt = calculateMortgageAffordability(60000, 100, 20000, 5, 30);
    const highDebt = calculateMortgageAffordability(60000, 1500, 20000, 5, 30);
    expect(highDebt.maxMonthlyPayment).toBeLessThan(lowDebt.maxMonthlyPayment);
  });
});
