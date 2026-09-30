import type { Metadata } from "next";

import { Faq, FeaturedPackages, HomeSteps, MobileAddons, ServiceChooser, SolarTeaser } from "@/components/site/home/HomeSections";
import { HomeHero } from "@/components/site/home/HomeHero";
import { PageShell } from "@/components/site/PageShell";
import { content } from "@/lib/content";
import { pageLocale } from "@/lib/i18n/page";
import { pageMetadata } from "@/lib/seo/metadata";

const page = content.pages.home;

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  return pageMetadata({ locale: await pageLocale(params), path: page.path, seo: page.seo });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = await pageLocale(params);
  return (
    <PageShell locale={locale} path={page.path}>
      <HomeHero locale={locale} />
      <ServiceChooser locale={locale} />
      <FeaturedPackages locale={locale} />
      <MobileAddons locale={locale} />
      <HomeSteps locale={locale} />
      <SolarTeaser locale={locale} />
      <Faq locale={locale} />
    </PageShell>
  );
}
