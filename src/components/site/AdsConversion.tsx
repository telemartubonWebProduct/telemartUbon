"use client";

import { useEffect, useRef } from "react";

import { GTAG_READY_EVENT } from "@/lib/analytics/google-ads";

/**
 * Reports one Google Ads conversion each time the page that renders it opens,
 * once the tag is ready: the tag's inline script runs after hydration, so it
 * may come before or after this effect. Only public routes render it; the
 * editor preview shares the page views but not this.
 */
export function AdsConversion({ sendTo }: { sendTo: string }) {
  // Development runs effects twice; the page still opened once.
  const sent = useRef(false);

  useEffect(() => {
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
  }, [sendTo]);

  return null;
}
