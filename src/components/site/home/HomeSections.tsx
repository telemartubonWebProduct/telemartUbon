import Image from "next/image";

import type { RenderContext } from "../context";
import { PlusIcon, serviceIcons } from "../icons";
import { CtaLink, TargetLink } from "../links";
import { Steps } from "../Steps";

const doc = "page:home" as const;

/** Four ways in, as picture tiles; solar is marked as W&W Energy's service. */
export function ServiceChooser({ ctx }: { ctx: RenderContext }) {
  const { services } = ctx.content.pages.home;
  return (
    <section aria-labelledby="services-heading" className="py-14 lg:py-20" data-tone={services.tone} {...ctx.bind(doc, "services")}>
      <div className="tm-container">
        <h2 id="services-heading" className="tm-section-title" {...ctx.bind(doc, "services", "heading")}>
          {ctx.t(services.heading)}
        </h2>
        <ul role="list" className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {services.items.map((item) => {
            const Icon = serviceIcons[item.icon];
            const image = ctx.media(item.image);
            const bind = (...path: string[]) => ctx.bind(doc, "services", "items", item.id, ...path);
            return (
              <li key={item.id}>
                <TargetLink ctx={ctx} target={item.target} bind={bind()} className="tm-service-tile group">
                  <Image
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt=""
                    sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 100vw"
                    className="tm-service-image"
                    {...bind("image")}
                  />
                  <span className="tm-service-words">
                    <Icon className="text-[2rem]" />
                    <span className="mt-3 block text-tm-h4 font-semibold" {...bind("title")}>
                      {ctx.t(item.title)}
                    </span>
                    <span className="mt-1 block text-tm-small text-tm-on-ink-muted" {...bind("description")}>
                      {ctx.t(item.description)}
                    </span>
                    {item.provider ? (
                      <span className="tm-service-provider" {...bind("provider")}>
                        {ctx.t(item.provider)}
                      </span>
                    ) : null}
                  </span>
                </TargetLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function MobileAddons({ ctx }: { ctx: RenderContext }) {
  const { mobile } = ctx.content.pages.home;
  return (
    <section aria-labelledby="mobile-heading" className="py-14 lg:py-20" data-tone={mobile.tone} {...ctx.bind(doc, "mobile")}>
      <div className="tm-container">
        <h2 id="mobile-heading" className="tm-section-title" {...ctx.bind(doc, "mobile", "heading")}>
          {ctx.t(mobile.heading)}
        </h2>
        <p className="mt-2 max-w-[40rem] text-tm-muted" {...ctx.bind(doc, "mobile", "description")}>
          {ctx.t(mobile.description)}
        </p>
        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-8">
          {mobile.columns.map((column) => (
            <div key={column.id}>
              <h3 className="text-tm-h4 font-semibold" {...ctx.bind(doc, "mobile", "columns", column.id, "heading")}>
                {ctx.t(column.heading)}
              </h3>
              <ul className="mt-3 divide-y divide-tm-line border-y border-tm-line">
                {column.links.map((entry) => (
                  <li key={entry.id}>
                    <TargetLink
                      ctx={ctx}
                      target={entry.target}
                      bind={ctx.bind(doc, "mobile", "columns", column.id, "links", entry.id)}
                      className="flex min-h-[3.25rem] items-center py-2 text-tm-lead hover:underline hover:decoration-tm-red hover:decoration-2 hover:underline-offset-[0.35em]"
                    >
                      {ctx.t(entry.label)}
                    </TargetLink>
                  </li>
                ))}
              </ul>
              <TargetLink
                ctx={ctx}
                target={column.overview.target}
                bind={ctx.bind(doc, "mobile", "columns", column.id, "overview")}
                className="tm-link mt-4 inline-block font-semibold"
              >
                {ctx.t(column.overview.label)}
              </TargetLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeSteps({ ctx }: { ctx: RenderContext }) {
  const { steps } = ctx.content.pages.home;
  return (
    <Steps
      ctx={ctx}
      id="home-steps"
      doc={doc}
      base={["steps"]}
      itemsKey="items"
      heading={steps.heading}
      items={steps.items}
      tone={steps.tone}
    />
  );
}

export function SolarTeaser({ ctx }: { ctx: RenderContext }) {
  const { solar } = ctx.content.pages.home;
  const image = ctx.media(solar.image);
  return (
    <section aria-labelledby="solar-teaser-heading" className="border-t border-tm-line py-14 lg:py-20" data-tone={solar.tone} {...ctx.bind(doc, "solar")}>
      <div className="tm-container grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={ctx.t(image.alt)}
          sizes="(min-width: 1024px) 40rem, 100vw"
          className="aspect-[16/10] w-full rounded-tm-panel object-cover"
          {...ctx.bind(doc, "solar", "image")}
        />
        <div className="max-w-[34rem]">
          <h2 id="solar-teaser-heading" className="tm-section-title" {...ctx.bind(doc, "solar", "heading")}>
            {ctx.t(solar.heading)}
          </h2>
          <p className="mt-3 text-tm-lead text-tm-muted" {...ctx.bind(doc, "solar", "description")}>
            {ctx.t(solar.description)}
          </p>
          <p className="mt-4 font-semibold" {...ctx.bind(doc, "solar", "provider")}>
            {ctx.t(solar.provider)}
          </p>
          <CtaLink ctx={ctx} cta={solar.cta} className="mt-6" bind={ctx.bind(doc, "solar", "cta")} />
        </div>
      </div>
    </section>
  );
}

export function Faq({ ctx }: { ctx: RenderContext }) {
  const { faq } = ctx.content.pages.home;
  return (
    <section aria-labelledby="faq-heading" className="border-t border-tm-line py-14 lg:py-20" data-tone={faq.tone} {...ctx.bind(doc, "faq")}>
      <div className="tm-container grid gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-14">
        <h2 id="faq-heading" className="tm-section-title" {...ctx.bind(doc, "faq", "heading")}>
          {ctx.t(faq.heading)}
        </h2>
        <div className="tm-faq divide-y divide-tm-line border-y border-tm-line">
          {faq.items.map((item) => (
            <details key={item.id} id={`faq-${item.id}`} {...ctx.bind(doc, "faq", "items", item.id)}>
              <summary className="flex min-h-tm-control items-center justify-between gap-6 py-5 text-tm-lead font-medium">
                <span {...ctx.bind(doc, "faq", "items", item.id, "question")}>{ctx.t(item.question)}</span>
                <PlusIcon data-open-icon="" className="shrink-0 text-[1.35em]" />
              </summary>
              <p className="max-w-[44rem] pb-6 text-tm-muted" {...ctx.bind(doc, "faq", "items", item.id, "answer")}>
                {ctx.t(item.answer)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
