"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateOneRepMax } from "@/lib/more-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber, StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  weight: z.number({ message: "Enter weight lifted" }).min(1, "Too low").max(600, "Too high"),
  reps: z.number({ message: "Enter reps completed" }).min(1, "Too low").max(20, "Too high — formula is most accurate under 10 reps"),
});

type FormValues = z.infer<typeof schema>;

export function OneRepMaxForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { weight: 80, reps: 5 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const result = valid ? calculateOneRepMax(values.weight, values.reps) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Weight lifted" unit="kg" register={register} name="weight" error={errors.weight?.message} />
          <NumberField label="Reps completed" unit="reps" register={register} name="reps" error={errors.reps?.message} />
          <p className="text-xs text-foreground/45">
            Most accurate for sets of 1-10 reps taken close to failure.
          </p>
        </form>
      </Card>

      <Card className="p-6">
        {result ? (
          <>
            <ResultBigNumber value={formatResult(result.oneRepMax, 1)} unit="kg" label="Estimated 1-rep max" />
            <div className="mt-6">
              {result.trainingLoads.map((load) => (
                <StatRow key={load.percent} label={`${load.percent}%`} value={`${formatResult(load.weight, 1)} kg`} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter weight and reps to estimate your 1RM.</p>
        )}
      </Card>
    </div>
  );
}
