"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateIdealWeight, type Gender } from "@/lib/formulas";
import { formatResult } from "@/lib/utils";
import { NumberField, SegmentedControl } from "@/components/calculators/form-fields";
import { ResultBigNumber, StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  heightCm: z.number({ message: "Enter height" }).min(120, "Too low").max(230, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function IdealWeightForm() {
  const [gender, setGender] = React.useState<Gender>("male");
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { heightCm: 175 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const ideal = valid ? calculateIdealWeight(gender, values.heightCm) : null;

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
        </form>
      </Card>

      <Card className="p-6">
        {ideal !== null ? (
          <>
            <ResultBigNumber value={formatResult(ideal, 1)} unit="kg" label="Ideal body weight (Devine formula)" />
            <div className="mt-6">
              <StatRow label="Ideal weight range" value={`${formatResult(ideal * 0.9, 0)}–${formatResult(ideal * 1.1, 0)} kg`} />
            </div>
            <p className="mt-4 text-xs text-foreground/45">
              A ±10% range is shown because "ideal weight" varies meaningfully with frame size and
              muscle mass — treat this as a reference point, not a strict target.
            </p>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter your height to estimate ideal weight.</p>
        )}
      </Card>
    </div>
  );
}
