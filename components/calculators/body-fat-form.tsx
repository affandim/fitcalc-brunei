"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateBodyFat, type Gender } from "@/lib/formulas";
import { formatResult } from "@/lib/utils";
import { NumberField, SegmentedControl } from "@/components/calculators/form-fields";
import { ResultBigNumber, RangeBar } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  heightCm: z.number({ message: "Enter height" }).min(120, "Too low").max(230, "Too high"),
  neckCm: z.number({ message: "Enter neck circumference" }).min(20, "Too low").max(60, "Too high"),
  waistCm: z.number({ message: "Enter waist circumference" }).min(40, "Too low").max(200, "Too high"),
  hipCm: z.number().min(40).max(200).optional(),
});

type FormValues = z.infer<typeof schema>;

const maleSegments = [
  { label: "Essential", from: 2, to: 6, color: "#60a5fa" },
  { label: "Athletic", from: 6, to: 14, color: "#10b981" },
  { label: "Fitness", from: 14, to: 18, color: "#6ee7b7" },
  { label: "Average", from: 18, to: 25, color: "#f59e0b" },
  { label: "Obese", from: 25, to: 40, color: "#ef4444" },
];

const femaleSegments = [
  { label: "Essential", from: 10, to: 14, color: "#60a5fa" },
  { label: "Athletic", from: 14, to: 21, color: "#10b981" },
  { label: "Fitness", from: 21, to: 25, color: "#6ee7b7" },
  { label: "Average", from: 25, to: 32, color: "#f59e0b" },
  { label: "Obese", from: 32, to: 45, color: "#ef4444" },
];

export function BodyFatForm() {
  const [gender, setGender] = React.useState<Gender>("male");

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { heightCm: 175, neckCm: 38, waistCm: 85, hipCm: 95 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success && (gender === "male" || !!values.hipCm);

  const result = valid
    ? calculateBodyFat({
        gender,
        heightCm: values.heightCm,
        neckCm: values.neckCm,
        waistCm: values.waistCm,
        hipCm: values.hipCm,
      })
    : null;

  const segments = gender === "male" ? maleSegments : femaleSegments;
  const max = gender === "male" ? 40 : 45;

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
          <NumberField label="Height" unit="cm" register={register} name="heightCm" error={errors.heightCm?.message} />
          <NumberField label="Neck" unit="cm" register={register} name="neckCm" error={errors.neckCm?.message} />
          <NumberField label="Waist" unit="cm" register={register} name="waistCm" error={errors.waistCm?.message} />
          {gender === "female" && (
            <NumberField label="Hip" unit="cm" register={register} name="hipCm" error={errors.hipCm?.message} />
          )}
          <p className="text-xs text-foreground/45">
            Measure waist at the narrowest point and neck just below the larynx for the most
            accurate result.
          </p>
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        {result ? (
          <>
            <ResultBigNumber value={formatResult(result.bodyFatPercent)} unit="%" label={result.category} />
            <div className="mt-6 w-full">
              <RangeBar segments={segments} value={result.bodyFatPercent} min={0} max={max} />
            </div>
            <p className="mt-6 text-center text-sm text-foreground/55">
              Estimated using the US Navy circumference method, accurate to within roughly{" "}
              <strong className="text-foreground">3–4%</strong> of underwater weighing for most
              body types.
            </p>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter your measurements to estimate body fat.</p>
        )}
      </Card>
    </div>
  );
}
