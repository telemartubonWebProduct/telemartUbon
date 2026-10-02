import { pageRoute } from "../page-route";

const route = pageRoute("terms");

export const generateMetadata = route.generateMetadata;
export default route.Page;
