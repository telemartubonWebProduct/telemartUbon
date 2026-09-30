import type { Benefit, CatalogPackage, CategoryId, MediaAsset, PackagePage, SiteContent } from "./schema";

// Lookups over one version of the content (published or a draft). Pure
// functions of their input, so the public pages and the Mirror editor preview
// resolve references the same way.

export function mediaIn(content: SiteContent, id: string): MediaAsset {
  const asset = content.media[id];
  if (!asset) throw new Error(`Unknown media "${id}"`);
  return asset;
}

export function benefitIn(content: SiteContent, id: string): Benefit {
  const entry = content.benefits[id];
  if (!entry) throw new Error(`Unknown benefit "${id}"`);
  return entry;
}

export function packagePageIn(content: SiteContent, path: string): PackagePage {
  const doc = content.pages.packages.find((entry) => entry.path === path);
  if (!doc) throw new Error(`No package page at ${path}`);
  return doc;
}

/** Packages visitors may see, in catalog order. Hidden imports stay out. */
export function publicPackagesIn(content: SiteContent, category: CategoryId, group: string): CatalogPackage[] {
  return content.catalog.filter((item) => item.category === category && item.group === group && item.review.status !== "hidden");
}

export function packageIn(content: SiteContent, id: string): CatalogPackage {
  const item = content.catalog.find((entry) => entry.id === id);
  if (!item) throw new Error(`Unknown package "${id}"`);
  return item;
}
