import type { Metadata } from "next";

import { PackagePageView } from "@/components/site/PackagePageView";
import { getPackagePage } from "@/lib/content";
import { pageLocale } from "@/lib/i18n/page";
import { pageMetadata } from "@/lib/seo/metadata";

const page = getPackagePage("/broadband-old");

export async function generateMetadata({ params }: PageProps<"/[locale]/broadband-old">): Promise<Metadata> {
  return pageMetadata({ locale: await pageLocale(params), path: page.path, seo: page.seo });
}

export default async function Page({ params }: PageProps<"/[locale]/broadband-old">) {
  return <PackagePageView page={page} locale={await pageLocale(params)} />;
}
