import { cn } from "@/lib/utils";
import { AdsterraBanner } from "@/components/ads/adsterra-banner";

/**
 * Adsterra ad unit keys, by placement. Add the next key here as you create
 * each ad unit in the Adsterra dashboard — every slot below will pick it up
 * automatically. Leave a slot as `null` to keep showing its placeholder.
 */
const adsterraKeys = {
  topBanner: "d4e9602741e15f3d8ff4381b9ff292a9" as string | null,
  sidebar: "1bb835bb1dd5a3d8c50ee5eca4eecfb7" as string | null,
  inArticle: "5c0fea97f3d95a8d83269d027e45fb4f" as string | null,
  stickyBottom: "fe7822fb1da26d7e6444617eae3bed1a" as string | null,
  mobileBanner: "a06620e9e5af6339a7774ff8eb6db0f3" as string | null,
  /** 160x300 banner — created but not yet assigned to a placement on the site. */
  unusedBanner160x300: "acf5d804516d9b578586fffdb49070a8" as string | null,
};

/** Native Banner — a different ad format (div + script, not an iframe). */
export const nativeBannerConfig = {
  key: "6c401fbd873a264982333eafa1bf4b44",
  scriptSrc: "https://pl30139185.effectivecpmnetwork.com/6c401fbd873a264982333eafa1bf4b44/invoke.js",
};

/** Social Bar — a site-wide floating unit Adsterra renders itself once its script loads. */
export const socialBarConfig = {
  scriptSrc: "https://pl30139187.effectivecpmnetwork.com/7c/43/53/7c435343f8ae23b16f909f0defa1a9ee.js",
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
    return <AdPlaceholder id="ad-sidebar" height={600} />;
  }
  return (
    <div className="flex justify-center">
      <AdsterraBanner adKey={adsterraKeys.sidebar} width={160} height={600} />
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
        <AdPlaceholder id="ad-sticky-bottom" height={60} className="mx-auto max-w-4xl border-none bg-transparent" />
      </div>
    );
  }
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 hidden justify-center border-t border-border bg-surface/95 backdrop-blur sm:flex">
      <AdsterraBanner adKey={adsterraKeys.stickyBottom} width={468} height={60} />
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
