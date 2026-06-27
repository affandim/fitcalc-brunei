"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateSleepNeeds } from "@/lib/life-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  ageYears: z.number({ message: "Enter age" }).min(0, "Too low").max(110, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function SleepNeedsForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { ageYears: 8 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const result = valid ? calculateSleepNeeds(values.ageYears) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Age" unit="years" register={register} name="ageYears" error={errors.ageYears?.message} />
          <p className="text-xs text-foreground/45">
            For infants under 1 year, enter a decimal (e.g. 0.5 for 6 months old).
          </p>
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        {result ? (
          <ResultBigNumber
            value={`${formatResult(result.minHours, 0)}–${formatResult(result.maxHours, 0)}`}
            unit="hrs/day"
            label={result.label}
          />
        ) : (
          <p className="text-sm text-foreground/50">Enter age to see recommended sleep.</p>
        )}
      </Card>
    </div>
  );
}
