"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateWaistToHeightRatio } from "@/lib/formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber, RangeBar } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  waistCm: z.number({ message: "Enter waist" }).min(40, "Too low").max(200, "Too high"),
  heightCm: z.number({ message: "Enter height" }).min(120, "Too low").max(230, "Too high"),
});

type FormValues = z.infer<typeof schema>;

const segments = [
  { label: "Healthy", from: 0.35, to: 0.5, color: "#10b981" },
  { label: "Increased risk", from: 0.5, to: 0.6, color: "#f59e0b" },
  { label: "High risk", from: 0.6, to: 0.75, color: "#ef4444" },
];

export function WaistToHeightForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { waistCm: 80, heightCm: 175 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const result = valid ? calculateWaistToHeightRatio(values.waistCm, values.heightCm) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Waist" unit="cm" register={register} name="waistCm" error={errors.waistCm?.message} />
          <NumberField label="Height" unit="cm" register={register} name="heightCm" error={errors.heightCm?.message} />
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        {result ? (
          <>
            <ResultBigNumber value={formatResult(result.ratio, 2)} label={result.category} />
            <div className="mt-6 w-full">
              <RangeBar segments={segments} value={result.ratio} min={0.35} max={0.75} />
            </div>
            <p className="mt-6 text-center text-sm text-foreground/55">
              A ratio under 0.5 is generally considered healthy regardless of height — it's one of
              the simplest cardiovascular risk indicators available.
            </p>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter your waist and height to see your ratio.</p>
        )}
      </Card>
    </div>
  );
}
