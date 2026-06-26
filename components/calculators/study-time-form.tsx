"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateStudyPlan } from "@/lib/life-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber, StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  totalHoursNeeded: z.number({ message: "Enter total hours" }).min(1, "Too low").max(1000, "Too high"),
  daysRemaining: z.number({ message: "Enter days remaining" }).min(1, "Too low").max(365, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function StudyTimeForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { totalHoursNeeded: 30, daysRemaining: 10 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const result = valid ? calculateStudyPlan(values.totalHoursNeeded, values.daysRemaining) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Total study hours needed" unit="hours" register={register} name="totalHoursNeeded" error={errors.totalHoursNeeded?.message} />
          <NumberField label="Days until exam" unit="days" register={register} name="daysRemaining" error={errors.daysRemaining?.message} />
        </form>
      </Card>

      <Card className="p-6">
        {result ? (
          <>
            <ResultBigNumber value={formatResult(result.hoursPerDay, 1)} unit="hrs/day" label="Study time needed per day" />
            <div className="mt-6">
              <StatRow label="Pomodoro sessions/day (25 min each)" value={`${result.pomodoroSessionsPerDay} sessions`} />
            </div>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter your details to build a study plan.</p>
        )}
      </Card>
    </div>
  );
}
