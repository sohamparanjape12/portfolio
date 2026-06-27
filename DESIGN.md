---
name: Soham Paranjape Portfolio
description: A dark-native engineering portfolio for a full-stack developer — spatial, precise, quiet authority.
colors:
  ink-near-black: "#050505"
  paper-near-white: "#FAF9F6"
  ink-warm: "#F5F0E8"
  muted-warm: "#D1CEC9"
  stone: "#92908B"
  stone-light: "#666666"
  foreground-light: "#0D0D0D"
  muted-light: "#1A1A1A"
  card-hover: "rgba(18,18,20,0.8)"
  card-rest: "rgba(18,18,20,0)"
  nav-surface: "#121214"
  emerald-grid: "#10B981"
  border-dark: "rgba(245,240,232,0.05)"
  border-light: "rgba(13,13,13,0.08)"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(4rem, 10vw, 6.5rem)"
    fontWeight: 600
    lineHeight: 0.77
    letterSpacing: "-0.03em"
  display-second-line:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(4rem, 10vw, 6.5rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 2.8rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Mona Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body-large:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 2vw, 1.25rem)"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
  label:
    fontFamily: "OverusedGrotesk, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.1em"
  nav-link:
    fontFamily: "Mona Sans, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.1em"
  contact-link:
    fontFamily: "Mona Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.1em"
rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  card: "24px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "64px"
  2xl: "96px"
  3xl: "160px"
motion:
  ease-out-expo: "[0.23, 1, 0.32, 1]"
  ease-ios-drawer: "[0.32, 0.72, 0, 1]"
  ease-power4-out: "power4.out"
  ease-power3-out: "power3.out"
  ease-power3-inout: "power3.inOut"
  ease-power4-inout: "power4.inOut"
components:
  button-primary:
    textColor: "{colors.stone}"
    typography: "{typography.nav-link}"
    borderBottom: "1px solid {colors.border-dark}"
  button-primary-hover:
    textColor: "{colors.ink-warm}"
    y: "-2px"
    duration: "200ms"
  button-ghost:
    textColor: "{colors.stone}"
    typography: "{typography.nav-link}"
    borderBottom: "1px solid transparent"
  button-ghost-hover:
    textColor: "{colors.ink-warm}"
    x: "3px"
    duration: "200ms"
  tag:
    backgroundColor: "#27272a"
    textColor: "#F4F4F5"
    rounded: "9999px"
    padding: "4px 10px"
    fontSize: "0.875rem"
    fontWeight: 500
  nav-link:
    textColor: "{colors.stone}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.ink-warm}"
---

# Design System: Soham Paranjape Portfolio

## 1. Overview

**Creative North Star: "The Night Blueprint"**

This system is dark-native, precise, and spatial — like engineering drawings exhibited in a gallery. Every decision earns its place through geometry, not decoration. The dominant surface is near-black (`#050505`); type is warm off-white (`#F5F0E8`) — not pure white, which would read as sterile. A hairline emerald grid (opacity ~1% dark / ~3% light) traces the blueprint metaphor without announcing it: background infrastructure, not foreground decoration.

The motion language is cinematic and technical: GSAP-orchestrated letter-by-letter name reveals using `translateY(200%)` clip-wipe mechanics, hover-triggered card expansions with iOS-class easing, scroll-driven parallax, and a clip-path circular menu reveal. Animations are structural — they carry information about hierarchy, sequence, and space. The custom cursor (dot + trailing ring, spring physics) is an intentional detail: it signals craft before the first word is read.

The typography voice is a **two-family system**: **Inter** for display and structural headings (authoritative geometric weight), **Mona Sans** for all body copy, nav links, CTAs, and metadata (approachable, readable, grounded). OverusedGrotesk handles micro-label utility only. The combination reads as one voice — technical confidence with a human undertone — not a contrast pairing for decoration.

