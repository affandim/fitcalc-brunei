"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateInvestmentReturn } from "@/lib/finance-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber, StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  initialValue: z.number({ message: "Enter initial value" }).min(1, "Too low").max(50000000, "Too high"),
  finalValue: z.number({ message: "Enter final value" }).min(0, "Too low").max(50000000, "Too high"),
  years: z.number({ message: "Enter holding period" }).min(0.1, "Too low").max(60, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function InvestmentReturnForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { initialValue: 10000, finalValue: 15000, years: 4 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const result = valid ? calculateInvestmentReturn(values.initialValue, values.finalValue, values.years) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Initial investment" unit="$" register={register} name="initialValue" error={errors.initialValue?.message} />
          <NumberField label="Final value" unit="$" register={register} name="finalValue" error={errors.finalValue?.message} />
          <NumberField label="Holding period" unit="years" register={register} name="years" error={errors.years?.message} />
        </form>
      </Card>

      <Card className="p-6">
        {result ? (
          <>
            <ResultBigNumber value={`${formatResult(result.annualizedReturnPercent, 1)}%`} label="Annualized return (CAGR)" />
            <div className="mt-6">
              <StatRow label="Total return" value={`${formatResult(result.totalReturnPercent, 1)}%`} />
              <StatRow label="Profit" value={`$${formatResult(result.profit, 0)}`} />
            </div>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter your investment details to calculate returns.</p>
        )}
      </Card>
    </div>
  );
}
