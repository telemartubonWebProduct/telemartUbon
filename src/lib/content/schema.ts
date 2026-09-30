import { z } from "zod";

// Content model of the public site (docs/renovation/ARCHITECTURE.md §3, §5).
// Pages are fixed templates: documents fill named slots, and each repeatable
// item has a stable id so the Mirror editor (M3) can bind fields as
// pageId + slot + itemId + field. In M2 the published documents live in
// src/content; M3 moves drafts and releases into Supabase with this schema.

/** Text shown to visitors, in both site languages. Neither may be empty. */
export const localizedText = z.strictObject({
  th: z.string().trim().min(1),
  en: z.string().trim().min(1),
});
export type LocalizedText = z.infer<typeof localizedText>;

/** Lowercase kebab-case id: stable across label edits. */
export const stableId = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "lowercase kebab-case id");

/** In-page anchor; some legacy anchors are camelCase (#socialInternet). */
export const anchorId = z.string().regex(/^[A-Za-z][A-Za-z0-9-]*$/, "anchor id");

// Media -----------------------------------------------------------------------

export const mediaKind = z.enum([
  "product", // genuine product or device image
  "brand", // logo of Telemart, True, W&W Energy or a partner
  "photo", // genuine photograph (installation sites, rooftops)
  "promo", // campaign artwork with text baked in
  "generated", // AI-generated supporting image, never a product stand-in
  "illustration", // drawn for this site
]);

export const mediaAsset = z.strictObject({
  src: z.string().startsWith("/"),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: localizedText,
  kind: mediaKind,
  /** Where the file came from, for rights and provenance review. */
  source: z.string().min(1),
});
export type MediaAsset = z.infer<typeof mediaAsset>;

// Links and calls to action -----------------------------------------------------

export const contactChannel = z.enum(["line-sales", "line-service", "phone-sales", "email", "facebook"]);
export type ContactChannel = z.infer<typeof contactChannel>;

export const linkTarget = z.discriminatedUnion("kind", [
  /** A page of this site; the renderer adds the language prefix. */
  z.strictObject({
    kind: z.literal("page"),
    path: z.string().regex(/^\/[A-Za-z0-9/-]*$/, "site path"),
    hash: anchorId.optional(),
  }),
  z.strictObject({
    kind: z.literal("external"),
    url: z.url().refine((url) => url.startsWith("https://"), "external links use https"),
  }),
  /** One of the contact channels managed once in site settings. */
  z.strictObject({ kind: z.literal("contact"), channel: contactChannel }),
]);
export type LinkTarget = z.infer<typeof linkTarget>;

export const cta = z.strictObject({
  /** Stable tracking id: analytics keeps it when the label changes. */
  id: stableId,
  label: localizedText,
  target: linkTarget,
  style: z.enum(["primary", "secondary"]),
});
export type Cta = z.infer<typeof cta>;

export const link = z.strictObject({ id: stableId, label: localizedText, target: linkTarget });
export type Link = z.infer<typeof link>;

export const seo = z.strictObject({
  title: localizedText,
  description: localizedText,
  image: stableId.optional(),
  noindex: z.boolean().optional(),
});
export type Seo = z.infer<typeof seo>;

// Catalog ------------------------------------------------------------------------

export const categoryId = z.enum([
  "broadband-new",
  "broadband-existing",
  "mobile-monthly",
  "mobile-prepaid",
  "solar",
]);
export type CategoryId = z.infer<typeof categoryId>;

const speed = z.strictObject({ value: z.number().positive(), unit: z.enum(["Mbps", "Gbps"]) });

export const price = z.strictObject({
  amount: z.number().nonnegative(),
  /** Regular price when the offer shows a discount. */
  regularAmount: z.number().positive().optional(),
  per: z.enum(["month", "package", "once"]),
  /** "unknown" where the source never said; the page then shows no VAT line. */
  vat: z.enum(["included", "excluded", "unknown"]),
});
export type Price = z.infer<typeof price>;

export const benefit = z.strictObject({
  label: localizedText,
  icon: stableId,
});
export type Benefit = z.infer<typeof benefit>;

export const reviewStatus = z.enum([
  "verified", // confirmed by the business
  "unverified", // imported from the old site; shown until the business confirms it
  "hidden", // imported but inconsistent or duplicated; not shown until fixed
]);

