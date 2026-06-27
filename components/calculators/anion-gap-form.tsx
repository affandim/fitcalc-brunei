"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateAnionGap } from "@/lib/more-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  sodium: z.number({ message: "Enter sodium" }).min(100, "Too low").max(180, "Too high"),
  chloride: z.number({ message: "Enter chloride" }).min(70, "Too low").max(140, "Too high"),
  bicarbonate: z.number({ message: "Enter bicarbonate" }).min(5, "Too low").max(45, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function AnionGapForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { sodium: 140, chloride: 104, bicarbonate: 24 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const result = valid ? calculateAnionGap(values.sodium, values.chloride, values.bicarbonate) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Sodium (Na)" unit="mEq/L" register={register} name="sodium" error={errors.sodium?.message} />
          <NumberField label="Chloride (Cl)" unit="mEq/L" register={register} name="chloride" error={errors.chloride?.message} />
          <NumberField label="Bicarbonate (HCO3)" unit="mEq/L" register={register} name="bicarbonate" error={errors.bicarbonate?.message} />
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        {result ? (
          <ResultBigNumber value={formatResult(result.anionGap, 1)} unit="mEq/L" label={`${result.category} anion gap`} />
        ) : (
          <p className="text-sm text-foreground/50">Enter lab values to calculate anion gap.</p>
        )}
      </Card>
    </div>
  );
}
