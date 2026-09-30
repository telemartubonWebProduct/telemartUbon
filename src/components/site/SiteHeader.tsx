import Image from "next/image";
import Link from "next/link";

import { isCurrent, resolveLink } from "@/lib/content/render";
import type { LinkTarget, LocalizedText } from "@/lib/content/schema";
import { localizePath } from "@/lib/i18n/locales";

import type { RenderContext } from "./context";
import { LanguageSwitch } from "./LanguageSwitch";
import { SiteNav, type NavItemView, type NavLinkView } from "./SiteNav";

function linkView(
  ctx: RenderContext,
  entry: { id: string; label: LocalizedText; target: LinkTarget },
  path: string,
  binding: string | undefined,
): NavLinkView {
  return {
    id: entry.id,
    label: ctx.t(entry.label),
    ...resolveLink(entry.target, ctx.locale, ctx.site),
    current: isCurrent(entry.target, path),
    binding,
  };
}

export function SiteHeader({ ctx, path }: { ctx: RenderContext; path: string }) {
  const { site } = ctx;
  const logo = ctx.media(site.brand.logo);
  const items: NavItemView[] = site.navigation.flatMap((item): NavItemView[] => {
    if (item.children) {
      const children = item.children.map((child) =>
        linkView(ctx, child, path, ctx.bind("site", "navigation", item.id, "children", child.id)["data-edit"]),
      );
      return [
        {
          id: item.id,
          label: ctx.t(item.label),
          current: children.some((child) => child.current),
          children,
          binding: ctx.bind("site", "navigation", item.id)["data-edit"],
        },
      ];
    }
    return item.target
      ? [linkView(ctx, { id: item.id, label: item.label, target: item.target }, path, ctx.bind("site", "navigation", item.id)["data-edit"])]
      : [];
  });
  const cta = site.headerCta;

  return (
    <header className="sticky top-0 z-40 border-b border-tm-line bg-tm-canvas">
      <div className="tm-container flex h-16 items-center gap-6 lg:h-[4.5rem]">
        <Link href={localizePath("/", ctx.locale)} className="shrink-0 rounded-tm-control" {...ctx.bind("site", "brand", "logo")}>
          <Image
            src={logo.src}
            width={logo.width}
            height={logo.height}
            alt={ctx.t(site.brand.name)}
            className="h-9 w-auto lg:h-10"
            loading="eager"
          />
        </Link>
        <SiteNav
          items={items}
          labels={{
            menu: ctx.t(site.ui.menu),
            closeMenu: ctx.t(site.ui.closeMenu),
            mainNavigation: ctx.t(site.ui.mainNavigation),
            opensInNewTab: ctx.t(site.ui.opensInNewTab),
          }}
          cta={{
            ...linkView(ctx, cta, path, ctx.bind("site", "headerCta")["data-edit"]),
            current: false,
            primary: cta.style === "primary",
          }}
          languageSwitch={<LanguageSwitch locale={ctx.locale} path={path} label={ctx.t(site.ui.languageSwitch)} />}
        />
      </div>
    </header>
  );
}
