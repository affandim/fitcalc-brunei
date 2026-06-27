"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateHeightVelocity } from "@/lib/life-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  height1Cm: z.number({ message: "Enter first height" }).min(40, "Too low").max(200, "Too high"),
  height2Cm: z.number({ message: "Enter second height" }).min(40, "Too low").max(200, "Too high"),
  monthsBetween: z.number({ message: "Enter months between" }).min(1, "Too low").max(60, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function HeightVelocityForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { height1Cm: 100, height2Cm: 106, monthsBetween: 12 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const velocity = valid ? calculateHeightVelocity(values.height1Cm, values.height2Cm, values.monthsBetween) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="First height measurement" unit="cm" register={register} name="height1Cm" error={errors.height1Cm?.message} />
          <NumberField label="Second height measurement" unit="cm" register={register} name="height2Cm" error={errors.height2Cm?.message} />
          <NumberField label="Months between measurements" unit="months" register={register} name="monthsBetween" error={errors.monthsBetween?.message} />
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        {velocity !== null ? (
          <>
            <ResultBigNumber value={formatResult(velocity, 1)} unit="cm/yr" label="Growth velocity" />
            <p className="mt-4 text-center text-xs text-foreground/45">
              Typical growth slows steadily after infancy — roughly 5-6 cm/year through
              mid-childhood, then a pubertal growth spurt before adult height is reached.
            </p>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter two height measurements to calculate growth rate.</p>
        )}
      </Card>
    </div>
  );
}
