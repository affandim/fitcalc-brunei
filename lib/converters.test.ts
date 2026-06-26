import { describe, it, expect } from "vitest";
import {
  convertUnits,
  convertTemperature,
  lengthUnits,
  weightUnits,
  volumeUnits,
  speedUnits,
  timeUnits,
  areaUnits,
  dataStorageUnits,
} from "@/lib/converters";

function find(units: typeof lengthUnits, id: string) {
  const u = units.find((unit) => unit.id === id);
  if (!u) throw new Error(`unit ${id} not found`);
  return u;
}

describe("convertUnits — length", () => {
  it("converts km to m correctly", () => {
    expect(convertUnits(1, find(lengthUnits, "km"), find(lengthUnits, "m"))).toBeCloseTo(1000, 5);
  });
  it("converts miles to km correctly", () => {
    expect(convertUnits(1, find(lengthUnits, "mi"), find(lengthUnits, "km"))).toBeCloseTo(1.609344, 5);
  });
});

describe("convertUnits — weight", () => {
  it("converts kg to lb correctly", () => {
    expect(convertUnits(1, find(weightUnits, "kg"), find(weightUnits, "lb"))).toBeCloseTo(2.20462, 3);
  });
});

describe("convertUnits — volume", () => {
  it("converts litres to cups correctly", () => {
    expect(convertUnits(1, find(volumeUnits, "l"), find(volumeUnits, "cup"))).toBeCloseTo(4.22675, 3);
  });
});

describe("convertUnits — speed", () => {
  it("converts km/h to mph correctly", () => {
    expect(convertUnits(100, find(speedUnits, "kmh"), find(speedUnits, "mph"))).toBeCloseTo(62.137, 2);
  });
});

describe("convertUnits — time", () => {
  it("converts days to hours correctly", () => {
    expect(convertUnits(1, find(timeUnits, "day"), find(timeUnits, "hr"))).toBeCloseTo(24, 5);
  });
});

describe("convertTemperature", () => {
  it("converts Celsius to Fahrenheit correctly", () => {
    expect(convertTemperature(0, "c", "f")).toBeCloseTo(32, 5);
    expect(convertTemperature(100, "c", "f")).toBeCloseTo(212, 5);
  });
  it("converts Fahrenheit to Celsius correctly", () => {
    expect(convertTemperature(32, "f", "c")).toBeCloseTo(0, 5);
  });
  it("converts Celsius to Kelvin correctly", () => {
    expect(convertTemperature(0, "c", "k")).toBeCloseTo(273.15, 5);
  });
  it("round-trips through the same unit unchanged", () => {
    expect(convertTemperature(37, "c", "c")).toBeCloseTo(37, 5);
  });
});

describe("convertUnits — area", () => {
  it("converts hectares to square metres correctly", () => {
    expect(convertUnits(1, find(areaUnits, "hectare"), find(areaUnits, "m2"))).toBeCloseTo(10000, 5);
  });
  it("converts acres to square metres correctly", () => {
    expect(convertUnits(1, find(areaUnits, "acre"), find(areaUnits, "m2"))).toBeCloseTo(4046.86, 1);
  });
});

describe("convertUnits — data storage", () => {
  it("converts gigabytes to megabytes correctly", () => {
    expect(convertUnits(1, find(dataStorageUnits, "gb"), find(dataStorageUnits, "mb"))).toBeCloseTo(1024, 5);
  });
  it("converts terabytes to gigabytes correctly", () => {
    expect(convertUnits(1, find(dataStorageUnits, "tb"), find(dataStorageUnits, "gb"))).toBeCloseTo(1024, 5);
  });
});
