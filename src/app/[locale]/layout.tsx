import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import Script from "next/script";

import { content } from "@/lib/content";
import { tx } from "@/lib/content/render";
import { locales } from "@/lib/i18n/locales";
import { pageLocale } from "@/lib/i18n/page";
import { siteUrl } from "@/lib/seo/metadata";

import "@/styles/tokens.css";
import "../globals.css";

// Root layout of the public site. Thai pages are served at the unprefixed URLs
// through a rewrite in next.config.ts; English pages live under /en. Each page
// renders its own header and footer (PageShell) so the menu and the language
// switch know the page they are on.
const plexThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plex-thai",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const locale = await pageLocale(params);
  const { seo } = content.site;
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
  const { googleAdsId, tawkSrc } = content.site.integrations;

  return (
    <html lang={locale} className={plexThai.variable}>
      <body className="tm-site">
        {children}
        {/* Google Ads base tag, as on the old site. Conversion events are defined in M5. */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${googleAdsId}');`}
        </Script>
        {/* Tawk live chat, as on the old site; loaded once the page is idle. */}
        <Script src={tawkSrc} strategy="lazyOnload" />
      </body>
    </html>
  );
}
