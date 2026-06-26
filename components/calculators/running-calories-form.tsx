"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateRunningCalories, runningPaceLabels, type RunningPace } from "@/lib/more-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  weightKg: z.number({ message: "Enter weight" }).min(30, "Too low").max(300, "Too high"),
  durationMinutes: z.number({ message: "Enter duration" }).min(1, "Too low").max(600, "Too high"),
});

type FormValues = z.infer<typeof schema>;

const paces: RunningPace[] = ["jog", "moderate", "fast", "very_fast"];

export function RunningCaloriesForm() {
  const [pace, setPace] = React.useState<RunningPace>("moderate");
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { weightKg: 70, durationMinutes: 30 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const calories = valid ? calculateRunningCalories(values.weightKg, pace, values.durationMinutes) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Weight" unit="kg" register={register} name="weightKg" error={errors.weightKg?.message} />
          <NumberField label="Duration" unit="minutes" register={register} name="durationMinutes" error={errors.durationMinutes?.message} />
          <label className="block">
            <span className="text-sm font-medium text-foreground/80">Running pace</span>
            <select
              value={pace}
              onChange={(e) => setPace(e.target.value as RunningPace)}
              className="mt-1.5 h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none focus:border-emerald"
            >
              {paces.map((p) => (
                <option key={p} value={p}>
                  {runningPaceLabels[p]}
                </option>
              ))}
            </select>
          </label>
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        {calories !== null ? (
          <ResultBigNumber value={formatResult(calories, 0)} unit="kcal" label="Calories burned" />
        ) : (
          <p className="text-sm text-foreground/50">Enter your details to estimate calories burned.</p>
        )}
      </Card>
    </div>
  );
}
