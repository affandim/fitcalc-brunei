"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { convertPregnancyWeeksToMonths } from "@/lib/life-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  weeks: z.number({ message: "Enter weeks pregnant" }).min(0, "Too low").max(45, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function PregnancyWeeksToMonthsForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { weeks: 20 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const result = valid ? convertPregnancyWeeksToMonths(values.weeks) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Weeks pregnant" unit="weeks" register={register} name="weeks" error={errors.weeks?.message} />
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        {result ? (
          <ResultBigNumber
            value={formatResult(result.months, 1)}
            unit="months"
            label={`${result.trimester}${result.trimester === 1 ? "st" : result.trimester === 2 ? "nd" : "rd"} trimester`}
          />
        ) : (
          <p className="text-sm text-foreground/50">Enter weeks pregnant to convert to months.</p>
        )}
      </Card>
    </div>
  );
}
