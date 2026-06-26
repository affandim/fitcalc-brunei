"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { categorizeBloodPressure } from "@/lib/life-formulas";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber, RangeBar } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  systolic: z.number({ message: "Enter systolic" }).min(60, "Too low").max(250, "Too high"),
  diastolic: z.number({ message: "Enter diastolic" }).min(40, "Too low").max(150, "Too high"),
});

type FormValues = z.infer<typeof schema>;

const segments = [
  { label: "Normal", from: 90, to: 120, color: "#10b981" },
  { label: "Elevated", from: 120, to: 130, color: "#6ee7b7" },
  { label: "Stage 1", from: 130, to: 140, color: "#f59e0b" },
  { label: "Stage 2", from: 140, to: 180, color: "#ef4444" },
  { label: "Crisis", from: 180, to: 200, color: "#991b1b" },
];

export function BloodPressureForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { systolic: 120, diastolic: 80 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const category = valid ? categorizeBloodPressure(values.systolic, values.diastolic) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Systolic (top number)" unit="mmHg" register={register} name="systolic" error={errors.systolic?.message} />
          <NumberField label="Diastolic (bottom number)" unit="mmHg" register={register} name="diastolic" error={errors.diastolic?.message} />
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        {category ? (
          <>
            <ResultBigNumber value={`${values.systolic}/${values.diastolic}`} label={category} />
            <div className="mt-6 w-full">
              <RangeBar segments={segments} value={values.systolic} min={90} max={200} />
            </div>
            <p className="mt-6 text-center text-sm text-foreground/55">
              This is a single reading. Blood pressure category is normally confirmed across
              multiple readings on different days.
            </p>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter your reading to see your category.</p>
        )}
      </Card>
    </div>
  );
}
