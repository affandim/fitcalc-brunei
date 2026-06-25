"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { calculateMacroSplit } from "@/lib/formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { Card } from "@/components/ui/card";

const schema = z.object({
  totalCalories: z.number({ message: "Enter daily calories" }).min(800, "Too low").max(8000, "Too high"),
});

type FormValues = z.infer<typeof schema>;

const macroColors = ["#10b981", "#14b8a6", "#f59e0b"];

export function MacroForm() {
  const [protein, setProtein] = React.useState(30);
  const [carbs, setCarbs] = React.useState(40);
  const fat = 100 - protein - carbs;

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { totalCalories: 2200 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success && fat >= 0;
  const result = valid ? calculateMacroSplit(values.totalCalories, protein, carbs, fat) : null;

  const chartData = result
    ? [
        { name: "Protein", grams: Math.round(result.proteinG) },
        { name: "Carbs", grams: Math.round(result.carbsG) },
        { name: "Fat", grams: Math.round(result.fatG) },
      ]
    : [];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-5">
          <NumberField label="Daily calories" unit="kcal" register={register} name="totalCalories" error={errors.totalCalories?.message} />

          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground/80">Protein</span>
              <span className="font-mono text-emerald">{protein}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={60}
              value={protein}
              onChange={(e) => setProtein(Number(e.target.value))}
              className="mt-2 w-full accent-emerald"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground/80">Carbs</span>
              <span className="font-mono text-teal">{carbs}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={70}
              value={carbs}
              onChange={(e) => setCarbs(Number(e.target.value))}
              className="mt-2 w-full accent-teal"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground/80">Fat (remainder)</span>
            <span className={fat < 0 ? "font-mono text-red-500" : "font-mono"}>{fat}%</span>
          </div>
          {fat < 0 && (
            <p className="text-xs text-red-500">Protein + carbs exceed 100% — lower one of them.</p>
          )}
        </form>
      </Card>

      <Card className="p-6">
        {result ? (
          <>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} dataKey="grams" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={macroColors[i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v, n) => [`${v} g`, n]} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="font-mono text-lg font-medium text-emerald">{formatResult(result.proteinG, 0)}g</p>
                <p className="text-xs text-foreground/50">Protein</p>
              </div>
              <div>
                <p className="font-mono text-lg font-medium text-teal">{formatResult(result.carbsG, 0)}g</p>
                <p className="text-xs text-foreground/50">Carbs</p>
              </div>
              <div>
                <p className="font-mono text-lg font-medium text-amber-500">{formatResult(result.fatG, 0)}g</p>
                <p className="text-xs text-foreground/50">Fat</p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm text-foreground/50">Set your calories and macro split to see grams.</p>
        )}
      </Card>
    </div>
  );
}
