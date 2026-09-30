import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import { content, getBenefit, getMedia } from "@/lib/content";
import { formatNumber, tx } from "@/lib/content/render";
import type { CatalogPackage, Cta, Price } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/locales";

import { CtaLink } from "./links";

type Speed = NonNullable<CatalogPackage["speed"]>["download"];

function speedText({ download, upload }: NonNullable<CatalogPackage["speed"]>, locale: Locale) {
  const value = (speed: Speed) => formatNumber(speed.value, locale);
  return download.unit === upload.unit
    ? { figure: `${value(download)}/${value(upload)}`, unit: upload.unit }
    : { figure: `${value(download)} ${download.unit}/${value(upload)}`, unit: upload.unit };
}

function PriceBlock({ price, locale, size }: { price: Price; locale: Locale; size: "large" | "medium" }) {
  const { ui } = content.site;
  const unit = price.per === "month" ? ui.perMonth : ui.baht;
  const vat = price.vat === "excluded" ? ui.vatExcluded : price.vat === "included" ? ui.vatIncluded : null;
  return (
    <div>
      {price.regularAmount !== undefined ? (
        <p className="text-tm-small text-tm-muted">
          {tx(ui.regularPrice, locale)} <s className="tm-num">{formatNumber(price.regularAmount, locale)}</s> {tx(ui.baht, locale)}
        </p>
      ) : null}
      <p className="flex flex-wrap items-baseline gap-x-2">
        {price.regularAmount !== undefined ? <span className="sr-only">{tx(ui.offerPrice, locale)}</span> : null}
        <span className={`tm-num font-semibold leading-none ${size === "large" ? "text-[2.5rem]" : "text-tm-h2"}`}>
          {formatNumber(price.amount, locale)}
        </span>
        <span className="text-tm-small font-medium">{tx(unit, locale)}</span>
      </p>
      {vat ? <p className="mt-1 text-tm-caption text-tm-muted">{tx(vat, locale)}</p> : null}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="text-tm-caption font-medium text-tm-muted">{children}</p>;
}

type Row = { key: string; cell: (item: CatalogPackage) => ReactNode };

type PackageCompareProps = {
  items: CatalogPackage[];
  locale: Locale;
  cta: Cta;
  /** "compare" lines fields up in roomy cards; "compact" suits long lists of add-ons. */
  variant: "compare" | "compact";
  /** Level of the package names, one below the heading above the cards. */
  headingLevel?: 3 | 4;
  /** Extra classes on the grid, such as a fixed column count. */
  className?: string;
};

/**
 * Package cards whose fields sit in the same order and, on wide screens, on
 * the same row lines (CSS subgrid), so speed and price compare at a glance.
 * A row appears only when at least one package in the list has that field.
 */
export function PackageCompare({ items, locale, cta, variant, headingLevel = 3, className = "" }: PackageCompareProps) {
  const { ui } = content.site;
  const Heading = headingLevel === 3 ? "h3" : "h4";
  const some = (pick: (item: CatalogPackage) => unknown) =>
    items.some((item) => {
      const value = pick(item);
      return Array.isArray(value) ? value.length > 0 : value !== undefined;
    });
  const compact = variant === "compact";

  const rows: Row[] = [];
  if (some((item) => item.image)) {
    rows.push({
      key: "image",
      cell: (item) => {
        if (!item.image) return null;
        const image = getMedia(item.image);
        return (
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt={tx(image.alt, locale)}
            sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
            className="mx-auto aspect-square w-full max-w-[14rem] rounded-tm-control object-contain"
          />
        );
      },
    });
  }
  rows.push({
    key: "name",
    cell: (item) => (
      <>
        <Heading className={`${compact ? "text-tm-body" : "text-tm-h4"} font-semibold`}>{tx(item.name, locale)}</Heading>
        {item.audience ? (
          <p className="mt-1 text-tm-small text-tm-muted">
            {tx(ui.audience, locale)} {tx(item.audience, locale)}
          </p>
        ) : null}
      </>
    ),
  });
  if (some((item) => item.speed)) {
    rows.push({
      key: "speed",
      cell: (item) => {
        if (!item.speed) return null;
        const speed = speedText(item.speed, locale);
        return (
          <>
            <Label>{tx(ui.speed, locale)}</Label>
            <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
              <span className={`tm-num font-semibold leading-tight ${compact ? "text-tm-h4" : "text-tm-h3"}`}>{speed.figure}</span>
              <span className="text-tm-small font-medium">{speed.unit}</span>
            </p>
          </>
        );
      },
    });
  }
  if (some((item) => item.allowance)) {
    rows.push({
      key: "allowance",
      cell: (item) =>
        item.allowance ? (
          <>
            <Label>{tx(ui.allowance, locale)}</Label>
            <p className="mt-1 font-medium">{tx(item.allowance, locale)}</p>
          </>
        ) : null,
    });
  }
  rows.push({ key: "price", cell: (item) => <PriceBlock price={item.price} locale={locale} size={compact ? "medium" : "large"} /> });
  if (some((item) => item.contract ?? item.validity)) {
    rows.push({
      key: "term",
      cell: (item) => {
        const term = item.contract ?? item.validity;
        if (!term) return null;
        return (
          <>
            <Label>{tx(item.contract ? ui.contract : ui.validity, locale)}</Label>
            <p className="mt-1">{tx(term, locale)}</p>
          </>
        );
      },
    });
  }
  if (some((item) => item.benefits)) {
    rows.push({
      key: "benefits",
      cell: (item) =>
        item.benefits.length > 0 ? (
          <>
            <Label>{tx(ui.benefits, locale)}</Label>
            <ul className="mt-2 grid gap-2">
              {item.benefits.map((id) => {
                const benefit = getBenefit(id);
                const icon = getMedia(benefit.icon);
                return (
                  <li key={id} className="flex items-center gap-3 text-tm-small">
                    <Image src={icon.src} width={icon.width} height={icon.height} alt="" className="h-9 w-9 shrink-0 object-contain" />
                    <span>{tx(benefit.label, locale)}</span>
                  </li>
                );
              })}
            </ul>
          </>
        ) : null,
    });
  }
  if (some((item) => item.details)) {
    rows.push({
      key: "details",
      cell: (item) =>
        item.details.length > 0 ? (
          <>
            <Label>{tx(ui.details, locale)}</Label>
            <ul className="mt-1 grid list-disc gap-1 pl-5 text-tm-small marker:text-tm-muted">
              {item.details.map((detail, index) => (
                <li key={index}>{tx(detail, locale)}</li>
              ))}
            </ul>
          </>
        ) : null,
    });
  }
  if (some((item) => item.conditions)) {
    rows.push({
      key: "conditions",
      cell: (item) =>
        item.conditions.length > 0 ? (
          <>
            <Label>{tx(ui.conditions, locale)}</Label>
            <ul className="mt-1 grid list-disc gap-1 pl-5 text-tm-small text-tm-muted">
              {item.conditions.map((condition, index) => (
                <li key={index}>{tx(condition, locale)}</li>
              ))}
            </ul>
          </>
        ) : null,
    });
  }
  if (some((item) => item.dialCode)) {
    rows.push({
      key: "dial",
      cell: (item) =>
        item.dialCode ? (
          <>
            <Label>{tx(ui.dialCode, locale)}</Label>
            <a href={`tel:${encodeURIComponent(item.dialCode)}`} className="tm-link tm-num mt-1 inline-block text-tm-lead font-semibold">
              {item.dialCode}
            </a>
          </>
        ) : null,
    });
  }
  rows.push({
    key: "cta",
    cell: (item) => <CtaLink cta={cta} locale={locale} site={content.site} context={tx(item.name, locale)} className="w-full" />,
  });

  return (
    <ul role="list" className={`tm-compare ${compact ? "tm-compare-compact" : ""} ${className}`}>
      {items.map((item) => (
        <li
          key={item.id}
          data-package={item.id}
          className="tm-compare-card rounded-tm-panel border border-tm-line bg-tm-canvas"
          style={{ "--tm-rows": rows.length } as CSSProperties}
        >
          {rows.map((row) => (
            <div key={row.key} data-row={row.key} className={compact ? "px-4 py-3" : "px-5 py-4"}>
              {row.cell(item)}
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
}
