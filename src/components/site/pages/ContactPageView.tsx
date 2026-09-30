import { ContactChannels } from "../ContactChannels";
import type { RenderContext } from "../context";
import { heroBinds, PageHero } from "../PageHero";
import { PageShell } from "../PageShell";

// The old page's email form is replaced by the call-back request of M5, which
// stores leads in Supabase; until then visitors use the channels below.
export function ContactPageView({ ctx }: { ctx: RenderContext }) {
  const page = ctx.content.pages.contact;
  return (
    <PageShell ctx={ctx} path={page.path} contactBand={false}>
      <PageHero
        ctx={ctx}
        heading={page.hero.heading}
        description={page.hero.description}
        tone={page.hero.tone}
        binds={heroBinds(ctx, "page:contact", "hero")}
      />
      <ContactChannels ctx={ctx} page={page} />
    </PageShell>
  );
}