Text case is intentionally **lowercase** for all UI labels, nav links, CTAs, and metadata. This is not the generic AI-slop all-caps kicker; it is a deliberate voice choice. `lowercase tracking-[0.1em]` is the system's UI grammar, not screaming uppercase.

**Key Characteristics:**
- Dark-native dual theme (`#050505` default, `#FAF9F6` light mode)
- Inter (display/headings) + Mona Sans (body/UI copy) + OverusedGrotesk (micro-labels only) — three precise roles, no overlap
- Blueprint grid infrastructure (emerald `#10B981` at ~1% opacity) — traceable but invisible
- Flat elevation: depth through scale, whitespace, and z-axis motion — no decorative shadows at rest
- Custom cursor as a craft signal (dot + trailing ring, spring physics, accent color on hover)
- 2×2 grid of hover-expand project cards — image always visible, details animate in on hover
- Diagonal hero composition: name anchors bottom-left, metadata floats top-right
- GSAP is the primary animation engine; Framer Motion handles spring-physics cursor and scroll-linked transforms
- Motion is material: every animation is load-bearing, not cosmetic
- Lowercase UI text is the system's voice signature

---

## 2. Color: The Night Blueprint Palette

A near-monochrome system anchored in warm near-black. Color differentiation happens through lightness and temperature, not hue. The emerald grid is structural infrastructure — never used as a UI color.

### Dark Mode (canonical)

| Token | Value | Role |
|---|---|---|
| `--background` | `#050505` | Body background. Near-black, not pure black — the 5% warmth prevents harshness |
| `--foreground` | `#F5F0E8` | Primary text. Warm off-white with F0E8 amber — matches bg skin temperature |
| `--foreground-muted` | `#D1CEC9` | Secondary text. Supporting descriptions. ~85% of `#F5F0E8` |
| `--foreground-dim` | `#92908B` | Tertiary text. Metadata, nav links at rest, timestamps. Dim, not invisible |
| `--accent` | `rgba(240,240,240,0.53)` | Selection highlight in dark mode |
| `--border` | `rgba(245,240,232,0.05)` | Dividers and container edges. Near-invisible hairlines |
| `--grid-opacity` | `0.01` | Emerald grid opacity in dark mode |

### Light Mode (functional toggle)

| Token | Value | Role |
|---|---|---|
| `--background` | `#FAF9F6` | 3 points of warmth; not cream, not pure white |
| `--foreground` | `#0D0D0D` | Primary text |
| `--foreground-muted` | `#1A1A1A` | Secondary text |
| `--foreground-dim` | `#666666` | Tertiary text. Readable at 4.5:1 on `#FAF9F6` |
| `--accent` | `rgba(0,0,0,0.53)` | Selection highlight in light mode |
| `--border` | `rgba(13,13,13,0.08)` | Dividers |
| `--grid-opacity` | `0.03` | Emerald grid opacity in light mode |

### Card Surfaces (applied inline via GSAP, not CSS variables)

| Name | Value | Role |
|---|---|---|
| `card-rest` | `rgba(18,18,20,0)` | Project card background at rest — fully transparent so the grid breathes through |
| `card-hover` | `rgba(18,18,20,0.8)` | Project card background on hover — subtle dark tint lifts without shadow |
| `nav-surface` | `#121214` at 90% opacity | Navbar clip-path panel. `backdrop-blur-2xl`, `zinc-800/10` border |

### Infrastructure

**Emerald Grid** (`#10B981`): `linear-gradient` in both directions, `60px × 60px` cells, opacity via `--grid-opacity`. Never used as a UI accent, interactive color, or highlight.

### Named Rules

**The Emerald Embargo Rule.** `#10B981` is background infrastructure only. Never use it as an accent, link color, hover state, button color, or any interactive signal.

**The One Temperature Rule.** All colors in this system are near-neutral and warm-tinted. Do not introduce a cool-tinted neutral (cool gray, blue-gray, slate) without explicit justification.

