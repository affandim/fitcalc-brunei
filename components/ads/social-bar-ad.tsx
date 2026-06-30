"use client";

import * as React from "react";
import { socialBarConfig } from "@/components/ads/ad-slots";

/**
 * Renders Adsterra's Social Bar — a site-wide floating unit that Adsterra's
 * own script renders and positions itself (similar to a cookie-consent bar
 * or chat widget). Loaded once, after the browser is idle, so it doesn't
 * compete with the page's critical render path.
 */
export function SocialBarAd() {
  const injectedRef = React.useRef(false);

  React.useEffect(() => {
    function inject() {
      if (injectedRef.current) return;
      injectedRef.current = true;
      const script = document.createElement("script");
      script.src = socialBarConfig.scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    }

    const win = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
    };
    if (typeof win.requestIdleCallback === "function") {
      const id = win.requestIdleCallback(inject);
      return () => {
        if (typeof window.cancelIdleCallback === "function") {
          window.cancelIdleCallback(id);
        }
      };
    }
    const timeout = setTimeout(inject, 200);
    return () => clearTimeout(timeout);
  }, []);

  return null;
}
