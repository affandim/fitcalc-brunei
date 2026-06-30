"use client";

import * as React from "react";
import { nativeBannerConfig } from "@/components/ads/ad-slots";

/**
 * Renders an Adsterra Native Banner unit.
 *
 * Unlike the Banner format (which we isolate inside an iframe since it uses
 * document.write), Native Banner injects content directly into a target
 * `<div>` via its own script — there's no document.write involved, so no
 * iframe isolation is needed. We still defer mounting until the browser is
 * idle, same as the other Adsterra placements, to keep it out of the
 * critical render path that affects LCP.
 */
export function NativeBannerAd() {
  const containerId = `container-${nativeBannerConfig.key}`;
  const [ready, setReady] = React.useState(false);
  const injectedRef = React.useRef(false);

  React.useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
    };
    if (typeof win.requestIdleCallback === "function") {
      const id = win.requestIdleCallback(() => setReady(true));
      return () => {
        if (typeof window.cancelIdleCallback === "function") {
          window.cancelIdleCallback(id);
        }
      };
    }
    const timeout = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  React.useEffect(() => {
    if (!ready || injectedRef.current) return;
    injectedRef.current = true;
    const script = document.createElement("script");
    script.src = nativeBannerConfig.scriptSrc;
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    document.body.appendChild(script);
  }, [ready]);

  return <div id={containerId} className="w-full" />;
}
