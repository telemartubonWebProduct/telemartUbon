import type { Metadata } from "next";

import { ContactChannels } from "@/components/site/ContactChannels";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { content } from "@/lib/content";
import { tx } from "@/lib/content/render";
import { pageLocale } from "@/lib/i18n/page";
import { pageMetadata } from "@/lib/seo/metadata";

const page = content.pages.contact;

export async function generateMetadata({ params }: PageProps<"/[locale]/service">): Promise<Metadata> {
  return pageMetadata({ locale: await pageLocale(params), path: page.path, seo: page.seo });
}

// The old page's email form is replaced by the call-back request of M5, which
// stores leads in Supabase; until then visitors use the channels below.
export default async function ContactPage({ params }: PageProps<"/[locale]/service">) {
  const locale = await pageLocale(params);
  return (
    <PageShell locale={locale} path={page.path} contactBand={false}>
      <PageHero heading={tx(page.hero.heading, locale)} description={tx(page.hero.description, locale)} />
      <ContactChannels page={page} locale={locale} />
    </PageShell>
  );
}
