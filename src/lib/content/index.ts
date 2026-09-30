import { z } from "zod";

import { benefits } from "@/content/benefits";
import { catalog } from "@/content/catalog";
import { media } from "@/content/media";
import { home } from "@/content/pages/home";
import { broadbandExistingPage, broadbandNewPage, mobileMonthlyPage, mobilePrepaidPage } from "@/content/pages/packages";
import { solarPage } from "@/content/pages/solar";
import { agentPage, contactPage, termsPage } from "@/content/pages/support";
import { publicPages } from "@/content/routes";
import { site } from "@/content/site";

import {
  agentPage as agentPageSchema,
  benefit as benefitSchema,
  catalogPackage,
  contactPage as contactPageSchema,
  homePage,
  legalPage,
  mediaAsset,
  packagePage,
  siteSettings,
  solarPage as solarPageSchema,
  type Benefit,
  type CatalogPackage,
  type CategoryId,
  type LinkTarget,
  type MediaAsset,
  type PackagePage,
} from "./schema";

// The published content of the public site (M2 keeps it in src/content; M3
// moves drafts and releases to Supabase with the same schema). Everything is
// validated when this module loads, so a broken reference fails the build
// instead of rendering a half-empty page.

const packagePages = [broadbandNewPage, broadbandExistingPage, mobileMonthlyPage, mobilePrepaidPage];

function parseAll() {
  return {
    site: siteSettings.parse(site),
    media: z.record(z.string(), mediaAsset).parse(media),
    benefits: z.record(z.string(), benefitSchema).parse(benefits),
    catalog: z.array(catalogPackage).parse(catalog),
    pages: {
      home: homePage.parse(home),
      packages: packagePages.map((doc) => packagePage.parse(doc)),
      solar: solarPageSchema.parse(solarPage),
      contact: contactPageSchema.parse(contactPage),
      agent: agentPageSchema.parse(agentPage),
      terms: legalPage.parse(termsPage),
    },
  };
}

export type SiteContent = ReturnType<typeof parseAll>;

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

function load(): SiteContent {
  const content = parseAll();
  const problems = contentProblems(content);
  if (problems.length > 0) throw new Error(`Site content has ${problems.length} problem(s):\n${problems.join("\n")}`);
  return content;
}

export const content = load();

export function getMedia(id: string): MediaAsset {
  const asset = content.media[id];
  if (!asset) throw new Error(`Unknown media "${id}"`);
  return asset;
}

export function getBenefit(id: string): Benefit {
  const entry = content.benefits[id];
  if (!entry) throw new Error(`Unknown benefit "${id}"`);
  return entry;
}

export function getPackagePage(path: PackagePage["path"]): PackagePage {
  const doc = content.pages.packages.find((entry) => entry.path === path);
  if (!doc) throw new Error(`No package page at ${path}`);
  return doc;
}

/** Packages visitors may see, in catalog order. Hidden imports stay out. */
export function publicPackages(category: CategoryId, group: string): CatalogPackage[] {
  return content.catalog.filter((item) => item.category === category && item.group === group && item.review.status !== "hidden");
}

export function packageById(id: string): CatalogPackage {
  const item = content.catalog.find((entry) => entry.id === id);
  if (!item) throw new Error(`Unknown package "${id}"`);
  return item;
}
