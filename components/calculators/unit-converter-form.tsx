"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { convertUnits, type UnitDef } from "@/lib/converters";
import { formatResult } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface UnitConverterFormProps {
  units: UnitDef[];
  defaultFromId?: string;
  defaultToId?: string;
}

export function UnitConverterForm({ units, defaultFromId, defaultToId }: UnitConverterFormProps) {
  const [value, setValue] = React.useState<string>("1");
  const [fromId, setFromId] = React.useState(defaultFromId ?? units[0].id);
  const [toId, setToId] = React.useState(defaultToId ?? units[1]?.id ?? units[0].id);

  const fromUnit = units.find((u) => u.id === fromId) ?? units[0];
  const toUnit = units.find((u) => u.id === toId) ?? units[0];
  const numericValue = parseFloat(value);
  const result = Number.isFinite(numericValue) ? convertUnits(numericValue, fromUnit, toUnit) : null;

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
            value={fromId}
            onChange={(e) => setFromId(e.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-emerald"
          >
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
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
              {result !== null ? formatResult(result, 4) : "—"}
            </span>
          </div>
          <select
            value={toId}
            onChange={(e) => setToId(e.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-emerald"
          >
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </Card>
  );
}
