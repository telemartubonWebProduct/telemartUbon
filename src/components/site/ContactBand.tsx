import { content } from "@/lib/content";
import { formatPhone, resolveLink, telHref, tx } from "@/lib/content/render";
import type { Locale } from "@/lib/i18n/locales";

import { CallIcon } from "./icons";
import { SmartLink } from "./links";

/** Closing call to action on every page except the contact page itself. */
export function ContactBand({ locale }: { locale: Locale }) {
  const { site } = content;
  const { ui } = site;
  const phone = site.contact.phones[0];

  return (
    <section aria-labelledby="contact-band-heading" className="bg-tm-surface">
      <div className="tm-container grid gap-8 py-14 md:grid-cols-[minmax(0,1fr)_auto] md:items-end lg:py-16">
        <div className="max-w-[42rem]">
          <h2 id="contact-band-heading" className="text-tm-h2 font-semibold">
            {tx(site.contactBand.heading, locale)}
          </h2>
          <p className="mt-3 text-tm-lead text-tm-muted">{tx(site.contactBand.description, locale)}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <SmartLink
            link={resolveLink({ kind: "contact", channel: "line-sales" }, locale, site)}
            ctaId="contact-band-line"
            newTabLabel={tx(ui.opensInNewTab, locale)}
            className="tm-button tm-button-primary"
          >
            {tx(ui.chatOnLine, locale)}
          </SmartLink>
          <a href={telHref(phone.number)} data-cta="contact-band-call" className="tm-button tm-button-secondary">
            <CallIcon className="text-[1.15em]" />
            {tx(ui.call, locale)} <span className="tm-num">{formatPhone(phone.number)}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
