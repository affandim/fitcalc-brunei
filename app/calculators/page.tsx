import type { Metadata } from "next";
import { CalculatorsDirectory } from "@/components/calculators/calculators-directory";

export const metadata: Metadata = {
  title: "All Calculators",
  description: "Browse every health, fitness, nutrition and finance calculator on FitCalc Brunei.",
};

export default function CalculatorsIndexPage() {
  return <CalculatorsDirectory />;
}
