import type { Metadata } from "next";
import Image from "next/image";

import { CtaLink } from "@/components/site/links";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { Steps } from "@/components/site/Steps";
import { content, getMedia } from "@/lib/content";
import { tx } from "@/lib/content/render";
import { pageLocale } from "@/lib/i18n/page";
import { pageMetadata } from "@/lib/seo/metadata";

const page = content.pages.agent;

export async function generateMetadata({ params }: PageProps<"/[locale]/wifiService">): Promise<Metadata> {
  return pageMetadata({ locale: await pageLocale(params), path: page.path, seo: page.seo });
}

export default async function ApplyWithAgentPage({ params }: PageProps<"/[locale]/wifiService">) {
  const locale = await pageLocale(params);
  const { site } = content;
  const image = getMedia(page.hero.image);
  return (
    <PageShell locale={locale} path={page.path}>
      <PageHero
        heading={tx(page.hero.heading, locale)}
        description={tx(page.hero.description, locale)}
        actions={
          <>
            <CtaLink cta={page.hero.primaryCta} locale={locale} site={site} />
            <CtaLink cta={page.hero.secondaryCta} locale={locale} site={site} />
          </>
        }
        media={
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt={tx(image.alt, locale)}
            preload
            sizes="(min-width: 1024px) 36rem, 100vw"
            className="aspect-[16/9] w-full rounded-tm-panel object-cover"
          />
        }
      />
      <Steps
        id="agent-steps"
        heading={tx(page.steps.heading, locale)}
        items={page.steps.items.map((item) => ({ id: item.id, title: tx(item.title, locale), description: tx(item.description, locale) }))}
      />
    </PageShell>
  );
}
