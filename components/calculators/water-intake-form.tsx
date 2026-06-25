"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateWaterIntake, activityLabels, type ActivityLevel } from "@/lib/formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber, StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  weightKg: z.number({ message: "Enter weight" }).min(30, "Too low").max(300, "Too high"),
});

type FormValues = z.infer<typeof schema>;

const activities: ActivityLevel[] = ["sedentary", "light", "moderate", "active", "very_active"];

export function WaterIntakeForm() {
  const [activity, setActivity] = React.useState<ActivityLevel>("light");
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { weightKg: 70 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const waterMl = valid ? calculateWaterIntake(values.weightKg, activity) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
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
        {waterMl !== null ? (
          <>
            <ResultBigNumber value={formatResult(waterMl / 1000, 1)} unit="L/day" label="Daily water target" />
            <div className="mt-6">
              <StatRow label="In millilitres" value={`${formatResult(waterMl, 0)} ml`} />
              <StatRow label="~250ml glasses" value={`${Math.round(waterMl / 250)} glasses`} />
            </div>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter your weight to see your daily water target.</p>
        )}
      </Card>
    </div>
  );
}
