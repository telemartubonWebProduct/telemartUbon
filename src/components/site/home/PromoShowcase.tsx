import Image from "next/image";

import { packageSectionIn } from "@/lib/content/lookup";
import type { CatalogPackage, HomePage } from "@/lib/content/schema";

import type { RenderContext } from "../context";
import { CtaLink, TargetLink } from "../links";
import { PriceBlock, speedText } from "../PackageCompare";
import { PromoTabs } from "./PromoTabs";

const doc = "page:home" as const;

type Tab = HomePage["promos"]["tabs"][number];
type Card = Tab["items"][number];

/** Icons shown on a card before the rest are counted ("+2"). */
const BENEFIT_ICONS = 4;

/**
 * The home page's recommended packages, straight after the film: a tab per
 * category, and in each a row of picture cards that scrolls sideways. Prices,
 * speeds and terms are the catalog's; the card only adds a picture.
 */
export function PromoShowcase({ ctx }: { ctx: RenderContext }) {
  const { promos } = ctx.content.pages.home;
  const { ui } = ctx.site;
  return (
    <section aria-labelledby="promos-heading" className="tm-promos py-14 lg:py-20" data-tone={promos.tone} {...ctx.bind(doc, "promos")}>
      <div className="tm-container">
        <div className="max-w-[46rem]">
          <h2 id="promos-heading" className="tm-section-title" {...ctx.bind(doc, "promos", "heading")}>
            {ctx.t(promos.heading)}
          </h2>
          <p className="mt-3 text-pretty text-tm-lead text-tm-muted" {...ctx.bind(doc, "promos", "description")}>
            {ctx.t(promos.description)}
          </p>
        </div>
        <PromoTabs
          label={ctx.t(promos.heading)}
          previous={ctx.t(ui.scrollPrevious)}
          next={ctx.t(ui.scrollNext)}
          // The editor shows every tab at once, so each card can be clicked and edited.
          stacked={ctx.edit}
          tabs={promos.tabs.map((tab) => ({ id: tab.id, title: ctx.t(tab.title), bind: ctx.bind(doc, "promos", "tabs", tab.id, "title") }))}
        >
          {promos.tabs.map((tab) => (
            <PromoPanel key={tab.id} ctx={ctx} tab={tab} />
          ))}
        </PromoTabs>
      </div>
    </section>
  );
}

function PromoPanel({ ctx, tab }: { ctx: RenderContext; tab: Tab }) {
  const bind = (...path: string[]) => ctx.bind(doc, "promos", "tabs", tab.id, ...path);
  return (
    <div {...bind()}>
      <ul role="list" data-rail="" tabIndex={0} aria-label={ctx.t(tab.title)} className="tm-promo-rail">
        {tab.items.map((card) => (
          <PromoCard key={card.id} ctx={ctx} tab={tab} card={card} />
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        {tab.remark ? (
          <p className="text-tm-small text-tm-muted" {...bind("remark")}>
            {ctx.t(tab.remark)}
          </p>
        ) : (
          <span />
        )}
        <CtaLink ctx={ctx} cta={tab.viewAll} bind={bind("viewAll")} />
      </div>
    </div>
  );
}

/** The figure a visitor compares first: the speed of home internet, otherwise what the package gives. */
function KeyFigure({ ctx, item }: { ctx: RenderContext; item: CatalogPackage }) {
  if (item.speed) {
    const speed = speedText(item.speed, ctx.locale);
    return (
      <p className="tm-promo-figure" {...ctx.bind(`package:${item.id}`, "speed")}>
        <span className="sr-only">{ctx.t(ctx.site.ui.speed)} </span>
        <span className="tm-num">{speed.figure}</span> <span className="tm-promo-figure-unit">{speed.unit}</span>
      </p>
    );
  }
  return null;
}

function PromoCard({ ctx, tab, card }: { ctx: RenderContext; tab: Tab; card: Card }) {
  const { ui } = ctx.site;
  const item = ctx.packageById(card.packageId);
  const image = ctx.media(card.image);
  const details = packageSectionIn(ctx.content, item);
  const term = item.contract ?? item.validity;
  const bind = (...path: string[]) => ctx.bind(doc, "promos", "tabs", tab.id, "items", card.id, ...path);
  const own = (field: string) => ctx.bind(`package:${item.id}`, field);
  const extra = item.benefits.length - BENEFIT_ICONS;
  return (
    <li className="tm-promo-card" data-package={item.id} {...bind()}>
      <div className="tm-promo-media">
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={ctx.t(image.alt)}
          sizes="(min-width: 1024px) 23rem, (min-width: 640px) 45vw, 82vw"
          className="absolute inset-0 h-full w-full object-cover"
          {...bind("image")}
        />
        <KeyFigure ctx={ctx} item={item} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-tm-h4 font-semibold" {...own("name")}>
          {ctx.t(item.name)}
        </h3>
        {!item.speed && item.allowance ? (
          <p className="mt-1 text-tm-small text-tm-muted" {...own("allowance")}>
            {ctx.t(item.allowance)}
          </p>
        ) : null}
        <div className="mt-4" {...own("price")}>
          <PriceBlock ctx={ctx} price={item.price} size="large" />
        </div>
        {term ? (
          <p className="mt-2 text-tm-small" {...own(item.contract ? "contract" : "validity")}>
            <span className="text-tm-muted">{ctx.t(item.contract ? ui.contract : ui.validity)}</span> {ctx.t(term)}
          </p>
        ) : null}
        {item.benefits.length > 0 ? (
          <ul role="list" aria-label={ctx.t(ui.benefits)} className="mt-4 flex flex-wrap items-center gap-2" {...own("benefits")}>
            {item.benefits.slice(0, BENEFIT_ICONS).map((id) => {
              const benefit = ctx.benefit(id);
              const icon = ctx.media(benefit.icon);
              return (
                <li key={id} className="tm-promo-benefit" title={ctx.t(benefit.label)}>
                  <Image src={icon.src} width={icon.width} height={icon.height} alt={ctx.t(benefit.label)} className="h-7 w-7 object-contain" />
                </li>
              );
            })}
            {extra > 0 ? (
              <li className="tm-promo-benefit tm-num text-tm-small font-semibold" aria-label={item.benefits.slice(BENEFIT_ICONS).map((id) => ctx.t(ctx.benefit(id).label)).join(", ")}>
                +{extra}
              </li>
            ) : null}
          </ul>
        ) : null}
        <div className="mt-auto grid gap-3 pt-6">
          <CtaLink ctx={ctx} cta={tab.packageCta} context={ctx.t(item.name)} className="w-full" bind={ctx.bind(doc, "promos", "tabs", tab.id, "packageCta")} />
          {details ? (
            <TargetLink ctx={ctx} target={details} className="tm-link justify-self-center text-tm-small font-semibold">
              {ctx.t(ui.packageDetails)}
              <span className="sr-only">: {ctx.t(item.name)}</span>
            </TargetLink>
          ) : null}
        </div>
      </div>
    </li>
  );
}
