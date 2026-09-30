import type { Metadata } from "next";

import { PageShell } from "@/components/site/PageShell";
import { SolarAbout, SolarBundle, SolarHero, SolarKnowledge, SolarPackages, SolarProcess } from "@/components/site/solar/SolarSections";
import { content } from "@/lib/content";
import { pageLocale } from "@/lib/i18n/page";
import { pageMetadata } from "@/lib/seo/metadata";

const page = content.pages.solar;

export async function generateMetadata({ params }: PageProps<"/[locale]/wEnergy">): Promise<Metadata> {
  return pageMetadata({ locale: await pageLocale(params), path: page.path, seo: page.seo });
}

export default async function SolarPage({ params }: PageProps<"/[locale]/wEnergy">) {
  const locale = await pageLocale(params);
  return (
    <PageShell locale={locale} path={page.path}>
      <SolarHero locale={locale} />
      <SolarAbout locale={locale} />
      <SolarProcess locale={locale} />
      <SolarPackages locale={locale} />
      <SolarBundle locale={locale} />
      <SolarKnowledge locale={locale} />
    </PageShell>
  );
}
