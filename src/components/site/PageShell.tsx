import type { ReactNode } from "react";

import { content } from "@/lib/content";
import { tx } from "@/lib/content/render";
import type { Locale } from "@/lib/i18n/locales";

import { ContactBand } from "./ContactBand";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type PageShellProps = {
  locale: Locale;
  /** Unprefixed path of the page, used for the current menu item and the language switch. */
  path: string;
  children: ReactNode;
  /** The contact page already is the contact band. */
  contactBand?: boolean;
};

/** Header, main landmark, closing contact band and footer shared by every public page. */
export function PageShell({ locale, path, children, contactBand = true }: PageShellProps) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-tm-control focus:bg-tm-ink focus:px-4 focus:py-3 focus:text-tm-on-ink"
      >
        {tx(content.site.ui.skipToContent, locale)}
      </a>
      <SiteHeader locale={locale} path={path} />
      <main id="main" tabIndex={-1} className="focus-visible:outline-none">
        {children}
      </main>
      {contactBand ? <ContactBand locale={locale} /> : null}
      <SiteFooter locale={locale} path={path} />
    </>
  );
}
