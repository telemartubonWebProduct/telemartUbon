import type { RenderContext } from "../context";
import { HomeHero } from "../home/HomeHero";
import { Faq, FeaturedPackages, HomeSteps, MobileAddons, ServiceChooser, SolarTeaser } from "../home/HomeSections";
import { PageShell } from "../PageShell";

export function HomePageView({ ctx }: { ctx: RenderContext }) {
  return (
    <PageShell ctx={ctx} path={ctx.content.pages.home.path}>
      <HomeHero ctx={ctx} />
      <ServiceChooser ctx={ctx} />
      <FeaturedPackages ctx={ctx} />
      <MobileAddons ctx={ctx} />
      <HomeSteps ctx={ctx} />
      <SolarTeaser ctx={ctx} />
      <Faq ctx={ctx} />
    </PageShell>
  );
}
