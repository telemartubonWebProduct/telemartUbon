import { getImageProps } from "next/image";
import type { CSSProperties } from "react";

import type { MediaAsset } from "@/lib/content/schema";

import type { RenderContext } from "../context";
import { ArrowDownIcon } from "../icons";
import { CtaLink } from "../links";
import { beatWindows, frameUrl, stillFrame } from "./film-timeline";
import { FilmPlayer } from "./FilmPlayer";

const doc = "page:home" as const;

/** Phones held upright get the portrait frames when the film has them; FilmPlayer uses the same test. */
const portraitQuery = "(max-aspect-ratio: 4/5)";

type Variables = CSSProperties & Record<`--${string}`, string | number>;

/**
 * One frame of the film as a responsive picture: the poster under the canvas,
 * and the still behind each beat in the static layout. The first frame is the
 * page's largest image, so it loads first.
 */
function FilmPicture({
  film,
  frame,
  eager,
  className,
  bind = {},
}: {
  film: MediaAsset;
  frame: number;
  eager: boolean;
  className: string;
  bind?: { "data-edit"?: string };
}) {
  const sequence = film.sequence;
  const common = { alt: "", sizes: "100vw" };
  const { props } = getImageProps({
    ...common,
    src: sequence ? frameUrl(sequence.landscape, frame) : film.src,
    width: sequence?.landscape.width ?? film.width,
    height: sequence?.landscape.height ?? film.height,
    loading: eager ? "eager" : "lazy",
    fetchPriority: eager ? "high" : "auto",
  });
  let portrait: string | undefined;
  if (sequence?.portrait) {
    const scale = (sequence.portrait.frames - 1) / (sequence.landscape.frames - 1);
    portrait = getImageProps({
      ...common,
      src: frameUrl(sequence.portrait, Math.round(frame * scale)),
      width: sequence.portrait.width,
      height: sequence.portrait.height,
    }).props.srcSet;
  }
  return (
    <picture>
      {portrait ? <source media={portraitQuery} srcSet={portrait} sizes={common.sizes} /> : null}
      <img {...props} alt="" className={className} {...bind} />
    </picture>
  );
}

/**
 * The opening of the home page: a film that plays as visitors scroll, with
 * the beats of words shown in turn and the calls to action always on screen.
 *
 * The markup is a stack of panels, one per beat, each over a still of the film
 * (docs/renovation/R1-HOME-FILM.md). That stack is what visitors get without
 * JavaScript or with reduced motion, and what the Mirror editor shows, so every
 * word can be read and clicked. FilmPlayer turns it into the scroll film where
 * motion is fine; both layouts are the same height.
 */
export function FilmHero({ ctx }: { ctx: RenderContext }) {
  const { hero } = ctx.content.pages.home;
  const film = ctx.media(hero.film);
  const windows = beatWindows(hero.beats.length);
  const frames = film.sequence?.landscape.frames ?? 1;
  const last = hero.beats.length - 1;

  return (
    <section
      aria-labelledby="home-hero-heading"
      className="tm-film"
      data-film={ctx.edit ? "edit" : "auto"}
      style={{ "--beats": hero.beats.length } as Variables}
      {...ctx.bind(doc, "hero")}
    >
      <div className="tm-film-track">
        <div className="tm-film-stage" data-text={hero.beats[0].textColor}>
          <div className="tm-film-media" aria-hidden="true" {...ctx.bind(doc, "hero", "film")}>
            <FilmPicture film={film} frame={0} eager className="tm-film-poster" />
            {ctx.edit ? null : <FilmPlayer sequence={film.sequence} textColors={hero.beats.map((beat) => beat.textColor)} />}
          </div>
          <ol className="tm-film-beats" role="list">
            {hero.beats.map((beat, index) => {
              const window = windows[index];
              const bind = (...path: string[]) => ctx.bind(doc, "hero", "beats", beat.id, ...path);
              const Heading = index === 0 ? "h1" : "h2";
              return (
                <li
                  key={beat.id}
                  id={`hero-beat-${beat.id}`}
                  className="tm-film-beat"
                  data-align={beat.align}
                  data-text={beat.textColor}
                  style={{ "--in": window.start - window.fade, "--out": window.end + window.fade, "--fade": window.fade } as Variables}
                  {...bind()}
                >
                  <div className="tm-film-frame">
                    <FilmPicture
                      film={film}
                      frame={index === 0 ? 0 : index === last ? frames - 1 : stillFrame(windows, index, frames)}
                      eager={index === 0}
                      className="tm-film-still"
                      // In the editor the stills are where the film can be clicked.
                      bind={ctx.bind(doc, "hero", "film")}
                    />
                    <div className="tm-film-scrim" aria-hidden="true" />
                    <div className="tm-film-copy">
                      <div className="tm-container">
                        <div className="tm-film-words">
                          <Heading id={index === 0 ? "home-hero-heading" : undefined} className="tm-film-heading" {...bind("heading")}>
                            {ctx.t(beat.heading)}
                          </Heading>
                          {beat.body ? (
                            <p className="tm-film-body" {...bind("body")}>
                              {ctx.t(beat.body)}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    {index === 0 ? <FilmActions ctx={ctx} /> : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <span id="home-after-film" tabIndex={-1} className="tm-film-end" />
    </section>
  );
}

/** Calls to action, scene links and the film's note, at the bottom of the film. */
function FilmActions({ ctx }: { ctx: RenderContext }) {
  const { hero } = ctx.content.pages.home;
  return (
    <div className="tm-film-actions">
      <div className="tm-container">
        <div className="tm-film-bar">
          <div className="tm-film-bar-main">
            <div className="flex flex-wrap gap-3">
              <CtaLink ctx={ctx} cta={hero.primaryCta} bind={ctx.bind(doc, "hero", "primaryCta")} />
              <CtaLink ctx={ctx} cta={hero.secondaryCta} bind={ctx.bind(doc, "hero", "secondaryCta")} />
            </div>
            <p className="tm-film-note" {...ctx.bind(doc, "hero", "note")}>
              {ctx.t(hero.note)}
            </p>
          </div>
          <div className="tm-film-bar-side">
            {hero.beats.length > 1 ? (
              <nav aria-label={ctx.t(ctx.site.ui.filmScenes)} className="tm-film-scenes">
                {hero.beats.map((beat, index) => (
                  <a key={beat.id} href={`#hero-beat-${beat.id}`} data-film-scene={index} aria-current={index === 0 ? "step" : undefined}>
                    <span className="sr-only">{ctx.t(beat.heading)}</span>
                  </a>
                ))}
              </nav>
            ) : null}
            <a href="#home-after-film" className="tm-film-skip">
              <ArrowDownIcon />
              <span className="sr-only">{ctx.t(ctx.site.ui.filmSkip)}</span>
            </a>
            <p className="tm-film-credit" {...ctx.bind(doc, "hero", "filmNote")}>
              {ctx.t(hero.filmNote)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
