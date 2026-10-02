import { pageRoute } from "../page-route";

const route = pageRoute("broadband-new");

export const generateMetadata = route.generateMetadata;
export default route.Page;
