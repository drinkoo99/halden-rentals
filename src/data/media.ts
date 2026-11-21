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
} as const;

export type MediaKey = keyof typeof media;
