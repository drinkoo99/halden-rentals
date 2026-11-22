import { media } from "./media";

/**
 * Fleet data. Names, exhibit numbers, specs and day rates are taken from the Stitch screens
 * (homepage 04/28, fleet 12/26, vehicle detail 19/30). This is demo data — there is no real inventory yet.
 * Since M3 this is only the seed source (src/server/catalogue/seed): pages render the database catalogue.
 */

export type Category = "sports" | "sedan" | "suv" | "wagon";
export type Powertrain = "petrol" | "diesel" | "hybrid" | "electric";
export type Transmission = "automatic" | "manual";
export type Feature = "awd" | "ski" | "chauffeur" | "acc";

export type SpecRow = { label: string; value: string };

export type Vehicle = {
  slug: string;
  brand: string;
  model: string;
  /** Full display name, e.g. "Porsche 911 GT3 Touring" */
  name: string;
  exhibit: string;
  category: Category;
  /** Category label used in breadcrumbs / placards */
  categoryLabel: string;
  year: number;
  seats: number;
  seatsLabel: string;
  gearbox: string;
  transmission: Transmission;
  powerHp: number;
  powertrain: Powertrain;
  features: Feature[];
  pricePerDay: number;
  available: boolean;
  colour?: string;
  /** Short catalogue line shown on cards, e.g. "2 seats · PDK · 502 hp" */
  specLine: string;
  image: string;
  imageAlt: string;
  /** Alternative photo used by the mobile fleet screen (26), where Stitch shot the car on location */
  mobileImage?: string;
  gallery: { src: string; alt: string }[];
  provenance?: string;
  headline: string;
  narrative: string[];
  specs: SpecRow[];
  amenities: string[];
  homeLocation: string;
  /** Desktop detail subtitle (screen 19), e.g. "Luxury SUV · 2025 · 7 seats · Chauffeur or Self-Drive" */
  subtitle?: string;
  /** Mobile detail copy (screen 30) where Stitch wrote it separately */
  mobileSubtitle?: string;
  mobileNarrative?: string;
  mobileAmenities?: { title: string; detail: string }[];
  galleryBadge?: string;
  /** Photo order for the mobile detail screen (30) when Stitch used different crops */
  mobileGallery?: { src: string; alt: string }[];
};

const sharedNarrative =
  "Every vehicle in HALDEN’s fleet undergoes a 48-point pre-delivery inspection, delivered directly curbside with Swiss motorway vignettes, pre-conditioned cabin climate, and tailored European insurance credentials.";

