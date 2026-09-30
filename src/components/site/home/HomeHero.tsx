import { content, getMedia } from "@/lib/content";
import { tx } from "@/lib/content/render";
import type { Locale } from "@/lib/i18n/locales";

import { CtaLink } from "../links";
import { RouterVisual } from "./RouterVisual";

export function HomeHero({ locale }: { locale: Locale }) {
  const { site } = content;
  const { hero } = content.pages.home;
  const visual = getMedia(hero.visual);

  return (
    <section aria-labelledby="home-hero-heading" className="overflow-hidden">
      <div className="tm-container grid items-center gap-10 pb-14 pt-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8 lg:pb-20 lg:pt-14">
        <div className="max-w-[36rem]">
          <h1
            id="home-hero-heading"
            className="text-balance text-[2.25rem] font-bold leading-[1.3] sm:text-tm-display sm:leading-[1.3] lg:text-[3.5rem]"
          >
            {tx(hero.heading, locale)}
          </h1>
          <p className="mt-5 max-w-[32rem] text-tm-lead text-tm-muted">{tx(hero.description, locale)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink cta={hero.primaryCta} locale={locale} site={site} />
            <CtaLink cta={hero.secondaryCta} locale={locale} site={site} />
          </div>
          <p className="mt-6 max-w-[32rem] text-tm-small text-tm-muted">{tx(hero.note, locale)}</p>
        </div>
        <RouterVisual poster={visual} alt={tx(visual.alt, locale)} note={tx(hero.visualNote, locale)} />
      </div>
    </section>
  );
}
