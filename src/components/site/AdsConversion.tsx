"use client";

import { useEffect, useRef } from "react";

import { GTAG_READY_EVENT } from "@/lib/analytics/google-ads";

type AdsConversionProps = {
  sendTo: string;
  /** Only pages opened on this host count; previews and development machines do not. */
  productionHost: string;
};

/**
 * Reports one Google Ads conversion each time the page that renders it opens
 * on the production domain, once the tag is ready: the tag's inline script runs
 * after hydration, so it may come before or after this effect. Only public
 * routes render it; the editor preview shares the page views but not this.
 */
export function AdsConversion({ sendTo, productionHost }: AdsConversionProps) {
  // Development runs effects twice; the page still opened once.
  const sent = useRef(false);

  useEffect(() => {
    if (window.location.hostname !== productionHost) return;
    const send = () => {
      if (sent.current) return;
      sent.current = true;
      window.gtag("event", "conversion", { send_to: sendTo, value: 1.0, currency: "THB" });
    };
    if (typeof window.gtag === "function") {
      send();
      return;
    }
    window.addEventListener(GTAG_READY_EVENT, send, { once: true });
    return () => window.removeEventListener(GTAG_READY_EVENT, send);
  }, [sendTo, productionHost]);

  return null;
}
