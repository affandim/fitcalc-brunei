"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculatePregnancyCalories, type Trimester } from "@/lib/life-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField, SegmentedControl } from "@/components/calculators/form-fields";
import { ResultBigNumber, StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  prePregnancyTdee: z.number({ message: "Enter your pre-pregnancy TDEE" }).min(1000, "Too low").max(6000, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function PregnancyCalorieForm() {
  const [trimester, setTrimester] = React.useState<Trimester>(1);
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { prePregnancyTdee: 2000 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const total = valid ? calculatePregnancyCalories(values.prePregnancyTdee, trimester) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <SegmentedControl
          label="Trimester"
          value={String(trimester)}
          onChange={(v) => setTrimester(Number(v) as Trimester)}
          options={[
            { value: "1", label: "1st" },
            { value: "2", label: "2nd" },
            { value: "3", label: "3rd" },
          ]}
        />
        <form className="mt-5 space-y-4">
          <NumberField
            label="Pre-pregnancy TDEE"
            unit="kcal/day"
            register={register}
            name="prePregnancyTdee"
            error={errors.prePregnancyTdee?.message}
          />
          <p className="text-xs text-foreground/45">
            Don&apos;t know your TDEE? Use the{" "}
            <Link href="/calculators/tdee-calculator" className="text-emerald underline-offset-4 hover:underline">
              TDEE Calculator
            </Link>{" "}
            first.
          </p>
        </form>
      </Card>

      <Card className="p-6">
        {total !== null ? (
          <>
            <ResultBigNumber value={formatResult(total, 0)} unit="kcal/day" label="Recommended daily calories" />
            <div className="mt-6">
              <StatRow label="Pre-pregnancy TDEE" value={`${formatResult(values.prePregnancyTdee, 0)} kcal`} />
              <StatRow label="Trimester bonus" value={`+${total - values.prePregnancyTdee} kcal`} />
            </div>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter your pre-pregnancy TDEE to see your target.</p>
        )}
      </Card>
    </div>
  );
}
