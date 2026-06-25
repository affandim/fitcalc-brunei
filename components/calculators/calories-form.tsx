"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import {
  calculateCalories,
  activityLabels,
  type Gender,
  type ActivityLevel,
  type CalorieGoal,
} from "@/lib/formulas";
import { formatResult } from "@/lib/utils";
import { NumberField, SegmentedControl } from "@/components/calculators/form-fields";
import { ResultBigNumber, StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  ageYears: z.number({ message: "Enter age" }).min(15, "Too young").max(100, "Too high"),
  heightCm: z.number({ message: "Enter height" }).min(120, "Too low").max(230, "Too high"),
  weightKg: z.number({ message: "Enter weight" }).min(30, "Too low").max(300, "Too high"),
});

type FormValues = z.infer<typeof schema>;

const activities: ActivityLevel[] = ["sedentary", "light", "moderate", "active", "very_active"];
const macroColors = ["#10b981", "#14b8a6", "#f59e0b"];

export function CaloriesForm() {
  const [gender, setGender] = React.useState<Gender>("male");
  const [activity, setActivity] = React.useState<ActivityLevel>("moderate");
  const [goal, setGoal] = React.useState<CalorieGoal>("maintain");

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
  const result = valid ? calculateCalories({ gender, ...values }, activity, goal) : null;

  const chartData = result
    ? [
        { name: "Protein", grams: Math.round(result.macros.proteinG) },
        { name: "Carbs", grams: Math.round(result.macros.carbsG) },
        { name: "Fat", grams: Math.round(result.macros.fatG) },
      ]
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
        <div className="mt-4">
          <SegmentedControl
            label="Goal"
            value={goal}
            onChange={setGoal}
            options={[
              { value: "lose", label: "Lose" },
              { value: "maintain", label: "Maintain" },
              { value: "gain", label: "Gain" },
            ]}
          />
        </div>

        <form className="mt-5 space-y-4">
          <NumberField label="Age" unit="years" register={register} name="ageYears" error={errors.ageYears?.message} />
          <NumberField label="Height" unit="cm" register={register} name="heightCm" error={errors.heightCm?.message} />
          <NumberField label="Weight" unit="kg" register={register} name="weightKg" error={errors.weightKg?.message} />

          <label className="block">
            <span className="text-sm font-medium text-foreground/80">Activity level</span>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value as ActivityLevel)}
              className="mt-1.5 h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none focus:border-emerald"
            >
              {activities.map((a) => (
                <option key={a} value={a}>
                  {activityLabels[a]}
                </option>
              ))}
            </select>
          </label>
        </form>
      </Card>

      <Card className="p-6">
        {result ? (
          <>
            <ResultBigNumber
              value={formatResult(result.targetCalories, 0)}
              unit="kcal/day"
              label={`Daily target to ${goal}`}
            />
            <div className="mt-6 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="grams"
                    nameKey="name"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={2}
                  >
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={macroColors[i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v, n) => [`${v} g`, n]} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2">
              <StatRow label="BMR" value={`${formatResult(result.bmr, 0)} kcal`} />
              <StatRow label="TDEE (maintenance)" value={`${formatResult(result.tdee, 0)} kcal`} />
            </div>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter your details to see your calorie target.</p>
        )}
      </Card>
    </div>
  );
}
