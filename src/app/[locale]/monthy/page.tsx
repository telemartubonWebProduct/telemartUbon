import { pageRoute } from "../page-route";

const route = pageRoute("mobile-monthly");

export const generateMetadata = route.generateMetadata;
export default route.Page;
