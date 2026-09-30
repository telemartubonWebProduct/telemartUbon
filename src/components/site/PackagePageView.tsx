import type { DocumentId } from "@/lib/content/documents";
import type { PackagePage } from "@/lib/content/schema";

import type { RenderContext } from "./context";
import { PackageSections } from "./PackageSections";
import { heroBinds, PageHero } from "./PageHero";
import { PageShell } from "./PageShell";

/** One template for every package page: hero, section links, sections. */
export function PackagePageView({ ctx, page }: { ctx: RenderContext; page: PackagePage }) {
  return (
    <PageShell ctx={ctx} path={page.path}>
      <PageHero
        ctx={ctx}
        heading={page.hero.heading}
        description={page.hero.description}
        tone={page.hero.tone}
        binds={heroBinds(ctx, `page:${page.id}` as DocumentId, "hero")}
      />
      <PackageSections ctx={ctx} page={page} />
    </PageShell>
  );
}
