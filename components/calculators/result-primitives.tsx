"use client";

import { cn } from "@/lib/utils";

interface ResultBigNumberProps {
  value: string;
  unit?: string;
  label: string;
  tone?: "default" | "emerald";
}

export function ResultBigNumber({ value, unit, label, tone = "emerald" }: ResultBigNumberProps) {
  return (
    <div className="text-center">
      <p
        className={cn(
          "font-mono text-5xl font-medium tracking-tight sm:text-6xl",
          tone === "emerald" ? "text-emerald" : "text-foreground"
        )}
      >
        {value}
        {unit && <span className="ml-1 text-2xl text-foreground/40">{unit}</span>}
      </p>
      <p className="mt-2 text-sm uppercase tracking-wide text-foreground/50">{label}</p>
    </div>
  );
}

interface RangeSegment {
  label: string;
  from: number;
  to: number;
  color: string;
}

interface RangeBarProps {
  segments: RangeSegment[];
  value: number;
  min: number;
  max: number;
}

/** Horizontal coloured range bar with a marker showing where the result lands. */
export function RangeBar({ segments, value, min, max }: RangeBarProps) {
  const clamped = Math.max(min, Math.min(max, value));
  const percent = ((clamped - min) / (max - min)) * 100;

  return (
    <div className="mt-2">
      <div className="relative h-3 w-full overflow-hidden rounded-full">
        <div className="flex h-full w-full">
          {segments.map((seg) => (
            <div
              key={seg.label}
              style={{
                width: `${((seg.to - seg.from) / (max - min)) * 100}%`,
                backgroundColor: seg.color,
              }}
            />
          ))}
        </div>
        <div
          className="absolute top-0 h-full w-0.5 bg-ink shadow-[0_0_0_2px_white]"
          style={{ left: `${percent}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-foreground/50">
        {segments.map((seg) => (
          <span key={seg.label}>{seg.label}</span>
        ))}
      </div>
    </div>
  );
}

interface StatRowProps {
  label: string;
  value: string;
}

export function StatRow({ label, value }: StatRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-border py-3 last:border-none">
      <span className="text-sm text-foreground/60">{label}</span>
      <span className="font-mono text-sm font-medium">{value}</span>
    </div>
  );
}
