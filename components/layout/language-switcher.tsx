"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>(
    siteConfig.locales.find((l) => l.default)?.code ?? "en"
  );

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-sm text-foreground/70 transition-colors hover:text-foreground hover:border-emerald"
      >
        <Languages size={15} />
        <span className="uppercase tracking-wide">{active}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-lg"
        >
          {siteConfig.locales.map((locale) => (
            <li key={locale.code}>
              <button
                type="button"
                role="option"
                aria-selected={active === locale.code}
                onClick={() => {
                  setActive(locale.code);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors hover:bg-surface-muted",
                  active === locale.code && "text-emerald font-medium"
                )}
              >
                {locale.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
