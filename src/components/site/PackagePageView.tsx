import { tx } from "@/lib/content/render";
import type { PackagePage } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/locales";

import { PackageSections } from "./PackageSections";
import { PageHero } from "./PageHero";
import { PageShell } from "./PageShell";

/** One template for every package page: hero, section links, sections. */
export function PackagePageView({ page, locale }: { page: PackagePage; locale: Locale }) {
  return (
    <PageShell locale={locale} path={page.path}>
      <PageHero heading={tx(page.hero.heading, locale)} description={tx(page.hero.description, locale)} />
      <PackageSections page={page} locale={locale} />
    </PageShell>
  );
}