**The Card Transparency Rule.** Project cards use `rgba(18,18,20,0)` at rest — fully transparent. The `0` alpha is load-bearing: it allows the grid to show through and prevents any visual boxing before hover. On hover, GSAP transitions `backgroundColor` to `rgba(18,18,20,0.8)` simultaneously with the `y: -6px` lift. This is the only place in the system where background color transitions on a non-scroll state change.

---

## 3. Typography

**Display Font:** Inter (Google Fonts, `next/font/google`, variable: `--font-inter`)
**Body / UI Font:** Mona Sans (Google Fonts, `next/font/google`, variable: `--font-mona-sans`)
**Label / Micro-utility Font:** OverusedGrotesk (local WOFF2, 4 weights: 400/500/600/700, variable: `--font-overused-grotesk`)

### Font Stack Logic

Each family has a single, non-negotiable role:

- **Inter** — display-scale hero name, section headings (`Hey!`, `Featured Projects`, contact statement). Pure weight authority at scale.
- **Mona Sans** — all prose, nav links, CTAs (`view work`, `get in touch ↗`), footer, metadata, about body copy. Readable, approachable, grounded.
- **OverusedGrotesk** — micro-labels only: `.font-grotesk` class, tag chips, year metadata. 10px / 0.15em tracking when used as a label.

> **Font aliases in globals.css:** `--font-sans` → Mona Sans, `--font-display` → Inter. Component classes `font-inter`, `font-mona-sans`, `font-grotesk` map to the underlying CSS variables.

### Type Hierarchy

| Level | Font | Weight | Size | Line-height | Tracking | Use |
|---|---|---|---|---|---|---|
| Display L1 | Inter | 600 | `clamp(4rem, 10vw, 6.5rem)` | `0.77` | `-0.03em` | Hero first name — "Soham" |
| Display L2 | Inter | 400 | `clamp(4rem, 10vw, 6.5rem)` | `0.95` | `-0.03em` | Hero last name — "Paranjape". Weight drop creates two-tone mark without color change |
| Headline | Inter | 600 | `clamp(2rem, 4vw, 2.8rem)` | tight | `-0.03em` | Section entry heads ("Hey!") |
| Contact Statement | Inter | 500 | `clamp(2rem, 5vw, 4rem)` | `0.98` | `-0.03em` | Contact section opening |
| Body Large | Inter | 500 | `clamp(1.125rem, 2vw, 1.25rem)` | normal | normal | About left-col primary sentence |
| Body | Mona Sans | 400 | `1rem` | `1.6` | normal | About right-col prose, descriptions |
| Body Light | Mona Sans | 300 | `1rem` | tight | normal | About right-col secondary prose |
| Title | Inter | 500 | `1.25rem` (text-xl) | `1.2` | `-0.02em` | Project card names |
| Caption | Mona Sans | 400 | `0.875rem` (text-sm) | tight | normal | Project card descriptions (`foreground/70`) |
| Label | OverusedGrotesk | 400 | `0.625rem` | 1 | `0.15em` uppercase | Micro-labels, `.label` class only |
| Nav Link | Mona Sans | 400 | `0.75rem` (text-xs) | 1 | `0.1em` lowercase | In-hero nav: `work`, `about`, `contact` |
| CTA | Mona Sans | 400 | `0.875rem` (text-sm) | 1 | `0.1em` lowercase | `view work`, `get in touch ↗` |
| Metadata | Mona Sans | 400 | `0.75–0.875rem` | 1 | `0.1em` lowercase | Role, location, footer, contact labels |

### The Lowercase Doctrine

All UI text that is not a proper noun or a sentence uses **lowercase** with `tracking-[0.1em]`. This includes:
- Nav links: `work`, `about`, `contact`
- CTAs: `view work`, `get in touch ↗`
- Metadata: `full-stack developer`, `MIT‑WPU | Pune`
- Footer: `© 2026 soham paranjape`, `pune / in`
- Contact labels: `email`, `linkedin`, `github`
- Navbar contact links: `github`, `mail`, `linkedin`

