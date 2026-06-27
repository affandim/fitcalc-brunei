"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateConceptionDate } from "@/lib/life-formulas";
import { DateField } from "@/components/calculators/form-fields";
import { ResultBigNumber } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  dueDate: z.string().min(1, "Select a date"),
});

type FormValues = z.infer<typeof schema>;

export function ConceptionDateForm() {
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
  const conception = valid ? calculateConceptionDate(new Date(values.dueDate)) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <DateField label="Due date (known or expected)" register={register} name="dueDate" error={errors.dueDate?.message} />
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        {conception ? (
          <ResultBigNumber
            value={conception.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}
            label="Estimated conception date"
          />
        ) : (
          <p className="text-sm text-foreground/50">Enter a due date to estimate conception date.</p>
        )}
      </Card>
    </div>
  );
}
