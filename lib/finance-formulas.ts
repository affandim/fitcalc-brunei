/**
 * Calckoo — Finance Calculation Engine
 * Pure functions, same pattern as lib/formulas.ts. Kept in a separate file
 * since finance math is a distinct domain from health math.
 */

/* ----------------------------- Loan / EMI ----------------------------- */

export interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

/**
 * Standard amortizing loan payment (EMI).
 * principal in currency units, annualRatePercent e.g. 5.5, termYears in years.
 */
export function calculateLoanPayment(
  principal: number,
  annualRatePercent: number,
  termYears: number
): LoanResult {
  const monthlyRate = annualRatePercent / 100 / 12;
  const numPayments = termYears * 12;

  if (monthlyRate === 0) {
    const monthlyPayment = principal / numPayments;
    return { monthlyPayment, totalPayment: principal, totalInterest: 0 };
  }

  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  const totalPayment = monthlyPayment * numPayments;
  const totalInterest = totalPayment - principal;

  return { monthlyPayment, totalPayment, totalInterest };
}

/* ------------------------- Compound Interest ------------------------- */

export interface CompoundInterestResult {
  futureValue: number;
  totalContributions: number;
  totalInterestEarned: number;
}

/**
 * Compound interest with optional regular monthly contributions.
 * principal & monthlyContribution in currency units, annualRatePercent e.g. 6,
 * years as the investment horizon, compoundsPerYear (12 = monthly compounding).
 */
export function calculateCompoundInterest(
  principal: number,
  monthlyContribution: number,
  annualRatePercent: number,
  years: number,
  compoundsPerYear = 12
): CompoundInterestResult {
  const ratePerPeriod = annualRatePercent / 100 / compoundsPerYear;
  const totalPeriods = years * compoundsPerYear;

  const principalFv = principal * Math.pow(1 + ratePerPeriod, totalPeriods);

  const contributionFv =
    ratePerPeriod === 0
      ? monthlyContribution * totalPeriods
      : monthlyContribution * ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod);

  const futureValue = principalFv + contributionFv;
  const totalContributions = principal + monthlyContribution * totalPeriods;
  const totalInterestEarned = futureValue - totalContributions;

  return { futureValue, totalContributions, totalInterestEarned };
}

/* -------------------------- Simple Interest -------------------------- */

export interface SimpleInterestResult {
  interest: number;
  totalAmount: number;
}

export function calculateSimpleInterest(
  principal: number,
  annualRatePercent: number,
  years: number
): SimpleInterestResult {
  const interest = principal * (annualRatePercent / 100) * years;
  return { interest, totalAmount: principal + interest };
}

/* ---------------------------- Savings Goal ---------------------------- */

export interface SavingsGoalResult {
  monthlyContributionNeeded: number;
  totalContributions: number;
  totalInterestEarned: number;
}

/**
 * Solves for the monthly contribution required to reach a target future
 * value, given a starting amount, annual rate, and time horizon.
 */
export function calculateSavingsGoal(
  targetAmount: number,
  currentSavings: number,
  annualRatePercent: number,
  years: number
): SavingsGoalResult {
  const monthlyRate = annualRatePercent / 100 / 12;
  const totalMonths = years * 12;

  const currentSavingsFv = currentSavings * Math.pow(1 + monthlyRate, totalMonths);
  const remainingTarget = Math.max(0, targetAmount - currentSavingsFv);

  const monthlyContributionNeeded =
    monthlyRate === 0
      ? remainingTarget / totalMonths
      : remainingTarget / ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);

  const totalContributions = currentSavings + monthlyContributionNeeded * totalMonths;
  const totalInterestEarned = targetAmount - totalContributions;

  return {
    monthlyContributionNeeded: Math.max(0, monthlyContributionNeeded),
    totalContributions,
    totalInterestEarned: Math.max(0, totalInterestEarned),
  };
}

/* -------------------------- Investment Return -------------------------- */

export interface InvestmentReturnResult {
  totalReturnPercent: number;
  annualizedReturnPercent: number;
  profit: number;
}

/** CAGR-based investment return from an initial and final value over a holding period. */
export function calculateInvestmentReturn(
  initialValue: number,
  finalValue: number,
  years: number
): InvestmentReturnResult {
  const profit = finalValue - initialValue;
  const totalReturnPercent = (profit / initialValue) * 100;
  const annualizedReturnPercent = (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;

  return { totalReturnPercent, annualizedReturnPercent, profit };
}

/* -------------------------------- Tip -------------------------------- */

export interface TipResult {
  tipAmount: number;
  totalAmount: number;
  perPerson: number;
}

export function calculateTip(billAmount: number, tipPercent: number, numPeople: number): TipResult {
  const tipAmount = billAmount * (tipPercent / 100);
  const totalAmount = billAmount + tipAmount;
  const people = Math.max(1, numPeople);
  return { tipAmount, totalAmount, perPerson: totalAmount / people };
}

/* ------------------------------ Discount ------------------------------ */

export interface DiscountResult {
  finalPrice: number;
  savings: number;
}

export function calculateDiscount(originalPrice: number, discountPercent: number): DiscountResult {
  const savings = originalPrice * (discountPercent / 100);
  return { finalPrice: originalPrice - savings, savings };
}

/* ------------------------------ Net Worth ------------------------------ */

export function calculateNetWorth(totalAssets: number, totalLiabilities: number): number {
  return totalAssets - totalLiabilities;
}

/* ------------------------ Mortgage Affordability ------------------------ */

export interface MortgageAffordabilityResult {
  maxMonthlyPayment: number;
  maxLoanAmount: number;
  maxHomePrice: number;
}

/**
 * 28/36 rule: housing payment capped at 28% of gross monthly income, and
 * total debt (including housing) capped at 36% of gross monthly income.
 * Reverses the standard amortization formula to find the max loan amount
 * that fits within that monthly payment.
 */
export function calculateMortgageAffordability(
  annualIncome: number,
  monthlyDebts: number,
  downPayment: number,
  annualRatePercent: number,
  termYears: number
): MortgageAffordabilityResult {
  const grossMonthlyIncome = annualIncome / 12;
  const frontEndCap = grossMonthlyIncome * 0.28;
  const backEndCap = grossMonthlyIncome * 0.36 - monthlyDebts;
  const maxMonthlyPayment = Math.max(0, Math.min(frontEndCap, backEndCap));

  const monthlyRate = annualRatePercent / 100 / 12;
  const numPayments = termYears * 12;

  const maxLoanAmount =
    monthlyRate === 0
      ? maxMonthlyPayment * numPayments
      : (maxMonthlyPayment * (1 - Math.pow(1 + monthlyRate, -numPayments))) / monthlyRate;

  return {
    maxMonthlyPayment,
    maxLoanAmount,
    maxHomePrice: maxLoanAmount + downPayment,
  };
}
