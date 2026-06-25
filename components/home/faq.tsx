"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Are FitCalc Brunei's calculators medically accurate?",
    a: "Every calculator is built on peer-reviewed formulas (e.g. Mifflin-St Jeor for BMR, WHO standards for BMI). Results are estimates intended for general guidance, not a substitute for professional medical advice.",
  },
  {
    q: "Is FitCalc Brunei free to use?",
    a: "Yes. All calculators, articles and conversion tools are free, with no account required. The site is supported by non-intrusive advertising.",
  },
  {
    q: "Can I use FitCalc Brunei in Bahasa Melayu?",
    a: "Yes — the site supports English, Bahasa Melayu Brunei and Bahasa Indonesia. Switch languages from the header at any time.",
  },
  {
    q: "How often are new calculators added?",
    a: "New calculators and articles are published weekly as the platform grows toward 150+ health, fitness, nutrition and finance tools.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-center text-sm font-medium uppercase tracking-wide text-emerald">
        Good to know
      </p>
      <h2 className="font-display mt-2 text-center text-2xl font-medium sm:text-3xl">
        Frequently asked questions
      </h2>

      <div className="mt-8 divide-y divide-border rounded-card border border-border bg-surface">
        {faqs.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-medium">{item.q}</span>
                <ChevronDown
                  size={18}
                  className={cn("shrink-0 text-foreground/40 transition-transform", open && "rotate-180 text-emerald")}
                />
              </button>
              {open && (
                <p className="px-6 pb-5 text-sm leading-relaxed text-foreground/60">{item.a}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
