import { cn } from "@/lib/utils";

interface AdSlotProps {
  id: string;
  className?: string;
  label?: string;
  /** Visual height reserved before the ad script loads, to prevent layout shift. */
  height?: number;
}

/**
 * Generic ad placeholder. Each variant below reserves the right shape and
 * position for an Adsterra unit. Swap the inner div for the network's
 * actual embed script when credentials are available — the surrounding
 * layout, spacing and CLS-safe sizing stays the same.
 */
function AdSlot({ id, className, label = "Advertisement", height = 90 }: AdSlotProps) {
  return (
    <div
      id={id}
      data-ad-slot={id}
      style={{ minHeight: height }}
      className={cn(
        "flex w-full items-center justify-center rounded-xl border border-dashed border-border bg-surface-muted/60 text-[11px] uppercase tracking-wide text-foreground/30",
        className
      )}
    >
      {label}
    </div>
  );
}

export function TopBannerAd() {
  return <AdSlot id="ad-top-banner" height={90} className="mx-auto max-w-5xl" />;
}

export function SidebarAd() {
  return <AdSlot id="ad-sidebar" height={250} />;
}

export function InArticleAd() {
  return <AdSlot id="ad-in-article" height={120} label="Advertisement" />;
}

export function StickyBottomAd() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 hidden border-t border-border bg-surface/95 backdrop-blur sm:block">
      <AdSlot id="ad-sticky-bottom" height={70} className="mx-auto max-w-4xl border-none bg-transparent" />
    </div>
  );
}

export function MobileBannerAd() {
  return <AdSlot id="ad-mobile-banner" height={60} className="sm:hidden" />;
}
