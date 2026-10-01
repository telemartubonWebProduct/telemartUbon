import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { renderContext } from "@/components/site/context";
import { PackageDetailView } from "@/components/site/PackageDetailView";
import { content } from "@/lib/content";
import { detailPackagesIn } from "@/lib/content/lookup";
import { packageDetailPath } from "@/lib/content/package-facts";
import { formatNumber } from "@/lib/content/render";
import type { CatalogPackage } from "@/lib/content/schema";
import { pageLocale } from "@/lib/i18n/page";
import { pageMetadata } from "@/lib/seo/metadata";

// A page per package that visitors may see (docs/renovation/R3-PACKAGE-PAGES.md);
// hidden imports and unknown ids are a 404.

export const dynamicParams = false;

export function generateStaticParams() {
  return detailPackagesIn(content).map((item) => ({ packageId: item.id }));
}

function packageFor(id: string): CatalogPackage {
  const item = detailPackagesIn(content).find((entry) => entry.id === id);
  if (!item) notFound();
  return item;
}

export async function generateMetadata({ params }: PageProps<"/[locale]/packages/[packageId]">): Promise<Metadata> {
  const locale = await pageLocale(params);
  const item = packageFor((await params).packageId);
  const { ui } = content.site;
  const price = (lang: "th" | "en") =>
    `${formatNumber(item.price.amount, lang)} ${(item.price.per === "month" ? ui.perMonth : ui.baht)[lang]}`;
  return pageMetadata({
    locale,
    path: packageDetailPath(item.id),
    seo: {
      title: item.name,
      description: {
        th: [item.name.th, item.allowance?.th, price("th")].filter(Boolean).join(" "),
        en: [item.name.en, item.allowance?.en, price("en")].filter(Boolean).join(" "),
      },
    },
  });
}

export default async function Page({ params }: PageProps<"/[locale]/packages/[packageId]">) {
  const locale = await pageLocale(params);
  return <PackageDetailView ctx={renderContext(content, locale)} item={packageFor((await params).packageId)} />;
}
