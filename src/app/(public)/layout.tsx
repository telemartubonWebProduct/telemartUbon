import { Prompt } from "next/font/google";
import Script from "next/script";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Legacy public site chrome, kept as-is until the M2 redesign replaces these
// pages. The Google Ads tag must not load in the back office or previews.
const prompt = Prompt({
  subsets: ["thai"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
      {/* Flushes MUI/Emotion styles into <head> during SSR instead of inline
          <style> tags in <body>, which caused production hydration errors. */}
      <AppRouterCacheProvider>
        <div className={prompt.className}>{children}</div>
      </AppRouterCacheProvider>
    </>
  );
}
