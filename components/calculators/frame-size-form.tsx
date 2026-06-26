"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateFrameSize } from "@/lib/more-formulas";
import type { Gender } from "@/lib/formulas";
import { NumberField, SegmentedControl } from "@/components/calculators/form-fields";
import { ResultBigNumber } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  heightCm: z.number({ message: "Enter height" }).min(120, "Too low").max(230, "Too high"),
  wristCm: z.number({ message: "Enter wrist circumference" }).min(10, "Too low").max(25, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function FrameSizeForm() {
  const [gender, setGender] = React.useState<Gender>("male");
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { heightCm: 175, wristCm: 17 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const frame = valid ? calculateFrameSize(gender, values.heightCm, values.wristCm) : null;

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
          <NumberField label="Wrist circumference" unit="cm" register={register} name="wristCm" error={errors.wristCm?.message} />
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        {frame ? (
          <ResultBigNumber value={frame} label="Body frame size" />
        ) : (
          <p className="text-sm text-foreground/50">Enter your height and wrist circumference to see your frame size.</p>
        )}
      </Card>
    </div>
  );
}
