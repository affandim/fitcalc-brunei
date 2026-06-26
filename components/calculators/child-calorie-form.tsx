"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateChildCalories, type ChildGender, type ChildActivityLevel } from "@/lib/life-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField, SegmentedControl } from "@/components/calculators/form-fields";
import { ResultBigNumber } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  ageYears: z.number({ message: "Enter age" }).min(3, "Must be 3 or older").max(18, "Must be 18 or younger"),
});

type FormValues = z.infer<typeof schema>;

const activities: ChildActivityLevel[] = ["sedentary", "moderate", "active"];
const activityLabels: Record<ChildActivityLevel, string> = {
  sedentary: "Sedentary (little play/sport)",
  moderate: "Moderately active",
  active: "Very active (sports most days)",
};

export function ChildCalorieForm() {
  const [gender, setGender] = React.useState<ChildGender>("boy");
  const [activity, setActivity] = React.useState<ChildActivityLevel>("moderate");

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { ageYears: 10 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const calories = valid ? calculateChildCalories(values.ageYears, gender, activity) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <SegmentedControl
          label="Gender"
          value={gender}
          onChange={setGender}
          options={[
            { value: "boy", label: "Boy" },
            { value: "girl", label: "Girl" },
          ]}
        />
        <form className="mt-5 space-y-4">
          <NumberField label="Age" unit="years" register={register} name="ageYears" error={errors.ageYears?.message} />
          <label className="block">
            <span className="text-sm font-medium text-foreground/80">Activity level</span>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value as ChildActivityLevel)}
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

      <Card className="flex flex-col items-center justify-center p-6">
        {calories !== null ? (
          <ResultBigNumber value={formatResult(calories, 0)} unit="kcal/day" label="Estimated daily calorie needs" />
        ) : (
          <p className="text-sm text-foreground/50">Enter age (3-18) to estimate daily calorie needs.</p>
        )}
      </Card>
    </div>
  );
}
