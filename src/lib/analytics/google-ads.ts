// Google Ads tag of the public site, as on the old site: the public root layout
// loads the base tag, and the home page reports a conversion each time it opens
// on the production domain (src/components/site/AdsConversion.tsx). The editor
// and its preview load neither.

/** Dispatched on window once gtag() exists and the tag's config is queued. */
export const GTAG_READY_EVENT = "tm:gtag-ready";

/** Inline script that defines gtag(), queues the tag's config and announces it. */
export function gtagInitScript(googleAdsId: string): string {
  return [
    "window.dataLayer=window.dataLayer||[];",
    "function gtag(){dataLayer.push(arguments);}",
    "window.gtag=gtag;",
    "gtag('js',new Date());",
    `gtag('config',${JSON.stringify(googleAdsId)});`,
    `window.dispatchEvent(new Event(${JSON.stringify(GTAG_READY_EVENT)}));`,
  ].join("");
}
