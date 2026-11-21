/**
 * Every image used by the HALDEN screens, in one place. All files live in /public/images.
 *
 * Source: Google Stitch. The *.png files are the image exports from the Stitch ZIPs; the *.jpg files
 * were downloaded from the Stitch-hosted originals (lh3.googleusercontent.com with "=s0", i.e. the
 * largest size Stitch stores — about 1,264–1,408 px on the long edge). Untouched copies of the
 * original exports are kept in design/originals-backup/.
 */
export const media = {
  // Stitch ZIP exports (PNG)
  heroPorscheGallery: "/images/hero-porsche-911-gallery.jpg",
  porscheGalleryPortrait: "/images/porsche-911-gallery-portrait.jpg",
  mercedesHotelNight: "/images/mercedes-s-class-hotel-night.jpg",
  volvoCourtyard: "/images/volvo-xc90-courtyard.jpg",
  alpinePass: "/images/alpine-pass-switchbacks.jpg",
  bmw530eStudio: "/images/bmw-530e-studio.jpg",
  rangeRoverStudio: "/images/range-rover-studio.jpg",
  porscheGt3Studio: "/images/porsche-911-gt3-studio.jpg",
  lexusLakeComo: "/images/lexus-lc500-lake-como.jpg",
  landCruiserStudio: "/images/toyota-land-cruiser-studio.jpg",
  mercedesS500Studio: "/images/mercedes-s500-studio.jpg",
  rangeRoverAlpineLake: "/images/range-rover-alpine-lake.jpg",
  rangeRoverInterior: "/images/range-rover-interior.jpg",
  rangeRoverRearCourtyard: "/images/range-rover-rear-courtyard.jpg",
  rangeRoverWheel: "/images/range-rover-wheel.jpg",
  rangeRoverHeadlight: "/images/range-rover-headlight.jpg",
  rangeRoverSeat: "/images/range-rover-seat-stitching.jpg",

  // Originals downloaded from Stitch (lh3 "=s0", full resolution) and saved locally
  audiRs6Studio: "/images/audi-rs6-studio.jpg",
  mobileGt3Gallery: "/images/mobile-gt3-gallery.jpg",
  mobileS500Stone: "/images/mobile-s500-stone.jpg",
  mobileRangeRoverPlaster: "/images/mobile-range-rover-plaster.jpg",
  mobileLexusTerrace: "/images/mobile-lexus-terrace.jpg",
  menuVintagePorsche: "/images/menu-vintage-porsche.jpg",
  mobileGt3Touring: "/images/porsche-911-gt3-studio.jpg", // Stitch original is private (login-only); local studio shot of the same car
  rivieraCoastRoad: "/images/riviera-coast-road.jpg",
  signInGallery: "/images/sign-in-gallery.jpg",
  // Mobile homepage (screen 28) uses its own crops of these scenes
  mobileHeroPorsche: "/images/mobile-hero-porsche.jpg",
  mobileVolvoCourtyard: "/images/mobile-volvo-courtyard.jpg",
  mobileMercedesHotel: "/images/mobile-mercedes-hotel.jpg",
  // Mobile vehicle detail (screen 30) — Range Rover crops
  mobileRangeRoverAlpine: "/images/mobile-range-rover-alpine.jpg",
  mobileRangeRoverCabin: "/images/mobile-range-rover-cabin.jpg",
  mobileRangeRoverRear: "/images/mobile-range-rover-rear.jpg",
  // Round 2 (Stitch export 2026-11-21): account, auth, journeys, about, mobile booking, staff console.
  // Downloaded at original size (=s0); large slots upscaled with Real-ESRGAN (see docs/IMAGE_QUALITY.md).
  aboutAtelierInterior: "/images/about-atelier-interior.jpg",
  aboutCuratorPortrait: "/images/about-concierge-curator.jpg",
  aboutCustodianPortrait: "/images/about-technical-custodian.jpg",
  aboutLiaisonPortrait: "/images/about-fleet-liaison.jpg",
  accountAudi: "/images/account-audi-rs6.jpg",
  accountGt3: "/images/account-gt3-touring.jpg",
  accountLexus: "/images/account-lexus-lc500.jpg",
  accountRangeRover: "/images/account-range-rover.jpg",
  audiRs6Editorial: "/images/audi-rs6-editorial.jpg",
  bookingRangeRoverExtras: "/images/booking-range-rover-extras.jpg",
  bookingRangeRoverHub: "/images/booking-range-rover-hub.jpg",
  curbsideGt3Lookup: "/images/curbside-gt3-lookup.jpg",
  curbsideGt3Today: "/images/curbside-gt3-today.jpg",
  curbsideRangeRoverLookup: "/images/curbside-range-rover-lookup.jpg",
  curbsideRangeRoverToday: "/images/curbside-range-rover-today.jpg",
  curbsideSClassToday: "/images/curbside-s-class-today.jpg",
  editorHeadlamp: "/images/editor-headlamp.jpg",
  editorLeather: "/images/editor-leather.jpg",
  editorRangeRoverAlt: "/images/editor-range-rover-alt.jpg",
  editorRangeRoverMain: "/images/editor-range-rover-main.jpg",
  editorWheel: "/images/editor-wheel.jpg",
  fleetAudiRs6: "/images/fleet-audi-rs6.jpg",
  fleetGt3Profile: "/images/fleet-gt3-profile.jpg",
  fleetLexusTerrace: "/images/fleet-lexus-terrace.jpg",
  fleetRangeRover: "/images/fleet-range-rover.jpg",
  handoverFrontLeft: "/images/handover-front-left.jpg",
  handoverLicenceScan: "/images/handover-licence-scan.jpg",
  handoverWheel: "/images/handover-wheel.jpg",
  journeyDolomiti: "/images/journey-dolomiti-alta-via.jpg",
  journeyHighAlpineCard: "/images/journey-high-alpine-card.jpg",
  journeyHighAlpineHero: "/images/journey-high-alpine-hero.jpg",
  journeyMaritimeCorniches: "/images/journey-maritime-corniches.jpg",
  lexusLc500Editorial: "/images/lexus-lc500-editorial.jpg",
  licenceBack: "/images/licence-back.jpg",
  licenceFront: "/images/licence-front.jpg",
  porscheGt3Editorial: "/images/porsche-911-gt3-editorial.jpg",
  porscheVintageGallery: "/images/porsche-911-vintage-gallery.jpg",
  rangeRoverCinematicStudio: "/images/range-rover-cinematic-studio.jpg",
  rangeRoverEditorialStudio: "/images/range-rover-editorial-studio.jpg",
  reservationCancelRangeRover: "/images/reservation-cancel-range-rover.jpg",
  reservationCancelledRangeRover: "/images/reservation-cancelled-range-rover.jpg",
  reservationModifyRangeRover: "/images/reservation-modify-range-rover.jpg",
  reservationRangeRover: "/images/reservation-range-rover.jpg",

} as const;

export type MediaKey = keyof typeof media;
