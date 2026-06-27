"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateOvulation } from "@/lib/life-formulas";
import { DateField, NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber, StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  lastPeriodDate: z.string().min(1, "Select a date"),
  cycleLength: z.number({ message: "Enter cycle length" }).min(20, "Too short").max(45, "Too long"),
});

type FormValues = z.infer<typeof schema>;

export function OvulationForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { cycleLength: 28 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const result = valid ? calculateOvulation(new Date(values.lastPeriodDate), values.cycleLength) : null;

  const fmt = (d: Date) => d.toLocaleDateString(undefined, { day: "numeric", month: "short" });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <DateField label="First day of last period" register={register} name="lastPeriodDate" error={errors.lastPeriodDate?.message} />
          <NumberField label="Average cycle length" unit="days" register={register} name="cycleLength" error={errors.cycleLength?.message} />
        </form>
      </Card>

      <Card className="p-6">
        {result ? (
          <>
            <ResultBigNumber value={fmt(result.ovulationDate)} label="Estimated ovulation day" />
            <div className="mt-6">
              <StatRow label="Fertile window starts" value={fmt(result.fertileWindowStart)} />
              <StatRow label="Fertile window ends" value={fmt(result.fertileWindowEnd)} />
            </div>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter your last period date and cycle length.</p>
        )}
      </Card>
    </div>
  );
}
