import { pageRoute } from "../page-route";

const route = pageRoute("apply-with-agent");

export const generateMetadata = route.generateMetadata;
export default route.Page;
