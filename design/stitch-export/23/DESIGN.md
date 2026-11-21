---
name: The Gallery
colors:
  surface: '#f8faf6'
  surface-dim: '#d9dad7'
  surface-bright: '#f8faf6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f0'
  surface-container: '#edeeeb'
  surface-container-high: '#e7e9e5'
  surface-container-highest: '#e1e3df'
  on-surface: '#191c1a'
  on-surface-variant: '#424844'
  inverse-surface: '#2e312f'
  inverse-on-surface: '#f0f1ed'
  outline: '#737973'
  outline-variant: '#c2c8c2'
  surface-tint: '#4d6355'
  primary: '#1e3327'
  on-primary: '#ffffff'
  primary-container: '#344a3d'
  on-primary-container: '#a0b9a8'
  inverse-primary: '#b4cdbb'
  secondary: '#546254'
  on-secondary: '#ffffff'
  secondary-container: '#d7e7d5'
  on-secondary-container: '#59685a'
  tertiary: '#2e2f2a'
  on-tertiary: '#ffffff'
  tertiary-container: '#454540'
  on-tertiary-container: '#b4b2ac'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cfe9d7'
  primary-fixed-dim: '#b4cdbb'
  on-primary-fixed: '#0a2015'
  on-primary-fixed-variant: '#364c3f'
  secondary-fixed: '#d7e7d5'
  secondary-fixed-dim: '#bbcbba'
  on-secondary-fixed: '#121e14'
  on-secondary-fixed-variant: '#3c4a3d'
  tertiary-fixed: '#e4e2db'
  tertiary-fixed-dim: '#c8c6c0'
  on-tertiary-fixed: '#1b1c18'
  on-tertiary-fixed-variant: '#474742'
  background: '#f8faf6'
  on-background: '#191c1a'
  surface-variant: '#e1e3df'
typography:
  display:
    fontFamily: Bodoni Moda
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Bodoni Moda
    fontSize: 38px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 36px
  headline-sm:
    fontFamily: Bodoni Moda
    fontSize: 22px
    fontWeight: '400'
    lineHeight: 28px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-mono:
    fontFamily: Space Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.12em
  spec-numeral:
    fontFamily: Space Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.02em
  action:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 4rem
  margin-mobile: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 2rem
  space-xl: 4rem
---

## Brand & Style

This design system embodies the ethos of an architectural gallery and an exhibition catalogue. Conceived for a discerning clientele, it rejects standard automotive booking patterns in favor of calm authority, deliberate pacing, and structural elegance. 

### Visual Philosophy
- **Architectural Minimalism:** Layouts honor blank space as a material presence. White space is generous, intentional, and quiet.
- **Editorial Catalogue Structure:** Fleet vehicles are presented as sculptured objects on pedestals. Typography, thin hair-thin dividers, and precise tabular information mirror rare archival books.
- **Materiality & Tactility:** Avoid digital artifice. Strictly no glassmorphism, glowing gradients, rounded pills, or heavy simulated 3D drop shadows. Contrast is achieved through tonal shifts across warm ivory, soft stone, deep ink, and structural forest green.

## Colors

The palette references stone, ink, and natural patinas. Color is deployed sparingly to direct attention without creating noise.

### Palette Implementation
- **Base Canvas (`#F5F3EE`):** Warm Ivory. Serves as the primary viewport backdrop, softening the visual intensity of pure digital white.
- **Secondary Surface (`#EAE8E1`):** Soft Stone. Used for subtle background shifts, nested containers, and inactive structured blocks.
- **Deep Ink (`#171A18`):** High-contrast editorial ink for headings, primary text, and dominant structural elements.
- **Secondary Ink (`#666B65`):** Subdued body text, captions, metadata descriptions, and inactive states.
- **Primary / Accent Green (`#344A3D`):** Deep Forest Green. Used for primary calls to action, active navigation states, and confirmed selections. Always paired with `#F5F3EE` text for high legibility.
- **Muted Sage (`#738273`):** Secondary states, subtle accent tags, interactive hover indicators, and secondary line art.
- **Architectural Hairline (`#D8D6CE`):** Neutral 1px borders and grid dividers that structure content without visual bulk.
- **Dark Inverted Sections:** Deep charcoal background (`#171B19`) paired with panel fills (`#252A27`) and muted border treatments (`#323834`) for bespoke vehicle showcases, nighttime itineraries, and editorial curtain closers.

## Typography

The typographical pairing mimics an archival art catalogue.

### Typographic Hierarchy & Rules
- **Bodoni Moda:** Reserved for headlines, editorial section intros, and vehicle nomenclature. Set in natural sentence case or title case; strictly never set in all-caps.
- **Manrope:** Provides a balanced, neutral sans-serif ground for body narratives, explanatory copy, form labels, and standard button text.
- **Space Mono:** Applied strictly to technical properties, prices, dates, registration codes, catalogue identifiers, and uppercase tracked metadata. Always styled in uppercase when tracking is set to `0.12em`.
- **Numbers & Metrics:** Vehicle specifications (0-100 km/h, horsepower, displacement) and currency figures must render in `spec-numeral` or `label-mono` to preserve tabular visual alignment.

