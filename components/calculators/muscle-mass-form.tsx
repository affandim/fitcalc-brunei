"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateMuscleMass, type Gender } from "@/lib/formulas";
import { formatResult } from "@/lib/utils";
import { NumberField, SegmentedControl } from "@/components/calculators/form-fields";
import { ResultBigNumber, StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  heightCm: z.number({ message: "Enter height" }).min(120, "Too low").max(230, "Too high"),
  weightKg: z.number({ message: "Enter weight" }).min(30, "Too low").max(300, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function MuscleMassForm() {
  const [gender, setGender] = React.useState<Gender>("male");
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { heightCm: 175, weightKg: 75 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const result = valid ? calculateMuscleMass(gender, values.heightCm, values.weightKg) : null;

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
          <NumberField label="Weight" unit="kg" register={register} name="weightKg" error={errors.weightKg?.message} />
        </form>
      </Card>

      <Card className="p-6">
        {result ? (
          <>
            <ResultBigNumber value={formatResult(result.muscleMassKg, 1)} unit="kg" label="Estimated skeletal muscle mass" />
            <div className="mt-6">
              <StatRow label="Muscle mass" value={`${formatResult(result.muscleMassKg, 1)} kg`} />
              <StatRow label="% of body weight" value={`${formatResult(result.percentOfBodyWeight, 1)}%`} />
            </div>
            <p className="mt-4 text-xs text-foreground/45">
              This is a population-level estimate derived from lean body mass, not a direct
              tissue measurement.
            </p>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter your details to estimate muscle mass.</p>
        )}
      </Card>
    </div>
  );
}
