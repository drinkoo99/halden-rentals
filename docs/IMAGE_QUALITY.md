# HALDEN — Image quality report (21 Nov 2026)

## Root cause of the blur

1. **Every Stitch image is small.** Stitch stores its generated photos at ~1,264–1,408 px (verified: the lh3 URLs
   with `=s0` return the original upload; `=w2560`, `=s2560`, `=w4096` return the same size). The ZIP exports are the
   same size. Stitch's own previews load the URLs without a size suffix, which serves only **512 px** — that is why the
   Stitch export pages look especially soft.
2. **Large and high-density screens need 1.25–2.8× more pixels** (e.g. hero on 1920 @ 2× = 3,810 px; on the user's
   1920×1080 @ 125 % screen = 1,901 px).
3. A few slots crop a small part of an image (portrait journey cards from landscape photos).

## What was done

- All 46 Stitch originals downloaded at full size (`design/stitch-originals/`, with `urls.txt`); originals of every
  replaced file kept in `design/originals-backup/`.
- 20 images upscaled ×4 with **Real-ESRGAN (realesrgan-x4plus)**, resized to 2× their largest real use (hero 3,840 px
  for 4K/retina), then **blended 30 % with a plain Lanczos upscale** of the original. Raw Real-ESRGAN output smooths
  concrete and fabric into a plastic look; the blend keeps natural grain while keeping the added sharpness.
- `next.config.ts`: AVIF + WebP, `qualities: [75, 90]`, `deviceSizes` up to 3,840. Large images use `quality={90}`
  and measured `sizes`. Both homepage heroes use an art-directed `<picture>` (`ResponsiveHero`) so each device
  downloads only its own hero, with `fetchPriority="high"`.
- Mobile-only crops (1,408 px) were left unchanged: they already exceed a 430 px × 3 phone (1,290 px).

## Verified delivery (Playwright, real browser, downloaded file width)

| Screen | Hero needs → downloads | Detail main photo needs → downloads |
|---|---|---|
| 1920×1080 @ 125 % (user's screen) | 1,901 → 1,920 | 1,053 → 1,080 |
| 1920 @ 1× | 1,905 → 1,920 | 843 → 1,080 |
| 1920 @ 2× (retina) | 3,810 → 3,840 | 1,685 → 1,920 |
| 2560 @ 1× | 2,545 → 2,560 | 843 → 1,080 |

Screenshots: `docs/image-quality/shot-*.jpg` (device resolution). Comparisons: `docs/image-quality/compare-*.jpg`.

## Every image

| File | Old | New | Source | Verdict |
|---|---|---|---|---|
| hero-porsche-911-gallery | 1376×768 | 3840×2143 | Stitch export → upscaled | **Fixed** — sharp up to 4K |
| mercedes-s-class-hotel-night | 1376×768 | 2560×1429 | upscaled | **Fixed** |
| volvo-xc90-courtyard | 1376×768 | 2560×1429 | upscaled | **Fixed** (feature card); Wachau journey card is a crop → replace |
| lexus-lc500-lake-como | 1376×768 | 2560×1429 | upscaled | **Fixed** |
| range-rover-alpine-lake | 1376×768 | 2752×1536 | upscaled | **Fixed** — bonnet lettering is AI-invented (see below) |
| range-rover-interior | 1200×896 | 2400×1792 | upscaled | **Fixed** |
| range-rover-rear-courtyard | 1200×896 | 2400×1792 | upscaled | **Fixed** |
| range-rover-wheel / seat-stitching / headlight | 1024² | 2048² | upscaled | **Fixed** |
| porsche-911-gt3, mercedes-s500, bmw-530e, range-rover, toyota-land-cruiser, audi-rs6 studio | 1264×848 | 2528×1696 | upscaled | **Fixed** |
| porsche-911-gallery-portrait | 896×1200 | 1792×2400 | upscaled | **Fixed** |
| alpine-pass-switchbacks | 896×1200 | 1792×2400 | upscaled | **Improved** — good for its card size |
| riviera-coast-road | 704×1520 | 1408×3040 | Stitch original → upscaled | **Improved** — wall/road sharp; small cars still soft |
| sign-in-gallery | 1408×768 | 2816×1536 | Stitch original → upscaled | **Fixed** |
| mobile-* (10 files) | 1408×768 | unchanged | Stitch originals | Sufficient for phones |
| menu-vintage-porsche | 1408×768 | unchanged | Stitch original | Shown at 64 px |

## Still needs a better source (upscaling cannot invent real detail)

1. **Riviera road** (journey card): only 704 px of real data; replace with a ≥ 2,000 px portrait photo.
2. **Wachau / Vienna journey card**: Stitch reused the Volvo courtyard photo cropped to portrait — needs a real
   Danube-valley image.
3. **AI artefacts in the generated photography**: invented lettering on the Range Rover bonnet and some number plates,
   "HALDEN 911" plate on the sign-in Porsche. Fine for a concept, but a real product should use licensed or
   commissioned photography (or regenerate these frames).

## Can Stitch provide better assets?

Not at higher resolution: Stitch's generated images top out at ~1,400 px and its exports/URLs offer nothing larger.
Stitch is still useful to **regenerate a frame with a better composition** for a specific slot (e.g. a true portrait
Riviera shot), which would then go through the same upscale pipeline.

For production-grade imagery, in order of quality:
1. Real or licensed photography (or manufacturer press kits where licensing allows).
2. A dedicated high-resolution image generator (several offer 2K–4K output; most are paid — needs approval).
3. Stitch regeneration + this Real-ESRGAN pipeline (free, what is in place now).

## Round 2 (21 Nov 2026)

- 43 public Stitch photos downloaded at original size (`=s0`, 1,200–1,408 px). 23 more are private to the Stitch
  canvas (`/aida/` URLs return 403 outside Stitch); those slots use the matching round-1 HD photo of the same car/scene.
- Upscaled (Real-ESRGAN x4 + 30 % Lanczos blend) where the measured slot needs more pixels than the source:
  journey hero and About atelier hero → 3,840 px; reservation detail / modify / cancel photos → 2,560 px; High Alpine
  card → 2,048 px; journey portraits and concierge portraits → 1,792 px. Everything else is used at ≤ its source size.
- `src/components/ui/Photo.tsx` serves every round-2 photo through the Next.js optimiser; intrinsic sizes come from
  `src/data/photoSizes.ts` (regenerate with `node scripts/photo-sizes.mjs`).

## Re-running the pipeline

Real-ESRGAN portable: `C:\Users\Drin\Desktop\HALDEN-tools\realesrgan`. Per image:
`realesrgan-ncnn-vulkan.exe -i in.png -o out_x4.png -n realesrgan-x4plus -s 4`, then resize to the target width and
blend 30 % with a Lanczos upscale of the original (`scripts/image-finalize.py original x4.png out.jpg <width>`). ~4–7 min per image on the
integrated Radeon GPU.
