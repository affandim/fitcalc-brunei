"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateChildBmi } from "@/lib/life-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  heightCm: z.number({ message: "Enter height" }).min(60, "Too low").max(190, "Too high"),
  weightKg: z.number({ message: "Enter weight" }).min(5, "Too low").max(120, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function ChildBmiForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { heightCm: 120, weightKg: 24 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const result = valid ? calculateChildBmi(values.heightCm, values.weightKg) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Height" unit="cm" register={register} name="heightCm" error={errors.heightCm?.message} />
          <NumberField label="Weight" unit="kg" register={register} name="weightKg" error={errors.weightKg?.message} />
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        {result ? (
          <>
            <ResultBigNumber value={formatResult(result.bmi, 1)} label={result.category} />
            <p className="mt-4 text-center text-xs text-foreground/45">
              This is a simplified estimate. Proper pediatric assessment uses age- and
              sex-specific growth percentile charts — talk to a pediatrician for an accurate
              reading.
            </p>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter height and weight to see an estimate.</p>
        )}
      </Card>
    </div>
  );
}
