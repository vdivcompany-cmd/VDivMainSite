---
name: Obsidian Cyber-Luxe
colors:
  surface: '#fdf8ff'
  surface-dim: '#ddd8e0'
  surface-bright: '#fdf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f2fa'
  surface-container: '#f1ecf4'
  surface-container-high: '#ebe6ee'
  surface-container-highest: '#e6e1e9'
  on-surface: '#1c1b20'
  on-surface-variant: '#494551'
  inverse-surface: '#312f35'
  inverse-on-surface: '#f4eff7'
  outline: '#7a7582'
  outline-variant: '#cbc4d2'
  surface-tint: '#6750a4'
  primary: '#4f388a'
  on-primary: '#ffffff'
  primary-container: '#6750a4'
  on-primary-container: '#e0d2ff'
  inverse-primary: '#cfbdff'
  secondary: '#63597c'
  on-secondary: '#ffffff'
  secondary-container: '#e0d4fd'
  on-secondary-container: '#635a7c'
  tertiary: '#765b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#c9a74d'
  on-tertiary-container: '#503d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#cfbdff'
  on-primary-fixed: '#22005d'
  on-primary-fixed-variant: '#4e378a'
  secondary-fixed: '#e8ddff'
  secondary-fixed-dim: '#cdc0e8'
  on-secondary-fixed: '#1e1635'
  on-secondary-fixed-variant: '#4a4263'
  tertiary-fixed: '#ffdf93'
  tertiary-fixed-dim: '#e7c365'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#fdf8ff'
  on-background: '#1c1b20'
  surface-variant: '#e6e1e9'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 56px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.1em
  technical-data:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system embodies the "Obsidian Cyber-Luxe" aesthetic—a sophisticated fusion of precision engineering and high-end technology. It targets a professional audience that values technical excellence and premium aesthetics. 

The visual language is characterized by:
- **Precision Engineering:** Disciplined geometry and thin, sharp lines inspired by high-end hardware.
- **Cyber-Luxe Clarity:** Transitioning from its "laboratory" phase, the system now embraces a **Light Mode** primary experience. This provides a clean, clinical, and high-clarity environment that feels like a high-end physical workspace.
- **Circuit Connectivity:** Subtle circuit-line motifs and "glowing nodes" used as decorative dividers or interactive indicators, mirroring the logic found in the brand's logo.
- **Modern Corporate:** A balanced, systematic approach that ensures reliability and clarity while maintaining a futuristic edge.

## Colors

The palette is anchored in sophisticated metallic and technical tones, now optimized for a **Light Mode** primary experience.

- **Primary (Metallic Violet):** Used for key actions and brand highlights (#8069bf). In this light environment, it provides a punchy, professional accent against bright surfaces.
- **Secondary (Technical Slate):** Used for secondary interactions and structural elements (#7c7296), offering a muted tonal bridge between the neutral backgrounds and primary accents.
- **Surface Strategy:** The system utilizes a tiered "Clinical" scale. Backgrounds are bright and airy, while containers use subtle "Surface" shifts to create perceived depth and organization.
- **Bi-Directional Support:** Colors are tested for high legibility across both LTR (English) and RTL (Arabic) contexts, ensuring functional status colors remain intuitive.

## Typography

This design system uses a tri-font hierarchy to distinguish between branding, content, and data.

- **Hanken Grotesk (Headings):** Delivers a sharp, contemporary professional voice. Use heavier weights for headlines to ground the page.
- **Geist (Body):** A technical, highly legible sans-serif designed for clarity. It provides a modern "developer-tool" feel to standard prose.
- **JetBrains Mono (Technical Labels):** Used for micro-copy, status indicators, and metadata. It reinforces the engineering-first narrative.

**RTL Considerations:** For Arabic text, line heights are increased by 15% to accommodate script descenders, while font sizes remain consistent with English counterparts to preserve hierarchy.

## Layout & Spacing

The layout follows a **disciplined fluid grid** with strict adherence to a 4px baseline.

- **Grid:** A 12-column grid for desktop (above 1200px) and a 4-column grid for mobile (below 600px).
- **Rhythm:** Spacing follows a geometric progression based on the 4px unit (4, 8, 16, 24, 48, 64).
- **Circuit Logic:** Horizontal and vertical dividers often terminate in a "node" (a 4px primary-colored dot) to visually connect disparate content blocks, mimicking the logo's circuitry.
- **Mirroring (RTL):** Layouts must perfectly mirror across the vertical axis.

## Elevation & Depth

In the light mode context, depth is established through **Tonal Layering** and **Soft Shadows** to maintain a clean, tactile feel.

- **Layers:** Background is the cleanest level (Surface). Elevated containers use subtly different "Surface-Container" values or very soft, high-diffusion shadows to appear separated from the base.
- **Borders as Definition:** Use 1px borders (`outline-variant`) to define elements clearly against the bright background, ensuring structural integrity.
- **Glassmorphism:** Reserved for navigation bars and overlays—using a light backdrop blur (20px) and a semi-transparent white tint to create a "frosted glass" effect that feels premium and airy.

## Shapes

The shape language is "Soft Geometric." It balances technical precision with modern, approachable curves.

- **Small Elements (Buttons, Inputs, Chips):** Use a fixed **4px radius**. This provides just enough softness to feel modern while remaining structurally sound.
- **Large Containers (Cards, Sections, Modals):** Use a **8px to 12px radius**. This creates a clear distinction between internal components and external structural blocks.
- **Circuit Motifs:** Decorative elements (dividers) should use 90-degree or 45-degree angles, never freehand curves, to match the precision of the typography.

## Components

- **Buttons:**
  - *Primary:* Solid fill with Primary Metallic Violet (#8069bf). Text is high-contrast white/light.
  - *Technical:* Ghost buttons with 1px borders and `JetBrains Mono` text.
- **Input Fields:** 
  - Light background with a subtle border. The border "activates" by glowing in the Primary color when focused. Technical labels (JetBrains Mono) should sit just above the field.
- **Cards:** 
  - Subtle 1px borders or very soft ambient shadows. Top-right (or top-left for RTL) corner may feature a "Circuit Node" decoration to indicate connectivity or status.
- **Chips/Status Tags:** 
  - Rectangular (4px radius) with a leading 4px dot (node) that changes color based on status.
- **Circuit Dividers:** 
  - Horizontal lines that are 1px thick, featuring a small 4px circle at one end. These are used to separate sections of technical data.