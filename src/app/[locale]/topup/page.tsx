import { pageRoute } from "../page-route";

const route = pageRoute("mobile-prepaid");

export const generateMetadata = route.generateMetadata;
export default route.Page;
