"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { calculateCompoundInterest } from "@/lib/finance-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber, StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  principal: z.number({ message: "Enter starting amount" }).min(0, "Too low").max(10000000, "Too high"),
  monthlyContribution: z.number({ message: "Enter monthly contribution" }).min(0, "Too low").max(100000, "Too high"),
  annualRate: z.number({ message: "Enter annual return" }).min(0, "Too low").max(30, "Too high"),
  years: z.number({ message: "Enter time horizon" }).min(1, "Too low").max(60, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function CompoundInterestForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { principal: 5000, monthlyContribution: 200, annualRate: 6, years: 20 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const result = valid
    ? calculateCompoundInterest(values.principal, values.monthlyContribution, values.annualRate, values.years)
    : null;

  const chartData = React.useMemo(() => {
    if (!valid) return [];
    const points = [];
    for (let y = 0; y <= values.years; y++) {
      const r = calculateCompoundInterest(values.principal, values.monthlyContribution, values.annualRate, y);
      points.push({ year: y, value: Math.round(r.futureValue) });
    }
    return points;
  }, [valid, values.principal, values.monthlyContribution, values.annualRate, values.years]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Starting amount" unit="$" register={register} name="principal" error={errors.principal?.message} />
          <NumberField label="Monthly contribution" unit="$" register={register} name="monthlyContribution" error={errors.monthlyContribution?.message} />
          <NumberField label="Annual return" unit="%" register={register} name="annualRate" error={errors.annualRate?.message} />
          <NumberField label="Time horizon" unit="years" register={register} name="years" error={errors.years?.message} />
        </form>
      </Card>

      <Card className="p-6">
        {result ? (
          <>
            <ResultBigNumber value={`$${formatResult(result.futureValue, 0)}`} label="Future value" />
            <div className="mt-6 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} width={50} />
                  <Tooltip formatter={(v) => [`$${v}`, "Value"]} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2">
              <StatRow label="Total contributions" value={`$${formatResult(result.totalContributions, 0)}`} />
              <StatRow label="Interest earned" value={`$${formatResult(result.totalInterestEarned, 0)}`} />
            </div>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter your details to project growth.</p>
        )}
      </Card>
    </div>
  );
}
