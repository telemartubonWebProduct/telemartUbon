import { content } from "@/lib/content";
import { tx } from "@/lib/content/render";
import type { LegalPage } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/locales";

/** Long policy text: a table of contents, then numbered sections at reading width. */
export function LegalText({ page, locale }: { page: LegalPage; locale: Locale }) {
  const tocId = `${page.id}-toc`;
  return (
    <article className="py-12 lg:py-16">
      <div className="tm-container grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
        <nav aria-labelledby={tocId} className="lg:sticky lg:top-24 lg:self-start">
          <h2 id={tocId} className="text-tm-small font-semibold text-tm-muted">
            {tx(content.site.ui.contents, locale)}
          </h2>
          <ol className="mt-3 grid gap-1 text-tm-small">
            {page.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="inline-block py-1 hover:underline hover:decoration-tm-red hover:decoration-2 hover:underline-offset-[0.3em]">
                  {tx(section.heading, locale)}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-[44rem]">
          <p className="rounded-tm-panel bg-tm-surface px-5 py-4 text-tm-small">{tx(page.disclaimer, locale)}</p>
          {page.sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="mt-10">
              <h2 id={`${section.id}-heading`} className="text-tm-h4 font-semibold">
                {tx(section.heading, locale)}
              </h2>
              {section.paragraphs.slice(0, 1).map((paragraph, index) => (
                <p key={index} className="mt-3">
                  {tx(paragraph, locale)}
                </p>
              ))}
              {section.list.length > 0 ? (
                <ul className="mt-3 grid gap-2">
                  {section.list.map((entry, index) => (
                    <li key={index}>{tx(entry, locale)}</li>
                  ))}
                </ul>
              ) : null}
              {section.paragraphs.slice(1).map((paragraph, index) => (
                <p key={index} className="mt-3">
                  {tx(paragraph, locale)}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
