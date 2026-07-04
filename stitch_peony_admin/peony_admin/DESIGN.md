---
name: Peony Admin
colors:
  surface: '#fff8f7'
  surface-dim: '#edd4d7'
  surface-bright: '#fff8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0f1'
  surface-container: '#ffe9eb'
  surface-container-high: '#fce2e5'
  surface-container-highest: '#f6dce0'
  on-surface: '#26181a'
  on-surface-variant: '#594045'
  inverse-surface: '#3c2c2f'
  inverse-on-surface: '#ffecee'
  outline: '#8c7075'
  outline-variant: '#e0bec3'
  surface-tint: '#b61953'
  primary: '#9f0045'
  on-primary: '#ffffff'
  primary-container: '#c2255c'
  on-primary-container: '#ffdfe3'
  inverse-primary: '#ffb1c1'
  secondary: '#5d5e66'
  on-secondary: '#ffffff'
  secondary-container: '#e3e1ec'
  on-secondary-container: '#63646c'
  tertiary: '#005c2a'
  on-tertiary: '#ffffff'
  tertiary-container: '#007739'
  on-tertiary-container: '#99fbae'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9df'
  primary-fixed-dim: '#ffb1c1'
  on-primary-fixed: '#3f0017'
  on-primary-fixed-variant: '#90003d'
  secondary-fixed: '#e3e1ec'
  secondary-fixed-dim: '#c6c5cf'
  on-secondary-fixed: '#1a1b22'
  on-secondary-fixed-variant: '#46464e'
  tertiary-fixed: '#95f8ab'
  tertiary-fixed-dim: '#7adb91'
  on-tertiary-fixed: '#00210b'
  on-tertiary-fixed-variant: '#005225'
  background: '#fff8f7'
  on-background: '#26181a'
  surface-variant: '#f6dce0'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: '0'
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  page_padding: 24px
  section_gap: 20px
  element_gap: 16px
  container_margin: 32px
  grid_gutter: 20px
---

## Brand & Style
The design system embodies an editorial-minimalist aesthetic tailored for a high-end floral boutique. It leverages a "Quiet Luxury" approach—prioritizing generous negative space, precise alignment, and a sophisticated color palette that allows the vibrant product photography of the flowers to remain the focal point. 

The emotional response is one of calm, professional efficiency, and premium quality. The interface avoids unnecessary ornamentation, instead using hairline strokes and subtle tonal shifts to define structure, reminiscent of a modern lifestyle magazine or an architectural portfolio.

## Colors
The palette is anchored by the deep rose "Peony" accent, used sparingly for primary intent and brand recognition. Functional colors are applied to status badges using a tinted background approach (10% opacity of the hex color) to maintain a soft, approachable feel while ensuring high legibility.

- **Neutrals:** Use `#FFFFFF` for the main content "stage" to maximize light. Use `#F7F7F8` for navigation sidebars and background grounding to create a subtle layered effect.
- **Typography:** Primary headers use `#18181B`. All supporting meta-data and labels use `#71717A` to establish a clear visual hierarchy.

## Typography
The typography system relies exclusively on **Inter** to maintain a systematic, modern feel. Contrast is achieved through weight and spacing rather than multiple typefaces.

Headings utilize tight negative letter-spacing (`-0.02em`) to feel modern and "tucked in," while body text is given a generous line-height to ensure the administrative interface remains readable and reduces cognitive load during high-volume order processing. Labels for table headers and small metadata should use the uppercase `label-md` style to provide clear sectioning.

## Layout & Spacing
The layout follows a fixed-sidebar, fluid-content model. The sidebar remains at a constant 280px width, while the main content area expands to fill the viewport, capped at a maximum width of 1600px for optimal readability.

- **Rhythm:** Use a strict 4px/8px baseline grid. 
- **Paddings:** Standard page-level padding is set to 24px. Within cards and content modules, use 20px padding to create an airy, boutique feel.
- **Gaps:** Use 20px for major structural gaps (e.g., between cards) and 16px for internal component gaps (e.g., between an input label and the field).

## Elevation & Depth
This design system avoids heavy shadows, instead using **Tonal Layers** and **Refined Outlines** to communicate hierarchy.

- **Surfaces:** The base layer is `#F7F7F8`. Primary content containers (cards, tables) are `#FFFFFF`.
- **Borders:** Use a 1px solid border of `#E4E4E7` (a subtle neutral) to define container edges.
- **Shadows:** Only use shadows for floating elements like dropdown menus or modals. Use a "Soft Diffused" shadow: `0 10px 15px -3px rgba(0, 0, 0, 0.05)`.
- **Interaction:** On hover, a card may transition from a flat border to a slightly more pronounced shadow to indicate interactivity.

## Shapes
The shape language is "Rounded" to reflect the organic nature of the floral industry while maintaining professional structure.

- **Standard Elements:** Input fields, buttons, and small cards use a **0.5rem (8px)** radius.
- **Large Containers:** Dashboard widgets and main content sections use **1rem (16px)** radius to create a soft, modern frame.
- **Status Pills:** Badges and tags use a fully rounded (pill-shaped) radius for quick visual scanning.

## Components
- **Buttons:** Primary buttons use the Peony Pink (`#C2255C`) with white text and no shadow. Secondary buttons use a subtle gray border with `#18181B` text.
- **Input Fields:** Use a 1px border. Focus states should use a 2px Peony Pink ring with an inner white offset.
- **Status Badges:** Text color should be the dark hex defined in the color section, with a background color at 10% opacity of that same hex.
- **Icons:** Use Lucide-style thin-line icons (2px stroke) in `#71717A`.
- **Tables:** No vertical borders. Use 1px horizontal dividers. The header row should have a light background (`#F7F7F8`) and use the `label-md` typography.
- **Order Cards:** For flower delivery status, include a high-quality thumbnail with a 4px corner radius and a subtle inner stroke.