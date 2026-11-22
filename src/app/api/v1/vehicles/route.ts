import { catalogueListRoute } from "@/server/catalogue/routes";
import { getPublicVehicles } from "@/server/catalogue/service";

/** GET /api/v1/vehicles — the public catalogue's published vehicle models, in catalogue order. */
export const GET = catalogueListRoute("vehicles", getPublicVehicles);