export const catalogPackage = z.strictObject({
  id: stableId,
  category: categoryId,
  group: stableId,
  name: localizedText,
  audience: localizedText.optional(),
  speed: z.strictObject({ download: speed, upload: speed }).optional(),
  /** Data, calls or app usage that the package gives. */
  allowance: localizedText.optional(),
  validity: localizedText.optional(),
  contract: localizedText.optional(),
  price,
  benefits: z.array(stableId),
  details: z.array(localizedText),
  conditions: z.array(localizedText),
  /** USSD code to subscribe from the phone, such as *900*7129#. */
  dialCode: z
    .string()
    .regex(/^\*[0-9*]+#$/)
    .optional(),
  image: stableId.optional(),
  /** Legacy record this package was imported from. */
  source: z.strictObject({ file: z.string().min(1), entry: z.string().min(1) }),
  review: z.strictObject({ status: reviewStatus, notes: z.array(z.string().min(1)) }),
});
export type CatalogPackage = z.infer<typeof catalogPackage>;

// Site settings --------------------------------------------------------------------

/** Interface copy that visitors read (labels, units, empty states). */
export const uiKeys = [
  "skipToContent",
  "menu",
  "closeMenu",
  "mainNavigation",
  "languageSwitch",
  "speed",
  "audience",
  "allowance",
  "validity",
  "contract",
  "benefits",
  "details",
  "conditions",
  "dialCode",
  "perMonth",
  "baht",
  "vatExcluded",
  "vatIncluded",
  "regularPrice",
  "offerPrice",
  "emptyGroup",
  "jumpTo",
  "contents",
  "call",
  "email",
  "chatOnLine",
  "lineId",
  "facebook",
  "opensInNewTab",
  "footerContact",
] as const;
export type UiKey = (typeof uiKeys)[number];

const ui = z.strictObject(Object.fromEntries(uiKeys.map((key) => [key, localizedText])) as Record<UiKey, typeof localizedText>);

const navItem = z.strictObject({
  id: stableId,
  label: localizedText,
  target: linkTarget.optional(),
  children: z.array(link).optional(),
});

export const siteSettings = z.strictObject({
  brand: z.strictObject({ name: localizedText, legalName: localizedText, logo: stableId }),
  contact: z.strictObject({
    lineSales: z.url(),
    lineService: z.url(),
    lineId: z.string().regex(/^@[a-z0-9]+$/),
    lineQr: stableId,
    phones: z.array(
      z.strictObject({
        number: z.string().regex(/^0[0-9]{8,9}$/),
        label: localizedText,
      }),
    ),
    email: z.email(),
    facebook: z.url(),
  }),
  navigation: z.array(navItem),
  headerCta: cta,
  footer: z.strictObject({
    about: localizedText,
    groups: z.array(z.strictObject({ id: stableId, heading: localizedText, links: z.array(link) })),
    copyright: localizedText,
  }),
  contactBand: z.strictObject({ heading: localizedText, description: localizedText }),
  ui,
  seo: z.strictObject({ siteName: localizedText, description: localizedText, image: stableId }),
  integrations: z.strictObject({
    googleAdsId: z.string().regex(/^AW-[0-9]+$/),
    tawkSrc: z.url(),
  }),
});
export type SiteSettings = z.infer<typeof siteSettings>;

// Pages ----------------------------------------------------------------------------

const packageGroup = z.strictObject({
  id: stableId,
  heading: localizedText.optional(),
  description: localizedText.optional(),
  category: categoryId,
  group: stableId,
});

const packageSection = z.strictObject({
  /** Also the in-page anchor; legacy anchors are kept verbatim. */
  id: anchorId,
  heading: localizedText,
  description: localizedText.optional(),
  groups: z.array(packageGroup).min(1),
  notes: z.array(localizedText),
});

export const packagePage = z.strictObject({
  id: stableId,
  path: z.string().startsWith("/"),
  seo,
  hero: z.strictObject({ heading: localizedText, description: localizedText }),
  /** Card layout: "compare" lines fields up across cards, "compact" suits long lists. */
  layout: z.enum(["compare", "compact"]),
  packageCta: cta,
  sections: z.array(packageSection).min(1),
});
export type PackagePage = z.infer<typeof packagePage>;

export const homePage = z.strictObject({
  id: z.literal("home"),
  path: z.literal("/"),
  seo,
  hero: z.strictObject({
    heading: localizedText,
    description: localizedText,
    note: localizedText,
    primaryCta: cta,
    secondaryCta: cta,
    /** Router picture: the poster, and the fallback of the 3D model. */
    visual: stableId,
    /** Visible line under the picture, such as "illustration, not the installed model". */
    visualNote: localizedText,
  }),
  services: z.strictObject({
    heading: localizedText,
    items: z
      .array(
        z.strictObject({
          id: stableId,
          icon: z.enum(["router", "router-upgrade", "phone", "solar"]),
          title: localizedText,
          description: localizedText,
          provider: localizedText.optional(),
          target: linkTarget,
        }),
      )
      .length(4),
  }),
  featured: z.strictObject({
    heading: localizedText,
    description: localizedText,
    packageIds: z.array(stableId).min(1).max(4),
    packageCta: cta,
    viewAll: cta,
  }),
  mobile: z.strictObject({
    heading: localizedText,
    description: localizedText,
    columns: z
      .array(z.strictObject({ id: stableId, heading: localizedText, overview: link, links: z.array(link) }))
      .length(2),
  }),
  steps: z.strictObject({
    heading: localizedText,
    items: z.array(z.strictObject({ id: stableId, title: localizedText, description: localizedText })).length(3),
  }),
  solar: z.strictObject({
    heading: localizedText,
    description: localizedText,
    provider: localizedText,
    image: stableId,
    cta,
  }),
  faq: z.strictObject({
    heading: localizedText,
    items: z.array(z.strictObject({ id: stableId, question: localizedText, answer: localizedText })).min(1),
  }),
});
export type HomePage = z.infer<typeof homePage>;

export const solarPage = z.strictObject({
  id: z.literal("solar"),
  path: z.literal("/wEnergy"),
  seo,
  hero: z.strictObject({
    heading: localizedText,
    description: localizedText,
    provider: localizedText,
    image: stableId,
    cta,
  }),
  about: z.strictObject({ heading: localizedText, body: z.array(localizedText), image: stableId }),
  stats: z.strictObject({
    heading: localizedText,
    items: z.array(z.strictObject({ id: stableId, value: z.string().min(1), label: localizedText })),
  }),
  process: z.strictObject({
    heading: localizedText,
    description: localizedText,
    image: stableId,
    steps: z.array(z.strictObject({ id: stableId, title: localizedText, description: localizedText })),
  }),
  packages: z.strictObject({
    id: anchorId,
    heading: localizedText,
    group: stableId,
    packageCta: cta,
    notes: z.array(localizedText),
  }),
  bundle: z.strictObject({
    heading: localizedText,
    description: localizedText,
    items: z.array(localizedText),
    image: stableId,
  }),
  knowledge: z.strictObject({
    heading: localizedText,
    articles: z.array(
      z.strictObject({
        id: stableId,
        title: localizedText,
        body: z.array(localizedText),
        list: z.array(localizedText),
        images: z.array(stableId),
      }),
    ),
  }),
});
export type SolarPage = z.infer<typeof solarPage>;

export const contactPage = z.strictObject({
  id: z.literal("contact"),
  path: z.literal("/service"),
  seo,
  hero: z.strictObject({ heading: localizedText, description: localizedText }),
  channelsHeading: localizedText,
  /** Contact channels in display order; addresses come from site settings. */
  channels: z
    .array(
      z.strictObject({
        id: stableId,
        channel: contactChannel,
        title: localizedText,
        description: localizedText,
      }),
    )
    .min(1),
  formNote: localizedText,
});
export type ContactPage = z.infer<typeof contactPage>;

export const agentPage = z.strictObject({
  id: z.literal("apply-with-agent"),
  path: z.literal("/wifiService"),
  seo,
  hero: z.strictObject({
    heading: localizedText,
    description: localizedText,
    image: stableId,
    primaryCta: cta,
    secondaryCta: cta,
  }),
  steps: z.strictObject({
    heading: localizedText,
    items: z.array(z.strictObject({ id: stableId, title: localizedText, description: localizedText })).length(3),
  }),
});
export type AgentPage = z.infer<typeof agentPage>;

export const legalPage = z.strictObject({
  id: z.literal("terms"),
  path: z.literal("/termsAndPrivacy"),
  seo,
  heading: localizedText,
  intro: localizedText,
  sections: z.array(
    z.strictObject({
      id: stableId,
      heading: localizedText,
      paragraphs: z.array(localizedText),
      list: z.array(localizedText),
    }),
  ),
  disclaimer: localizedText,
});
export type LegalPage = z.infer<typeof legalPage>;
