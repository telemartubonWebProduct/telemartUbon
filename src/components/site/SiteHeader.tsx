import Image from "next/image";
import Link from "next/link";

import { content, getMedia } from "@/lib/content";
import { isCurrent, resolveLink, tx } from "@/lib/content/render";
import type { Link as ContentLink } from "@/lib/content/schema";
import { localizePath, type Locale } from "@/lib/i18n/locales";

import { LanguageSwitch } from "./LanguageSwitch";
import { SiteNav, type NavItemView, type NavLinkView } from "./SiteNav";

function linkView(entry: Pick<ContentLink, "id" | "label" | "target">, locale: Locale, path: string): NavLinkView {
  const site = content.site;
  return { id: entry.id, label: tx(entry.label, locale), ...resolveLink(entry.target, locale, site), current: isCurrent(entry.target, path) };
}

export function SiteHeader({ locale, path }: { locale: Locale; path: string }) {
  const site = content.site;
  const logo = getMedia(site.brand.logo);
  const items: NavItemView[] = site.navigation.flatMap((item): NavItemView[] => {
    if (item.children) {
      const children = item.children.map((child) => linkView(child, locale, path));
      return [{ id: item.id, label: tx(item.label, locale), current: children.some((child) => child.current), children }];
    }
    return item.target ? [linkView({ id: item.id, label: item.label, target: item.target }, locale, path)] : [];
  });
  const cta = site.headerCta;

  return (
    <header className="sticky top-0 z-40 border-b border-tm-line bg-tm-canvas">
      <div className="tm-container flex h-16 items-center gap-6 lg:h-[4.5rem]">
        <Link href={localizePath("/", locale)} className="shrink-0 rounded-tm-control">
          <Image
            src={logo.src}
            width={logo.width}
            height={logo.height}
            alt={tx(site.brand.name, locale)}
            className="h-9 w-auto lg:h-10"
            loading="eager"
          />
        </Link>
        <SiteNav
          items={items}
          labels={{
            menu: tx(site.ui.menu, locale),
            closeMenu: tx(site.ui.closeMenu, locale),
            mainNavigation: tx(site.ui.mainNavigation, locale),
            opensInNewTab: tx(site.ui.opensInNewTab, locale),
          }}
          cta={{ ...linkView(cta, locale, path), current: false, primary: cta.style === "primary" }}
          languageSwitch={<LanguageSwitch locale={locale} path={path} label={tx(site.ui.languageSwitch, locale)} />}
        />
      </div>
    </header>
  );
}
