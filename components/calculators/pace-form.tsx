"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculatePace } from "@/lib/formulas";
import { NumberField } from "@/components/calculators/form-fields";
import { StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  distanceKm: z.number({ message: "Enter distance" }).min(0.1, "Too low").max(500, "Too high"),
  timeMinutes: z.number({ message: "Enter time" }).min(1, "Too low").max(2000, "Too high"),
});

type FormValues = z.infer<typeof schema>;

function formatPace(minutes: number) {
  const m = Math.floor(minutes);
  const s = Math.round((minutes - m) * 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function PaceForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { distanceKm: 5, timeMinutes: 25 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const result = valid ? calculatePace(values.distanceKm, values.timeMinutes) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Distance" unit="km" register={register} name="distanceKm" error={errors.distanceKm?.message} />
          <NumberField label="Time" unit="minutes" register={register} name="timeMinutes" error={errors.timeMinutes?.message} />
        </form>
      </Card>

      <Card className="p-6">
        {result ? (
          <div>
            <StatRow label="Pace per km" value={`${formatPace(result.paceMinPerKm)} /km`} />
            <StatRow label="Pace per mile" value={`${formatPace(result.paceMinPerMile)} /mile`} />
            <StatRow label="Speed" value={`${result.speedKmh.toFixed(1)} km/h`} />
          </div>
        ) : (
          <p className="text-sm text-foreground/50">Enter distance and time to calculate your pace.</p>
        )}
      </Card>
    </div>
  );
}
