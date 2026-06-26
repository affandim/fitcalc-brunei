"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2 } from "lucide-react";
import { calculateGpa } from "@/lib/life-formulas";
import { formatResult } from "@/lib/utils";
import { ResultBigNumber } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const gradeOptions = [
  { label: "A (4.0)", value: 4.0 },
  { label: "A− (3.7)", value: 3.7 },
  { label: "B+ (3.3)", value: 3.3 },
  { label: "B (3.0)", value: 3.0 },
  { label: "B− (2.7)", value: 2.7 },
  { label: "C+ (2.3)", value: 2.3 },
  { label: "C (2.0)", value: 2.0 },
  { label: "C− (1.7)", value: 1.7 },
  { label: "D (1.0)", value: 1.0 },
  { label: "F (0.0)", value: 0.0 },
];

const schema = z.object({
  courses: z
    .array(
      z.object({
        grade: z.number(),
        creditHours: z.number().min(0.5).max(20),
      })
    )
    .min(1),
});

type FormValues = z.infer<typeof schema>;

export function GpaForm() {
  const { register, control, watch } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      courses: [
        { grade: 4.0, creditHours: 3 },
        { grade: 3.3, creditHours: 3 },
      ],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({ control, name: "courses" });
  const values = watch();
  const gpa = calculateGpa(values.courses ?? []);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-end gap-2">
              <label className="flex-1">
                <span className="text-xs text-foreground/60">Grade</span>
                <select
                  {...register(`courses.${index}.grade`, { valueAsNumber: true })}
                  className="mt-1 h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-emerald"
                >
                  {gradeOptions.map((g) => (
                    <option key={g.label} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="w-24">
                <span className="text-xs text-foreground/60">Credits</span>
                <input
                  type="number"
                  step="0.5"
                  {...register(`courses.${index}.creditHours`, { valueAsNumber: true })}
                  className="mt-1 h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-emerald"
                />
              </label>
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label="Remove course"
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
          onClick={() => append({ grade: 4.0, creditHours: 3 })}
        >
          <Plus size={14} /> Add course
        </Button>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        <ResultBigNumber value={formatResult(gpa, 2)} label="Cumulative GPA" />
        <p className="mt-4 text-center text-sm text-foreground/55">
          Based on {values.courses?.length ?? 0} course{(values.courses?.length ?? 0) !== 1 ? "s" : ""} and{" "}
          {formatResult(values.courses?.reduce((s, c) => s + (c.creditHours || 0), 0) ?? 0, 1)} total credit hours.
        </p>
      </Card>
    </div>
  );
}
