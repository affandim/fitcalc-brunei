"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateBmi } from "@/lib/formulas";
import { formatResult } from "@/lib/utils";
import { NumberField, SegmentedControl } from "@/components/calculators/form-fields";
import { ResultBigNumber, RangeBar } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  heightCm: z.number({ message: "Enter your height" }).min(50, "Too low").max(250, "Too high"),
  weightKg: z.number({ message: "Enter your weight" }).min(20, "Too low").max(300, "Too high"),
});

type FormValues = z.infer<typeof schema>;

const segments = [
  { label: "Underweight", from: 10, to: 18.5, color: "#60a5fa" },
  { label: "Normal", from: 18.5, to: 25, color: "#10b981" },
  { label: "Overweight", from: 25, to: 30, color: "#f59e0b" },
  { label: "Obese", from: 30, to: 40, color: "#ef4444" },
];

export function BmiForm() {
  const [unit, setUnit] = React.useState<"metric" | "imperial">("metric");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { heightCm: 170, weightKg: 65 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;

  const heightCm = unit === "imperial" ? values.heightCm * 2.54 : values.heightCm;
  const weightKg = unit === "imperial" ? values.weightKg * 0.453592 : values.weightKg;
  const result = valid ? calculateBmi(heightCm, weightKg) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <SegmentedControl
          label="Units"
          value={unit}
          onChange={setUnit}
          options={[
            { value: "metric", label: "Metric (cm/kg)" },
            { value: "imperial", label: "Imperial (in/lb)" },
          ]}
        />
        <form onSubmit={handleSubmit(() => {})} className="mt-5 space-y-4">
          <NumberField
            label="Height"
            unit={unit === "metric" ? "cm" : "in"}
            register={register}
            name="heightCm"
            error={errors.heightCm?.message}
            placeholder="170"
          />
          <NumberField
            label="Weight"
            unit={unit === "metric" ? "kg" : "lb"}
            register={register}
            name="weightKg"
            error={errors.weightKg?.message}
            placeholder="65"
          />
          <p className="text-xs text-foreground/45">
            Imperial inputs are converted automatically — just type inches and pounds.
          </p>
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        {result ? (
          <>
            <ResultBigNumber value={formatResult(result.bmi)} label={result.category} />
            <div className="mt-6 w-full">
              <RangeBar segments={segments} value={result.bmi} min={10} max={40} />
            </div>
            <p className="mt-6 text-center text-sm text-foreground/55">
              A BMI of <strong className="text-foreground">{formatResult(result.bmi)}</strong>{" "}
              falls in the <strong className="text-foreground">{result.category.toLowerCase()}</strong> range
              for adults, based on WHO classification.
            </p>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter your height and weight to see your BMI.</p>
        )}
      </Card>
    </div>
  );
}
