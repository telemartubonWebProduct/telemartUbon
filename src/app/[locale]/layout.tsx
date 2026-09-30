import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";

import { isLocale, locales } from "@/lib/i18n/locales";

import "@/styles/tokens.css";
import "../globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Root layout of the public site. Thai pages are served at the unprefixed URLs
// through a rewrite in next.config.ts; English pages live under /en.
const prompt = Prompt({
  subsets: ["thai"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "TelemartUbon",
};

export default async function PublicRootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale}>
      <body>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18007307609"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', 'AW-18007307609');
            `,
          }}
        />
        <AppRouterCacheProvider>
          <div className={prompt.className}>{children}</div>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
