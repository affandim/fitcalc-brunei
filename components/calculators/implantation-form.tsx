"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateImplantationWindow } from "@/lib/life-formulas";
import { DateField } from "@/components/calculators/form-fields";
import { ResultBigNumber } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  ovulationDate: z.string().min(1, "Select a date"),
});

type FormValues = z.infer<typeof schema>;

export function ImplantationForm() {
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
  const result = valid ? calculateImplantationWindow(new Date(values.ovulationDate)) : null;

  const fmt = (d: Date) => d.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <DateField label="Estimated ovulation date" register={register} name="ovulationDate" error={errors.ovulationDate?.message} />
          <p className="text-xs text-foreground/45">
            Don&apos;t know your ovulation date?{" "}
            Use the Ovulation Calculator first to estimate it from your last period.
          </p>
        </form>
      </Card>

      <Card className="p-6">
        {result ? (
          <ResultBigNumber value={`${fmt(result.windowStart)} – ${fmt(result.windowEnd)}`} label="Estimated implantation window" />
        ) : (
          <p className="text-sm text-foreground/50">Enter your ovulation date to estimate the implantation window.</p>
        )}
      </Card>
    </div>
  );
}
