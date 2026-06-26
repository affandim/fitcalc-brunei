"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateDiscount } from "@/lib/finance-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber, StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  originalPrice: z.number({ message: "Enter original price" }).min(0, "Too low").max(1000000, "Too high"),
  discountPercent: z.number({ message: "Enter discount %" }).min(0, "Too low").max(100, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function DiscountForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { originalPrice: 100, discountPercent: 20 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const result = valid ? calculateDiscount(values.originalPrice, values.discountPercent) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Original price" unit="$" register={register} name="originalPrice" error={errors.originalPrice?.message} />
          <NumberField label="Discount" unit="%" register={register} name="discountPercent" error={errors.discountPercent?.message} />
        </form>
      </Card>

      <Card className="p-6">
        {result ? (
          <>
            <ResultBigNumber value={`$${formatResult(result.finalPrice, 2)}`} label="Final price" />
            <div className="mt-6">
              <StatRow label="You save" value={`$${formatResult(result.savings, 2)}`} />
            </div>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Enter price and discount to see the final price.</p>
        )}
      </Card>
    </div>
  );
}
