# COMPONENTS.md — Per-Component Fixes

This maps the general rules from LAYOUT.md and MOCKUPS.md to specific changes needed in each component file.

---

## Hero.tsx

### Problem 1: Hero heading is way too small
The responsive sizes `text-[0.5rem] sm:text-[1rem] md:text-[1.5rem] lg:text-[2rem]` top out at 32px. Cursor's hero heading is ~48-52px on desktop.

**Fix**: Change to `text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px]`

### Problem 2: Hero heading is `font-medium` — correct
This is actually right. Keep `font-medium` (500 weight).

### Problem 3: Hero IDE mockup traffic lights are colorful
The current code uses `bg-[#ff5f56]`, `bg-[#ffbd2e]`, `bg-[#27c93f]` (red, yellow, green).

**Fix**: Change all three to `bg-[#d4d4d4]` (light mode) — muted gray dots.

### Problem 4: IDE mockup is fine otherwise
The hero mockup structure (sidebar + editor + Cmd K overlay) is reasonable. Just make the traffic lights muted and ensure `rounded-[16px]` → `rounded-[12px]` on the card.

---

## AgentFeatures.tsx

### Problem 1: Outer container too prominent
```
bg-[#f5f5f5] rounded-[32px] border border-[#ebebeb]
```

**Fix**:
```
bg-[#f7f7f7] rounded-[16px] border border-black/[0.04]
```

### Problem 2: Text/mockup split is 50/50
```
flex-1 (text) and flex-[1.1] (mockup)
```

**Fix**:
```
flex-[0.45] (text) and flex-1 (mockup)
```
Also add `max-w-[420px]` to the text div.

### Problem 3: Section heading too large
`text-[36px]` is bigger than the hero heading (at `2rem` = 32px). Section headings should be smaller than the hero.

**Fix**: `text-[26px]` or `text-[28px]`

### Problem 4: Description text too large
`text-[18px]` is large for secondary text.

**Fix**: `text-[15px]`

### Problem 5: Link text too large
`text-[16px]`

**Fix**: `text-[14px]`

### Problem 6: Mockup traffic light dots
Currently `w-3 h-3` (12px) with `bg-[#e5e5e5]`.

**Fix**: `w-2.5 h-2.5` (10px), color is fine (muted gray). Good.

### Problem 7: Mockup text sizes inside
Sidebar heading `text-[14px]`, code prompt `text-[13px]`, main content heading `text-[18px]`, main content body `text-[15px]`.

**Fix**: 
- Sidebar heading: `text-[13px]`
- Code prompt: `text-[12px]`
- Main content heading: `text-[15px]`
- Main content body: `text-[13px]`

### Problem 8: Mockup border radius
Currently the inner mockup card uses `rounded-tl-[16px]`.

**Fix**: `rounded-tl-[12px]` (and any other corners that are rounded)

### Problem 9: Container min-height
The container should enforce a taller height.

**Fix**: Add `min-h-[640px]` to the outer container div.

---

## FeatureGrid.tsx

### Problem 1: Same wrapper card issues
Same `bg-[#f5f5f5] rounded-[32px] border` wrapper. Same fix as AgentFeatures.

### Problem 2: Mockup max-width constraint
```
max-w-[540px]
```
This prevents the mockup from filling its space.

**Fix**: Remove `max-w-[540px]`. Let the mockup card be wider.

### Problem 3: Text max-width
```
max-w-[500px]
```
This is OK but should be slightly narrower.

**Fix**: `max-w-[400px]`

### Problem 4: Same text size issues
Same fixes as AgentFeatures: heading `text-[26px]`, description `text-[15px]`.

### Problem 5: Mockup padding
```
p-8 lg:p-12
```
The mockup container has too much padding, making the card float in space.

**Fix**: `p-4 lg:p-6` — less padding so the card fills more of the space. Or use asymmetric padding to anchor the card to one edge.

### Problem 6: Container min-height
```
min-h-[500px]
```

**Fix**: `min-h-[580px]`

---

## Navbar.tsx

The navbar is mostly fine. Minor tweaks:

### Problem 1: Border radius on buttons
If Download button uses `rounded-full`, that's fine — Cursor does pill-shaped buttons too.

### Problem 2: Overall height
`h-16` (64px) is standard. Fine.

No major changes needed here.

---

## LogoWall.tsx

### Problem 1: Section padding
`py-20` (80px) is slightly generous.

**Fix**: `py-14` or `py-16` (56-64px). The logo wall is a low-emphasis section and shouldn't take up too much vertical space.

### Problem 2: Logo text styling
Using `font-bold text-xl md:text-2xl` for logo text placeholders. This is fine for now.

**Fix (minor)**: Consider `text-lg md:text-xl font-semibold` — slightly smaller and less bold.

---

## Footer.tsx

### Problem 1: CTA section
The "Ready to code faster?" section has `text-4xl md:text-5xl` which is very large.

**Fix**: `text-[32px] md:text-[40px] font-medium` — more restrained.

### Problem 2: Section padding
`pt-32 pb-16` is a lot of top padding.

**Fix**: `pt-24 pb-12` — still generous, but less extreme.

No other major issues — the footer structure is standard.
