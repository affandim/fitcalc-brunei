import type { Metadata } from "next";
import { CalculatorsDirectory } from "@/components/calculators/calculators-directory";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "All Calculators",
  description: "Browse every health, fitness, nutrition and finance calculator on Calckoo.",
  path: "/calculators",
});

export default function CalculatorsIndexPage() {
  return <CalculatorsDirectory />;
}
