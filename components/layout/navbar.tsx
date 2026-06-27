"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SearchBar } from "@/components/home/search-bar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useLocale } from "@/lib/i18n/locale-provider";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();
  const { t } = useLocale();

  React.useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-transparent bg-background/80 backdrop-blur-md transition-all",
        scrolled && "border-border shadow-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center">
          <Image
            src="/logo-horizontal.png"
            alt={siteConfig.name}
            width={160}
            height={44}
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>

        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {siteConfig.nav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-2 text-sm transition-colors hover:bg-surface-muted hover:text-foreground",
                  isActive ? "bg-surface-muted font-medium text-emerald" : "text-foreground/70"
                )}
              >
                {t.nav[item.key]}
              </Link>
            );
          })}
        </nav>

        <div className="hidden flex-1 lg:flex lg:max-w-xs">
          <SearchBar />
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-border lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 pb-6 pt-4 lg:hidden">
          <SearchBar className="mb-4" onNavigate={() => setMobileOpen(false)} />
          <nav className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-sm hover:bg-surface-muted",
                    isActive ? "font-medium text-emerald" : "text-foreground/80"
                  )}
                >
                  {t.nav[item.key]}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
