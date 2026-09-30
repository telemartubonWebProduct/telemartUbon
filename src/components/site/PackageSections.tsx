import { content, publicPackages } from "@/lib/content";
import { resolveLink, tx } from "@/lib/content/render";
import type { PackagePage } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/locales";

import { SmartLink } from "./links";
import { PackageCompare } from "./PackageCompare";

/** Shown where every package of a group is still hidden for review. */
export function EmptyGroup({ locale }: { locale: Locale }) {
  const { site } = content;
  return (
    <div className="rounded-tm-panel bg-tm-surface px-5 py-6 sm:px-6">
      <p className="max-w-[40rem]">{tx(site.ui.emptyGroup, locale)}</p>
      <SmartLink
        link={resolveLink({ kind: "contact", channel: "line-sales" }, locale, site)}
        ctaId="empty-group-line"
        newTabLabel={tx(site.ui.opensInNewTab, locale)}
        className="tm-button tm-button-secondary mt-4"
      >
        {tx(site.ui.chatOnLine, locale)}
      </SmartLink>
    </div>
  );
}

/** In-page links to each section; the section ids are the old site's anchors. */
function JumpNav({ page, locale }: { page: PackagePage; locale: Locale }) {
  const labelId = `${page.id}-jump`;
  return (
    <nav aria-labelledby={labelId} className="border-b border-tm-line">
      <div className="tm-container flex items-center gap-3 overflow-x-auto py-3">
        <p id={labelId} className="shrink-0 text-tm-small text-tm-muted">
          {tx(content.site.ui.jumpTo, locale)}
        </p>
        <ul className="flex gap-2">
          {page.sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="inline-flex min-h-tm-control items-center whitespace-nowrap rounded-tm-pill border border-tm-line px-4 text-tm-small font-medium hover:border-tm-ink"
              >
                {tx(section.heading, locale)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export function PackageSections({ page, locale }: { page: PackagePage; locale: Locale }) {
  return (
    <>
      {page.sections.length > 1 ? <JumpNav page={page} locale={locale} /> : null}
      {page.sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-heading`}
          className={`py-12 lg:py-16 ${index > 0 ? "border-t border-tm-line" : ""}`}
        >
          <div className="tm-container">
            <h2 id={`${section.id}-heading`} className="text-tm-h2 font-semibold">
              {tx(section.heading, locale)}
            </h2>
            {section.description ? <p className="mt-2 max-w-[42rem] text-tm-muted">{tx(section.description, locale)}</p> : null}
            <div className="mt-8 grid gap-12">
              {section.groups.map((group) => {
                const items = publicPackages(group.category, group.group);
                return (
                  <div key={group.id}>
                    {group.heading ? <h3 className="text-tm-h4 font-semibold">{tx(group.heading, locale)}</h3> : null}
                    {group.description ? <p className="mt-1 max-w-[42rem] text-tm-muted">{tx(group.description, locale)}</p> : null}
                    <div className={group.heading || group.description ? "mt-4" : ""}>
                      {items.length > 0 ? (
                        <PackageCompare
                          items={items}
                          locale={locale}
                          cta={page.packageCta}
                          variant={page.layout}
                          headingLevel={group.heading ? 4 : 3}
                        />
                      ) : (
                        <EmptyGroup locale={locale} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {section.notes.length > 0 ? (
              <ul className="mt-8 grid max-w-[48rem] list-disc gap-1 pl-5 text-tm-small text-tm-muted">
                {section.notes.map((note, noteIndex) => (
                  <li key={noteIndex}>{tx(note, locale)}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ))}
    </>
  );
}