Lowercase + `0.1em` tracking creates a quiet, confident register — the deliberate inverse of the saturated AI all-caps kicker. It is used for all UI grammar, never as an eyebrow on section headings.

### Named Rules

**The Inter / Mona Sans Axis Rule.** Inter carries structural weight at large scale; Mona Sans carries legibility and warmth at reading scale. Do not swap their roles. Do not use Inter for prose or Mona Sans for display headlines.

**The Label Economy Rule.** OverusedGrotesk at uppercase 0.15em tracking is the `.label` class only. If it appears on more than 5 elements per viewport, reduce. Scarcity is the signal.

**The Display Floor Rule.** Display letter-spacing never goes below `-0.04em`. Current target: `-0.03em` — optically tight without crowding. Tighter reads as cramped, not designed.

---

## 4. Motion

GSAP is the primary orchestration engine. Framer Motion handles spring-physics cursor and scroll-linked opacity/transform. They operate in distinct domains and never conflict.

### Motion Constants (module top of page.tsx)

```ts
const ease = [0.23, 1, 0.32, 1]      // Framer Motion: high-fidelity ease-out-expo
const slowEase = [0.32, 0.72, 0, 1]  // Framer Motion: iOS-like drawer curve
```

GSAP string easings in use:

| Easing | Where used |
|---|---|
| `"power4.out"` | Navbar entrance, about image entry, card lift enter |
| `"power3.out"` | TextReveal scroll reveals, card inner content, general block reveals |
| `"power2.out"` | Card detail inner fade-in (softer) |
| `"power2.in"` | Card detail inner fade-out (collapse direction) |
| `"power3.inOut"` | Card detail height collapse, navbar clip-path close |
| `"power4.inOut"` | Navbar clip-path open and close — maximum precision |
| `"back.out"` | Nav item staggered entry — slight purposeful overshoot |
| `"none"` | Scrubbed parallax — scroll IS the playhead |

### Page Load Sequence

All animations start from fully visible DOM. No content is gated behind an animation class — reveals enhance what's already rendered.

1. **Nav entrance** (Framer Motion): `opacity: 0→1`, `y: -10→0`, `duration: 0.6s`, ease `[0.23, 1, 0.32, 1]`, `delay: 0.3s`
2. **"Soham" letter reveal** (GSAP TextReveal, `byLetter: true`): letters `translateY(200%)→0%`, stagger `0.05s`, `duration: 1.2s`, `ease: power3.out`, `delay: 0.1s`
3. **"Paranjape" letter reveal** (GSAP TextReveal, `byLetter: true`): letters `translateY(200%)→0%`, stagger `0.04s`, `duration: 1.2s`, `ease: power3.out`, `delay: 0.38s`
4. **Metadata top-right** (Framer Motion): `opacity: 0→1`, `y: -6→0`, `duration: 0.55s`, ease `[0.16, 1, 0.3, 1]`, `delay: 1.0s`
5. **CTAs bottom-right** (Framer Motion): `opacity: 0→1`, `y: 10→0`, `duration: 0.65s`, ease `[0.16, 1, 0.3, 1]`, `delay: 0.75s`

Weight contrast (600→400) and line-height contrast (0.77→0.95) between the two name lines create a visual two-tone effect without color change. Staggered letter cascades (Soham first, Paranjape 0.28s after) flow as one continuous motion, not two blocks.

### Scroll-Linked Hero Parallax

Framer Motion `useScroll` + `useTransform`:
- `heroOpacity`: `scrollY [0, 400] → opacity [1, 0]`
- `heroY`: `scrollY [0, 400] → y [0, -60px]`

Applied to entire hero content block. Cinematic fade-and-drift exit as the about section rises into view.

### TextReveal Component Architecture

The `TextReveal` component is the system's primary scroll-reveal primitive:

