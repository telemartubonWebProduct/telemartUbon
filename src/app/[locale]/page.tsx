import type { Metadata } from "next";

import { renderContext } from "@/components/site/context";
import { PageView } from "@/components/site/pages/PageView";
import { content } from "@/lib/content";
import { pageLocale } from "@/lib/i18n/page";
import { pageMetadata } from "@/lib/seo/metadata";

const page = content.pages.home;

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  return pageMetadata({ locale: await pageLocale(params), path: page.path, seo: page.seo });
}

export default async function Page({ params }: PageProps<"/[locale]">) {
  return <PageView ctx={renderContext(content, await pageLocale(params))} pageId="home" />;
}
