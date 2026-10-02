import type { Metadata, Viewport } from "next";

import { ConsentBanner, type ConsentText } from "@/components/site/consent/ConsentBanner";
import { SiteTags } from "@/components/site/consent/SiteTags";
import { fontVariables } from "@/fonts";
import { getPublishedContent } from "@/lib/content/published";
import { resolveLink, tx } from "@/lib/content/render";
import { themeVariables } from "@/lib/content/theme";
import { locales } from "@/lib/i18n/locales";
import { pageLocale } from "@/lib/i18n/page";
import { siteUrl } from "@/lib/seo/metadata";

import "@/styles/tokens.css";
import "../globals.css";

// Root layout of the public site. Thai pages are served at the unprefixed URLs
// through a rewrite in next.config.ts; English pages live under /en. Each page
// renders its own header and footer (PageShell) so the menu and the language
// switch know the page they are on. Fonts come from src/fonts, shared with
// the back office (whose preview must render the same faces).

// true so pages can regenerate after a publish (M4): with false, Next 16.3.7
// refuses to re-render an expired page (NoFallbackError) and keeps serving the
// old one. Unknown languages still 404 in pageLocale().
export const dynamicParams = true;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const locale = await pageLocale(params);
  const { seo } = (await getPublishedContent()).site;
  const siteName = tx(seo.siteName, locale);
  return {
    metadataBase: siteUrl(),
    title: { default: siteName, template: `%s | ${siteName}` },
    description: tx(seo.description, locale),
    applicationName: siteName,
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default async function PublicRootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const locale = await pageLocale(params);
  const { site } = await getPublishedContent();
  const { googleAdsId, ga4MeasurementId, tawkSrc } = site.integrations;
  const { policyVersion, ...consentCopy } = site.consent;
  const consentText = Object.fromEntries(Object.entries(consentCopy).map(([key, text]) => [key, tx(text, locale)])) as ConsentText;
  const policyHref = resolveLink({ kind: "page", path: "/termsAndPrivacy", hash: "cookies" }, locale, site).href;

  return (
    <html lang={locale} className={fontVariables}>
      {/* Theme colours from site settings; the default theme adds nothing. */}
      <body className="tm-site" style={themeVariables(site.theme)}>
        {/* First, so keyboard and screen-reader users meet the choice before the page. */}
        <ConsentBanner text={consentText} policyHref={policyHref} policyVersion={policyVersion} />
        {children}
        {/* Google Ads (as on the old site), Google Analytics 4 on the production domain and Tawk chat, each only after consent; the home page reports its Ads conversion (AdsConversion). */}
        <SiteTags
          googleAdsId={googleAdsId}
          ga4MeasurementId={ga4MeasurementId}
          productionHost={siteUrl().hostname}
          tawkSrc={tawkSrc}
          policyVersion={policyVersion}
        />
      </body>
    </html>
  );
}