```
Container
  → Each word: overflow-hidden inline-block (clips the reveal sweep)
    → paddingBottom: 0.2em / marginBottom: -0.2em (descender safety — g, j, p, y never clip)
    → Inner .reveal-node span: translateY(200%) initial → translateY(0%) on ScrollTrigger
```

In `byLetter` mode, each letter is a separate `.reveal-node` inside its own `overflow-hidden` clip container, with `paddingLeft/Right: 0.05em` kerning corrections.

Key GSAP config: `scrollTrigger.once: true` (fires exactly once), `invalidateOnRefresh: false` (prevents scroll adjustments from resetting mid-reveal), `toggleActions: "play none none none"`.

Dependencies exclude `children` intentionally — avoids re-triggering on React re-renders during scroll.

### About Section Parallax

Two distinct GSAP animations on the about photo (`.about-image`):

1. **Entry reveal** (fires once): `opacity: 0, y: 40 → opacity: 1, y: 0`, `duration: 1.2s`, `ease: power4.out`, `delay: 0.35s`. Trigger: `#about top 50%`.

2. **Scrubbed parallax** (continuous, `scrub: 1.2`): Two-phase timeline driven by `#about top 60% → bottom 20%`:
   - Phase 1: `scale: 0.98 → 1` (image breathes in as section enters)
   - Phase 2: `y: 0 → -20px` (image drifts upward — depth cue)
   - `ease: none` on parallax phase — scroll IS the playhead; easing would fight the physics

### Project Card Hover Choreography

GSAP manages three DOM elements simultaneously via `timeline()`:

**Enter (`mouseenter`):**

```
t=0ms     card     y: -6px, backgroundColor→rgba(18,18,20,0.8)    [0.38s, power4.out]
t=0ms     details  height: 0→naturalHeight                         [0.42s, power3.out] (starts same time "<")
t=270ms   inner    opacity: 0, y:8 → opacity:1, y:0               [0.3s, power2.out] (offset "-=0.15")
```

**Leave (`mouseleave`):**

```
t=0ms     inner    opacity: 0, y: 6                                [0.18s, power2.in]
t=130ms   details  height→0                                        [0.35s, power3.inOut] (offset "-=0.05")
t=130ms   card     y:0, backgroundColor→rgba(18,18,20,0)           [0.35s, power3.out] (starts with details "<")
```

**Implementation details:**
- GSAP measures `details.offsetHeight` before collapsing — avoids animating to `height: "auto"` directly
- `gsap.set` applies initial states only after `matchMedia("(hover: hover) and (pointer: fine)")` confirms hover capability
- Touch/mobile devices: GSAP setup is entirely skipped; details are always visible
- `will-change: transform` + `backface-visibility: hidden` on card container for GPU compositing

**Always visible:** image, project name (Inter 500), description (Mona Sans), external arrow icon.
**Reveals on hover:** year label (Mona Sans, `foreground/60`), tech stack pills (`bg-zinc-800`, zinc-100 text, pill radius).

**Image filter at rest:** `hue-rotate(-5deg) brightness(77%) saturate(80%) sepia(20%)` — archival, unified tone.
**On image hover:** `group-hover:filter-none transition-all duration-400` — filter resets, image breathes full color.

### Navbar: Clip-Path Circular Reveal

The navbar is a full-screen overlay panel that **starts as a 40px circular button**:

- **Rest:** `clip-path: circle(20px at calc(100% - 36px) 36px)` — pinned top-right
- **Open:** `clip-path: circle(150% at calc(100% - 36px) 36px)`, `1.1s`, `power4.inOut`
- **Close:** `clip-path: circle(20px at calc(100% - 36px) 36px)`, `0.8s`, `power4.inOut`

Panel style: `#121214` at 90% opacity, `backdrop-blur-2xl`, `border zinc-800/10`, `rounded-2xl`, min-width 240px desktop.

