"use client";

import { cn } from "@/lib/utils";

interface NumberFieldProps {
  label: string;
  unit?: string;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- shared across many distinct zod schemas
  register: any;
  name: string;
  placeholder?: string;
}

export function NumberField({ label, unit, error, register, name, placeholder }: NumberFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground/80">{label}</span>
      <div
        className={cn(
          "mt-1.5 flex h-12 items-center rounded-xl border border-border bg-surface px-4 transition-colors focus-within:border-emerald",
          error && "border-red-400"
        )}
      >
        <input
          type="number"
          step="any"
          inputMode="decimal"
          placeholder={placeholder}
          {...register(name, { valueAsNumber: true })}
          className="w-full bg-transparent text-sm outline-none"
        />
        {unit && <span className="shrink-0 text-sm text-foreground/40">{unit}</span>}
      </div>
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}

interface SegmentedControlProps<T extends string> {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div>
      <span className="text-sm font-medium text-foreground/80">{label}</span>
      <div className="mt-1.5 flex gap-1.5 rounded-xl bg-surface-muted p-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex-1 rounded-lg py-2 text-sm font-medium transition-colors",
              value === opt.value
                ? "bg-emerald text-white"
                : "text-foreground/60 hover:text-foreground"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
