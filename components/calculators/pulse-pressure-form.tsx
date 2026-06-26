"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculatePulsePressure } from "@/lib/life-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  systolic: z.number({ message: "Enter systolic" }).min(60, "Too low").max(250, "Too high"),
  diastolic: z.number({ message: "Enter diastolic" }).min(40, "Too low").max(150, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function PulsePressureForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { systolic: 120, diastolic: 80 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const result = valid ? calculatePulsePressure(values.systolic, values.diastolic) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Systolic" unit="mmHg" register={register} name="systolic" error={errors.systolic?.message} />
          <NumberField label="Diastolic" unit="mmHg" register={register} name="diastolic" error={errors.diastolic?.message} />
        </form>
      </Card>

      <Card className="p-6">
        {result ? (
          <div>
            <StatRow label="Pulse pressure" value={`${formatResult(result.pulsePressure, 0)} mmHg`} />
            <StatRow label="Mean arterial pressure (MAP)" value={`${formatResult(result.meanArterialPressure, 1)} mmHg`} />
          </div>
        ) : (
          <p className="text-sm text-foreground/50">Enter your reading to calculate pulse pressure and MAP.</p>
        )}
      </Card>
    </div>
  );
}
