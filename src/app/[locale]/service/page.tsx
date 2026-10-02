import { pageRoute } from "../page-route";

const route = pageRoute("contact");

export const generateMetadata = route.generateMetadata;
export default route.Page;
