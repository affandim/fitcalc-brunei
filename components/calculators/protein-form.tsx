"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateProtein, proteinGoalLabels, type ProteinGoal } from "@/lib/formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber, StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  weightKg: z.number({ message: "Enter weight" }).min(30, "Too low").max(300, "Too high"),
});

type FormValues = z.infer<typeof schema>;

const goals: ProteinGoal[] = ["sedentary", "moderate", "active", "athlete"];

export function ProteinForm() {
  const [goal, setGoal] = React.useState<ProteinGoal>("active");
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
  const protein = valid ? calculateProtein(values.weightKg, goal) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Weight" unit="kg" register={register} name="weightKg" error={errors.weightKg?.message} />
          <label className="block">
            <span className="text-sm font-medium text-foreground/80">Goal</span>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as ProteinGoal)}
              className="mt-1.5 h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none focus:border-emerald"
            >
              {goals.map((g) => (
                <option key={g} value={g}>
                  {proteinGoalLabels[g]}
                </option>
              ))}
            </select>
          </label>
        </form>
      </Card>

      <Card className="p-6">
        {protein !== null ? (
          <>
            <ResultBigNumber value={formatResult(protein, 0)} unit="g/day" label="Daily protein target" />
            <div className="mt-6">
              <StatRow label="Per kg bodyweight" value={`${(protein / values.weightKg).toFixed(1)} g/kg`} />
              <StatRow label="Across 4 meals" value={`${formatResult(protein / 4, 0)} g/meal`} />
            </div>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter your weight to see your protein target.</p>
        )}
      </Card>
    </div>
  );
}
