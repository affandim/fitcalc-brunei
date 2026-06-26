"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateTip } from "@/lib/finance-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber, StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  billAmount: z.number({ message: "Enter bill amount" }).min(0, "Too low").max(100000, "Too high"),
  tipPercent: z.number({ message: "Enter tip %" }).min(0, "Too low").max(100, "Too high"),
  numPeople: z.number({ message: "Enter number of people" }).min(1, "Too low").max(50, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function TipForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { billAmount: 50, tipPercent: 15, numPeople: 2 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const result = valid ? calculateTip(values.billAmount, values.tipPercent, values.numPeople) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Bill amount" unit="$" register={register} name="billAmount" error={errors.billAmount?.message} />
          <NumberField label="Tip percentage" unit="%" register={register} name="tipPercent" error={errors.tipPercent?.message} />
          <NumberField label="Split between" unit="people" register={register} name="numPeople" error={errors.numPeople?.message} />
        </form>
      </Card>

      <Card className="p-6">
        {result ? (
          <>
            <ResultBigNumber value={`$${formatResult(result.perPerson, 2)}`} label="Per person" />
            <div className="mt-6">
              <StatRow label="Tip amount" value={`$${formatResult(result.tipAmount, 2)}`} />
              <StatRow label="Total with tip" value={`$${formatResult(result.totalAmount, 2)}`} />
            </div>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter the bill details to split it.</p>
        )}
      </Card>
    </div>
  );
}
