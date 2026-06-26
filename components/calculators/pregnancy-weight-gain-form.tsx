"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateBmi } from "@/lib/formulas";
import { calculatePregnancyWeightGain } from "@/lib/life-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber, StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  heightCm: z.number({ message: "Enter height" }).min(120, "Too low").max(230, "Too high"),
  prePregnancyWeightKg: z.number({ message: "Enter pre-pregnancy weight" }).min(30, "Too low").max(300, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function PregnancyWeightGainForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { heightCm: 165, prePregnancyWeightKg: 60 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const bmi = valid ? calculateBmi(values.heightCm, values.prePregnancyWeightKg).bmi : null;
  const result = bmi !== null ? calculatePregnancyWeightGain(bmi) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Height" unit="cm" register={register} name="heightCm" error={errors.heightCm?.message} />
          <NumberField label="Pre-pregnancy weight" unit="kg" register={register} name="prePregnancyWeightKg" error={errors.prePregnancyWeightKg?.message} />
        </form>
      </Card>

      <Card className="p-6">
        {result ? (
          <>
            <ResultBigNumber value={`${formatResult(result.minKg, 1)}–${formatResult(result.maxKg, 1)}`} unit="kg" label="Recommended total weight gain" />
            <div className="mt-6">
              <StatRow label="Pre-pregnancy BMI category" value={result.category} />
              <StatRow label="Average gain per week (2nd/3rd trimester)" value={`~${formatResult((result.minKg + result.maxKg) / 2 / 38, 2)} kg`} />
            </div>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter your height and pre-pregnancy weight to see recommendations.</p>
        )}
      </Card>
    </div>
  );
}
