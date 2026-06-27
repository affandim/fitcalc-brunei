"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2 } from "lucide-react";
import { calculateWeightedGrade } from "@/lib/life-formulas";
import { formatResult } from "@/lib/utils";
import { ResultBigNumber } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const schema = z.object({
  items: z
    .array(
      z.object({
        scorePercent: z.number().min(0).max(100),
        weightPercent: z.number().min(0).max(100),
      })
    )
    .min(1),
});

type FormValues = z.infer<typeof schema>;

export function WeightedGradeForm() {
  const { register, control, watch } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      items: [
        { scorePercent: 90, weightPercent: 40 },
        { scorePercent: 80, weightPercent: 30 },
        { scorePercent: 95, weightPercent: 30 },
      ],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const values = watch();
  const average = calculateWeightedGrade(values.items ?? []);
  const totalWeight = (values.items ?? []).reduce((s, i) => s + (i.weightPercent || 0), 0);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-end gap-2">
              <label className="flex-1">
                <span className="text-xs text-foreground/60">Score %</span>
                <input
                  type="number"
                  {...register(`items.${index}.scorePercent`, { valueAsNumber: true })}
                  className="mt-1 h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-emerald"
                />
              </label>
              <label className="flex-1">
                <span className="text-xs text-foreground/60">Weight %</span>
                <input
                  type="number"
                  {...register(`items.${index}.weightPercent`, { valueAsNumber: true })}
                  className="mt-1 h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-emerald"
                />
              </label>
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label="Remove item"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border text-foreground/40 hover:border-red-400 hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => append({ scorePercent: 90, weightPercent: 10 })}
        >
          <Plus size={14} /> Add item
        </Button>
        {totalWeight !== 100 && (
          <p className="mt-3 text-xs text-amber-600">
            Weights currently total {formatResult(totalWeight, 0)}% — ideally these should sum to 100%.
          </p>
        )}
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        <ResultBigNumber value={`${formatResult(average, 1)}%`} label="Weighted average grade" />
      </Card>
    </div>
  );
}
