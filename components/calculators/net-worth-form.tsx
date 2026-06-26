"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateNetWorth } from "@/lib/finance-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  totalAssets: z.number({ message: "Enter total assets" }).min(0, "Too low").max(1000000000, "Too high"),
  totalLiabilities: z.number({ message: "Enter total liabilities" }).min(0, "Too low").max(1000000000, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function NetWorthForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { totalAssets: 50000, totalLiabilities: 15000 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const netWorth = valid ? calculateNetWorth(values.totalAssets, values.totalLiabilities) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Total assets" unit="$" register={register} name="totalAssets" error={errors.totalAssets?.message} />
          <NumberField label="Total liabilities" unit="$" register={register} name="totalLiabilities" error={errors.totalLiabilities?.message} />
          <p className="text-xs text-foreground/45">
            Assets: cash, savings, investments, property value. Liabilities: loans, credit card
            balances, mortgages.
          </p>
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        {netWorth !== null ? (
          <ResultBigNumber value={`$${formatResult(netWorth, 0)}`} label="Net worth" tone={netWorth >= 0 ? "emerald" : "default"} />
        ) : (
          <p className="text-sm text-foreground/50">Enter your assets and liabilities to calculate net worth.</p>
        )}
      </Card>
    </div>
  );
}
