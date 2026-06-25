"use client";

import { motion } from "framer-motion";
import { SearchBar } from "@/components/home/search-bar";

const stats = [
  { value: "150+", label: "Health calculators" },
  { value: "500+", label: "In-depth articles" },
  { value: "3", label: "Languages supported" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface-muted/40">
      <div className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium uppercase tracking-[0.2em] text-emerald"
          >
            Brunei&apos;s health calculator platform
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display mt-4 text-balance text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl"
          >
            Measure what matters
            <span className="text-emerald">.</span>
            <br />
            Understand it instantly.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-5 max-w-xl text-balance text-foreground/65"
          >
            From BMI to body fat, calories to heart rate zones — every calculator
            comes with the formula, the context, and what your number actually means.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-8 max-w-xl"
          >
            <SearchBar size="lg" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
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
