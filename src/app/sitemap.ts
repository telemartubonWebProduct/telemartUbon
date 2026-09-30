import type { MetadataRoute } from "next";

import { publicPages } from "@/content/routes";
import { localizePath, locales } from "@/lib/i18n/locales";
import { languageAlternates, siteUrl } from "@/lib/seo/metadata";

// Every public page in both languages, each listing its alternates.
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteUrl();
  const absolute = (path: string) => new URL(path, origin).href;
  return publicPages.flatMap(({ path }) =>
    locales.map((locale) => ({
      url: absolute(localizePath(path, locale)),
      alternates: {
        languages: Object.fromEntries(Object.entries(languageAlternates(path)).map(([lang, href]) => [lang, absolute(href)])),
      },
    })),
  );
}
