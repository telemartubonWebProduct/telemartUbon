import { pageRoute } from "../page-route";

const route = pageRoute("solar");

export const generateMetadata = route.generateMetadata;
export default route.Page;
