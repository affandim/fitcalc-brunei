"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { predictAdultHeight, type ChildGender } from "@/lib/life-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField, SegmentedControl } from "@/components/calculators/form-fields";
import { ResultBigNumber, StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  fatherHeightCm: z.number({ message: "Enter father's height" }).min(120, "Too low").max(230, "Too high"),
  motherHeightCm: z.number({ message: "Enter mother's height" }).min(120, "Too low").max(230, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function HeightPredictorForm() {
  const [gender, setGender] = React.useState<ChildGender>("boy");
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fatherHeightCm: 175, motherHeightCm: 162 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const predicted = valid ? predictAdultHeight(values.fatherHeightCm, values.motherHeightCm, gender) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <SegmentedControl
          label="Child's gender"
          value={gender}
          onChange={setGender}
          options={[
            { value: "boy", label: "Boy" },
            { value: "girl", label: "Girl" },
          ]}
        />
        <form className="mt-5 space-y-4">
          <NumberField label="Father's height" unit="cm" register={register} name="fatherHeightCm" error={errors.fatherHeightCm?.message} />
          <NumberField label="Mother's height" unit="cm" register={register} name="motherHeightCm" error={errors.motherHeightCm?.message} />
        </form>
      </Card>

      <Card className="p-6">
        {predicted !== null ? (
          <>
            <ResultBigNumber value={formatResult(predicted, 1)} unit="cm" label="Predicted adult height" />
            <div className="mt-6">
              <StatRow label="Predicted range" value={`${formatResult(predicted - 8.5, 0)}–${formatResult(predicted + 8.5, 0)} cm`} />
            </div>
            <p className="mt-4 text-xs text-foreground/45">
              The mid-parental method has a margin of error of roughly ±8.5cm — genetics, nutrition
              and health all influence actual adult height.
            </p>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter both parents&apos; heights to predict adult height.</p>
        )}
      </Card>
    </div>
  );
}
