import type { RenderContext } from "../context";
import { EquipmentSection } from "../home/EquipmentSection";
import { FilmHero } from "../home/FilmHero";
import { Faq, FeaturedPackages, HomeSteps, MobileAddons, ServiceChooser, SolarTeaser } from "../home/HomeSections";
import { PageShell } from "../PageShell";

/** The film first, then packages soon after it, then the rest of what the business offers. */
export function HomePageView({ ctx }: { ctx: RenderContext }) {
  return (
    <PageShell ctx={ctx} path={ctx.content.pages.home.path}>
      <FilmHero ctx={ctx} />
      <FeaturedPackages ctx={ctx} />
      <ServiceChooser ctx={ctx} />
      <EquipmentSection ctx={ctx} />
      <MobileAddons ctx={ctx} />
      <HomeSteps ctx={ctx} />
      <SolarTeaser ctx={ctx} />
      <Faq ctx={ctx} />
    </PageShell>
  );
}
