# UI Design System — Optiboarding

A reference for consistent UI decisions across the site.

---

## Typography

### Headings
- **Font:** Helvetica Neue → Helvetica → Arial → system sans-serif (via `--font-heading` CSS variable)
- **Default weight:** `font-normal` (400) — intentionally light, editorial feel
- **Letter spacing:** `-0.02em`
- **Line height:** `1.15` for large display heads, `1.3` for section heads

### Body / UI
- **Font:** Inter (Google Fonts, loaded via `next/font`) → system sans-serif (via `--font-sans` CSS variable)
- **Weights loaded:** 300, 400, 500, 600
- **Default size:** `15px–16px`
- **Secondary text:** `text-[#878787]`

### Monospace
- SF Mono → Fira Code → ui-monospace

---

## Colors

| Token | Value | Use |
|---|---|---|
| Brand orange | `#e46a3d` | CTAs, accent links, avatar highlights |
| Text primary | `#000000` | Headings, key body text |
| Text secondary | `#878787` | Captions, metadata, labels |
| Border subtle | `#e2e2e2` | Dividers, card borders |
| BG subtle | `#fafafa` | Card backgrounds, section alternates |
| BG secondary | `#f8f8f8` | Hover states, chrome bars |

---

## Spacing

- **Hero top padding:** `pt-[100px]` (navbar height + compact gap)
- **Section vertical padding:** `py-24` (`96px`)
- **Card internal padding:** `px-7 py-8` (comfortable but not airy)
- **Gap between grid cards:** `gap-4`
- **Max content width:** `max-w-[1300px] mx-auto`

---

## Components

### Cards
- Background: `bg-[#fafafa]`
- Border: `border border-black/[0.04]`
- Border radius: `rounded-[4px]` (subtle, not pill)
- No box shadow by default

### Mockup/Window Cards
- Background: `bg-white`
- Border: `border border-black/[0.06]`
- Border radius: `rounded-[12px]`
- Shadow: `shadow-2xl`

### Buttons (Primary)
- Black fill: `bg-black text-white`
- Border radius: `rounded-full`
- Padding: `px-5 py-3`
- Size: `text-[15px] font-medium`

### Buttons (Secondary)
- Outline: `border border-[#e2e2e2] bg-white`
- Same radius, padding, and size as primary

---

## Motion / Animation

- **Entrance:** `opacity: 0, y: 20` → `opacity: 1, y: 0`
- **Duration:** `0.6s` for scroll-triggered, `0.8s` for hero
- **Easing:** `easeOut` for scroll, `[0.16, 1, 0.3, 1]` (spring-like) for hero
- **Stagger:** `0.07s` per item in grids
- `viewport={{ once: true, margin: "-60px" }}` for scroll triggers
