import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { renderContext } from "@/components/site/context";
import { PackageDetailView } from "@/components/site/PackageDetailView";
import { detailPackagesIn } from "@/lib/content/lookup";
import { packageDetailPath } from "@/lib/content/package-facts";
import { getPublishedContent } from "@/lib/content/published";
import { formatNumber } from "@/lib/content/render";
import type { CatalogPackage, SiteContent } from "@/lib/content/schema";
import { pageLocale } from "@/lib/i18n/page";
import { pageMetadata } from "@/lib/seo/metadata";

// A page per package that visitors may see (docs/renovation/R3-PACKAGE-PAGES.md).
// The packages published at build time are prerendered; one published later
// from the editor (M4) renders on its first visit. Hidden and unknown ids are a 404.

export const dynamicParams = true;

type RouteProps = { params: Promise<{ locale: string; packageId: string }> };

export async function generateStaticParams() {
  return detailPackagesIn(await getPublishedContent()).map((item) => ({ packageId: item.id }));
}

function packageFor(content: SiteContent, id: string): CatalogPackage {
  const item = detailPackagesIn(content).find((entry) => entry.id === id);
  if (!item) notFound();
  return item;
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const locale = await pageLocale(params);
  const content = await getPublishedContent();
  const item = packageFor(content, (await params).packageId);
  const { ui } = content.site;
  const price = (lang: "th" | "en") => `${formatNumber(item.price.amount, lang)} ${(item.price.per === "month" ? ui.perMonth : ui.baht)[lang]}`;
  return pageMetadata({
    locale,
    path: packageDetailPath(item.id),
    content,
    seo: {
      title: item.name,
      description: {
        th: [item.name.th, item.allowance?.th, price("th")].filter(Boolean).join(" "),
        en: [item.name.en, item.allowance?.en, price("en")].filter(Boolean).join(" "),
      },
    },
  });
}

export default async function Page({ params }: RouteProps) {
  const locale = await pageLocale(params);
  const content = await getPublishedContent();
  return <PackageDetailView ctx={renderContext(content, locale)} item={packageFor(content, (await params).packageId)} />;
}
