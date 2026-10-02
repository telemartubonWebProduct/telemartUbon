import type { Metadata } from "next";

import { renderContext } from "@/components/site/context";
import { PageView } from "@/components/site/pages/PageView";
import { readDocument, type PageDocumentId } from "@/lib/content/documents";
import { getPublishedContent } from "@/lib/content/published";
import type { Seo } from "@/lib/content/schema";
import { pageLocale } from "@/lib/i18n/page";
import { pageMetadata } from "@/lib/seo/metadata";

// Every public page route renders the same way: the published content (M4),
// the page's template, and metadata from the page's SEO fields.

type RouteProps = { params: Promise<{ locale: string }> };

export function pageRoute(pageId: PageDocumentId) {
  async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
    const content = await getPublishedContent();
    const page = readDocument(content, `page:${pageId}`) as { path: string; seo: Seo };
    return pageMetadata({ locale: await pageLocale(params), path: page.path, seo: page.seo, content });
  }

  async function Page({ params }: RouteProps) {
    const content = await getPublishedContent();
    return <PageView ctx={renderContext(content, await pageLocale(params))} pageId={pageId} />;
  }

  return { generateMetadata, Page };
}
