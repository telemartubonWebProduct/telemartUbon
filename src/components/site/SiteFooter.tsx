import Image from "next/image";

import { content, getMedia } from "@/lib/content";
import { formatPhone, isCurrent, resolveLink, telHref, tx } from "@/lib/content/render";
import type { Locale } from "@/lib/i18n/locales";

import { CallIcon, MailIcon } from "./icons";
import { LanguageSwitch } from "./LanguageSwitch";
import { SmartLink, TargetLink } from "./links";

export function SiteFooter({ locale, path }: { locale: Locale; path: string }) {
  const { site } = content;
  const { ui, contact } = site;
  const qr = getMedia(contact.lineQr);
  const newTab = tx(ui.opensInNewTab, locale);
  const year = new Date().getFullYear();

  return (
    <footer className="tm-on-ink bg-tm-ink text-tm-on-ink">
      <div className="tm-container grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.25fr)] lg:gap-10">
        <div>
          <p className="text-tm-h4 font-semibold">{tx(site.brand.name, locale)}</p>
          <p className="mt-3 max-w-[22rem] text-tm-small text-tm-on-ink-muted">{tx(site.footer.about, locale)}</p>
        </div>

        {site.footer.groups.map((group) => (
          <nav key={group.id} aria-labelledby={`footer-${group.id}`}>
            <h2 id={`footer-${group.id}`} className="text-tm-small font-semibold text-tm-on-ink-muted">
              {tx(group.heading, locale)}
            </h2>
            <ul className="mt-3 grid gap-1">
              {group.links.map((entry) => (
                <li key={entry.id}>
                  <TargetLink
                    target={entry.target}
                    locale={locale}
                    site={site}
                    current={isCurrent(entry.target, path)}
                    className="inline-flex min-h-tm-control items-center py-1 hover:underline hover:decoration-tm-red hover:decoration-2 hover:underline-offset-[0.35em] aria-[current=page]:underline aria-[current=page]:underline-offset-[0.35em]"
                  >
                    {tx(entry.label, locale)}
                  </TargetLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <section aria-labelledby="footer-contact">
          <h2 id="footer-contact" className="text-tm-small font-semibold text-tm-on-ink-muted">
            {tx(ui.footerContact, locale)}
          </h2>
          <div className="mt-4 flex items-start gap-4">
            <Image
              src={qr.src}
              width={qr.width}
              height={qr.height}
              alt={tx(qr.alt, locale)}
              className="h-24 w-24 shrink-0 rounded-tm-control bg-tm-canvas p-1"
            />
            <div>
              <p className="text-tm-small text-tm-on-ink-muted">{tx(ui.lineId, locale)}</p>
              <p className="text-tm-lead font-semibold">{contact.lineId}</p>
              <SmartLink
                link={resolveLink({ kind: "contact", channel: "line-sales" }, locale, site)}
                ctaId="footer-line"
                newTabLabel={newTab}
                className="tm-button tm-button-secondary mt-2"
              >
                {tx(ui.chatOnLine, locale)}
              </SmartLink>
            </div>
          </div>
          <ul className="mt-6 grid gap-1">
            {contact.phones.map((phone) => (
              <li key={phone.number}>
                <a href={telHref(phone.number)} data-cta="footer-call" className="inline-flex min-h-tm-control items-center gap-2 hover:underline">
                  <CallIcon className="text-[1.1em]" />
                  <span className="sr-only">{tx(ui.call, locale)} </span>
                  <span className="tm-num font-semibold">{formatPhone(phone.number)}</span>
                  <span className="text-tm-small text-tm-on-ink-muted">{tx(phone.label, locale)}</span>
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${contact.email}`} data-cta="footer-email" className="inline-flex min-h-tm-control items-center gap-2 break-all hover:underline">
                <MailIcon className="shrink-0 text-[1.1em]" />
                <span className="sr-only">{tx(ui.email, locale)} </span>
                {contact.email}
              </a>
            </li>
            <li>
              <SmartLink
                link={resolveLink({ kind: "contact", channel: "facebook" }, locale, site)}
                ctaId="footer-facebook"
                newTabLabel={newTab}
                className="inline-flex min-h-tm-control items-center hover:underline"
              >
                {tx(ui.facebook, locale)}
              </SmartLink>
            </li>
          </ul>
        </section>
      </div>

      <div className="border-t border-tm-muted">
        <div className="tm-container flex flex-col-reverse gap-4 py-6 text-tm-small text-tm-on-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {tx(site.footer.copyright, locale)}
          </p>
          <LanguageSwitch locale={locale} path={path} label={tx(ui.languageSwitch, locale)} tone="ink" />
        </div>
      </div>
    </footer>
  );
}
