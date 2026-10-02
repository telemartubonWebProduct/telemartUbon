import { AdsConversion } from "@/components/site/AdsConversion";
import { getPublishedContent } from "@/lib/content/published";
import { siteUrl } from "@/lib/seo/metadata";

import { pageRoute } from "./page-route";

const route = pageRoute("home");

export const generateMetadata = route.generateMetadata;

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const { site } = await getPublishedContent();
  return (
    <>
      <route.Page {...props} />
      {/* Every opening of the home page on the production domain counts as a Google Ads conversion, as on the old site. */}
      <AdsConversion sendTo={site.integrations.googleAdsHomeConversion} productionHost={siteUrl().hostname} />
    </>
  );
}
