"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateSavingsGoal } from "@/lib/finance-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber, StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  targetAmount: z.number({ message: "Enter your goal" }).min(1, "Too low").max(50000000, "Too high"),
  currentSavings: z.number({ message: "Enter current savings" }).min(0, "Too low").max(50000000, "Too high"),
  annualRate: z.number({ message: "Enter expected return" }).min(0, "Too low").max(30, "Too high"),
  years: z.number({ message: "Enter time horizon" }).min(0.5, "Too low").max(60, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function SavingsGoalForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { targetAmount: 20000, currentSavings: 2000, annualRate: 4, years: 5 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const result = valid
    ? calculateSavingsGoal(values.targetAmount, values.currentSavings, values.annualRate, values.years)
    : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Savings goal" unit="$" register={register} name="targetAmount" error={errors.targetAmount?.message} />
          <NumberField label="Current savings" unit="$" register={register} name="currentSavings" error={errors.currentSavings?.message} />
          <NumberField label="Expected annual return" unit="%" register={register} name="annualRate" error={errors.annualRate?.message} />
          <NumberField label="Time horizon" unit="years" register={register} name="years" error={errors.years?.message} />
        </form>
      </Card>

      <Card className="p-6">
        {result ? (
          <>
            <ResultBigNumber value={`$${formatResult(result.monthlyContributionNeeded, 2)}`} unit="/mo" label="Monthly contribution needed" />
            <div className="mt-6">
              <StatRow label="Total contributions" value={`$${formatResult(result.totalContributions, 0)}`} />
              <StatRow label="Interest earned" value={`$${formatResult(result.totalInterestEarned, 0)}`} />
            </div>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter your goal to see the required monthly contribution.</p>
        )}
      </Card>
    </div>
  );
}
