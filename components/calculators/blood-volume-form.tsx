"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateBloodVolume } from "@/lib/more-formulas";
import type { Gender } from "@/lib/formulas";
import { formatResult } from "@/lib/utils";
import { NumberField, SegmentedControl } from "@/components/calculators/form-fields";
import { ResultBigNumber } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  weightKg: z.number({ message: "Enter weight" }).min(2, "Too low").max(300, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function BloodVolumeForm() {
  const [gender, setGender] = React.useState<Gender>("male");
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
  const volume = valid ? calculateBloodVolume(values.weightKg, gender) : null;

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
          <NumberField label="Weight" unit="kg" register={register} name="weightKg" error={errors.weightKg?.message} />
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        {volume !== null ? (
          <ResultBigNumber value={formatResult(volume, 2)} unit="L" label="Estimated total blood volume" />
        ) : (
          <p className="text-sm text-foreground/50">Enter weight to estimate blood volume.</p>
        )}
      </Card>
    </div>
  );
}
