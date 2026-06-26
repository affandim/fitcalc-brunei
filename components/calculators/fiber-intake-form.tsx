"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateFiberTarget } from "@/lib/more-formulas";
import type { Gender } from "@/lib/formulas";
import { formatResult } from "@/lib/utils";
import { NumberField, SegmentedControl } from "@/components/calculators/form-fields";
import { ResultBigNumber } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  ageYears: z.number({ message: "Enter age" }).min(18, "Must be 18 or older").max(100, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function FiberIntakeForm() {
  const [gender, setGender] = React.useState<Gender>("male");
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { ageYears: 30 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const target = valid ? calculateFiberTarget(gender, values.ageYears) : null;

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
          <NumberField label="Age" unit="years" register={register} name="ageYears" error={errors.ageYears?.message} />
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        {target !== null ? (
          <ResultBigNumber value={formatResult(target, 0)} unit="g/day" label="Recommended fiber intake" />
        ) : (
          <p className="text-sm text-foreground/50">Enter age to see your fiber target.</p>
        )}
      </Card>
    </div>
  );
}
