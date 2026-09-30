"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

import { ChevronDownIcon, CloseIcon, MenuIcon } from "./icons";

export type NavLinkView = { id: string; label: string; href: string; external: boolean; current: boolean };
export type NavItemView = NavLinkView | { id: string; label: string; current: boolean; children: NavLinkView[] };

type SiteNavProps = {
  items: NavItemView[];
  labels: { menu: string; closeMenu: string; mainNavigation: string; opensInNewTab: string };
  cta: NavLinkView & { primary: boolean };
  languageSwitch: ReactNode;
};

// The current page is marked with weight and a red underline rather than red
// text: red on the grey hover surface falls just under 4.5:1.
const currentMark = "aria-[current=page]:font-semibold aria-[current=page]:underline aria-[current=page]:decoration-tm-red aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[0.45em]";

function NavAnchor({
  link,
  className,
  newTab,
  ctaId,
  onNavigate,
}: {
  link: NavLinkView;
  className: string;
  newTab: string;
  ctaId?: string;
  onNavigate?: () => void;
}) {
  if (link.external) {
    return (
      <a href={link.href} className={className} data-cta={ctaId} target="_blank" rel="noopener noreferrer" onClick={onNavigate}>
        {link.label}
        <span className="sr-only"> ({newTab})</span>
      </a>
    );
  }
  if (!link.href.startsWith("/")) {
    return (
      <a href={link.href} className={className} data-cta={ctaId} onClick={onNavigate}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className} data-cta={ctaId} aria-current={link.current ? "page" : undefined} onClick={onNavigate}>
      {link.label}
    </Link>
  );
}

/** Header navigation: disclosure menus on desktop, one expandable panel on phones. */
export function SiteNav({ items, labels, cta, languageSwitch }: SiteNavProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const panelId = useId();
  const ctaClass = `tm-button ${cta.primary ? "tm-button-primary" : "tm-button-secondary"}`;

  useEffect(() => {
    if (!openMenu && !panelOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setPanelOpen(false);
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (openMenu && navRef.current && !navRef.current.contains(event.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [openMenu, panelOpen]);

  const desktopLink = `rounded-tm-control px-3 py-2 text-tm-body font-medium hover:bg-tm-surface ${currentMark}`;

  return (
    <>
      <nav ref={navRef} aria-label={labels.mainNavigation} className="hidden lg:block">
        <ul className="flex items-center gap-1">
          {items.map((item) =>
            "children" in item ? (
              <li
                key={item.id}
                className="relative"
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenMenu(null);
                }}
              >
                <button
                  type="button"
                  className={`${desktopLink} inline-flex items-center gap-1 ${item.current ? "font-semibold underline decoration-tm-red decoration-2 underline-offset-[0.45em]" : ""}`}
                  aria-expanded={openMenu === item.id}
                  aria-controls={`${panelId}-${item.id}`}
                  onClick={() => setOpenMenu((open) => (open === item.id ? null : item.id))}
                >
                  {item.label}
                  <ChevronDownIcon className={`text-[1.1em] transition-transform duration-tm-fast ${openMenu === item.id ? "rotate-180" : ""}`} />
                </button>
                <ul
                  id={`${panelId}-${item.id}`}
                  hidden={openMenu !== item.id}
                  className="absolute left-0 top-full z-50 mt-2 min-w-[15rem] rounded-tm-panel border border-tm-line bg-tm-canvas p-2"
                >
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <NavAnchor
                        link={child}
                        newTab={labels.opensInNewTab}
                        onNavigate={() => setOpenMenu(null)}
                        className={`block rounded-tm-control px-3 py-2.5 hover:bg-tm-surface ${currentMark}`}
                      />
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.id}>
                <NavAnchor link={item} newTab={labels.opensInNewTab} className={`${desktopLink} inline-block`} />
              </li>
            ),
          )}
        </ul>
      </nav>
      <div className="ml-auto hidden items-center gap-4 lg:flex">
        {languageSwitch}
        <NavAnchor link={cta} ctaId={cta.id} newTab={labels.opensInNewTab} className={ctaClass} />
      </div>

      <div className="ml-auto flex items-center gap-1 lg:hidden">
        {languageSwitch}
        <button
          type="button"
          className="inline-flex min-h-tm-control min-w-[2.75rem] items-center justify-center rounded-tm-control border border-tm-line text-[1.4rem]"
          aria-expanded={panelOpen}
          aria-controls={panelId}
          onClick={() => setPanelOpen((open) => !open)}
        >
          {panelOpen ? <CloseIcon /> : <MenuIcon />}
          <span className="sr-only">{panelOpen ? labels.closeMenu : labels.menu}</span>
        </button>
      </div>

      <nav
        id={panelId}
        aria-label={labels.mainNavigation}
        hidden={!panelOpen}
        className="absolute inset-x-0 top-full border-b border-tm-line bg-tm-canvas lg:hidden"
      >
        <div className="tm-container max-h-[calc(100dvh-4rem)] overflow-y-auto pb-6 pt-4">
          <ul className="grid gap-4">
            {items.map((item) =>
              "children" in item ? (
                <li key={item.id}>
                  <p className="text-tm-small font-semibold text-tm-muted">{item.label}</p>
                  <ul className="mt-1">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <NavAnchor
                          link={child}
                          newTab={labels.opensInNewTab}
                          onNavigate={() => setPanelOpen(false)}
                          className={`flex min-h-tm-control items-center text-tm-lead ${currentMark}`}
                        />
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.id}>
                  <NavAnchor
                    link={item}
                    newTab={labels.opensInNewTab}
                    onNavigate={() => setPanelOpen(false)}
                    className={`flex min-h-tm-control items-center text-tm-lead font-semibold ${currentMark}`}
                  />
                </li>
              ),
            )}
          </ul>
          <NavAnchor
            link={cta}
            ctaId={cta.id}
            newTab={labels.opensInNewTab}
            onNavigate={() => setPanelOpen(false)}
            className={`${ctaClass} mt-6 w-full`}
          />
        </div>
      </nav>
    </>
  );
}
