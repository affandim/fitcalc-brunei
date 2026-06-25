"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateBodySurfaceArea } from "@/lib/formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  heightCm: z.number({ message: "Enter height" }).min(40, "Too low").max(230, "Too high"),
  weightKg: z.number({ message: "Enter weight" }).min(2, "Too low").max(300, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function BodySurfaceAreaForm() {
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
  const bsa = valid ? calculateBodySurfaceArea(values.heightCm, values.weightKg) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Height" unit="cm" register={register} name="heightCm" error={errors.heightCm?.message} />
          <NumberField label="Weight" unit="kg" register={register} name="weightKg" error={errors.weightKg?.message} />
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        {bsa !== null ? (
          <>
            <ResultBigNumber value={formatResult(bsa, 2)} unit="m²" label="Body surface area (Mosteller)" />
            <p className="mt-4 text-center text-sm text-foreground/55">
              Average adult BSA is roughly 1.7–1.9 m². This figure is most often used clinically
              to calculate medication dosing.
            </p>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter height and weight to calculate BSA.</p>
        )}
      </Card>
    </div>
  );
}
