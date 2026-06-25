"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { calculateBmr, calculateTdee, activityLabels, type Gender, type ActivityLevel } from "@/lib/formulas";
import { formatResult } from "@/lib/utils";
import { NumberField, SegmentedControl } from "@/components/calculators/form-fields";
import { ResultBigNumber } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  ageYears: z.number({ message: "Enter age" }).min(15, "Too young").max(100, "Too high"),
  heightCm: z.number({ message: "Enter height" }).min(120, "Too low").max(230, "Too high"),
  weightKg: z.number({ message: "Enter weight" }).min(30, "Too low").max(300, "Too high"),
});

type FormValues = z.infer<typeof schema>;

const allActivities: ActivityLevel[] = ["sedentary", "light", "moderate", "active", "very_active"];

export function BmrForm() {
  const [gender, setGender] = React.useState<Gender>("male");

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { ageYears: 28, heightCm: 175, weightKg: 70 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const bmr = valid ? calculateBmr({ gender, ...values }) : null;

  const chartData = bmr
    ? allActivities.map((a) => ({
        name: activityLabels[a].split(" (")[0],
        calories: Math.round(calculateTdee(bmr, a)),
      }))
    : [];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <SegmentedControl
          label="Gender"
          value={gender}
          onChange={setGender}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />
        <form className="mt-5 space-y-4">
          <NumberField label="Age" unit="years" register={register} name="ageYears" error={errors.ageYears?.message} />
          <NumberField label="Height" unit="cm" register={register} name="heightCm" error={errors.heightCm?.message} />
          <NumberField label="Weight" unit="kg" register={register} name="weightKg" error={errors.weightKg?.message} />
        </form>
      </Card>

      <Card className="p-6">
        {bmr ? (
          <>
            <ResultBigNumber value={formatResult(bmr, 0)} unit="kcal/day" label="Basal Metabolic Rate" />
            <p className="mt-4 text-center text-sm text-foreground/55">
              This is what your body burns at complete rest. Your real daily burn (TDEE) is higher
              once activity is added — see the breakdown below.
            </p>
            <div className="mt-6 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(v) => [`${v} kcal`, "TDEE"]}
                    contentStyle={{ fontSize: 12, borderRadius: 8 }}
                  />
                  <Bar dataKey="calories" fill="#10b981" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter your details to calculate your BMR.</p>
        )}
      </Card>
    </div>
  );
}