**Staggered nav item reveal (after panel opens):**
- Main links: `opacity: 0, y:15 → 1, 0`, stagger `0.08s`, `ease: back.out`, `delay: 0.65s`
- Contact links: `opacity: 0, filter:blur(5px) → 1, blur(0)`, stagger `0.09s`, `ease: power3.out`, `delay: 0.85s`

**ScrollTrigger entrance:** Panel appears only after hero scrolls past (`top -80px`). `opacity: 0, y:-20 → 1, 0`, `0.6s power4.out`. Scroll-back to hero: menu auto-closes.

### Custom Cursor

Two-layer, hidden on mobile (`md:hidden`):

**Center dot** (Framer Motion spring — `damping: 35, stiffness: 450, mass: 0.1`):
- `4×4px`, `bg-foreground`, `border-radius: 9999px`
- Click: `scale: 0.8`. Snaps instantly, no lag.

**Trailing ring** (Framer Motion spring — `damping: 20, stiffness: 150, mass: 0.5`):
- `32×32px`, `border: 1px solid foreground/20`, `border-radius: 9999px`
- Hover: `scale: 1.5`, `opacity: 1`, `borderColor: var(--color-accent)`
- Click: `scale: 0.9`. Visible lag — trails the dot.

Hover detection: `a`, `button`, `.cursor-pointer` ancestor scan on `mouseover`. Ring signals interactivity before click — cursor IS the hover affordance.

### Scroll Reveal Timing Grid

