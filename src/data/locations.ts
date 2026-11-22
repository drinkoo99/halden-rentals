/**
 * Pick-up hubs named in the Stitch screens (homepage, fleet, detail and booking footers). Demo data.
 * Since M3 this is only the seed source (src/server/catalogue/seed): pages render the database catalogue.
 */
export type Location = {
  id: string;
  code: string;
  city: string;
  /** Label used in the homepage search bar, e.g. "Zurich Airport (ZRH)" */
  label: string;
  /** Long label used in fleet footer / booking, e.g. "Munich Airport Terminal 2 (MUC)" */
  longLabel: string;
  timezone: string;
  /** Handover details shown on the vehicle detail page (screens 19/30) */
  terminalPoint: string;
  coordinates: string;
  handoverTitle: string;
  handoverNote: string;
  handoverWindow: string;
};

export const locations: Location[] = [
  {
    id: "zrh",
    code: "ZRH",
    city: "Zurich",
    label: "Zurich Airport (ZRH)",
    longLabel: "Zurich Flughafen Privatterminal (ZRH)",
    timezone: "CEST",
    terminalPoint: "Private Aviation Terminal",
    coordinates: "47.4582° N, 8.5555° E",
    handoverTitle: "Zurich Flughafen Privatterminal or Arrivals 1 Curbside",
    handoverNote: "Your vehicle concierge meets you at the arrivals barrier with keys in hand. No rental counter queues, no shuttle buses.",
    handoverWindow: "06:00 – 23:30 CET",
  },
  {
    id: "muc",
    code: "MUC",
    city: "Munich",
    label: "Munich Airport (MUC)",
    longLabel: "Munich Airport Terminal 2 (MUC)",
    timezone: "CEST",
    terminalPoint: "Curbside Terminal Point 2",
    coordinates: "48.3537° N, 11.7750° E",
    handoverTitle: "Terminal 2 VIP Curbside or Private Aviation Terminal",
    handoverNote: "Your vehicle concierge meets you at the arrivals barrier with keys in hand. No rental counter queues, no shuttle buses.",
    handoverWindow: "06:00 – 23:30 CET",
  },
  {
    id: "gva",
    code: "GVA",
    city: "Geneva",
    label: "Geneva Airport (GVA)",
    longLabel: "Geneva Cointrin Private Aviation (GVA)",
    timezone: "CEST",
    terminalPoint: "Private Aviation Terminal",
    coordinates: "46.2370° N, 6.1092° E",
    handoverTitle: "Geneva Cointrin General Aviation Terminal Curbside",
    handoverNote: "Your vehicle concierge meets you at the arrivals barrier with keys in hand. No rental counter queues, no shuttle buses.",
    handoverWindow: "06:00 – 23:30 CET",
  },
  {
    id: "mxp",
    code: "MXP",
    city: "Milan",
    label: "Milan Malpensa (MXP)",
    longLabel: "Milan Malpensa VIP Lounge (MXP)",
    timezone: "CEST",
    terminalPoint: "VIP Lounge Curbside",
    coordinates: "45.6301° N, 8.7255° E",
    handoverTitle: "Malpensa Terminal 1 VIP Lounge Curbside",
    handoverNote: "Your vehicle concierge meets you at the arrivals barrier with keys in hand. No rental counter queues, no shuttle buses.",
    handoverWindow: "06:00 – 23:30 CET",
  },
  {
    id: "vie",
    code: "VIE",
    city: "Vienna",
    label: "Vienna Airport (VIE)",
    longLabel: "Vienna Schwechat Executive (VIE)",
    timezone: "CEST",
    terminalPoint: "Executive Terminal",
    coordinates: "48.1103° N, 16.5697° E",
    handoverTitle: "Vienna Schwechat General Aviation Center Curbside",
    handoverNote: "Your vehicle concierge meets you at the arrivals barrier with keys in hand. No rental counter queues, no shuttle buses.",
    handoverWindow: "06:00 – 23:30 CET",
  },
];
