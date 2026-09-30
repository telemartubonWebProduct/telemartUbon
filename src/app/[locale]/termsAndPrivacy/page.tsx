import type { Metadata } from "next";

import { LegalText } from "@/components/site/LegalText";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { content } from "@/lib/content";
import { tx } from "@/lib/content/render";
import { pageLocale } from "@/lib/i18n/page";
import { pageMetadata } from "@/lib/seo/metadata";

const page = content.pages.terms;

export async function generateMetadata({ params }: PageProps<"/[locale]/termsAndPrivacy">): Promise<Metadata> {
  return pageMetadata({ locale: await pageLocale(params), path: page.path, seo: page.seo });
}

export default async function TermsPage({ params }: PageProps<"/[locale]/termsAndPrivacy">) {
  const locale = await pageLocale(params);
  return (
    <PageShell locale={locale} path={page.path}>
      <PageHero heading={tx(page.heading, locale)} description={tx(page.intro, locale)} />
      <LegalText page={page} locale={locale} />
    </PageShell>
  );
}
