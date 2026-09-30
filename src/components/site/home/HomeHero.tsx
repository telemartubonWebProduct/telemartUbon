import type { RenderContext } from "../context";
import { CtaLink } from "../links";
import { RouterVisual } from "./RouterVisual";

const doc = "page:home" as const;

export function HomeHero({ ctx }: { ctx: RenderContext }) {
  const { hero } = ctx.content.pages.home;
  const visual = ctx.media(hero.visual);

  return (
    <section aria-labelledby="home-hero-heading" className="overflow-hidden" data-tone={hero.tone} {...ctx.bind(doc, "hero")}>
      <div className="tm-container grid items-center gap-10 pb-14 pt-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8 lg:pb-20 lg:pt-14">
        <div className="max-w-[36rem]">
          <h1
            id="home-hero-heading"
            className="text-balance text-[2.25rem] font-bold leading-[1.3] sm:text-tm-display sm:leading-[1.3] lg:text-[3.5rem]"
            {...ctx.bind(doc, "hero", "heading")}
          >
            {ctx.t(hero.heading)}
          </h1>
          <p className="mt-5 max-w-[32rem] text-tm-lead text-tm-muted" {...ctx.bind(doc, "hero", "description")}>
            {ctx.t(hero.description)}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink ctx={ctx} cta={hero.primaryCta} bind={ctx.bind(doc, "hero", "primaryCta")} />
            <CtaLink ctx={ctx} cta={hero.secondaryCta} bind={ctx.bind(doc, "hero", "secondaryCta")} />
          </div>
          <p className="mt-6 max-w-[32rem] text-tm-small text-tm-muted" {...ctx.bind(doc, "hero", "note")}>
            {ctx.t(hero.note)}
          </p>
        </div>
        <RouterVisual
          poster={visual}
          alt={ctx.t(visual.alt)}
          note={ctx.t(hero.visualNote)}
          // The editor shows the poster, the 3D model's first frame, so the preview stays light.
          interactive={!ctx.edit}
          binds={{ visual: ctx.bind(doc, "hero", "visual"), note: ctx.bind(doc, "hero", "visualNote") }}
        />
      </div>
    </section>
  );
}
