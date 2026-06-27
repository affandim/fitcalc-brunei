"use client";

import { motion } from "framer-motion";
import { SearchBar } from "@/components/home/search-bar";
import { useLocale } from "@/lib/i18n/locale-provider";

export function Hero() {
  const { t } = useLocale();

  const stats = [
    { value: "150+", label: t.hero.statCalculators },
    { value: "500+", label: t.hero.statArticles },
    { value: "3", label: t.hero.statLanguages },
  ];

  return (
    <section className="relative overflow-hidden bg-surface-muted/40">
      <div className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald">
            {t.hero.eyebrow}
          </p>

          <h1 className="font-display mt-4 text-balance text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl">
            {t.hero.headline1}
            <span className="text-emerald">.</span>
            <br />
            {t.hero.headline2}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-balance text-foreground/65">
            {t.hero.subtext}
          </p>

          <div className="mx-auto mt-8 max-w-xl">
            <SearchBar size="lg" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-12 flex items-center justify-center gap-8 sm:gap-12"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-mono text-2xl font-medium text-emerald sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-foreground/50">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="vital-tape vital-tape-draw" />
    </section>
  );
}