export const vehicles: Vehicle[] = [
  {
    slug: "range-rover-autobiography",
    brand: "Land Rover",
    model: "Range Rover Autobiography",
    name: "Range Rover Autobiography",
    exhibit: "08",
    category: "suv",
    categoryLabel: "SUVs",
    year: 2025,
    seats: 7,
    seatsLabel: "7 seats (Executive 2+3+2)",
    gearbox: "8-Speed",
    transmission: "automatic",
    powerHp: 530,
    powertrain: "petrol",
    features: ["awd", "ski", "chauffeur", "acc"],
    pricePerDay: 390,
    available: true,
    colour: "Satin silver-grey",
    specLine: "7 seats · 8-Speed · 530 hp",
    image: media.rangeRoverStudio,
    mobileImage: media.mobileRangeRoverPlaster,
    imageAlt: "Silver-grey Range Rover Autobiography on a stone studio floor",
    gallery: [
      { src: media.rangeRoverAlpineLake, alt: "Range Rover Autobiography beside a misty alpine lake at dawn" },
      { src: media.rangeRoverInterior, alt: "Range Rover Autobiography cabin with caramel leather and open-pore wood" },
      { src: media.rangeRoverRearCourtyard, alt: "Range Rover rear three-quarter view in a limestone courtyard" },
      { src: media.rangeRoverWheel, alt: "Range Rover multi-spoke alloy wheel and brake caliper" },
      { src: media.rangeRoverSeat, alt: "Perforated caramel leather seat with double stitching" },
      { src: media.rangeRoverHeadlight, alt: "Range Rover slim LED headlight and grille detail" },
    ],
    provenance: "Provenance: Lake Sils, Engadin Valley · Curated dawn transit",
    headline: "The pinnacle of British grand touring.",
    narrative: [
      "Engineered for effortless trans-Alpine voyages, the Range Rover Autobiography pairs whisper-quiet acoustic glass and active noise cancellation with peerless terrain authority. Whether cresting the Julier Pass or gliding up the driveway of Badrutt’s Palace, its presence is whisper-quiet yet commanding.",
      sharedNarrative,
    ],
    specs: [
      { label: "Seats", value: "7 seats (Executive 2+3+2)" },
      { label: "Transmission", value: "8-Speed Automatic (ZF) with Low Range" },
      { label: "Power & Output", value: "530 hp · 750 Nm · 4.4L Twin-Turbo V8" },
      { label: "Drivetrain", value: "Intelligent All-Wheel Drive (iAWD)" },
      { label: "Fuel & Efficiency", value: "Petrol · 11.2 L / 100 km · Euro 6d" },
      { label: "Luggage Capacity", value: "812 L (up to 4 large rimowa trunks)" },
      { label: "Acceleration", value: "0–100 km/h in 4.6 seconds" },
      { label: "Top Speed", value: "250 km/h (electronically governed)" },
    ],
    amenities: [
      "Curbside Chauffeur or Self-Drive Handover",
      "Meridian™ 1,600W 3D Surround Sound",
      "Ski Rack & Winterization Protocol (Pirelli Sottozero)",
      "Executive Class Rear Seat Refrigeration",
      "Cross-Border Transit Passes (CH / IT / AT / FR / DE)",
      "Active Air Suspension with Predictive Dynamic Response",
      "Acoustic Laminated Double Glazing",
      "Integrated 4G/LTE Wi-Fi Hotspot & Offline Telemetry",
    ],
    homeLocation: "muc",
    subtitle: "Luxury SUV · 2025 · 7 seats · Chauffeur or Self-Drive",
    mobileSubtitle: "Long Wheelbase · 2025 Specification · Chauffeur or Autonomous Self-Drive",
    mobileNarrative:
      "Engineered for effortless trans-Alpine voyages, pairing whisper-quiet acoustic double glazing and continuous active noise cancellation with peerless terrain authority. The Autobiography specification represents the absolute zenith of monolithic form and reductive British coachbuilding.",
    mobileAmenities: [
      { title: "Meridian™ 1,600W 3D Sound Protocol", detail: "35 speakers, headrest integrated cancelation nodes" },
      { title: "VIP Curbside Handover", detail: "Direct personal receipt at MUC or ZRH tarmac" },
      { title: "Comprehensive Trans-Alpine Insurance", detail: "Zero deductible, coverage across DE, AT, CH, IT" },
      { title: "Pirelli Sottozero™ Winter Standard", detail: "Mandatory certified high-elevation rubber fitment" },
    ],
    galleryBadge: "Alpine Series",
    mobileGallery: [
      { src: media.mobileRangeRoverAlpine, alt: "Range Rover Autobiography alpine exterior" },
      { src: media.mobileRangeRoverCabin, alt: "Range Rover Autobiography cabin perspective" },
      { src: media.mobileRangeRoverRear, alt: "Range Rover Autobiography sculptural rear architecture" },
      { src: media.rangeRoverWheel, alt: "Range Rover multi-spoke alloy wheel and brake caliper" },
      { src: media.rangeRoverSeat, alt: "Perforated caramel leather seat with double stitching" },
      { src: media.rangeRoverHeadlight, alt: "Range Rover slim LED headlight and grille detail" },
    ],
  },
  {
    slug: "porsche-911-gt3-touring",
    brand: "Porsche",
    model: "911 GT3 Touring",
    name: "Porsche 911 GT3 Touring",
    exhibit: "09",
    category: "sports",
    categoryLabel: "Sports",
    year: 2025,
    seats: 2,
    seatsLabel: "2 seats",
    gearbox: "PDK",
    transmission: "automatic",
    powerHp: 502,
    powertrain: "petrol",
    features: ["acc"],
    pricePerDay: 440,
    available: true,
    colour: "Obsidian black",
    specLine: "2 seats · PDK · 502 hp",
    image: media.porscheGt3Studio,
    mobileImage: media.mobileGt3Gallery,
    imageAlt: "Obsidian black Porsche 911 GT3 Touring on a stone studio floor",
    gallery: [
      { src: media.porscheGt3Studio, alt: "Porsche 911 GT3 Touring, side three-quarter studio view" },
      { src: media.mobileGt3Gallery, alt: "Porsche 911 GT3 Touring inside a brutalist gallery hall" },
    ],
    headline: "A naturally aspirated instrument for the high passes.",
    narrative: [
      "The GT3 Touring keeps the track-bred 4.0-litre flat-six and trades the fixed wing for a quieter silhouette — ideal for the Furka, Susten and Grimsel corridors.",
      sharedNarrative,
    ],
    specs: [
      { label: "Seats", value: "2 seats" },
      { label: "Transmission", value: "7-Speed PDK" },
      { label: "Power & Output", value: "502 hp · 4.0L flat-six" },
      { label: "Drivetrain", value: "Rear-wheel drive" },
      { label: "Fuel", value: "Petrol" },
    ],
    amenities: [
      "Curbside Self-Drive Handover",
      "Cross-Border Transit Passes (CH / IT / AT / FR / DE)",
      "Pre-loaded Alpine pass itineraries",
    ],
    homeLocation: "muc",
  },
  {
    slug: "mercedes-benz-s-500-4matic",
    brand: "Mercedes-Benz",
    model: "S 500 4MATIC Sedan",
    name: "Mercedes-Benz S 500 4MATIC",
    exhibit: "04",
    category: "sedan",
    categoryLabel: "Sedans",
    year: 2025,
    seats: 5,
    seatsLabel: "5 seats",
    gearbox: "9G-TRONIC",
    transmission: "automatic",
    powerHp: 435,
    powertrain: "petrol",
    features: ["awd", "chauffeur", "acc"],
    pricePerDay: 310,
    available: true,
    colour: "Graphite grey",
    specLine: "5 seats · 9G-TRONIC · 435 hp",
    image: media.mercedesS500Studio,
    mobileImage: media.mobileS500Stone,
    imageAlt: "Graphite grey Mercedes-Benz S-Class on a stone studio floor",
    gallery: [
      { src: media.mercedesS500Studio, alt: "Mercedes-Benz S 500, side three-quarter studio view" },
      { src: media.mercedesHotelNight, alt: "Mercedes-Benz S-Class arriving at a boutique hotel at night" },
    ],
    headline: "The executive saloon, delivered to the hotel door.",
    narrative: [
      "Rear-seat comfort, near-silent cabin acoustics and all-wheel drive make the S 500 the natural choice for airport arrivals and chauffeured itineraries.",
      sharedNarrative,
    ],
    specs: [
      { label: "Seats", value: "5 seats" },
      { label: "Transmission", value: "9G-TRONIC Automatic" },
      { label: "Power & Output", value: "435 hp" },
      { label: "Drivetrain", value: "4MATIC All-Wheel Drive" },
      { label: "Fuel", value: "Petrol" },
    ],
    amenities: [
      "Curbside Chauffeur or Self-Drive Handover",
      "Executive rear seating",
      "Cross-Border Transit Passes (CH / IT / AT / FR / DE)",
    ],
    homeLocation: "zrh",
  },
  {
    slug: "bmw-530e-xdrive-m-sport",
    brand: "BMW",
    model: "530e xDrive M Sport",
    name: "BMW 530e xDrive M Sport",
    exhibit: "07",
    category: "sedan",
    categoryLabel: "Sedans",
    year: 2025,
    seats: 5,
    seatsLabel: "5 seats",
    gearbox: "Steptronic",
    transmission: "automatic",
    powerHp: 292,
    powertrain: "hybrid",
    features: ["awd", "acc"],
    pricePerDay: 220,
    available: true,
    colour: "Dark slate grey",
    specLine: "5 seats · Steptronic · 292 hp",
    image: media.bmw530eStudio,
    imageAlt: "Dark slate grey BMW 5 Series on a stone studio floor",
    gallery: [{ src: media.bmw530eStudio, alt: "BMW 530e xDrive, side three-quarter studio view" }],
    headline: "Quiet electric miles in the city, xDrive in the mountains.",
    narrative: [
      "A plug-in hybrid executive saloon that glides through old towns on electric power and carries four in comfort on the autobahn.",
      sharedNarrative,
    ],
    specs: [
      { label: "Seats", value: "5 seats" },
      { label: "Transmission", value: "Steptronic Automatic" },
      { label: "Power & Output", value: "292 hp (system)" },
      { label: "Drivetrain", value: "xDrive All-Wheel Drive" },
      { label: "Fuel", value: "Plug-in Hybrid" },
    ],
    amenities: ["Curbside Self-Drive Handover", "Cross-Border Transit Passes (CH / IT / AT / FR / DE)"],
    homeLocation: "muc",
  },
  {
    slug: "audi-rs6-avant-performance",
    brand: "Audi",
    model: "RS6 Avant Performance",
    name: "Audi RS6 Avant Performance",
    exhibit: "06",
    category: "wagon",
    categoryLabel: "Performance Wagons",
    year: 2025,
    seats: 5,
    seatsLabel: "5 seats",
    gearbox: "Tiptronic",
    transmission: "automatic",
    powerHp: 600,
    powertrain: "petrol",
    features: ["awd", "ski", "acc"],
    pricePerDay: 360,
    available: true,
    colour: "Midnight blue",
    specLine: "5 seats · Tiptronic · 600 hp",
    image: media.audiRs6Studio,
    imageAlt: "Midnight blue Audi RS6 Avant on a stone studio floor",
    gallery: [{ src: media.audiRs6Studio, alt: "Audi RS6 Avant, side three-quarter studio view" }],
    headline: "Estate-car practicality with supercar pace.",
    narrative: [
      "Room for skis and luggage, quattro traction for winter passes, and a twin-turbo V8 for the long autobahn stretches between hubs.",
      sharedNarrative,
    ],
    specs: [
      { label: "Seats", value: "5 seats" },
      { label: "Transmission", value: "8-Speed Tiptronic" },
      { label: "Power & Output", value: "600 hp · 4.0L Twin-Turbo V8" },
      { label: "Drivetrain", value: "quattro All-Wheel Drive" },
      { label: "Fuel", value: "Petrol" },
    ],
    amenities: ["Ski Rack & Winterization Protocol", "Curbside Self-Drive Handover"],
    homeLocation: "zrh",
  },
  {
    slug: "toyota-land-cruiser-gr-s",
    brand: "Toyota",
    model: "Land Cruiser GR-S Overlanding",
    name: "Toyota Land Cruiser GR-S",
    exhibit: "11",
    category: "suv",
    categoryLabel: "SUVs",
    year: 2025,
    seats: 7,
    seatsLabel: "7 seats",
    gearbox: "Direct Shift",
    transmission: "automatic",
    powerHp: 415,
    powertrain: "petrol",
    features: ["awd", "ski"],
    pricePerDay: 280,
    available: true,
    colour: "Bronze champagne",
    specLine: "7 seats · Direct Shift · 415 hp",
    image: media.landCruiserStudio,
    imageAlt: "Bronze champagne Toyota Land Cruiser on a stone studio floor",
    gallery: [{ src: media.landCruiserStudio, alt: "Toyota Land Cruiser, side three-quarter studio view" }],
    headline: "Built for the roads beyond the passes.",
    narrative: [
      "Seven seats, full-time four-wheel drive and overlanding equipment for families heading to remote valleys and high mountain huts.",
      sharedNarrative,
    ],
    specs: [
      { label: "Seats", value: "7 seats" },
      { label: "Transmission", value: "10-Speed Direct Shift" },
      { label: "Power & Output", value: "415 hp" },
      { label: "Drivetrain", value: "Full-time 4WD" },
      { label: "Fuel", value: "Petrol" },
    ],
    amenities: ["Ski Rack & Winterization Protocol", "Curbside Self-Drive Handover"],
    homeLocation: "gva",
  },
  {
    slug: "volvo-xc90-ultimate-b6",
    brand: "Volvo",
    model: "XC90 Ultimate B6 AWD",
    name: "Volvo XC90 Ultimate B6 AWD",
    exhibit: "02",
    category: "suv",
    categoryLabel: "SUVs",
    year: 2025,
    seats: 7,
    seatsLabel: "7 seats",
    gearbox: "Automatic",
    transmission: "automatic",
    powerHp: 300,
    powertrain: "hybrid",
    features: ["awd", "ski", "acc"],
    pricePerDay: 210,
    available: true,
    colour: "Pine Grey Metallic",
    specLine: "7 seats · Automatic · 300 hp",
    image: media.volvoCourtyard,
    imageAlt: "Pine grey Volvo XC90 in a brutalist concrete courtyard",
    gallery: [{ src: media.volvoCourtyard, alt: "Volvo XC90 Ultimate in a brutalist concrete courtyard" }],
    headline: "Scandinavian calm for the family journey.",
    narrative: [
      "Seven seats, all-wheel drive and a serene cabin — the XC90 is the composed choice for family holidays and long transfers.",
      sharedNarrative,
    ],
    specs: [
      { label: "Seats", value: "7 seats" },
      { label: "Transmission", value: "8-Speed Automatic" },
      { label: "Power & Output", value: "300 hp" },
      { label: "Drivetrain", value: "All-Wheel Drive" },
      { label: "Fuel", value: "Mild Hybrid" },
    ],
    amenities: ["Ski Rack & Winterization Protocol", "Curbside Self-Drive Handover"],
    homeLocation: "zrh",
  },
  {
    slug: "lexus-lc-500",
    brand: "Lexus",
    model: "LC 500 V8 Coupe",
    name: "Lexus LC 500 V8 Coupe",
    exhibit: "05",
    category: "sports",
    categoryLabel: "Sports",
    year: 2025,
    seats: 4,
    seatsLabel: "2+2 seats",
    gearbox: "10-Speed",
    transmission: "automatic",
    powerHp: 477,
    powertrain: "petrol",
    features: ["acc"],
    pricePerDay: 375,
    available: true,
    colour: "Champagne",
    specLine: "2+2 seats · 10-Speed · 477 hp",
    image: media.lexusLakeComo,
    mobileImage: media.mobileLexusTerrace,
    imageAlt: "Champagne Lexus LC 500 at a modernist villa on Lake Como",
    gallery: [{ src: media.lexusLakeComo, alt: "Lexus LC 500 at a modernist villa on Lake Como at dusk" }],
    provenance: "Provenance: Villa Passalacqua, Moltrasio",
    headline: "Grand touring refinement for the lakes.",
    narrative: [
      "A naturally aspirated 5.0L symphony with grand touring refinement tailored for the twisting ribbons between St. Moritz and Bellagio.",
      sharedNarrative,
    ],
    specs: [
      { label: "Seats", value: "2+2 seats" },
      { label: "Transmission", value: "10-Speed Automatic" },
      { label: "Power & Output", value: "477 hp · 5.0L V8" },
      { label: "Drivetrain", value: "Rear-wheel drive" },
      { label: "Fuel", value: "Petrol" },
    ],
    amenities: ["Curbside Self-Drive Handover", "Cross-Border Transit Passes (CH / IT / AT / FR / DE)"],
    homeLocation: "mxp",
  },
  {
    slug: "porsche-911-carrera",
    brand: "Porsche",
    model: "911 Carrera",
    name: "Porsche 911 Carrera",
    exhibit: "01",
    category: "sports",
    categoryLabel: "Sports",
    year: 2025,
    seats: 4,
    seatsLabel: "2+2 seats",
    gearbox: "PDK",
    transmission: "automatic",
    powerHp: 385,
    powertrain: "petrol",
    features: ["acc"],
    pricePerDay: 340,
    available: true,
    colour: "Silver",
    specLine: "2+2 seats · PDK · 385 hp",
    image: media.porscheGalleryPortrait,
    imageAlt: "Silver Porsche 911 Carrera in a modernist concrete gallery",
    gallery: [
      { src: media.heroPorscheGallery, alt: "Silver Porsche 911 Carrera in a modernist gallery with morning light" },
      { src: media.porscheGalleryPortrait, alt: "Porsche 911 Carrera in a concrete gallery space" },
    ],
    headline: "Drive something worth remembering.",
    narrative: [
      "The definitive 911: a rear-engined coupé that is as composed on a Lucerne lakeside boulevard as it is on the Gotthard Pass.",
      sharedNarrative,
    ],
    specs: [
      { label: "Seats", value: "2+2 seats" },
      { label: "Transmission", value: "8-Speed PDK" },
      { label: "Power & Output", value: "385 hp" },
      { label: "Drivetrain", value: "Rear-wheel drive" },
      { label: "Fuel", value: "Petrol" },
    ],
    amenities: ["Curbside Self-Drive Handover", "Cross-Border Transit Passes (CH / IT / AT / FR / DE)"],
    homeLocation: "zrh",
  },
  {
    slug: "porsche-911-carrera-4s",
    brand: "Porsche",
    model: "911 Carrera 4S",
    name: "Porsche 911 Carrera 4S",
    exhibit: "03",
    category: "sports",
    categoryLabel: "Sports",
    year: 2025,
    seats: 4,
    seatsLabel: "2+2 seats",
    gearbox: "PDK",
    transmission: "automatic",
    powerHp: 450,
    powertrain: "petrol",
    features: ["awd", "acc"],
    pricePerDay: 390,
    available: true,
    colour: "Silver",
    specLine: "2+2 seats · PDK · 450 hp",
    image: media.heroPorscheGallery,
    imageAlt: "Porsche 911 Carrera 4S in a modernist gallery",
    gallery: [{ src: media.heroPorscheGallery, alt: "Porsche 911 Carrera 4S in a modernist gallery" }],
    headline: "All-weather 911 for winter passes.",
    narrative: [
      "All-wheel drive brings year-round confidence to the 911 formula — a sports car for the Alps in every season.",
      sharedNarrative,
    ],
    specs: [
      { label: "Seats", value: "2+2 seats" },
      { label: "Transmission", value: "8-Speed PDK" },
      { label: "Power & Output", value: "450 hp" },
      { label: "Drivetrain", value: "All-Wheel Drive" },
      { label: "Fuel", value: "Petrol" },
    ],
    amenities: ["Curbside Self-Drive Handover", "Cross-Border Transit Passes (CH / IT / AT / FR / DE)"],
    homeLocation: "zrh",
  },
];

export const categoryOptions: { value: Category; label: string }[] = [
  { value: "sports", label: "Sports & Grand Tourer" },
  { value: "sedan", label: "Executive & Luxury Sedans" },
  { value: "suv", label: "SUVs & Overlanding" },
  { value: "wagon", label: "Performance Wagons" },
];

export const brandOptions = [
  "Porsche",
  "Mercedes-Benz",
  "BMW",
  "Audi",
  "Land Rover",
  "Volvo",
  "Lexus",
  "Toyota",
] as const;

export const powertrainOptions: { value: Powertrain; label: string }[] = [
  { value: "petrol", label: "Petrol" },
  { value: "diesel", label: "Diesel" },
  { value: "hybrid", label: "Hybrid" },
  { value: "electric", label: "Pure Electric" },
];

export const featureOptions: { value: Feature; label: string }[] = [
  { value: "awd", label: "All-Wheel Drive (AWD/4WD)" },
  { value: "ski", label: "Ski rack & Winterised" },
  { value: "chauffeur", label: "Curbside Chauffeur Delivery" },
  { value: "acc", label: "Adaptive Cruise Control" },
];
