import Image from "next/image";

import { content, getMedia, packageById } from "@/lib/content";
import { tx } from "@/lib/content/render";
import type { Locale } from "@/lib/i18n/locales";

import { PlusIcon, serviceIcons } from "../icons";
import { CtaLink, TargetLink } from "../links";
import { PackageCompare } from "../PackageCompare";
import { Steps } from "../Steps";

const home = () => content.pages.home;

/** Four ways in, in one divided panel; solar is marked as W&W Energy's service. */
export function ServiceChooser({ locale }: { locale: Locale }) {
  const { services } = home();
  return (
    <section aria-labelledby="services-heading" className="border-t border-tm-line py-14 lg:py-20">
      <div className="tm-container">
        <h2 id="services-heading" className="text-tm-h2 font-semibold">
          {tx(services.heading, locale)}
        </h2>
        <ul
          role="list"
          className="mt-8 grid gap-px overflow-hidden rounded-tm-panel border border-tm-line bg-tm-line sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.items.map((item) => {
            const Icon = serviceIcons[item.icon];
            return (
              <li key={item.id} className="bg-tm-canvas">
                <TargetLink
                  target={item.target}
                  locale={locale}
                  site={content.site}
                  className="grid h-full grid-cols-[auto_minmax(0,1fr)] gap-x-4 p-5 transition-colors duration-tm-fast hover:bg-tm-surface sm:flex sm:flex-col sm:gap-3 sm:p-6 lg:p-7"
                >
                  <Icon className="row-span-3 text-[2.5rem] sm:text-[2.75rem]" />
                  <h3 className="text-tm-h4 font-semibold sm:mt-2">{tx(item.title, locale)}</h3>
                  <p className="mt-1 text-tm-muted sm:mt-0">{tx(item.description, locale)}</p>
                  {item.provider ? <p className="mt-2 text-tm-small font-semibold sm:mt-auto sm:pt-2">{tx(item.provider, locale)}</p> : null}
                </TargetLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function FeaturedPackages({ locale }: { locale: Locale }) {
  const { featured } = home();
  const items = featured.packageIds.map(packageById);
  return (
    <section aria-labelledby="featured-heading" className="bg-tm-surface py-14 lg:py-20">
      <div className="tm-container">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <div className="max-w-[40rem]">
            <h2 id="featured-heading" className="text-tm-h2 font-semibold">
              {tx(featured.heading, locale)}
            </h2>
            <p className="mt-2 text-tm-muted">{tx(featured.description, locale)}</p>
          </div>
          <CtaLink cta={featured.viewAll} locale={locale} site={content.site} />
        </div>
        <div className="mt-8">
          <PackageCompare items={items} locale={locale} cta={featured.packageCta} variant="compare" className="lg:grid-cols-3" />
        </div>
      </div>
    </section>
  );
}

export function MobileAddons({ locale }: { locale: Locale }) {
  const { mobile } = home();
  return (
    <section aria-labelledby="mobile-heading" className="py-14 lg:py-20">
      <div className="tm-container">
        <h2 id="mobile-heading" className="text-tm-h2 font-semibold">
          {tx(mobile.heading, locale)}
        </h2>
        <p className="mt-2 max-w-[40rem] text-tm-muted">{tx(mobile.description, locale)}</p>
        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-8">
          {mobile.columns.map((column) => (
            <div key={column.id}>
              <h3 className="text-tm-h4 font-semibold">{tx(column.heading, locale)}</h3>
              <ul className="mt-3 divide-y divide-tm-line border-y border-tm-line">
                {column.links.map((entry) => (
                  <li key={entry.id}>
                    <TargetLink
                      target={entry.target}
                      locale={locale}
                      site={content.site}
                      className="flex min-h-[3.25rem] items-center py-2 text-tm-lead hover:underline hover:decoration-tm-red hover:decoration-2 hover:underline-offset-[0.35em]"
                    >
                      {tx(entry.label, locale)}
                    </TargetLink>
                  </li>
                ))}
              </ul>
              <TargetLink target={column.overview.target} locale={locale} site={content.site} className="tm-link mt-4 inline-block font-semibold">
                {tx(column.overview.label, locale)}
              </TargetLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeSteps({ locale }: { locale: Locale }) {
  const { steps } = home();
  return (
    <Steps
      id="home-steps"
      heading={tx(steps.heading, locale)}
      items={steps.items.map((item) => ({ id: item.id, title: tx(item.title, locale), description: tx(item.description, locale) }))}
    />
  );
}

export function SolarTeaser({ locale }: { locale: Locale }) {
  const { solar } = home();
  const image = getMedia(solar.image);
  return (
    <section aria-labelledby="solar-teaser-heading" className="border-t border-tm-line py-14 lg:py-20">
      <div className="tm-container grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={tx(image.alt, locale)}
          sizes="(min-width: 1024px) 40rem, 100vw"
          className="aspect-[16/10] w-full rounded-tm-panel object-cover"
        />
        <div className="max-w-[34rem]">
          <h2 id="solar-teaser-heading" className="text-tm-h2 font-semibold">
            {tx(solar.heading, locale)}
          </h2>
          <p className="mt-3 text-tm-lead text-tm-muted">{tx(solar.description, locale)}</p>
          <p className="mt-4 font-semibold">{tx(solar.provider, locale)}</p>
          <CtaLink cta={solar.cta} locale={locale} site={content.site} className="mt-6" />
        </div>
      </div>
    </section>
  );
}

export function Faq({ locale }: { locale: Locale }) {
  const { faq } = home();
  return (
    <section aria-labelledby="faq-heading" className="border-t border-tm-line py-14 lg:py-20">
      <div className="tm-container grid gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-14">
        <h2 id="faq-heading" className="text-tm-h2 font-semibold">
          {tx(faq.heading, locale)}
        </h2>
        <div className="tm-faq divide-y divide-tm-line border-y border-tm-line">
          {faq.items.map((item) => (
            <details key={item.id} id={`faq-${item.id}`}>
              <summary className="flex min-h-tm-control items-center justify-between gap-6 py-5 text-tm-lead font-medium">
                {tx(item.question, locale)}
                <PlusIcon data-open-icon="" className="shrink-0 text-[1.35em]" />
              </summary>
              <p className="max-w-[44rem] pb-6 text-tm-muted">{tx(item.answer, locale)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