## Layout & Spacing

Layouts follow a clean, asymmetric editorial grid inspired by Swiss typography and gallery wall layouts.

### Grid Construction
- **Desktop (1024px+):** 12-column grid with a 4rem (64px) outer margin and 1.5rem (24px) gutters. Elements frequently offset to create breathing space around imagery.
- **Tablet (768px - 1023px):** 8-column grid with 2.5rem margins and 1.5rem gutters.
- **Mobile (<768px):** 4-column grid with 1.5rem outer margins and 1rem gutters. Columns stack vertically; photographic frames maintain square ratios.

### Spacing Cadence
- Content sections should be separated by intentional rhythm, leaning toward `space-xl` (4rem) to establish the expansive feeling of open exhibition rooms.
- Divider hairpins (1px borders) extend across column boundaries to visually anchor typographic modules.

## Elevation & Depth

Visual hierarchy is maintained through flat tonal contrasts and physical framing rather than elevation or blurred shadows.

### Dimensional Principles
- **No Drop Shadows:** Default surfaces employ strictly flat elevation. Do not use blurred shadows, diffuse colored casts, or multi-layer box shadows.
- **Surface Layering:** Depth is constructed exclusively through background shifts:
  - Base level: Warm Ivory (`#F5F3EE`)
  - Recessed / Supporting panel: Soft Stone (`#EAE8E1`)
  - Inverted Feature Room: Dark Obsidian (`#171B19`) with elevated stone slabs (`#252A27`)
- **Architectural Borders:** Separation between planes is demarcated by 1px crisp lines in `#D8D6CE` (light mode) or `#323834` (dark mode).
- **Interactive Depth:** Hover states shift background tone by 3-5% or introduce a fine 1px inset hairline instead of raising the element above the canvas.

## Shapes

The geometric framework is rectilinear, disciplined, and uncompromising.

### Shape Language
- **Sharp Framework:** The foundation rests on strict 90-degree right angles (`0px` border-radius) for all photographic assets, visual frames, structural cards, and exhibition walls.
- **Subtle Functional Softening:** Interactive input fields and buttons carry an exact 2px border radius (`border-radius: 2px`) solely to distinguish actionable controls from static layout containers without compromising the architectural geometry.
- **Prohibition:** Strictly forbid pill shapes, capsules, or rounded corners larger than 2px under any circumstance.

## Components

### Exhibit Placard (Signature Component)
The core component of the brand experience, presenting cars like featured gallery works.
- **Structure:** Crisp rectangular container with 0px corner radius, framed by a 1px border (`#D8D6CE`) or resting on a Soft Stone surface (`#EAE8E1`).
- **Anatomy:**
  1. *Catalogue Index:* Uppercase tracked mono label at top left (e.g., `CATALOGUE № 04 // MUNICH ARCHIVE`).
  2. *Exhibition Stage:* Flush, sharp-edged image ratio (16:10 or 1:1) showcasing the vehicle with architectural lighting.
  3. *Information Block:* Bodoni Moda title (`headline-md`) over a 1px hairline divider.
  4. *Spec Matrix:* Two or three column metadata in `Space Mono` displaying engine, power, and daily reservation rate.
  5. *Action Floor:* Monolithic primary action button or text-link trigger.

### Buttons & CTAs
- **Primary Action:** Solid Forest Green (`#344A3D`) background, Warm Ivory (`#F5F3EE`) typography in Manrope Semi-Bold, 2px border-radius, zero shadow. Padding: 14px 28px.
- **Secondary Action:** Transparent background, 1px solid Deep Ink (`#171A18`) border, Deep Ink typography. Hover shifts background to `#EAE8E1`.
- **Tertiary / Inline:** Space Mono uppercase tracked label accompanied by a thin custom arrow (`→`), underlined with a 1px gap.

### Input Fields & Selectors
- **Fields:** Warm Ivory canvas, 1px perimeter border in `#D8D6CE`. Focus state shifts the border to Deep Forest Green (`#344A3D`) with no exterior glow ring. Border radius: 2px.
- **Labels:** Space Mono `label-mono` uppercase floating or anchored above the input line in Deep Ink (`#171A18`).
- **Date & Specification Inputs:** Mono-spaced numeric entry directly aligned to the baseline.

### Checkboxes & Radios
- **Checkboxes:** Exact square 16x16px frame, 0px radius, 1px outline in `#171A18`. Checked state fills the box entirely with Deep Forest Green (`#344A3D`) with a minimal white check glyph.
- **Radio Options:** Square outer container with an inner square fill (never circular) to reinforce architectural geometry.

### Horizontal Dividers & Architectural Rules
- All horizontal line breaks must be rendered as clean 1px solid lines using `#D8D6CE`. Never use dashed, dotted, or gradient fades.