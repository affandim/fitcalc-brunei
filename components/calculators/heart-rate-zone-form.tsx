"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateHeartRateZones, calculateMaxHeartRate } from "@/lib/formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { Card } from "@/components/ui/card";

const schema = z.object({
  ageYears: z.number({ message: "Enter age" }).min(10, "Too young").max(100, "Too high"),
});

type FormValues = z.infer<typeof schema>;

const zoneColors = ["#94a3b8", "#10b981", "#14b8a6", "#f59e0b", "#ef4444"];

export function HeartRateZoneForm() {
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
  const zones = valid ? calculateHeartRateZones(values.ageYears) : null;
  const maxHr = valid ? calculateMaxHeartRate(values.ageYears) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Age" unit="years" register={register} name="ageYears" error={errors.ageYears?.message} />
        </form>
        {maxHr !== null && (
          <p className="mt-4 text-sm text-foreground/55">
            Estimated max heart rate: <strong className="text-foreground">{formatResult(maxHr, 0)} bpm</strong>
          </p>
        )}
      </Card>

      <Card className="p-6">
        {zones ? (
          <div className="space-y-3">
            {zones.map((z, i) => (
              <div key={z.zone} className="flex items-center gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: zoneColors[i] }}
                >
                  {z.zone}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{z.label}</p>
                  <p className="font-mono text-xs text-foreground/50">{z.low}–{z.high} bpm</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-foreground/50">Enter your age to see your heart rate zones.</p>
        )}
      </Card>
    </div>
  );
}
