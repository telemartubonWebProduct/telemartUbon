import type { ReactNode } from "react";

type PageHeroProps = {
  heading: string;
  description: string;
  /** Calls to action under the text. */
  actions?: ReactNode;
  /** Image or other media beside the text on wide screens, below it on phones. */
  media?: ReactNode;
  /** Small print under the actions, such as the service provider. */
  note?: ReactNode;
};

/** Opening block of an interior page: one heading, one paragraph, optional media. */
export function PageHero({ heading, description, actions, media, note }: PageHeroProps) {
  return (
    <section className="border-b border-tm-line">
      <div
        className={`tm-container grid gap-10 py-12 lg:py-16 ${media ? "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-14" : ""}`}
      >
        <div className="max-w-[44rem]">
          <h1 className="text-balance text-tm-h1 font-semibold lg:text-tm-display">{heading}</h1>
          <p className="mt-4 text-tm-lead text-tm-muted">{description}</p>
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          {note ? <div className="mt-5 text-tm-small text-tm-muted">{note}</div> : null}
        </div>
        {media}
      </div>
    </section>
  );
}
