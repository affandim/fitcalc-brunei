"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { convertTemperature, temperatureUnitLabels, type TemperatureUnit } from "@/lib/converters";
import { formatResult } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const units: TemperatureUnit[] = ["c", "f", "k"];

export function TemperatureConverterForm() {
  const [value, setValue] = React.useState("37");
  const [from, setFrom] = React.useState<TemperatureUnit>("c");
  const [to, setTo] = React.useState<TemperatureUnit>("f");

  const numericValue = parseFloat(value);
  const result = Number.isFinite(numericValue) ? convertTemperature(numericValue, from, to) : null;

  return (
    <Card className="p-6">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <label className="block">
          <span className="text-sm font-medium text-foreground/80">From</span>
          <div className="mt-1.5 flex h-12 items-center rounded-xl border border-border bg-surface px-4 focus-within:border-emerald">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value as TemperatureUnit)}
            className="mt-2 h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-emerald"
          >
            {units.map((u) => (
              <option key={u} value={u}>
                {temperatureUnitLabels[u]}
              </option>
            ))}
          </select>
        </label>

        <div className="hidden h-12 items-center justify-center sm:flex">
          <ArrowRight size={18} className="text-foreground/30" />
        </div>

        <label className="block">
          <span className="text-sm font-medium text-foreground/80">To</span>
          <div className="mt-1.5 flex h-12 items-center rounded-xl border border-emerald bg-emerald/5 px-4">
            <span className="font-mono text-sm font-medium text-emerald">
              {result !== null ? formatResult(result, 2) : "—"}
            </span>
          </div>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value as TemperatureUnit)}
            className="mt-2 h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-emerald"
          >
            {units.map((u) => (
              <option key={u} value={u}>
                {temperatureUnitLabels[u]}
              </option>
            ))}
          </select>
        </label>
      </div>
    </Card>
  );
}
