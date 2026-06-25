"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateSimpleInterest } from "@/lib/finance-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber, StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  principal: z.number({ message: "Enter principal" }).min(0, "Too low").max(10000000, "Too high"),
  annualRate: z.number({ message: "Enter interest rate" }).min(0, "Too low").max(50, "Too high"),
  years: z.number({ message: "Enter duration" }).min(0.1, "Too low").max(60, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function SimpleInterestForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { principal: 5000, annualRate: 4, years: 3 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const result = valid ? calculateSimpleInterest(values.principal, values.annualRate, values.years) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Principal amount" unit="$" register={register} name="principal" error={errors.principal?.message} />
          <NumberField label="Annual interest rate" unit="%" register={register} name="annualRate" error={errors.annualRate?.message} />
          <NumberField label="Duration" unit="years" register={register} name="years" error={errors.years?.message} />
        </form>
      </Card>

      <Card className="p-6">
        {result ? (
          <>
            <ResultBigNumber value={`$${formatResult(result.totalAmount, 2)}`} label="Total amount" />
            <div className="mt-6">
              <StatRow label="Principal" value={`$${formatResult(values.principal, 2)}`} />
              <StatRow label="Interest earned" value={`$${formatResult(result.interest, 2)}`} />
              <StatRow label="Total amount" value={`$${formatResult(result.totalAmount, 2)}`} />
            </div>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter principal, rate and duration to calculate interest.</p>
        )}
      </Card>
    </div>
  );
}
