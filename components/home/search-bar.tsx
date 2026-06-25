"use client";

import * as React from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { calculators } from "@/data/calculators";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  size?: "md" | "lg";
  placeholder?: string;
  /** Called after a result is chosen — used by the header to close mobile menus etc. */
  onNavigate?: () => void;
}

export function SearchBar({
  className,
  size = "md",
  placeholder = "Search 150+ calculators…",
  onNavigate,
}: SearchBarProps) {
  const [query, setQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const results = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return calculators
      .filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.shortDescription.toLowerCase().includes(q) ||
          c.category.includes(q)
      )
      .slice(0, 6);
  }, [query]);

  React.useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const showPanel = focused && query.trim().length > 0;

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div
        className={cn(
          "flex items-center gap-2 rounded-full border border-border bg-surface px-4 transition-colors focus-within:border-emerald",
          size === "lg" ? "h-14" : "h-11"
        )}
      >
        <Search size={size === "lg" ? 20 : 16} className="text-foreground/40 shrink-0" />
        <input
          type="text"
          value={query}
          onFocus={() => setFocused(true)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Search calculators"
          className={cn(
            "w-full bg-transparent outline-none placeholder:text-foreground/40",
            size === "lg" ? "text-base" : "text-sm"
          )}
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setQuery("")}
            className="text-foreground/40 hover:text-foreground"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {showPanel && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-xl">
          {results.length === 0 ? (
            <p className="px-4 py-4 text-sm text-foreground/50">
              No calculators match &ldquo;{query}&rdquo; yet.
            </p>
          ) : (
            <ul role="listbox" className="max-h-80 overflow-y-auto py-1">
              {results.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/calculators/${c.slug}`}
                    onClick={() => {
                      setQuery("");
                      setFocused(false);
                      onNavigate?.();
                    }}
                    className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-surface-muted"
                  >
                    <span>
                      <span className="block text-sm font-medium">{c.title}</span>
                      <span className="block text-xs text-foreground/50">
                        {c.shortDescription}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-full bg-emerald/10 px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-emerald">
                      {c.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
