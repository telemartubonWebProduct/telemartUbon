"use client";

import { Children, useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

type TabInfo = { id: string; title: string; bind: { "data-edit"?: string } };

type PromoTabsProps = {
  /** Name of the tab list for screen readers (the section heading). */
  label: string;
  previous: string;
  next: string;
  tabs: TabInfo[];
  /** One panel per tab, in the same order. */
  children: ReactNode;
  /** Every panel at once, each under its title (the Mirror editor). */
  stacked: boolean;
};

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Tabs over the recommended packages (WAI-ARIA tabs: arrow keys, Home and End
 * move between tabs), and buttons that scroll the open tab's row of cards.
 * The server renders the first tab open; without JavaScript every panel shows
 * under its own title instead (globals.css, scripting: none).
 */
export function PromoTabs({ label, previous, next, tabs, children, stacked }: PromoTabsProps) {
  const base = useId();
  const panels = Children.toArray(children);
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [ends, setEnds] = useState({ start: true, end: false });

  const rail = useCallback(() => panelRefs.current[active]?.querySelector<HTMLElement>("[data-rail]") ?? null, [active]);

  // Arrow buttons switch off at either end of the open row.
  useEffect(() => {
    const element = rail();
    if (!element) return;
    const update = () => {
      const max = element.scrollWidth - element.clientWidth;
      setEnds({ start: element.scrollLeft <= 1, end: element.scrollLeft >= max - 1 });
    };
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => {
      element.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [rail]);

  const scrollBy = (direction: 1 | -1) => {
    const element = rail();
    if (!element) return;
    const card = element.querySelector<HTMLElement>(":scope > li");
    const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
    const step = card ? card.getBoundingClientRect().width + gap : element.clientWidth * 0.8;
    const smooth = !window.matchMedia(REDUCED_MOTION).matches;
    element.scrollBy({ left: direction * step, behavior: smooth ? "smooth" : "auto" });
  };

  const select = (index: number, focus: boolean) => {
    setActive(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = tabs.length - 1;
    const target = { ArrowRight: index === last ? 0 : index + 1, ArrowLeft: index === 0 ? last : index - 1, Home: 0, End: last }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    select(target, true);
  };

  if (stacked) {
    return (
      <div className="mt-8 grid gap-12">
        {panels.map((panel, index) => (
          <div key={tabs[index]?.id ?? index}>
            <h3 className="mb-4 text-tm-h4 font-semibold" {...tabs[index]?.bind}>
              {tabs[index]?.title}
            </h3>
            {panel}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="tm-promo-tabs mt-8">
      <div className="flex items-center justify-between gap-4">
        <div role="tablist" aria-label={label} className="tm-promo-tablist">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`${base}-tab-${tab.id}`}
              aria-selected={index === active}
              aria-controls={`${base}-panel-${tab.id}`}
              tabIndex={index === active ? 0 : -1}
              data-tab={tab.id}
              onClick={() => select(index, false)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className="tm-promo-tab"
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="tm-promo-arrows">
          <button type="button" className="tm-promo-arrow" aria-label={previous} disabled={ends.start} onClick={() => scrollBy(-1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="tm-promo-arrow" aria-label={next} disabled={ends.end} onClick={() => scrollBy(1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
              <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      {panels.map((panel, index) => {
        const tab = tabs[index];
        if (!tab) return null;
        return (
          <div
            key={tab.id}
            ref={(element) => {
              panelRefs.current[index] = element;
            }}
            role="tabpanel"
            id={`${base}-panel-${tab.id}`}
            aria-labelledby={`${base}-tab-${tab.id}`}
            hidden={index !== active}
            data-panel={tab.id}
            className="tm-promo-panel"
          >
            {/* Shown only without JavaScript, when every panel is listed. */}
            <h3 className="tm-promo-panel-title">{tab.title}</h3>
            {panel}
          </div>
        );
      })}
    </div>
  );
}
