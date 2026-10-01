import type { RenderContext } from "../context";
import { EquipmentSection } from "../home/EquipmentSection";
import { FilmHero } from "../home/FilmHero";
import { Faq, HomeSteps, MobileAddons, ServiceChooser, SolarTeaser } from "../home/HomeSections";
import { PromoShowcase } from "../home/PromoShowcase";
import { PageShell } from "../PageShell";

/** The film first, then recommended packages as it ends, then the rest of what the business offers. */
export function HomePageView({ ctx }: { ctx: RenderContext }) {
  return (
    <PageShell ctx={ctx} path={ctx.content.pages.home.path}>
      <FilmHero ctx={ctx} />
      <PromoShowcase ctx={ctx} />
      <ServiceChooser ctx={ctx} />
      <EquipmentSection ctx={ctx} />
      <MobileAddons ctx={ctx} />
      <HomeSteps ctx={ctx} />
      <SolarTeaser ctx={ctx} />
      <Faq ctx={ctx} />
    </PageShell>
  );
}
