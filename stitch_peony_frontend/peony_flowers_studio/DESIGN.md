---
name: Peony Flowers Studio
colors:
  surface: '#fff8f8'
  surface-dim: '#e7d6da'
  surface-bright: '#fff8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0f3'
  surface-container: '#fbeaee'
  surface-container-high: '#f5e4e8'
  surface-container-highest: '#efdee2'
  on-surface: '#22191c'
  on-surface-variant: '#544244'
  inverse-surface: '#382e31'
  inverse-on-surface: '#feecf0'
  outline: '#877274'
  outline-variant: '#d9c1c3'
  surface-tint: '#974353'
  primary: '#6f2435'
  on-primary: '#ffffff'
  primary-container: '#8c3b4b'
  on-primary-container: '#ffb9c2'
  inverse-primary: '#ffb2bd'
  secondary: '#57624c'
  on-secondary: '#ffffff'
  secondary-container: '#dbe7cb'
  on-secondary-container: '#5d6852'
  tertiary: '#3b403a'
  on-tertiary: '#ffffff'
  tertiary-container: '#525750'
  on-tertiary-container: '#c8ccc4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9dd'
  primary-fixed-dim: '#ffb2bd'
  on-primary-fixed: '#3f0013'
  on-primary-fixed-variant: '#792c3d'
  secondary-fixed: '#dbe7cb'
  secondary-fixed-dim: '#bfcab0'
  on-secondary-fixed: '#151e0d'
  on-secondary-fixed-variant: '#404a36'
  tertiary-fixed: '#e0e4db'
  tertiary-fixed-dim: '#c4c8bf'
  on-tertiary-fixed: '#181d17'
  on-tertiary-fixed-variant: '#434842'
  background: '#fff8f8'
  on-background: '#22191c'
  surface-variant: '#efdee2'
typography:
  display-lg:
    fontFamily: Fraunces
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Fraunces
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Fraunces
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-md-mobile:
    fontFamily: Fraunces
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  headline-sm:
    fontFamily: Fraunces
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: manrope
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-padding: 80px
---

## Brand & Style
The brand personality is rooted in editorial sophistication and understated luxury, tailored for a premium floral studio in Tashkent. This design system emphasizes a **Modern Minimal** aesthetic with an **Editorial** flair, drawing inspiration from high-end fashion journals.

The emotional response should be one of serenity, quality, and organic beauty. By utilizing generous whitespace and delicate hairline borders, the UI recedes to allow the photography of floral arrangements to remain the focal point. The design rejects digital artifice like gradients or heavy shadows in favor of flat, tactile planes of soft color and precise, structural lines. 

The signature motif—a 1px wine-colored botanical line sketch—should be used sparingly as a "watermark" or decorative divider to reinforce the artisanal nature of the studio.

## Colors
The palette is inspired by natural floral tones and traditional Uzbek botanical aesthetics. 

- **Primary (Wine):** Used for call-to-action elements, brand identifiers, and critical UI highlights.
- **Secondary (Sage Green):** Used for natural accents, categorization (e.g., "In Stock"), and secondary visual interest.
- **Background Tiers:** White (#FFFFFF) serves as the canvas. Blush (#F6E9EA) and Sage (#E9EDE4) are utilized for section backgrounds to provide a gentle rhythmic shift during the scroll experience.
- **Borders:** Hairline strokes in #EBE2DF define the grid without adding visual weight.

## Typography
The typography strategy pairings create a dialogue between the organic, serif character of **Fraunces** and the systematic, clean nature of **Manrope**.

- **Fraunces (Headings):** Used for all storytelling elements, product names, and "hero" messaging. Its variable weights should be used to emphasize the premium nature of the brand.
- **Manrope (Body/UI):** Used for descriptions, prices, navigation, and functional labels.
- **Language:** All UI strings must be in Uzbek (Latin script), ensuring characters like *o‘* and *g‘* are rendered correctly.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop with a maximum width of 1280px, while remaining fully fluid on mobile devices. 

- **Whitespace:** Use generous vertical padding (`section-padding`) between content blocks to maintain the editorial feel.
- **Grid:** Use a 12-column grid for desktop. For floral galleries, use asymmetrical layouts (e.g., a 7-column image next to a 5-column description) to mimic magazine spreads.
- **Borders:** Use 1px hairline strokes (#EBE2DF) to separate navigation from content and to define product cards without using shadows.

## Elevation & Depth
This system eschews traditional depth markers. There are no box-shadows or blurs.

- **Flat Layering:** Hierarchy is established through tonal shifts in background color (e.g., a #FAF5F4 card on a #FFFFFF background).
- **Hairline Outlines:** 1px solid borders define the boundaries of interactive elements. 
- **Active State:** When an element is focused or active, the border weight remains 1px but transitions to the "Strong Border" color (#DDD0CD) or the Primary Wine color.

## Shapes
In alignment with the modern-minimal aesthetic, the shape language is disciplined. All interactive components and product imagery use a consistent **6px corner radius**. This provides a subtle softness that balances the sharp 1px hairline borders without appearing overly "bubbly" or consumer-grade.

Full-width sections and containers should remain sharp (0px) to anchor the design to the edges of the viewport.

## Components
- **Buttons:**
  - *Primary (Asosiy):* Solid #8C3B4B background, white Manrope text (Semi-bold), 6px radius.
  - *Secondary (Ikkinchi):* 1px border in #8C3B4B, wine text, transparent background.
- **Product Cards:** No shadows. 1px hairline border (#EBE2DF). Image occupies the top 75% of the card with a 6px radius on the top corners only. Product names in Fraunces; prices in Manrope.
- **Input Fields:** 1px border (#EBE2DF). On focus, the border changes to #8C3B4B. Labels are Manrope 12px Uppercase.
- **Chips/Filters:** 6px radius, #FAF5F4 background, Manrope 14px text.
- **Botanical Sketch:** The one-line peony sketch should be used as a decorative element at the end of long-form articles or as a subtle watermark behind the "Hero" section text.
- **Language Switcher:** A simple, borderless Manrope text link (O‘zb / Eng) in the top utility navigation.