"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateMortgageAffordability } from "@/lib/finance-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber, StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  annualIncome: z.number({ message: "Enter annual income" }).min(1, "Too low").max(100000000, "Too high"),
  monthlyDebts: z.number({ message: "Enter monthly debts" }).min(0, "Too low").max(1000000, "Too high"),
  downPayment: z.number({ message: "Enter down payment" }).min(0, "Too low").max(100000000, "Too high"),
  annualRate: z.number({ message: "Enter interest rate" }).min(0, "Too low").max(30, "Too high"),
  termYears: z.number({ message: "Enter loan term" }).min(1, "Too low").max(40, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function MortgageAffordabilityForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { annualIncome: 70000, monthlyDebts: 300, downPayment: 30000, annualRate: 5, termYears: 30 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const result = valid
    ? calculateMortgageAffordability(values.annualIncome, values.monthlyDebts, values.downPayment, values.annualRate, values.termYears)
    : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Annual gross income" unit="$" register={register} name="annualIncome" error={errors.annualIncome?.message} />
          <NumberField label="Existing monthly debts" unit="$" register={register} name="monthlyDebts" error={errors.monthlyDebts?.message} />
          <NumberField label="Down payment" unit="$" register={register} name="downPayment" error={errors.downPayment?.message} />
          <NumberField label="Mortgage interest rate" unit="%" register={register} name="annualRate" error={errors.annualRate?.message} />
          <NumberField label="Loan term" unit="years" register={register} name="termYears" error={errors.termYears?.message} />
        </form>
      </Card>

      <Card className="p-6">
        {result ? (
          <>
            <ResultBigNumber value={`$${formatResult(result.maxHomePrice, 0)}`} label="Maximum affordable home price" />
            <div className="mt-6">
              <StatRow label="Max monthly mortgage payment" value={`$${formatResult(result.maxMonthlyPayment, 0)}`} />
              <StatRow label="Max loan amount" value={`$${formatResult(result.maxLoanAmount, 0)}`} />
            </div>
            <p className="mt-4 text-xs text-foreground/45">
              Based on the 28/36 rule: housing costs capped at 28% of gross income, total debt
              capped at 36%.
            </p>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter your details to estimate affordability.</p>
        )}
      </Card>
    </div>
  );
}
