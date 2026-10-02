import { pageRoute } from "../page-route";

const route = pageRoute("broadband-existing");

export const generateMetadata = route.generateMetadata;
export default route.Page;