| Section | Type | Delay | Duration | Ease |
|---|---|---|---|---|
| Hero "Soham" (per letter) | TextReveal byLetter | 0.1s | 1.2s | power3.out |
| Hero "Paranjape" (per letter) | TextReveal byLetter | 0.38s | 1.2s | power3.out |
| About "Hey!" heading | Reveal block | 0s (trigger #about top 50%) | 0.6s | power3.out |
| About primary sentence | TextReveal per word | 0.15s | 0.8s | power4.out |
| About right-col prose | TextReveal per word | 0.65s | 0.9s | power3.out |
| About image | GSAP direct | 0.35s | 1.2s | power4.out |
| Work section heading | TextReveal per word | 0.4s | 1.2s | power3.out |
| Project cards | Reveal block | 0.4s + index × 0.25s | 0.8s | power3.out |
| Contact statement | TextReveal per word | 0.1s | 0.8s | power3.out |
| Contact links | Reveal block | index × 0.07s | 0.6s | power3.out |

### Reduced Motion

All Framer Motion animations check `useReducedMotion()`:
- `initial` → `false` (no from-state)
- `duration` → `0` (instant)
- `delay` → `0`

GSAP animations (TextReveal, card hover, about image) do not yet have a `prefers-reduced-motion` CSS guard. Known gap: scroll-reveal text should crossfade (`opacity: 0→1`) rather than slide when reduced motion is preferred.

---

## 5. Elevation

Flat by default. Depth through:

1. **Scale contrast** — large display type adjacent to small labels
2. **Whitespace rhythm** — `py-32 md:py-48` section separations vs. `gap-1`/`gap-4` element groupings
3. **Z-axis motion** — hero parallax vs. static content communicates layering
4. **Border hairline** — `--border-dark`/`--border-light` as sole surface separator

The **only** tonal surface shift: project card `backgroundColor` transparent→`rgba(18,18,20,0.8)` on hover. State-change elevation, not decorative.

Glass: `backdrop-blur-2xl` once — the navbar overlay panel. Canonical single instance.

### Named Rules

**The Flat-By-Default Rule.** No `box-shadow` at rest. If you're adding `box-shadow` to a static element, remove it.

**The One Glass Rule.** `backdrop-filter: blur()` once: the navbar panel. A second instance requires explicit brand justification.

**The Card Lift Rule.** Cards elevate exclusively through `y: -6px` + `backgroundColor: rgba(18,18,20,0.8)`. No border, no shadow. Upward drift + tonal shift is sufficient.

---

## 6. Layout

Single-column vertical scroll. Max-width `7xl` (1280px) centered with `mx-auto`. Section padding: `px-6 md:px-10`.

### Hero Section

- **Min-height:** `100dvh`
- **Composition:** Diagonal tension — name anchors `bottom-left` (`flex flex-col justify-end`), metadata anchors `top-right` (absolute). Asymmetry fills the right void without adding prose.
- **Name block:** `flex flex-col`. L1 line-height `0.77`, L2 line-height `0.95` — tighter first line, looser second creates vertical breathing.
- **CTAs:** `flex gap-6 justify-end items-end pb-4` — right-aligned at the name block base. Both lowercase Mona Sans.

### About Section (7-column grid)

- **`grid-cols-1 md:grid-cols-7`**
- **Left (2 cols):** Heading + primary sentence. `flex flex-col justify-between` — heading pins top, sentence pins bottom.
- **Center (3 cols):** About photo. `aspect-ratio: 4/5`, `md:h-[480px]`. Filter: `sepia(45%) saturate(65%) hue-rotate(5deg) brightness(77%)`.
- **Right (2 cols):** Secondary bio with inline tech chip tags. `flex flex-col justify-end` — aligns with photo base.
- **Section height:** `md:h-[65vh]` constrains proportions on desktop.

### Work Section (2×2 grid)

- **`grid md:grid-cols-2 gap-12 gap-y-4`**
- Image-first cards, name + description always visible, hover-reveal details.
- Section heading: TextReveal, left-aligned. No eyebrow, no number.
- Divider: 1px hairline after heading.

### Contact Section

- Heading: TextReveal statement, `max-w-2xl`, leading `0.98`. Soft, not transactional.
- Link list: `flex flex-col gap-0` — zero gap, dividers only. Each row: label (left, `w-16`), address (center), arrow (right). `whileHover: {x: 10}` — whole row shifts right.

### Footer

`flex items-center justify-between` with `border-t border-border`. Copyright (left) + location (right), both lowercase Mona Sans.

---

## 7. Components

### Buttons / Primary Actions

Text-link style. No background fill, no border-radius, lowercase.

- **Primary (`view work`):** Mona Sans `text-sm lowercase tracking-[0.1em] text-dim`, `border-bottom: 1px solid border pb-0.5`. Hover: `y: -2px`, `color: foreground`, 200ms ease-out.
- **Ghost (`get in touch ↗`):** Same type, `border-bottom: 1px solid transparent`. Hover: `x: 3px`, `color: foreground`, 200ms ease-out.
- **No ghost-card pattern.** Never `border: 1px solid X` + `box-shadow` on the same element.

### Tags / Tech Chips

Filled pills. Used in project card hover-details and about bio inline flow.

- **Style:** `bg-zinc-800 text-zinc-100` (~`#27272a` bg, `#F4F4F5` text), `px-2.5 py-1 rounded-full text-sm font-medium my-0.5`
- **Filled** (not borderline-only) — fills better at small size in mixed text context

### Navigation (Clip-Path Panel)

Fixed full-screen overlay starting as a 40px circular button. Full mechanics in Motion § Navbar above.

- Main links: Inter `font-medium text-xl tracking-tight` (title case, not uppercase or lowercase)
- Contact links: Mona Sans `text-sm lowercase tracking-tight text-dim`
- Toggle: `bg-zinc-800/40` filled circle, 40×40px, Menu/X icon swap

### Project Cards

Hover-expand cards. Not accordion rows.

**Always visible:**
```
Card container (relative, rounded-2xl, p-4, -mx-4, backgroundColor: rgba(18,18,20,0))
  Image wrapper (aspect-[17/9], rounded-xl, bg-[#111111], overflow-hidden)
    Image (fill, object-cover object-top, desaturated filter at rest)
  Name + description row
    h2 (Inter 500, text-xl, tracking-tight)
    p (Mona Sans, text-sm, foreground/70)
    ArrowUpRight icon (if external link)
```

**Hover-revealed:**
```
Details div (height: 0 at rest, GSAP-animated to naturalHeight)
  Inner div (opacity: 0, y: 8 at rest, fades in last)
    Year label (Mona Sans, text-xs, foreground/60)
    Tech chip pills (flex-wrap, gap-1.5)
```

**Card radius note:** `rounded-2xl` (24px) on container, `rounded-xl` (12px) on image. The 24px matches the navbar panel radius — intentional system coherence. Not "insane rounding" because the card is a loose hover-reveal container, not a hard-bordered box.

**Click:** If `project.link` exists, entire card → `window.open(link, "_blank")`.

### Custom Cursor

Two-layer system (hidden on mobile `md:hidden`). Full spring physics in Motion § Custom Cursor above.

### Divider

`<div className="w-full h-px bg-border" />` — the sole hairline separator. Between section heading + project grid, and between contact links. No color shift beyond the border token.

---

## 8. Do's and Don'ts

### Do:
- **Do** use dark mode as the primary/default theme. `#050505` is the identity surface.
- **Do** use Inter for display/heading text and Mona Sans for body/UI text. Non-negotiable role separation.
- **Do** write all UI labels, nav links, and CTAs in **lowercase** with `tracking-[0.1em]`. Voice signature.
- **Do** keep the emerald grid strictly at opacity ≤ 3%. Never promote to a UI color.
- **Do** use GSAP for orchestrated multi-element sequences. Use Framer Motion for spring-physics cursor and scroll-linked transforms. Keep domains separate.
- **Do** measure card detail height with `offsetHeight` before animating — never animate to `height: "auto"` directly in GSAP.
- **Do** check for hover capability with `matchMedia("(hover: hover) and (pointer: fine)")` before applying hover-only GSAP states.
- **Do** use `scrollTrigger.once: true` on all scroll-reveal animations. Never re-fire on re-scroll.
- **Do** apply `useReducedMotion()` checks on all Framer Motion animations.
- **Do** keep display letter-spacing ≥ `-0.04em`. Current target: `-0.03em`.
- **Do** cap display `clamp()` max at `6.5rem`.
- **Do** use `text-wrap: pretty` on all multi-line body paragraphs.
- **Do** keep elevation flat at rest. State changes only.

### Don't:
- **Don't** use uppercase tracked labels as section eyebrows. The system has no eyebrows.
- **Don't** use numbered section markers (`01 ·`) as default scaffolding.
- **Don't** use `#10B981` as any UI accent, link, button, or interactive signal. Emerald Embargo.
- **Don't** add a second `backdrop-filter: blur()`. One glass: the navbar.
- **Don't** use gradient text (`background-clip: text` + gradient). Single solid color only.
- **Don't** use `border-left` or `border-right` > 1px as a colored accent stripe.
- **Don't** pair `border: 1px solid X` + `box-shadow: 0 Npx Mpx` on the same element. Ghost-card ban.
- **Don't** add `box-shadow` to any element at rest.
- **Don't** introduce a cool-tinted neutral (slate, blue-gray). All neutrals are warm-tinted.
- **Don't** use editorial-magazine aesthetics (display serif, italic drop caps). Grotesque-native only.
- **Don't** use hand-drawn SVG, `feTurbulence` grain, or doodle illustrations.
- **Don't** use `repeating-linear-gradient(...)` stripe backgrounds. Blueprint grid is the only texture.
- **Don't** use hero-metric SaaS templates (big number + small label + gradient accent).
- **Don't** add a fourth font family. Inter / Mona Sans / OverusedGrotesk is the complete stack.
- **Don't** make the card `rgba(18,18,20,0)` rest state opaque or tinted. Transparency is load-bearing.
- **Don't** animate card details via CSS `height` transition. Use GSAP with measured `offsetHeight` only.
