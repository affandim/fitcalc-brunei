"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { predictRaceTime } from "@/lib/formulas";
import { NumberField } from "@/components/calculators/form-fields";
import { StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  knownDistanceKm: z.number({ message: "Enter a recent distance" }).min(0.5, "Too low").max(200, "Too high"),
  knownTimeMinutes: z.number({ message: "Enter a recent time" }).min(1, "Too low").max(1500, "Too high"),
});

type FormValues = z.infer<typeof schema>;

const targetDistances = [
  { label: "5K", km: 5 },
  { label: "10K", km: 10 },
  { label: "Half Marathon", km: 21.0975 },
  { label: "Marathon", km: 42.195 },
];

function formatTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = Math.floor(minutes % 60);
  const s = Math.round((minutes - Math.floor(minutes)) * 60);
  return h > 0
    ? `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
    : `${m}:${s.toString().padStart(2, "0")}`;
}

export function RunningForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { knownDistanceKm: 5, knownTimeMinutes: 25 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField
            label="Recent race/run distance"
            unit="km"
            register={register}
            name="knownDistanceKm"
            error={errors.knownDistanceKm?.message}
          />
          <NumberField
            label="Recent race/run time"
            unit="minutes"
            register={register}
            name="knownTimeMinutes"
            error={errors.knownTimeMinutes?.message}
          />
          <p className="text-xs text-foreground/45">
            Use your most recent honest race effort for the most accurate prediction.
          </p>
        </form>
      </Card>

      <Card className="p-6">
        {valid ? (
          <div>
            {targetDistances.map((t) => (
              <StatRow
                key={t.label}
                label={t.label}
                value={formatTime(predictRaceTime(values.knownDistanceKm, values.knownTimeMinutes, t.km))}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-foreground/50">Enter a recent run to predict your finish times.</p>
        )}
      </Card>
    </div>
  );
}
