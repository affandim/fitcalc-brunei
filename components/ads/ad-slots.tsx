import { cn } from "@/lib/utils";
import { AdsterraBanner } from "@/components/ads/adsterra-banner";

/**
 * Adsterra ad unit keys, by placement. Add the next key here as you create
 * each ad unit in the Adsterra dashboard — every slot below will pick it up
 * automatically. Leave a slot as `null` to keep showing its placeholder.
 */
const adsterraKeys = {
  topBanner: "b04d6714c5e53838a9438b035e39dceb" as string | null,
  sidebar: null as string | null,
  inArticle: null as string | null,
  stickyBottom: null as string | null,
  mobileBanner: null as string | null,
};

interface AdSlotProps {
  id: string;
  className?: string;
  label?: string;
  /** Visual height reserved before the ad script loads, to prevent layout shift. */
  height?: number;
}

/** Placeholder shown for any slot that doesn't have a live Adsterra key yet. */
function AdPlaceholder({ id, className, label = "Advertisement", height = 90 }: AdSlotProps) {
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
  if (!adsterraKeys.topBanner) {
    return <AdPlaceholder id="ad-top-banner" height={90} className="mx-auto max-w-5xl" />;
  }
  return (
    <div className="mx-auto hidden max-w-5xl justify-center sm:flex">
      <AdsterraBanner adKey={adsterraKeys.topBanner} width={728} height={90} />
    </div>
  );
}

export function SidebarAd() {
  if (!adsterraKeys.sidebar) {
    return <AdPlaceholder id="ad-sidebar" height={250} />;
  }
  return (
    <div className="flex justify-center">
      <AdsterraBanner adKey={adsterraKeys.sidebar} width={300} height={250} />
    </div>
  );
}

export function InArticleAd() {
  if (!adsterraKeys.inArticle) {
    return <AdPlaceholder id="ad-in-article" height={120} label="Advertisement" />;
  }
  return (
    <div className="flex justify-center">
      <AdsterraBanner adKey={adsterraKeys.inArticle} width={300} height={250} />
    </div>
  );
}

export function StickyBottomAd() {
  if (!adsterraKeys.stickyBottom) {
    return (
      <div className="fixed inset-x-0 bottom-0 z-40 hidden border-t border-border bg-surface/95 backdrop-blur sm:block">
        <AdPlaceholder id="ad-sticky-bottom" height={70} className="mx-auto max-w-4xl border-none bg-transparent" />
      </div>
    );
  }
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 hidden justify-center border-t border-border bg-surface/95 backdrop-blur sm:flex">
      <AdsterraBanner adKey={adsterraKeys.stickyBottom} width={728} height={90} />
    </div>
  );
}

export function MobileBannerAd() {
  if (!adsterraKeys.mobileBanner) {
    return <AdPlaceholder id="ad-mobile-banner" height={60} className="sm:hidden" />;
  }
  return (
    <div className="flex justify-center sm:hidden">
      <AdsterraBanner adKey={adsterraKeys.mobileBanner} width={320} height={50} />
    </div>
  );
}
