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
