"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateBai } from "@/lib/more-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  hipCm: z.number({ message: "Enter hip circumference" }).min(40, "Too low").max(200, "Too high"),
  heightCm: z.number({ message: "Enter height" }).min(120, "Too low").max(230, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function BaiForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { hipCm: 95, heightCm: 170 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const bai = valid ? calculateBai(values.hipCm, values.heightCm) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Hip circumference" unit="cm" register={register} name="hipCm" error={errors.hipCm?.message} />
          <NumberField label="Height" unit="cm" register={register} name="heightCm" error={errors.heightCm?.message} />
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        {bai !== null ? (
          <>
            <ResultBigNumber value={formatResult(bai, 1)} label="Body Adiposity Index" />
            <p className="mt-4 text-center text-sm text-foreground/55">
              BAI estimates body fat percentage without needing a weight measurement — useful as
              a second opinion alongside other body composition tools.
            </p>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter hip circumference and height to calculate BAI.</p>
        )}
      </Card>
    </div>
  );
}
