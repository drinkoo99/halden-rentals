import { catalogueListRoute } from "@/server/catalogue/routes";
import { getPublicExtras } from "@/server/catalogue/service";

/** GET /api/v1/extras — the public catalogue's bookable extras, in catalogue order. */
export const GET = catalogueListRoute("extras", getPublicExtras);
