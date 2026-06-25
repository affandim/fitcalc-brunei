"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateTargetHeartRate } from "@/lib/formulas";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  ageYears: z.number({ message: "Enter age" }).min(10, "Too young").max(100, "Too high"),
  restingHr: z.number({ message: "Enter resting heart rate" }).min(30, "Too low").max(120, "Too high"),
});

type FormValues = z.infer<typeof schema>;

const intensityPresets = [
  { label: "Light (50-60%)", low: 0.5, high: 0.6 },
  { label: "Moderate (60-70%)", low: 0.6, high: 0.7 },
  { label: "Vigorous (70-85%)", low: 0.7, high: 0.85 },
];

export function TargetHeartRateForm() {
  const [preset, setPreset] = React.useState(1);
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { ageYears: 30, restingHr: 65 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const { low, high } = intensityPresets[preset];
  const result = valid ? calculateTargetHeartRate(values.ageYears, values.restingHr, low, high) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Age" unit="years" register={register} name="ageYears" error={errors.ageYears?.message} />
          <NumberField label="Resting heart rate" unit="bpm" register={register} name="restingHr" error={errors.restingHr?.message} />
          <label className="block">
            <span className="text-sm font-medium text-foreground/80">Intensity</span>
            <select
              value={preset}
              onChange={(e) => setPreset(Number(e.target.value))}
              className="mt-1.5 h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none focus:border-emerald"
            >
              {intensityPresets.map((p, i) => (
                <option key={p.label} value={i}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
          <p className="text-xs text-foreground/45">
            Resting heart rate is best measured first thing in the morning, before getting out of
            bed.
          </p>
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        {result ? (
          <ResultBigNumber value={`${result.low}–${result.high}`} unit="bpm" label="Target heart rate range" />
        ) : (
          <p className="text-sm text-foreground/50">Enter your details to calculate your target zone.</p>
        )}
      </Card>
    </div>
  );
}
