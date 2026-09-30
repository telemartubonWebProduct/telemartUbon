import Link from "next/link";
import type { ReactNode } from "react";

import { resolveLink, tx, type ResolvedLink } from "@/lib/content/render";
import type { Cta, LinkTarget, SiteSettings } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/locales";

type SmartLinkProps = {
  link: ResolvedLink;
  className?: string;
  children: ReactNode;
  /** Stable CTA id for analytics (M5); independent of the visible label. */
  ctaId?: string;
  newTabLabel: string;
  "aria-current"?: "page";
};

/** Internal links navigate inside the site; external ones open a new tab. */
export function SmartLink({ link, className, children, ctaId, newTabLabel, ...rest }: SmartLinkProps) {
  if (!link.external) {
    const internal = link.href.startsWith("/");
    return internal ? (
      <Link href={link.href} className={className} data-cta={ctaId} {...rest}>
        {children}
      </Link>
    ) : (
      <a href={link.href} className={className} data-cta={ctaId} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <a href={link.href} className={className} data-cta={ctaId} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="sr-only"> ({newTabLabel})</span>
    </a>
  );
}

type CtaLinkProps = {
  cta: Cta;
  locale: Locale;
  site: SiteSettings;
  className?: string;
  /** Extra words for screen readers, such as the package the button is for. */
  context?: string;
};

export function CtaLink({ cta, locale, site, className = "", context }: CtaLinkProps) {
  return (
    <SmartLink
      link={resolveLink(cta.target, locale, site)}
      ctaId={cta.id}
      newTabLabel={tx(site.ui.opensInNewTab, locale)}
      className={`tm-button ${cta.style === "primary" ? "tm-button-primary" : "tm-button-secondary"} ${className}`}
    >
      {tx(cta.label, locale)}
      {context ? <span className="sr-only">: {context}</span> : null}
    </SmartLink>
  );
}

export function TargetLink({
  target,
  locale,
  site,
  className,
  children,
  current,
}: {
  target: LinkTarget;
  locale: Locale;
  site: SiteSettings;
  className?: string;
  children: ReactNode;
  current?: boolean;
}) {
  return (
    <SmartLink
      link={resolveLink(target, locale, site)}
      newTabLabel={tx(site.ui.opensInNewTab, locale)}
      className={className}
      aria-current={current ? "page" : undefined}
    >
      {children}
    </SmartLink>
  );
}
