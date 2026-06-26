"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateAlcoholCalories, drinkTypeLabels, type DrinkType } from "@/lib/more-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  quantity: z.number({ message: "Enter number of drinks" }).min(0, "Too low").max(30, "Too high"),
});

type FormValues = z.infer<typeof schema>;

const drinkTypes: DrinkType[] = ["beer", "wine", "spirit"];

export function AlcoholCaloriesForm() {
  const [drinkType, setDrinkType] = React.useState<DrinkType>("beer");
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { quantity: 2 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const calories = valid ? calculateAlcoholCalories(drinkType, values.quantity) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-foreground/80">Drink type</span>
            <select
              value={drinkType}
              onChange={(e) => setDrinkType(e.target.value as DrinkType)}
              className="mt-1.5 h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none focus:border-emerald"
            >
              {drinkTypes.map((d) => (
                <option key={d} value={d}>
                  {drinkTypeLabels[d]}
                </option>
              ))}
            </select>
          </label>
          <NumberField label="Number of drinks" register={register} name="quantity" error={errors.quantity?.message} />
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        {calories !== null ? (
          <ResultBigNumber value={formatResult(calories, 0)} unit="kcal" label="Total calories from alcohol" />
        ) : (
          <p className="text-sm text-foreground/50">Enter drink type and quantity to estimate calories.</p>
        )}
      </Card>
    </div>
  );
}
