"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateIvfDueDate, type EmbryoTransferDay } from "@/lib/life-formulas";
import { DateField, SegmentedControl } from "@/components/calculators/form-fields";
import { ResultBigNumber } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  transferDate: z.string().min(1, "Select a date"),
});

type FormValues = z.infer<typeof schema>;

export function IvfDueDateForm() {
  const [embryoDay, setEmbryoDay] = React.useState<EmbryoTransferDay>(5);
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
  const dueDate = valid ? calculateIvfDueDate(new Date(values.transferDate), embryoDay) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <SegmentedControl
          label="Embryo transfer day"
          value={String(embryoDay)}
          onChange={(v) => setEmbryoDay(Number(v) as EmbryoTransferDay)}
          options={[
            { value: "3", label: "Day 3 (cleavage)" },
            { value: "5", label: "Day 5 (blastocyst)" },
          ]}
        />
        <form className="mt-5 space-y-4">
          <DateField label="Embryo transfer date" register={register} name="transferDate" error={errors.transferDate?.message} />
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        {dueDate ? (
          <ResultBigNumber
            value={dueDate.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}
            label="Estimated due date"
          />
        ) : (
          <p className="text-sm text-foreground/50">Enter your transfer date to estimate your due date.</p>
        )}
      </Card>
    </div>
  );
}
