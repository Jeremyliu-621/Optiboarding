# DESIGN-TOKENS.md

This is a **living document**. Every UI decision is recorded here. Check before making any new decision.

---

## Typography

| Token Name | Value | Used Where |
|-----------|-------|-----------|
| `hero-heading` | 42px lg / 38px md / 32px sm / 26px base, font-weight 400, leading 1.15, tracking -0.02em | Hero.tsx h1 |
| `section-heading` | 22px, font-weight 400, leading 1.3, tracking -0.02em | AgentFeatures h2 (both blocks) |
| `cta-heading` | 40px md / 32px base, font-weight 400, tracking -0.02em | Footer CTA h2 |
| `body` | 16px, font-weight 400, leading 1.5, color #00000099 | AgentFeatures descriptions |
| `body-dark` | 15px, leading 1.65 | Testimonial quote text |
| `small-body` | 14px | Footer links, attribution lines |
| `nav-link` | 14px (text-sm), font-medium | Navbar links |
| `stat-number` | 56px / 72px md, font-bold, tracking-tight, leading-none | FeatureGrid big stat |
| `quote-large` | 20px / 22px md, font-medium, leading 1.5 | FeatureGrid blockquote |
| `mockup-heading` | 15px, font-semibold | PR title in hero mockup |
| `mockup-body` | 12-13px | Optibot comment text |
| `mockup-code` | 10-11px, font-mono | Code blocks, diff lines, file paths |
| `mockup-label` | 11px, uppercase, tracking-wider, font-semibold, color black/40 | Section labels in mockup (Risk, Security) |
| `mockup-chrome` | 11px, text-[#878787], font-medium | Status labels in mockup chromes |

### Global heading rule (globals.css)
All h1-h6: font-family Helvetica Neue, font-weight 400, letter-spacing -0.02em.
All explicit heading classes in JSX match this rule (no overrides).

---

## Spacing

| Token Name | Value | Used Where |
|-----------|-------|-----------|
| `hero-pt` | 80px (pt-[80px]) | Hero section top padding — 16px below 64px navbar |
| `hero-text-to-mockup` | 32px (mb-8 on text block) | Gap from button to mockup card |
| `hero-mockup-mb` | 96px (mb-24) | Gap below hero mockup before LogoWall |
| `hero-h1-to-button` | 32px (mt-8) | Gap from h1 to button |
| `section-padding-y` | 96px (py-24) | AgentFeatures, FeatureGrid vertical padding |
| `section-padding-bottom` | 96px (pb-24) | Testimonials, LogoWall bottom padding |
| `section-gap` | 12px (gap-3) | Between AgentFeatures containers AND between testimonial cards — must stay identical |
| `card-padding-text` | 80px vertical / 48px horizontal (py-[80px] px-[48px]) | Text column inside AgentFeatures large blocks |
| `card-padding-inner` | 24px / 32px md (p-6 md:p-8) | Inside mockup card content areas |
| `heading-to-description` | 16px (mt-4) | h2 → description paragraph everywhere |
| `description-to-link` | 24px (mt-6) | Description → CTA link everywhere |
| `testimonial-card-padding` | 28px horizontal, 32px vertical (px-7 py-8) | Individual testimonial cards |
| `testimonial-avatar-gap` | 28px (mt-7) | Quote text → avatar row in testimonial cards |
| `featuregrid-stat-gap` | 48-64px (gap-12 md:gap-16) | Stat + quote row horizontal gap |
| `featuregrid-stat-mb` | 64px (mb-16) | Stat row → divider margin |
| `mockup-chrome-height` | 40px (h-10) | Title bar of all mockup windows |

---

## Container Styles

| Token Name | Value | Used Where |
|-----------|-------|-----------|
| `feature-container-bg` | bg-[#fafafa] | AgentFeatures outer containers, FeatureGrid testimonial block, testimonial cards |
| `feature-container-radius` | rounded-[4px] | AgentFeatures blocks, testimonial cards, FeatureGrid quote block |
| `feature-container-border` | border border-black/[0.04] | All subtle containers |
| `hero-card-radius` | rounded-[12px] | Hero mockup card |
| `hero-card-border` | border border-black/[0.06] | Hero mockup card |
| `hero-card-shadow` | shadow-2xl | Hero mockup card |
| `mockup-chrome-bg` | bg-[#f3f3f3] | Hero mockup title bar |
| `mockup-chrome-bg-alt` | bg-[#f8f8f8] | AgentFeatures mockup title bars |
| `mockup-content-border` | border border-[#e5e5e5] | Inner borders in mockup content |
| `dot-size` | w-2.5 h-2.5 | Traffic light dots (all mockups) |
| `dot-color` | bg-[#d4d4d4] | Hero mockup dots (slightly darker) |
| `dot-color-alt` | bg-[#e5e5e5] | AgentFeatures mockup dots |

---

## Colours

| Token Name | Value | Used Where |
|-----------|-------|-----------|
| `brand` | #e46a3d | Optibot avatar, logo mark, links, accent dots in animation |
| `text-primary` | #000000 | Headings, strong text |
| `text-secondary` | #878787 | Descriptions, muted text, mockup meta |
| `text-body` | #00000099 | Body paragraphs in feature blocks |
| `text-code` | #333 | Inline body text in mockup |
| `text-muted-code` | #666 | Monospace secondary text |
| `border-subtle` | #e2e2e2 | Card borders, section dividers |
| `border-light` | #e5e5e5 | Tighter borders inside mockup content |
| `bg-card` | #fafafa | Card/container backgrounds |
| `bg-page` | #ffffff | Page background |
| `bg-chrome` | #f3f3f3 | Hero mockup title bar |
| `bg-chrome-alt` | #f8f8f8 | AgentFeatures mockup chrome, inner comment headers |
| `diff-red-bg` | #fff1f0 | Removed line background |
| `diff-red-text` | #9d1c0f | Removed line text |
| `diff-red-border` | border-red-300 | Removed line left border |
| `diff-green-bg` | #f0fff1 | Added line background |
| `diff-green-text` | #1a7f37 | Added line text |
| `diff-green-border` | border-green-300 | Added line left border |
| `badge-open` | green-50 bg, green-200 border, green-700 text | PR "Open" badge |
| `badge-changes` | amber-50 bg, amber-200 border, amber-700 text | PR "Changes requested" badge |
| `badge-merged` | purple-50 bg, purple-200 border, purple-700 text | PR "Merged" badge |
| `warning-text` | #9a6700 | Breaking change warning text |

---

## Animation

| Token Name | Value | Used Where |
|-----------|-------|-----------|
| `beat-duration` | 2800ms | Time each beat is visible |
| `loop-pause` | 1500ms | Extra time beat 4 (Merged) holds before restart |
| `beat-4-total` | 4300ms (BEAT_DURATION + LOOP_PAUSE) | Merged beat visible duration |
| `beat-transition-duration` | 0.3s | AnimatePresence fade in/out |
| `beat-transition-ease` | [0.16, 1, 0.3, 1] | Beat fade easing (spring-like) |
| `beat-y-enter` | y: 8 → 0 | Subtle upward slide on beat enter |
| `beat-y-exit` | y: 0 → -8 | Subtle upward slide on beat exit |
| `badge-transition` | 0.25s opacity | Status badge change on beat transition |
| `pulse-stagger` | 0ms / 200ms / 400ms | Scanning dots stagger in Beat 1 |

---

## Consistency Rules ✓

- [x] All section headings use font-normal, tracking-[-0.02em], matching hero heading DNA
- [x] All description text: 16px, leading-1.5, color #00000099
- [x] All CTA links: 16px, underline, #e46a3d, mt-6 after description
- [x] All card containers: bg-[#fafafa], border border-black/[0.04], rounded-[4px]
- [x] AgentFeatures gap-3 = Testimonials gap-3 (both 12px)
- [x] Heading → description spacing = mt-4 (16px) everywhere
- [x] Description → link spacing = mt-6 (24px) everywhere
- [x] All mockup chromes: h-10 (40px), dots w-2.5 h-2.5
- [x] Zero scroll-triggered animations on page (whileInView all removed)
- [x] Zero entrance animations on page elements (Hero h1/button/card all static)
- [x] Only animation: hero mockup beat sequence

---

## Decisions Log

- **hero-pt: 80px** — Navbar is 64px fixed. 80px gives 16px clearance. Cursor benchmark shows tight navbar-to-heading gap. Reduced from 100px.
- **hero-heading: 42px** — Down from 52px. Brief said smaller. Cursor hero is 48-56px but Cursor is a bigger product; 42px is proportionate for Optiboarding's focused scope. Still dominant on the page.
- **hero-text-to-mockup: 32px** — Was 108px total (mb-[60px] + mt-12). 32px matches Cursor's tight CTA-to-mockup density.
- **section-heading: font-normal** — Hero heading (the reference) is font-normal. The global CSS rule sets font-weight 400 for all headings. AgentFeatures was overriding to bold — wrong. Removed override. At 22px with Helvetica Neue 400 weight and -0.02em tracking, the heading has sufficient visual presence from the typeface character.
- **section-gap: 12px** — AgentFeatures was already gap-3. Changed testimonials from gap-4 to gap-3 for structural equivalence (both are grids of equivalent items).
- **No scroll animations** — Per brief. whileInView removed from FeatureGrid (2 instances) and Testimonials (6 instances). Hero entrance animations removed too (brief: "everything else is static and visible immediately").
- **5 beats, 2.8s each** — Fast enough to tell the story without boring the viewer. Merged beat gets +1.5s so the payoff moment lingers. Total loop: ~15.5s.
- **AnimatePresence mode="wait"** — Exit animation completes before next enters. Clean, no content overlap, no layout shift.
- **Y offset 8px on beat transitions** — Subtle upward progression. Feels like pages being turned or content arriving. Not bouncy. Not flashy.
