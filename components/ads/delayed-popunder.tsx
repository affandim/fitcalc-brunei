"use client";

import * as React from "react";

interface DelayedPopunderProps {
  /** The popunder script URL from your ad network. */
  src: string;
  /**
   * How many clicks to wait through before loading the script.
   * Most popunder scripts trigger on the NEXT click after they load — so
   * to fire on the visitor's 2nd click overall, load after click #1
   * (the default). To fire on the 3rd click, use 2, and so on.
   */
  armAfterClicks?: number;
}

/**
 * Adsterra's (and most networks') popunder script attaches its own
 * document-wide click listener as soon as it loads, then opens the
 * popunder on the very next click. That means it normally fires on a
 * visitor's FIRST click on the page.
 *
 * To delay that to a later click instead, this component waits until the
 * target click count has passed, then injects the script — so the
 * network's own listener is only listening in time for clicks after that
 * point, not the very first one.
 */
export function DelayedPopunder({ src, armAfterClicks = 1 }: DelayedPopunderProps) {
  React.useEffect(() => {
    let clickCount = 0;
    let injected = false;

    function injectScript() {
      if (injected) return;
      injected = true;
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    }

    function handleClick() {
      clickCount += 1;
      if (clickCount >= armAfterClicks) {
        injectScript();
        document.removeEventListener("click", handleClick, true);
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [src, armAfterClicks]);

  return null;
}
