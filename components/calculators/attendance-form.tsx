"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateAttendance } from "@/lib/life-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  daysAttended: z.number({ message: "Enter days attended" }).min(0, "Too low").max(400, "Too high"),
  totalDays: z.number({ message: "Enter total days" }).min(1, "Too low").max(400, "Too high"),
  requiredPercent: z.number({ message: "Enter required %" }).min(0, "Too low").max(100, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function AttendanceForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { daysAttended: 85, totalDays: 100, requiredPercent: 75 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const result = valid
    ? calculateAttendance(values.daysAttended, values.totalDays, values.requiredPercent)
    : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Days attended" register={register} name="daysAttended" error={errors.daysAttended?.message} />
          <NumberField label="Total days" register={register} name="totalDays" error={errors.totalDays?.message} />
          <NumberField label="Required attendance" unit="%" register={register} name="requiredPercent" error={errors.requiredPercent?.message} />
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        {result ? (
          <>
            <ResultBigNumber
              value={`${formatResult(result.percentage, 1)}%`}
              label={result.meetsRequirement ? "Meets requirement" : "Below requirement"}
              tone={result.meetsRequirement ? "emerald" : "default"}
            />
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter attendance details to check your percentage.</p>
        )}
      </Card>
    </div>
  );
}
