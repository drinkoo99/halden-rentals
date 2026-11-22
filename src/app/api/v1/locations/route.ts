import { catalogueListRoute } from "@/server/catalogue/routes";
import { getPublicLocations } from "@/server/catalogue/service";

/** GET /api/v1/locations — the public catalogue's hubs (pick-up and return locations), in catalogue order. */
export const GET = catalogueListRoute("locations", getPublicLocations);
