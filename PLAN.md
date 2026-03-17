# PLAN.md

## What I found

### Font inconsistency
- `globals.css` sets all h1-h6 to `font-weight: 400, letter-spacing: -0.02em` (Helvetica Neue)
- Hero h1 correctly follows this: `font-normal tracking-[-0.02em]` ← the reference
- AgentFeatures h2 OVERRIDES to `font-bold tracking-[-0.005em]` ← WRONG
- Footer CTA h2 uses `font-medium tracking-tight` ← WRONG
- Fix: all h2s → font-normal, tracking-[-0.02em] (match CSS rule and hero)

### Hero compression
- Current: section `pt-[100px]`, text block `mb-[60px]`, mockup `mt-12 mb-32`
- Button→mockup gap = 60px + 48px = 108px. Way too spread.
- Cursor benchmark: heading→CTA tight, CTA→mockup ≈ 48-64px
- Fix: pt-[80px], mb-8 on text block, remove mt-12 on mockup, mb-24 on mockup

### Hero heading size
- Currently lg:text-[52px] — brief says reduce it
- Target: lg:text-[42px] (still substantial, but Cursor-benchmark sized)

### Scroll animations to remove
- FeatureGrid.tsx: 2× `whileInView` → plain divs
- Testimonials.tsx: 6× `whileInView` (one per card) → plain divs
- Hero.tsx: remove entrance animations (h1, button, card) — keep ONLY beat animation

### Spacing inconsistency
- Testimonials gap-4 vs AgentFeatures gap-3 → change testimonials to gap-3

### Hero entrance animations
- Per brief: "Everything else is static and visible immediately"
- Remove motion.h1, motion.div (button), motion.div (mockup card) → plain elements
- Keep ONLY the beat sequence animation inside the card

---

## Deliverable 1: UI Doctor Pass

Changes to make:
1. `Hero.tsx` — compress pt/mb, reduce h1 size, remove entrance animations
2. `AgentFeatures.tsx` — fix both h2: font-normal tracking-[-0.02em]
3. `Footer.tsx` — fix CTA h2: font-normal tracking-[-0.02em]
4. `FeatureGrid.tsx` — remove 2× whileInView, remove framer-motion import
5. `Testimonials.tsx` — remove 6× whileInView, remove framer-motion import, gap-3

---

## Deliverable 2: Hero Mockup Animation

### 5-beat sequence, each 2.8s, 1.5s loop pause

**Beat 0: PR Opened** (badge: Open/green)
- Timeline event: "drmaeur opened this pull request · 2 min ago"
- Files changed card: 3 files with +/- counts

**Beat 1: Optibot Reviewing** (badge: Open/green)
- Shows the diff block (the code rename)
- Status checks section: "agent-optibot · Analyzing cross-repo dependencies" with pulsing dots

**Beat 2: Breaking Change** (badge: Changes requested/amber)
- Full Optibot review comment
- ⚠ Breaking change detected
- 3 downstream services listed in monospace

**Beat 3: Security Finding + Summary** (badge: Changes requested/amber)
- Second Optibot comment style
- Risk level: Medium
- Security: httpOnly missing
- Suggested diff fix inline

**Beat 4: Merged** (badge: Merged/purple)
- Timeline: drmaeur committed → agent-optibot approved → agent-optibot merged
- Purple "merged and closed" bar at bottom

### Technical approach
- State machine: `useState<0|1|2|3|4>` with `useEffect` timer
- `AnimatePresence mode="wait"` for content area
- `motion.div key={beat}` with opacity+y fade (no scale)
- Status badge also animated via `motion.div key={status}`
- Beat 4 timer = BEAT_DURATION + LOOP_PAUSE (4.3s) for narrative pause before restart
- No fixed height on container — all beats designed to be ~same height

### Card structure
```
[Chrome bar — static]
[PR header — title + animated badge — static chrome, animated badge]
[Beat content — AnimatePresence]
```

---

## Execution Order

1. Write PLAN.md ← this file
2. Rewrite Hero.tsx (compressed layout + animation)
3. Fix AgentFeatures.tsx (h2 font)
4. Fix Footer.tsx (h2 font)
5. Fix FeatureGrid.tsx (remove whileInView)
6. Fix Testimonials.tsx (remove whileInView, fix gap)
7. Update DESIGN-TOKENS.md with all decisions
8. npm run build
9. Self-evaluate against protocol
10. Write CHANGELOG.md
