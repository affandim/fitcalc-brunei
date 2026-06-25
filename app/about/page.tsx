import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — our mission and methodology.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-wide text-emerald">About us</p>
      <h1 className="font-display mt-2 text-3xl font-medium sm:text-4xl">
        Built to make health numbers make sense
      </h1>
      <p className="mt-6 text-foreground/70 leading-relaxed">
        {siteConfig.name} started with a simple frustration: most health calculators online
        give you a number with no context. We set out to build a platform where every
        calculation comes with the formula behind it, what the result actually means, and
        what — if anything — you might want to do about it.
      </p>
      <p className="mt-4 text-foreground/70 leading-relaxed">
        We are building toward 150+ calculators across health, fitness, nutrition, finance
        and everyday conversions, with content available in English, Bahasa Melayu Brunei
        and Bahasa Indonesia.
      </p>
    </div>
  );
}
