import { publicPages } from "@/content/routes";

import type { CategoryId, LinkTarget, SiteContent } from "./schema";

// Checks that the schema alone cannot express: references between documents,
// in-page anchors, and prices. Used when the published content loads (a
// problem fails the build) and before a draft is saved from the Mirror editor.

/** Cross-reference problems in parsed content; empty when everything resolves. */
export function contentProblems(content: SiteContent): string[] {
  const problems: string[] = [];
  const { site, media, benefits, catalog, pages } = content;
  const mediaIds = new Set(Object.keys(media));
  const needMedia = (id: string | undefined, where: string) => {
    if (id && !mediaIds.has(id)) problems.push(`${where}: unknown media "${id}"`);
  };

  // Catalog
  const seen = new Set<string>();
  for (const item of catalog) {
    if (seen.has(item.id)) problems.push(`catalog: duplicate package id "${item.id}"`);
    seen.add(item.id);
    for (const id of item.benefits) if (!(id in benefits)) problems.push(`${item.id}: unknown benefit "${id}"`);
    needMedia(item.image, item.id);
    if (item.price.regularAmount !== undefined && item.price.regularAmount <= item.price.amount) {
      problems.push(`${item.id}: regular price must be higher than the offer price`);
    }
  }
  for (const [id, entry] of Object.entries(benefits)) needMedia(entry.icon, `benefit ${id}`);

  // Pages and the anchors each page provides
  const anchors = new Map<string, Set<string>>();
  const pagePaths = new Set<string>(publicPages.map((entry) => entry.path));
  const groupExists = (category: CategoryId, group: string) =>
    catalog.some((item) => item.category === category && item.group === group);

  for (const doc of pages.packages) {
    const ids = new Set<string>();
    for (const section of doc.sections) {
      if (ids.has(section.id)) problems.push(`${doc.id}: duplicate section id "${section.id}"`);
      ids.add(section.id);
      for (const group of section.groups) {
        if (!groupExists(group.category, group.group)) {
          problems.push(`${doc.id}#${section.id}: no packages in ${group.category}/${group.group}`);
        }
      }
    }
    anchors.set(doc.path, ids);
  }
  anchors.set(pages.solar.path, new Set([pages.solar.packages.id]));
  if (!groupExists("solar", pages.solar.packages.group)) problems.push(`solar: no packages in solar/${pages.solar.packages.group}`);

  for (const id of pages.home.featured.packageIds) {
    const item = catalog.find((entry) => entry.id === id);
    if (!item) problems.push(`home featured: unknown package "${id}"`);
    else if (item.review.status === "hidden") problems.push(`home featured: package "${id}" is hidden`);
  }

  needMedia(site.brand.logo, "site brand");
  needMedia(site.contact.lineQr, "site contact");
  needMedia(site.seo.image, "site seo");
  needMedia(pages.home.hero.visual, "home hero");
  needMedia(pages.home.solar.image, "home solar");
  needMedia(pages.solar.hero.image, "solar hero");
  needMedia(pages.solar.about.image, "solar about");
  needMedia(pages.solar.process.image, "solar process");
  needMedia(pages.solar.bundle.image, "solar bundle");
  for (const article of pages.solar.knowledge.articles) {
    for (const id of article.images) needMedia(id, `solar article ${article.id}`);
  }
  needMedia(pages.agent.hero.image, "apply-with-agent hero");

  // Internal links: known page, and a hash only where that page has the anchor.
  const checkLink = (target: LinkTarget, where: string) => {
    if (target.kind !== "page") return;
    if (!pagePaths.has(target.path)) problems.push(`${where}: link to unknown page "${target.path}"`);
    if (target.hash && !anchors.get(target.path)?.has(target.hash)) {
      problems.push(`${where}: "${target.path}#${target.hash}" has no such section`);
    }
  };
  for (const item of site.navigation) {
    if (item.target) checkLink(item.target, `nav ${item.id}`);
    for (const child of item.children ?? []) checkLink(child.target, `nav ${child.id}`);
  }
  checkLink(site.headerCta.target, "header CTA");
  for (const group of site.footer.groups) for (const entry of group.links) checkLink(entry.target, `footer ${entry.id}`);
  const home = pages.home;
  for (const cta of [home.hero.primaryCta, home.hero.secondaryCta, home.featured.packageCta, home.featured.viewAll, home.solar.cta]) {
    checkLink(cta.target, `home ${cta.id}`);
  }
  for (const item of home.services.items) checkLink(item.target, `home service ${item.id}`);
  for (const column of home.mobile.columns) {
    checkLink(column.overview.target, `home ${column.overview.id}`);
    for (const entry of column.links) checkLink(entry.target, `home ${entry.id}`);
  }
  for (const cta of [pages.agent.hero.primaryCta, pages.agent.hero.secondaryCta, pages.solar.hero.cta, pages.solar.packages.packageCta]) {
    checkLink(cta.target, `${cta.id}`);
  }

  return problems;
}
