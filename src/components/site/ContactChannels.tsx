import Image from "next/image";

import { content, getMedia } from "@/lib/content";
import { formatPhone, resolveLink, telHref, tx } from "@/lib/content/render";
import type { ContactPage } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/locales";

import { CallIcon, MailIcon } from "./icons";
import { SmartLink } from "./links";

type Channel = ContactPage["channels"][number];

function ChannelAction({ channel, locale }: { channel: Channel; locale: Locale }) {
  const { site } = content;
  const { ui, contact } = site;
  const newTab = tx(ui.opensInNewTab, locale);

  switch (channel.channel) {
    case "line-sales":
    case "line-service": {
      const qr = getMedia(contact.lineQr);
      return (
        <div className="flex flex-wrap items-center gap-5">
          <Image src={qr.src} width={qr.width} height={qr.height} alt={tx(qr.alt, locale)} className="h-28 w-28 rounded-tm-control border border-tm-line" />
          <div>
            <p className="text-tm-small text-tm-muted">{tx(ui.lineId, locale)}</p>
            <p className="text-tm-lead font-semibold">{contact.lineId}</p>
            <SmartLink
              link={resolveLink({ kind: "contact", channel: channel.channel }, locale, site)}
              ctaId={`contact-${channel.id}`}
              newTabLabel={newTab}
              className="tm-button tm-button-primary mt-3"
            >
              {tx(ui.chatOnLine, locale)}
            </SmartLink>
          </div>
        </div>
      );
    }
    case "phone-sales":
      return (
        <ul className="grid gap-2">
          {contact.phones.map((phone) => (
            <li key={phone.number}>
              <a href={telHref(phone.number)} data-cta={`contact-${channel.id}`} className="tm-button tm-button-secondary w-full justify-between sm:w-auto sm:min-w-[16rem]">
                <span className="inline-flex items-center gap-2">
                  <CallIcon className="text-[1.15em]" />
                  <span className="sr-only">{tx(ui.call, locale)} </span>
                  <span className="tm-num">{formatPhone(phone.number)}</span>
                </span>
                <span className="text-tm-small font-normal">{tx(phone.label, locale)}</span>
              </a>
            </li>
          ))}
        </ul>
      );
    case "email":
      return (
        <a href={`mailto:${contact.email}`} data-cta={`contact-${channel.id}`} className="tm-link inline-flex items-center gap-2 break-all text-tm-lead font-semibold">
          <MailIcon className="shrink-0" />
          {contact.email}
        </a>
      );
    case "facebook":
      return (
        <SmartLink
          link={resolveLink({ kind: "contact", channel: "facebook" }, locale, site)}
          ctaId={`contact-${channel.id}`}
          newTabLabel={newTab}
          className="tm-button tm-button-secondary"
        >
          {tx(ui.facebook, locale)}
        </SmartLink>
      );
  }
}

export function ContactChannels({ page, locale }: { page: ContactPage; locale: Locale }) {
  const { site } = content;
  return (
    <>
      <section aria-labelledby="channels-heading" className="py-12 lg:py-16">
        <div className="tm-container">
          <h2 id="channels-heading" className="text-tm-h2 font-semibold">
            {tx(page.channelsHeading, locale)}
          </h2>
          <ul role="list" className="mt-8 grid gap-px overflow-hidden rounded-tm-panel border border-tm-line bg-tm-line md:grid-cols-2">
            {page.channels.map((channel) => (
              <li key={channel.id} className="flex flex-col items-start gap-5 bg-tm-canvas p-6 lg:p-8">
                <div>
                  <h3 className="text-tm-h3 font-semibold">{tx(channel.title, locale)}</h3>
                  <p className="mt-1 text-tm-muted">{tx(channel.description, locale)}</p>
                </div>
                <ChannelAction channel={channel} locale={locale} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section aria-label={tx(site.contactBand.heading, locale)} className="bg-tm-surface">
        <div className="tm-container flex flex-col gap-5 py-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[40rem] text-tm-lead">{tx(page.formNote, locale)}</p>
          <SmartLink
            link={resolveLink({ kind: "contact", channel: page.channels.find((c) => c.channel.startsWith("line"))?.channel ?? "line-sales" }, locale, site)}
            ctaId="contact-callback-line"
            newTabLabel={tx(site.ui.opensInNewTab, locale)}
            className="tm-button tm-button-primary shrink-0"
          >
            {tx(site.ui.chatOnLine, locale)}
          </SmartLink>
        </div>
      </section>
    </>
  );
}
