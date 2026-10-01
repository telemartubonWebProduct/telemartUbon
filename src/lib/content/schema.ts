import { z } from "zod";

import { theme, tone } from "./theme";

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
const stableIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const stableId = z.string().regex(stableIdPattern, "ใช้ตัวพิมพ์เล็ก a-z ตัวเลข และขีดกลางคั่นคำ");

// References to other documents. Separate schema objects so the Mirror editor
// can recognise them (by identity) and offer a picker instead of a text box.
export const mediaRef = z.string().regex(stableIdPattern, "รหัสรูปไม่ถูกต้อง");
export const benefitRef = z.string().regex(stableIdPattern, "รหัสสิทธิประโยชน์ไม่ถูกต้อง");
export const packageRef = z.string().regex(stableIdPattern, "รหัสแพ็กเกจไม่ถูกต้อง");

/** In-page anchor; some legacy anchors are camelCase (#socialInternet). */
export const anchorId = z.string().regex(/^[A-Za-z][A-Za-z0-9-]*$/, "ชื่อหมวดในหน้าใช้ a-z ตัวเลข และขีดกลาง");

/** Links opened from the site: https only, so no script or data URL can reach an href. */
export const httpsUrl = z.url({ protocol: /^https$/, hostname: z.regexes.domain, error: "ใช้ลิงก์ที่ขึ้นต้นด้วย https://" });

// Media -----------------------------------------------------------------------

export const mediaKind = z.enum([
  "product", // genuine product or device image
  "brand", // logo of Telemart, True, W&W Energy or a partner
  "photo", // genuine photograph (installation sites, rooftops)
  "promo", // campaign artwork with text baked in
  "generated", // AI-generated supporting image, never a product stand-in
  "illustration", // drawn for this site
]);

/** Numbered frames of a film that plays as visitors scroll (written by scripts/media/film-frames.mjs). */
export const frameSequence = z.strictObject({
  /** Folder of the frames, named 0001.avif, 0002.avif, … */
  path: z.string().regex(/^\/[A-Za-z0-9/_-]+$/, "ที่อยู่โฟลเดอร์เฟรมต้องขึ้นต้นด้วย / และใช้ a-z ตัวเลข - _"),
  format: z.enum(["avif", "webp"]),
  frames: z.number().int().min(2).max(480),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});
export type FrameSequence = z.infer<typeof frameSequence>;

/**
 * Where a picture lives: a file of this site ("/…"), or one uploaded from the
 * editor to the Supabase Storage bucket `media` (https; plain http only on the
 * local test stack).
 */
export const mediaSrc = z
  .string()
  .regex(
    /^(\/(?!\/).*|https:\/\/[a-z0-9.-]+\/storage\/v1\/object\/public\/media\/[A-Za-z0-9/._-]+|http:\/\/(127\.0\.0\.1|localhost)(:\d+)?\/storage\/v1\/object\/public\/media\/[A-Za-z0-9/._-]+)$/,
    "ที่อยู่ไฟล์รูปต้องเป็นไฟล์ของเว็บ หรือไฟล์ที่อัปโหลดในคลังสื่อ",
  );

export const mediaAsset = z.strictObject({
  src: mediaSrc,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: localizedText,
  kind: mediaKind,
  /** Where the file came from, for rights and provenance review. */
  source: z.string().min(1),
  /** A film: `src` is its first frame. Portrait frames serve phones when the film has them. */
  sequence: z.strictObject({ landscape: frameSequence, portrait: frameSequence.optional() }).optional(),
});
export type MediaAsset = z.infer<typeof mediaAsset>;

// Links and calls to action -----------------------------------------------------

export const contactChannel = z.enum(["line-sales", "line-service", "phone-sales", "email", "facebook"]);
export type ContactChannel = z.infer<typeof contactChannel>;

