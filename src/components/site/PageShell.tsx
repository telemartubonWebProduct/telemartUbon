import type { ReactNode } from "react";

import { ContactBand } from "./ContactBand";
import type { RenderContext } from "./context";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type PageShellProps = {
  ctx: RenderContext;
  /** Unprefixed path of the page, used for the current menu item and the language switch. */
  path: string;
  children: ReactNode;
  /** The contact page already is the contact band. */
  contactBand?: boolean;
};

/** Header, main landmark, closing contact band and footer shared by every public page. */
export function PageShell({ ctx, path, children, contactBand = true }: PageShellProps) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-tm-control focus:bg-tm-ink focus:px-4 focus:py-3 focus:text-tm-on-ink"
      >
        {ctx.t(ctx.site.ui.skipToContent)}
      </a>
      <SiteHeader ctx={ctx} path={path} />
      <main id="main" tabIndex={-1} className="focus-visible:outline-none">
        {children}
      </main>
      {contactBand ? <ContactBand ctx={ctx} /> : null}
      <SiteFooter ctx={ctx} path={path} />
    </>
  );
}
