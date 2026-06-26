import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { UnitConverterForm } from "@/components/calculators/unit-converter-form";
import { dataStorageUnits } from "@/lib/converters";

const calculator = calculators.find((c) => c.slug === "data-storage-converter")!;

export const metadata: Metadata = {
  title: "Data Storage Converter — KB, MB, GB, TB",
  description: "Convert between bytes, kilobytes, megabytes, gigabytes and terabytes instantly.",
  alternates: { canonical: "/calculators/data-storage-converter" },
};

const faqs = [
  {
    question: "Why does my hard drive show less space than advertised?",
    answer:
      "Storage manufacturers typically advertise capacity using decimal (1000-based) units, while operating systems display it using binary (1024-based) units, like this converter does. A drive advertised as 1TB shows as roughly 931 GiB in binary units — the drive isn't missing space, the units just measure differently.",
  },
  {
    question: "Why 1024 instead of 1000?",
    answer:
      "Computers operate in binary, where 2¹⁰ (1024) is a more natural round number than 1000. This convention (KB = 1024 bytes) has been the traditional standard in computing, even though it technically conflicts with the metric prefix system.",
  },
];

export default function DataStorageConverterPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <UnitConverterForm units={dataStorageUnits} defaultFromId="gb" defaultToId="mb" />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Why "1GB" doesn't always mean the same number of bytes
      </h2>
      <p>
        Computing has historically used 1024 (2¹⁰) as the base for storage units, since binary
        systems work naturally in powers of two — this calculator follows that convention. Some
        manufacturers instead market storage using decimal (1000-based) units, which is part of
        why a drive's advertised capacity and your operating system's reported capacity can
        differ slightly, even though no storage space is actually missing.
      </p>
    </article>
  );
}
