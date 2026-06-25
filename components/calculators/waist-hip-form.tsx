"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateWaistHipRatio, type Gender } from "@/lib/formulas";
import { formatResult } from "@/lib/utils";
import { NumberField, SegmentedControl } from "@/components/calculators/form-fields";
import { ResultBigNumber, RangeBar } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  waistCm: z.number({ message: "Enter waist" }).min(40, "Too low").max(200, "Too high"),
  hipCm: z.number({ message: "Enter hip" }).min(40, "Too low").max(200, "Too high"),
});

type FormValues = z.infer<typeof schema>;

const maleSegments = [
  { label: "Low", from: 0.7, to: 0.9, color: "#10b981" },
  { label: "Moderate", from: 0.9, to: 1.0, color: "#f59e0b" },
  { label: "High", from: 1.0, to: 1.2, color: "#ef4444" },
];
const femaleSegments = [
  { label: "Low", from: 0.65, to: 0.8, color: "#10b981" },
  { label: "Moderate", from: 0.8, to: 0.85, color: "#f59e0b" },
  { label: "High", from: 0.85, to: 1.1, color: "#ef4444" },
];

export function WaistHipForm() {
  const [gender, setGender] = React.useState<Gender>("male");
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { waistCm: 85, hipCm: 100 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const result = valid ? calculateWaistHipRatio(gender, values.waistCm, values.hipCm) : null;
  const segments = gender === "male" ? maleSegments : femaleSegments;
  const min = gender === "male" ? 0.7 : 0.65;
  const max = gender === "male" ? 1.2 : 1.1;

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
          <NumberField label="Waist" unit="cm" register={register} name="waistCm" error={errors.waistCm?.message} />
          <NumberField label="Hip" unit="cm" register={register} name="hipCm" error={errors.hipCm?.message} />
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        {result ? (
          <>
            <ResultBigNumber value={formatResult(result.ratio, 2)} label={result.category} />
            <div className="mt-6 w-full">
              <RangeBar segments={segments} value={result.ratio} min={min} max={max} />
            </div>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter waist and hip measurements to see your ratio.</p>
        )}
      </Card>
    </div>
  );
}
