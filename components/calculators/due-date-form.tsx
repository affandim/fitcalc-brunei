"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateDueDate } from "@/lib/life-formulas";
import { DateField } from "@/components/calculators/form-fields";
import { ResultBigNumber, StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  lastPeriodDate: z.string().min(1, "Select a date"),
});

type FormValues = z.infer<typeof schema>;

export function DueDateForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const result = valid ? calculateDueDate(new Date(values.lastPeriodDate)) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <DateField label="First day of last period" register={register} name="lastPeriodDate" error={errors.lastPeriodDate?.message} />
          <p className="text-xs text-foreground/45">
            Based on a typical 28-day cycle (Naegele's rule). If your cycle is longer or shorter,
            your actual due date may shift by a few days.
          </p>
        </form>
      </Card>

      <Card className="p-6">
        {result ? (
          <>
            <ResultBigNumber
              value={result.dueDate.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}
              label="Estimated due date"
            />
            <div className="mt-6">
              <StatRow label="Current week" value={`Week ${result.currentWeek}, day ${result.currentDay}`} />
              <StatRow label="Trimester" value={`${result.trimester}${result.trimester === 1 ? "st" : result.trimester === 2 ? "nd" : "rd"} trimester`} />
            </div>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Select the first day of your last period to see your due date.</p>
        )}
      </Card>
    </div>
  );
}
