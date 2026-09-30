import Image from "next/image";

import { content, getMedia, publicPackages } from "@/lib/content";
import { tx } from "@/lib/content/render";
import type { Locale } from "@/lib/i18n/locales";

import { PlusIcon } from "../icons";
import { CtaLink } from "../links";
import { EmptyGroup } from "../PackageSections";
import { PackageCompare } from "../PackageCompare";
import { PageHero } from "../PageHero";
import { Steps } from "../Steps";

const solar = () => content.pages.solar;

function Figure({ id, locale, className, sizes }: { id: string; locale: Locale; className?: string; sizes: string }) {
  const image = getMedia(id);
  return (
    <Image
      src={image.src}
      width={image.width}
      height={image.height}
      alt={tx(image.alt, locale)}
      sizes={sizes}
      className={`w-full rounded-tm-panel ${className ?? ""}`}
    />
  );
}

export function SolarHero({ locale }: { locale: Locale }) {
  const { hero } = solar();
  const image = getMedia(hero.image);
  return (
    <PageHero
      heading={tx(hero.heading, locale)}
      description={tx(hero.description, locale)}
      actions={<CtaLink cta={hero.cta} locale={locale} site={content.site} />}
      note={<p className="font-semibold text-tm-ink">{tx(hero.provider, locale)}</p>}
      media={
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={tx(image.alt, locale)}
          preload
          sizes="(min-width: 1024px) 36rem, 100vw"
          className="aspect-[4/3] w-full rounded-tm-panel object-cover"
        />
      }
    />
  );
}

export function SolarAbout({ locale }: { locale: Locale }) {
  const { about, stats } = solar();
  return (
    <section aria-labelledby="solar-about-heading" className="py-14 lg:py-20">
      <div className="tm-container grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div className="max-w-[36rem]">
          <h2 id="solar-about-heading" className="text-tm-h2 font-semibold">
            {tx(about.heading, locale)}
          </h2>
          {about.body.map((paragraph, index) => (
            <p key={index} className="mt-4 text-tm-muted">
              {tx(paragraph, locale)}
            </p>
          ))}
        </div>
        <Figure id={about.image} locale={locale} sizes="(min-width: 1024px) 36rem, 100vw" />
      </div>
      <div className="tm-container mt-14">
        <h3 className="text-tm-h4 font-semibold">{tx(stats.heading, locale)}</h3>
        <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-tm-line pt-6 lg:grid-cols-4">
          {stats.items.map((item) => (
            <div key={item.id} className="flex flex-col">
              <dt className="order-2 text-tm-small text-tm-muted">{tx(item.label, locale)}</dt>
              <dd className="tm-num order-1 text-tm-h1 font-semibold leading-tight">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function SolarProcess({ locale }: { locale: Locale }) {
  const { process } = solar();
  return (
    <Steps
      id="solar-process"
      heading={tx(process.heading, locale)}
      description={tx(process.description, locale)}
      items={process.steps.map((step) => ({ id: step.id, title: tx(step.title, locale), description: tx(step.description, locale) }))}
      aside={<Figure id={process.image} locale={locale} sizes="(min-width: 1024px) 36rem, 100vw" className="aspect-[16/9] object-cover" />}
    />
  );
}

export function SolarPackages({ locale }: { locale: Locale }) {
  const { packages } = solar();
  const items = publicPackages("solar", packages.group);
  return (
    <section id={packages.id} aria-labelledby={`${packages.id}-heading`} className="bg-tm-surface py-14 lg:py-20">
      <div className="tm-container">
        <h2 id={`${packages.id}-heading`} className="text-tm-h2 font-semibold">
          {tx(packages.heading, locale)}
        </h2>
        <div className="mt-8">
          {items.length > 0 ? (
            <PackageCompare items={items} locale={locale} cta={packages.packageCta} variant="compare" className="lg:grid-cols-3" />
          ) : (
            <EmptyGroup locale={locale} />
          )}
        </div>
        {packages.notes.length > 0 ? (
          <ul className="mt-8 grid max-w-[48rem] list-disc gap-1 pl-5 text-tm-small text-tm-muted">
            {packages.notes.map((note, index) => (
              <li key={index}>{tx(note, locale)}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

export function SolarBundle({ locale }: { locale: Locale }) {
  const { bundle } = solar();
  const logo = getMedia(bundle.image);
  return (
    <section aria-labelledby="solar-bundle-heading" className="py-14 lg:py-20">
      <div className="tm-container">
        <div className="grid gap-8 rounded-tm-panel border border-tm-line p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center lg:p-10">
          <div>
            <h2 id="solar-bundle-heading" className="max-w-[40rem] text-tm-h3 font-semibold">
              {tx(bundle.heading, locale)}
            </h2>
            <p className="mt-2 text-tm-muted">{tx(bundle.description, locale)}</p>
            <ul className="mt-5 grid gap-2">
              {bundle.items.map((item, index) => (
                <li key={index} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-tm-red" />
                  {tx(item, locale)}
                </li>
              ))}
            </ul>
          </div>
          <Image src={logo.src} width={logo.width} height={logo.height} alt={tx(logo.alt, locale)} className="h-auto w-56 md:w-64" />
        </div>
      </div>
    </section>
  );
}

export function SolarKnowledge({ locale }: { locale: Locale }) {
  const { knowledge } = solar();
  return (
    <section aria-labelledby="solar-knowledge-heading" className="border-t border-tm-line py-14 lg:py-20">
      <div className="tm-container grid gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-14">
        <h2 id="solar-knowledge-heading" className="text-tm-h2 font-semibold">
          {tx(knowledge.heading, locale)}
        </h2>
        <div className="tm-faq divide-y divide-tm-line border-y border-tm-line">
          {knowledge.articles.map((article) => (
            <details key={article.id} id={`knowledge-${article.id}`}>
              <summary className="flex min-h-tm-control items-center justify-between gap-6 py-5 text-tm-lead font-medium">
                {tx(article.title, locale)}
                <PlusIcon data-open-icon="" className="shrink-0 text-[1.35em]" />
              </summary>
              <div className="grid max-w-[46rem] gap-4 pb-6 text-tm-muted">
                {article.body.map((paragraph, index) => (
                  <p key={index}>{tx(paragraph, locale)}</p>
                ))}
                {article.list.length > 0 ? (
                  <ol className="grid list-decimal gap-2 pl-6">
                    {article.list.map((entry, index) => (
                      <li key={index}>{tx(entry, locale)}</li>
                    ))}
                  </ol>
                ) : null}
                {article.images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {article.images.map((id) => (
                      <Figure key={id} id={id} locale={locale} sizes="(min-width: 1024px) 22rem, 45vw" className="aspect-[16/10] object-cover" />
                    ))}
                  </div>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
