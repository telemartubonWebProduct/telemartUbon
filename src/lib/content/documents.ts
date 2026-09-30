import type { ZodType } from "zod";

import {
  agentPage,
  benefit,
  catalogPackage,
  contactPage,
  homePage,
  legalPage,
  mediaAsset,
  packagePage,
  siteSettings,
  solarPage,
  type SiteContent,
} from "./schema";

// The content is stored and edited as separate documents, so a draft of one
// package or one page never overwrites another's (ARCHITECTURE.md §4–§5):
//
//   site               site settings: brand, navigation, footer, contacts, copy, theme
//   page:<id>          one page template (home, broadband-new, …, terms)
//   package:<id>       one catalog package
//   media:<id>         one media asset (file, size, alt text, provenance)
//   benefit:<id>       one package benefit (label and icon)

export const pageDocumentIds = [
  "home",
  "broadband-new",
  "broadband-existing",
  "mobile-monthly",
  "mobile-prepaid",
  "solar",
  "contact",
  "apply-with-agent",
  "terms",
] as const;
export type PageDocumentId = (typeof pageDocumentIds)[number];

export type DocumentId = "site" | `page:${PageDocumentId}` | `package:${string}` | `media:${string}` | `benefit:${string}`;

const collectionPattern = /^(package|media|benefit):[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isDocumentId(value: string): value is DocumentId {
  if (value === "site") return true;
  if (value.startsWith("page:")) return (pageDocumentIds as readonly string[]).includes(value.slice(5));
  return collectionPattern.test(value);
}

const packagePageIds = new Set<string>(["broadband-new", "broadband-existing", "mobile-monthly", "mobile-prepaid"]);

/** The schema one document must satisfy. */
export function documentSchema(id: DocumentId): ZodType {
  if (id === "site") return siteSettings;
  const [kind, key] = id.split(":") as [string, string];
  switch (kind) {
    case "package":
      return catalogPackage;
    case "media":
      return mediaAsset;
    case "benefit":
      return benefit;
  }
  if (packagePageIds.has(key)) return packagePage;
  switch (key as PageDocumentId) {
    case "home":
      return homePage;
    case "solar":
      return solarPage;
    case "contact":
      return contactPage;
    case "apply-with-agent":
      return agentPage;
    default:
      return legalPage;
  }
}

/** The current value of a document in one version of the content, or undefined if it does not exist. */
export function readDocument(content: SiteContent, id: DocumentId): unknown {
  if (id === "site") return content.site;
  const [kind, key] = id.split(":") as [string, string];
  switch (kind) {
    case "package":
      return content.catalog.find((item) => item.id === key);
    case "media":
      return content.media[key];
    case "benefit":
      return content.benefits[key];
  }
  const pages = content.pages;
  switch (key as PageDocumentId) {
    case "home":
      return pages.home;
    case "solar":
      return pages.solar;
    case "contact":
      return pages.contact;
    case "apply-with-agent":
      return pages.agent;
    case "terms":
      return pages.terms;
    default:
      return pages.packages.find((doc) => doc.id === key);
  }
}

/**
 * A new version of the content with one document replaced. The body must
 * already satisfy documentSchema(id); only existing documents can be replaced
 * (the editor changes values, it does not add pages or packages).
 */
export function writeDocument(content: SiteContent, id: DocumentId, body: unknown): SiteContent {
  if (readDocument(content, id) === undefined) throw new Error(`No document ${id} to replace`);
  if (id === "site") return { ...content, site: body as SiteContent["site"] };
  const [kind, key] = id.split(":") as [string, string];
  switch (kind) {
    case "package":
      return { ...content, catalog: content.catalog.map((item) => (item.id === key ? (body as SiteContent["catalog"][number]) : item)) };
    case "media":
      return { ...content, media: { ...content.media, [key]: body as SiteContent["media"][string] } };
    case "benefit":
      return { ...content, benefits: { ...content.benefits, [key]: body as SiteContent["benefits"][string] } };
  }
  const pages = content.pages;
  switch (key as PageDocumentId) {
    case "home":
      return { ...content, pages: { ...pages, home: body as typeof pages.home } };
    case "solar":
      return { ...content, pages: { ...pages, solar: body as typeof pages.solar } };
    case "contact":
      return { ...content, pages: { ...pages, contact: body as typeof pages.contact } };
    case "apply-with-agent":
      return { ...content, pages: { ...pages, agent: body as typeof pages.agent } };
    case "terms":
      return { ...content, pages: { ...pages, terms: body as typeof pages.terms } };
    default:
      return {
        ...content,
        pages: { ...pages, packages: pages.packages.map((doc) => (doc.id === key ? (body as (typeof pages.packages)[number]) : doc)) },
      };
  }
}

/** Every document in one version of the content. */
export function documentIds(content: SiteContent): DocumentId[] {
  return [
    "site",
    ...pageDocumentIds.map((id) => `page:${id}` as const),
    ...content.catalog.map((item) => `package:${item.id}` as const),
    ...Object.keys(content.media).map((id) => `media:${id}` as const),
    ...Object.keys(content.benefits).map((id) => `benefit:${id}` as const),
  ];
}

/** Public path of each page document, for the editor's page picker and preview. */
export const pagePaths: Record<PageDocumentId, string> = {
  home: "/",
  "broadband-new": "/broadband",
  "broadband-existing": "/broadband-old",
  "mobile-monthly": "/monthy",
  "mobile-prepaid": "/topup",
  solar: "/wEnergy",
  contact: "/service",
  "apply-with-agent": "/wifiService",
  terms: "/termsAndPrivacy",
};
