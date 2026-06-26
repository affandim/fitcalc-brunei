/**
 * Calckoo — Unit Conversion Engine
 * Each converter group defines units relative to a common base unit, except
 * temperature which needs its own formula (not a simple linear factor).
 */

export interface UnitDef {
  id: string;
  label: string;
  /** Multiply a value in this unit by `toBase` to get the value in the base unit. */
  toBase: number;
}

export const lengthUnits: UnitDef[] = [
  { id: "mm", label: "Millimetres (mm)", toBase: 0.001 },
  { id: "cm", label: "Centimetres (cm)", toBase: 0.01 },
  { id: "m", label: "Metres (m)", toBase: 1 },
  { id: "km", label: "Kilometres (km)", toBase: 1000 },
  { id: "in", label: "Inches (in)", toBase: 0.0254 },
  { id: "ft", label: "Feet (ft)", toBase: 0.3048 },
  { id: "yd", label: "Yards (yd)", toBase: 0.9144 },
  { id: "mi", label: "Miles (mi)", toBase: 1609.344 },
];

export const weightUnits: UnitDef[] = [
  { id: "mg", label: "Milligrams (mg)", toBase: 0.000001 },
  { id: "g", label: "Grams (g)", toBase: 0.001 },
  { id: "kg", label: "Kilograms (kg)", toBase: 1 },
  { id: "oz", label: "Ounces (oz)", toBase: 0.0283495 },
  { id: "lb", label: "Pounds (lb)", toBase: 0.453592 },
  { id: "st", label: "Stone (st)", toBase: 6.35029 },
];

export const volumeUnits: UnitDef[] = [
  { id: "ml", label: "Millilitres (ml)", toBase: 0.001 },
  { id: "l", label: "Litres (l)", toBase: 1 },
  { id: "tsp", label: "Teaspoons (tsp)", toBase: 0.00492892 },
  { id: "tbsp", label: "Tablespoons (tbsp)", toBase: 0.0147868 },
  { id: "cup", label: "Cups", toBase: 0.236588 },
  { id: "floz", label: "Fluid ounces (fl oz)", toBase: 0.0295735 },
  { id: "gal", label: "Gallons (US)", toBase: 3.78541 },
];

export const speedUnits: UnitDef[] = [
  { id: "mps", label: "Metres/second (m/s)", toBase: 1 },
  { id: "kmh", label: "Kilometres/hour (km/h)", toBase: 0.277778 },
  { id: "mph", label: "Miles/hour (mph)", toBase: 0.44704 },
  { id: "knot", label: "Knots", toBase: 0.514444 },
];

export const timeUnits: UnitDef[] = [
  { id: "sec", label: "Seconds", toBase: 1 },
  { id: "min", label: "Minutes", toBase: 60 },
  { id: "hr", label: "Hours", toBase: 3600 },
  { id: "day", label: "Days", toBase: 86400 },
  { id: "week", label: "Weeks", toBase: 604800 },
];

export const areaUnits: UnitDef[] = [
  { id: "m2", label: "Square metres (m²)", toBase: 1 },
  { id: "km2", label: "Square kilometres (km²)", toBase: 1_000_000 },
  { id: "ft2", label: "Square feet (ft²)", toBase: 0.092903 },
  { id: "yd2", label: "Square yards (yd²)", toBase: 0.836127 },
  { id: "acre", label: "Acres", toBase: 4046.86 },
  { id: "hectare", label: "Hectares", toBase: 10000 },
];

export const dataStorageUnits: UnitDef[] = [
  { id: "kb", label: "Kilobytes (KB)", toBase: 1024 },
  { id: "mb", label: "Megabytes (MB)", toBase: 1024 ** 2 },
  { id: "gb", label: "Gigabytes (GB)", toBase: 1024 ** 3 },
  { id: "tb", label: "Terabytes (TB)", toBase: 1024 ** 4 },
  { id: "byte", label: "Bytes", toBase: 1 },
];

/** Generic linear unit conversion: value in `fromUnit` -> value in `toUnit`. */
export function convertUnits(value: number, fromUnit: UnitDef, toUnit: UnitDef): number {
  return (value * fromUnit.toBase) / toUnit.toBase;
}

/* ----------------------------- Temperature ----------------------------- */

export type TemperatureUnit = "c" | "f" | "k";

export const temperatureUnitLabels: Record<TemperatureUnit, string> = {
  c: "Celsius (°C)",
  f: "Fahrenheit (°F)",
  k: "Kelvin (K)",
};

/** Temperature conversion needs offsets, not just a factor, so it gets its own function. */
export function convertTemperature(value: number, from: TemperatureUnit, to: TemperatureUnit): number {
  // Convert to Celsius first as a common base.
  let celsius: number;
  if (from === "c") celsius = value;
  else if (from === "f") celsius = (value - 32) * (5 / 9);
  else celsius = value - 273.15;

  if (to === "c") return celsius;
  if (to === "f") return celsius * (9 / 5) + 32;
  return celsius + 273.15;
}
