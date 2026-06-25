"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  calculateBmr,
  calculateTdee,
  activityLabels,
  type Gender,
  type ActivityLevel,
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

export function TdeeForm() {
  const [gender, setGender] = React.useState<Gender>("male");
  const [activity, setActivity] = React.useState<ActivityLevel>("moderate");

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
  const tdee = bmr ? calculateTdee(bmr, activity) : null;

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
        {tdee ? (
          <>
            <ResultBigNumber value={formatResult(tdee, 0)} unit="kcal/day" label="Total Daily Energy Expenditure" />
            <div className="mt-6">
              <StatRow label="Basal Metabolic Rate" value={`${formatResult(bmr!, 0)} kcal`} />
              <StatRow label="Maintenance (TDEE)" value={`${formatResult(tdee, 0)} kcal`} />
              <StatRow label="Mild weight loss (-15%)" value={`${formatResult(tdee * 0.85, 0)} kcal`} />
              <StatRow label="Mild weight gain (+15%)" value={`${formatResult(tdee * 1.15, 0)} kcal`} />
            </div>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter your details to calculate your TDEE.</p>
        )}
      </Card>
    </div>
  );
}
