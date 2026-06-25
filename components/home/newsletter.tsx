"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-card border border-border bg-surface-muted/60 p-8 text-center sm:p-12">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald/10 text-emerald">
          <Mail size={20} />
        </div>
        <h2 className="font-display mt-4 text-2xl font-medium sm:text-3xl">
          New calculators, straight to your inbox
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-foreground/60">
          One short email a month. No spam, unsubscribe any time.
        </p>

        {submitted ? (
          <p className="mt-6 text-sm font-medium text-emerald">
            You&apos;re subscribed — thanks for joining.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
              className="h-12 w-full rounded-full border border-border bg-surface px-5 text-sm outline-none focus:border-emerald"
            />
            <Button type="submit" size="md" className="shrink-0">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
