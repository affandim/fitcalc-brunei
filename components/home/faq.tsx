"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/locale-provider";

export function Faq() {
  const { t } = useLocale();
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-center text-sm font-medium uppercase tracking-wide text-emerald">
        {t.faq.eyebrow}
      </p>
      <h2 className="font-display mt-2 text-center text-2xl font-medium sm:text-3xl">
        {t.faq.title}
      </h2>

      <div className="mt-8 divide-y divide-border rounded-card border border-border bg-surface">
        {t.faq.items.map((item, i) => {
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