export const linkTarget = z.discriminatedUnion("kind", [
  /** A page of this site; the renderer adds the language prefix. */
  z.strictObject({
    kind: z.literal("page"),
    path: z.string().regex(/^\/[A-Za-z0-9/-]*$/, "ที่อยู่หน้าในเว็บต้องขึ้นต้นด้วย /"),
    hash: anchorId.optional(),
  }),
  z.strictObject({
    kind: z.literal("external"),
    url: httpsUrl,
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
  image: mediaRef.optional(),
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
  icon: mediaRef,
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
  benefits: z.array(benefitRef),
  details: z.array(localizedText),
  conditions: z.array(localizedText),
  /** USSD code to subscribe from the phone, such as *900*7129#. */
  dialCode: z
    .string()
    .regex(/^\*[0-9*]+#$/, "รหัสกดขึ้นต้นด้วย * และลงท้ายด้วย # เช่น *900*7129#")
    .optional(),
  image: mediaRef.optional(),
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
  "filmScenes",
  "filmSkip",
  "packageDetails",
  "scrollPrevious",
  "scrollNext",
  "findPackage",
  "filterSpeed",
  "filterPrice",
  "filterBenefit",
  "filterAny",
  "sortBy",
  "sortRecommended",
  "sortPriceLow",
  "sortPriceHigh",
  "sortSpeed",
  "resultCount",
  "clearFilters",
  "noMatches",
  "compareAdd",
  "compareChosen",
  "compareOpen",
  "compareMore",
  "compareLimit",
  "compareClear",
  "close",
  "breadcrumb",
  "homeLink",
  "unverifiedNote",
  "packageContactNote",
  "callSales",
] as const;
export type UiKey = (typeof uiKeys)[number];

const ui = z.strictObject(Object.fromEntries(uiKeys.map((key) => [key, localizedText])) as Record<UiKey, typeof localizedText>);

/** Google Ads `send_to`: the account (AW-…) and the conversion's label. */
const adsConversionPattern = /^(AW-[0-9]+)\/[A-Za-z0-9_-]+$/;

const navItem = z.strictObject({
  id: stableId,
  label: localizedText,
  target: linkTarget.optional(),
  children: z.array(link).optional(),
});

export const siteSettings = z.strictObject({
  brand: z.strictObject({ name: localizedText, legalName: localizedText, logo: mediaRef }),
  contact: z.strictObject({
    lineSales: httpsUrl,
    lineService: httpsUrl,
    lineId: z.string().regex(/^@[a-z0-9]+$/, "ไลน์ไอดีขึ้นต้นด้วย @ ตามด้วยตัวพิมพ์เล็กหรือตัวเลข"),
    lineQr: mediaRef,
    phones: z.array(
      z.strictObject({
        number: z.string().regex(/^0[0-9]{8,9}$/, "เบอร์โทร 9–10 หลัก ขึ้นต้นด้วย 0 ไม่มีขีด"),
        label: localizedText,
      }),
    ),
    email: z.email(),
    facebook: httpsUrl,
  }),
  navigation: z.array(navItem),
  headerCta: cta,
  footer: z.strictObject({
    about: localizedText,
    groups: z.array(z.strictObject({ id: stableId, heading: localizedText, links: z.array(link) })),
    copyright: localizedText,
  }),
  contactBand: z.strictObject({ heading: localizedText, description: localizedText, tone }),
  ui,
  seo: z.strictObject({ siteName: localizedText, description: localizedText, image: mediaRef }),
  /** Brand colours; every text/background pair must keep 4.5:1. */
  theme,
  /** Third-party tags. The editor shows only the home conversion as editable (src/components/editor/schema-walk.ts). */
  integrations: z
    .strictObject({
      googleAdsId: z.string().regex(/^AW-[0-9]+$/),
      /** Google Ads `send_to` of the conversion counted each time the home page opens (as on the old site). */
      googleAdsHomeConversion: z.string().regex(adsConversionPattern, "ใช้รูปแบบ AW-ตัวเลข/รหัส conversion เช่น AW-123456789/AbC-12_x"),
      tawkSrc: httpsUrl,
    })
    .superRefine((value, context) => {
      // The tag only configures googleAdsId, so a conversion of another account would go nowhere.
      // Zod runs this after field errors too; a malformed value already has its message.
      const account = adsConversionPattern.exec(String(value.googleAdsHomeConversion))?.[1];
      if (account === undefined || account === value.googleAdsId) return;
      context.addIssue({ code: "custom", path: ["googleAdsHomeConversion"], message: `ต้องเป็นบัญชี Google Ads เดียวกับแท็กของเว็บ (${value.googleAdsId}/…)` });
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
  tone,
});

export const packagePage = z.strictObject({
  id: stableId,
  path: z.string().startsWith("/"),
  seo,
  hero: z.strictObject({ heading: localizedText, description: localizedText, tone }),
  /** Card layout: "compare" lines fields up across cards, "compact" suits long lists. */
  layout: z.enum(["compare", "compact"]),
  packageCta: cta,
  sections: z.array(packageSection).min(1),
});
export type PackagePage = z.infer<typeof packagePage>;

/** A card of the home page's recommended packages: a catalog package with a picture. */
const promoItem = z.strictObject({
  id: stableId,
  /** Price, speed and terms come from the catalog as they are; the card adds no offer of its own. */
  packageId: packageRef,
  image: mediaRef,
});

const promoTab = z.strictObject({
  id: stableId,
  title: localizedText,
  items: z.array(promoItem).min(1).max(8),
  /** Under the cards, such as who provides the service. */
  remark: localizedText.optional(),
  packageCta: cta,
  viewAll: cta,
});

/** One set of words shown over the home film, in turn as visitors scroll. */
const heroBeat = z.strictObject({
  id: stableId,
  heading: localizedText,
  body: localizedText.optional(),
  /** Where the words sit on the film. */
  align: z.enum(["start", "center", "end"]),
  /** Dark words for bright frames, white words for dark ones. */
  textColor: z.enum(["dark", "light"]),
});
export type HeroBeat = z.infer<typeof heroBeat>;

export const homePage = z.strictObject({
  id: z.literal("home"),
  path: z.literal("/"),
  seo,
  hero: z.strictObject({
    /** Film the opening plays as visitors scroll; a still picture works too. */
    film: mediaRef,
    /** Visible line on the film, such as "illustration". */
    filmNote: localizedText,
    /** The first heading is the page's main heading. */
    beats: z.array(heroBeat).min(1).max(4),
    /** Stay on screen for the whole film. */
    primaryCta: cta,
    secondaryCta: cta,
    note: localizedText,
  }),
  equipment: z.strictObject({
    heading: localizedText,
    description: localizedText,
    points: z.array(z.strictObject({ id: stableId, title: localizedText, description: localizedText })).max(4),
    /** Router picture: the poster, and the fallback of the 3D model. */
    visual: mediaRef,
    /** Visible line under the picture, such as "illustration, not the installed model". */
    visualNote: localizedText,
    tone,
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
          /** Picture behind the tile's words. */
          image: mediaRef,
          target: linkTarget,
        }),
      )
      .length(4),
    tone,
  }),
  /** Recommended packages right after the film: one tab per category, a row of picture cards in each. */
  promos: z.strictObject({
    heading: localizedText,
    description: localizedText,
    tabs: z.array(promoTab).min(1).max(4),
    tone,
  }),
  mobile: z.strictObject({
    heading: localizedText,
    description: localizedText,
    columns: z
      .array(z.strictObject({ id: stableId, heading: localizedText, overview: link, links: z.array(link) }))
      .length(2),
    tone,
  }),
  steps: z.strictObject({
    heading: localizedText,
    items: z.array(z.strictObject({ id: stableId, title: localizedText, description: localizedText })).length(3),
    tone,
  }),
  solar: z.strictObject({
    heading: localizedText,
    description: localizedText,
    provider: localizedText,
    image: mediaRef,
    cta,
    tone,
  }),
  faq: z.strictObject({
    heading: localizedText,
    items: z.array(z.strictObject({ id: stableId, question: localizedText, answer: localizedText })).min(1),
    tone,
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
    image: mediaRef,
    cta,
    tone,
  }),
  about: z.strictObject({ heading: localizedText, body: z.array(localizedText), image: mediaRef, tone }),
  stats: z.strictObject({
    heading: localizedText,
    items: z.array(z.strictObject({ id: stableId, value: z.string().min(1), label: localizedText })),
  }),
  process: z.strictObject({
    heading: localizedText,
    description: localizedText,
    image: mediaRef,
    steps: z.array(z.strictObject({ id: stableId, title: localizedText, description: localizedText })),
    tone,
  }),
  packages: z.strictObject({
    id: anchorId,
    heading: localizedText,
    group: stableId,
    packageCta: cta,
    notes: z.array(localizedText),
    tone,
  }),
  bundle: z.strictObject({
    heading: localizedText,
    description: localizedText,
    items: z.array(localizedText),
    image: mediaRef,
    tone,
  }),
  knowledge: z.strictObject({
    heading: localizedText,
    articles: z.array(
      z.strictObject({
        id: stableId,
        title: localizedText,
        body: z.array(localizedText),
        list: z.array(localizedText),
        images: z.array(mediaRef),
      }),
    ),
    tone,
  }),
});
export type SolarPage = z.infer<typeof solarPage>;

export const contactPage = z.strictObject({
  id: z.literal("contact"),
  path: z.literal("/service"),
  seo,
  hero: z.strictObject({ heading: localizedText, description: localizedText, tone }),
  channels: z.strictObject({
    heading: localizedText,
    /** Contact channels in display order; addresses come from site settings. */
    items: z
      .array(
        z.strictObject({
          id: stableId,
          channel: contactChannel,
          title: localizedText,
          description: localizedText,
        }),
      )
      .min(1),
    tone,
  }),
  /** Band under the channels asking visitors to request a call back. */
  callback: z.strictObject({ note: localizedText, tone }),
});
export type ContactPage = z.infer<typeof contactPage>;

export const agentPage = z.strictObject({
  id: z.literal("apply-with-agent"),
  path: z.literal("/wifiService"),
  seo,
  hero: z.strictObject({
    heading: localizedText,
    description: localizedText,
    image: mediaRef,
    primaryCta: cta,
    secondaryCta: cta,
    tone,
  }),
  steps: z.strictObject({
    heading: localizedText,
    items: z.array(z.strictObject({ id: stableId, title: localizedText, description: localizedText })).length(3),
    tone,
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

// Whole site ----------------------------------------------------------------------

/** Everything the public site renders. Published content and a draft share this shape. */
export const siteContent = z.strictObject({
  site: siteSettings,
  media: z.record(stableId, mediaAsset),
  benefits: z.record(stableId, benefit),
  catalog: z.array(catalogPackage),
  pages: z.strictObject({
    home: homePage,
    packages: z.array(packagePage),
    solar: solarPage,
    contact: contactPage,
    agent: agentPage,
    terms: legalPage,
  }),
});
export type SiteContent = z.infer<typeof siteContent>;
