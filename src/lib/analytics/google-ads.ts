// Google tags of the public site. The public root layout loads gtag.js once for
// Google Ads (as on the old site) and Google Analytics 4; the home page reports
// an Ads conversion each time it opens on the production domain
// (src/components/site/AdsConversion.tsx). GA4 is configured only on the
// production domain too, so previews and development add nothing to the
// reports. The editor and its preview load neither.

/** Dispatched on window once gtag() exists and the tag's config is queued. */
export const GTAG_READY_EVENT = "tm:gtag-ready";

type GtagOptions = {
  googleAdsId: string;
  /** GA4 Measurement ID (G-…); absent leaves Analytics off. */
  ga4MeasurementId?: string;
  /** Host that counts in Analytics: the site's own domain. */
  productionHost: string;
};

/** Inline script that defines gtag(), queues the tags' config and announces it. */
export function gtagInitScript({ googleAdsId, ga4MeasurementId, productionHost }: GtagOptions): string {
  return [
    "window.dataLayer=window.dataLayer||[];",
    "function gtag(){dataLayer.push(arguments);}",
    "window.gtag=gtag;",
    "gtag('js',new Date());",
    `gtag('config',${JSON.stringify(googleAdsId)});`,
    ga4MeasurementId ? `if(location.hostname===${JSON.stringify(productionHost)})gtag('config',${JSON.stringify(ga4MeasurementId)});` : "",
    `window.dispatchEvent(new Event(${JSON.stringify(GTAG_READY_EVENT)}));`,
  ].join("");
}
