/** Booking extras ("curated provisions") — Stitch screens 21 (selection) and 24 (review). Demo pricing. */
export type ExtraId = "waiver" | "driver" | "childseat" | "delivery" | "winter";

export type Extra = {
  id: ExtraId;
  item: string;
  tier: string;
  title: string;
  description: string;
  tags: string[];
  /** Price per day, or flat for the whole rental */
  price: number;
  unit: "day" | "flat";
  /** Maximum quantity (child seat has a stepper) */
  max: number;
  /** Always included, cannot be removed */
  included?: boolean;
  icon: string;
  reviewTitle: string;
  reviewDetail: string;
  manifest: string;
};

export const extras: Extra[] = [
  {
    id: "waiver",
    item: "ITEM 01",
    tier: "· TIER I PROTECTION",
    title: "Comprehensive Zero-Excess Waiver",
    description:
      "Reduces statutory deductible to €0. Comprehensive bodywork, thermal acoustic glass, high-velocity tyre, and undercarriage coverage across all European transit corridors without standard security hold liabilities.",
    tags: ["ZERO LIABILITY", "ALL EU BORDERS", "ROADSIDE CONCIERGE 24/7"],
    price: 45,
    unit: "day",
    max: 1,
    icon: "shield_with_heart",
    reviewTitle: "Zero-Excess Comprehensive Damage & Rim Waiver",
    reviewDetail: "COMPLETE TIRE, GLASS, ROOF & UNDERCARRIAGE INDEMNITY",
    manifest: "Zero-Excess Comprehensive Alpine Shield",
  },
  {
    id: "driver",
    item: "ITEM 02",
    tier: "· CREW ENDORSEMENT",
    title: "Designated Secondary Driver",
    description:
      "Authorise a second driver meeting patron criteria (age 28+, valid EU/International license). Complete insurance parity, reciprocal transit endorsement, and immediate digital check-in.",
    tags: ["IDENTITY VERIFIED PRIOR TO DISPATCH"],
    price: 30,
    unit: "day",
    max: 1,
    icon: "person_add",
    reviewTitle: "Designated Secondary Driver Provision",
    reviewDetail: "CREDENTIALS AUTHORISED FOR TRANS-ALPINE CORRIDORS",
    manifest: "Designated Secondary Driver Endorsement",
  },
  {
    id: "childseat",
    item: "ITEM 03",
    tier: "· ARCHITECTURAL ERGONOMICS",
    title: "Bespoke ISOFIX Child Seat",
    description:
      "Ergonomic rear-facing cradle or high-back booster seat calibrated to the rear seating architecture. Upholstered in charcoal non-toxic organic wool weave.",
    tags: [],
    price: 20,
    unit: "day",
    max: 2,
    icon: "child_friendly",
    reviewTitle: "Bespoke ISOFIX Child Seat (Group 2/3)",
    reviewDetail: "UPHOLSTERED IN ANTHRACITE MERINO WOOL BLEND",
    manifest: "Rear ISOFIX Safety Seat (Modular Mount)",
  },
  {
    id: "delivery",
    item: "ITEM 04",
    tier: "· CONCIERGE DISPATCH",
    title: "Custom Address Delivery & Collection",
    description:
      "A HALDEN vehicle custodian delivers the car directly to your hotel, chalet, or private hangar within the hub’s metropolitan zone. Handover takes under five minutes.",
    tags: ["UP TO 45 KM RADIUS FROM THE HUB"],
    price: 120,
    unit: "flat",
    max: 1,
    icon: "local_shipping",
    reviewTitle: "Custom Address Delivery & Collection",
    reviewDetail: "HOTEL, CHALET OR PRIVATE HANGAR WITHIN 45 KM",
    manifest: "Custom Address Delivery & Collection",
  },
  {
    id: "winter",
    item: "ITEM 05",
    tier: "· COMPLIMENTARY COURTESY",
    title: "Pirelli Sottozero™ Winter Protocol & Ski Carrier",
    description:
      "High-performance cold-weather rubber pre-fitted, certified Thule aerodynamic flush ski rack, dual emergency snow cables, and pre-activated digital motorway vignettes for Austria (Asfinag) and Switzerland.",
    tags: ["ALPS REGION STANDARD", "ZERO SURCHARGE"],
    price: 0,
    unit: "flat",
    max: 1,
    included: true,
    icon: "ac_unit",
    reviewTitle: "Pirelli Sottozero Winterization & Vignettes",
    reviewDetail: "SWITZERLAND (CH) & AUSTRIA (A) ANNUAL MOTORWAY PASSES PRE-AFFIXED",
    manifest: "Trans-Alpine Winter Protocol (Swiss & Austrian Vignettes)",
  },
];

export function extraCost(e: Extra, qty: number, days: number): number {
  if (!qty || e.included) return 0;
  return e.unit === "day" ? e.price * days * qty : e.price * qty;
}
