"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { calculateLoanPayment } from "@/lib/finance-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber, StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  principal: z.number({ message: "Enter loan amount" }).min(100, "Too low").max(10000000, "Too high"),
  annualRate: z.number({ message: "Enter interest rate" }).min(0, "Too low").max(30, "Too high"),
  termYears: z.number({ message: "Enter loan term" }).min(1, "Too low").max(40, "Too high"),
});

type FormValues = z.infer<typeof schema>;

const colors = ["#10b981", "#f59e0b"];

export function LoanEmiForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { principal: 50000, annualRate: 5, termYears: 5 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const result = valid ? calculateLoanPayment(values.principal, values.annualRate, values.termYears) : null;

  const chartData = result
    ? [
        { name: "Principal", value: Math.round(values.principal) },
        { name: "Interest", value: Math.round(result.totalInterest) },
      ]
    : [];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Loan amount" unit="$" register={register} name="principal" error={errors.principal?.message} />
          <NumberField label="Annual interest rate" unit="%" register={register} name="annualRate" error={errors.annualRate?.message} />
          <NumberField label="Loan term" unit="years" register={register} name="termYears" error={errors.termYears?.message} />
        </form>
      </Card>

      <Card className="p-6">
        {result ? (
          <>
            <ResultBigNumber value={formatResult(result.monthlyPayment, 2)} unit="/mo" label="Monthly payment" />
            <div className="mt-6 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={70} paddingAngle={2}>
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={colors[i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v, n) => [`$${v}`, n]} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2">
              <StatRow label="Total of all payments" value={`$${formatResult(result.totalPayment, 0)}`} />
              <StatRow label="Total interest paid" value={`$${formatResult(result.totalInterest, 0)}`} />
            </div>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter loan details to see your monthly payment.</p>
        )}
      </Card>
    </div>
  );
}
