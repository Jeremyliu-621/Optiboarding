# LAYOUT.md — Spacing, Sizing, and Proportions

This is the most important file. The #1 problem with the current site is proportion and scale — things are too small, too evenly split, and containers are too visually prominent.

---

## Rule 1: Container Styling — Subtle, Not Prominent

Current code:
```
bg-[#f5f5f5] rounded-[32px] border border-[#ebebeb]
```

What Cursor does: There IS a container, but it's **barely visible**. The background is only ~3-5% different from the page background. The border is nearly invisible. The border-radius is much tighter.

**Fix (light mode)**:
```
bg-[#f7f7f7] rounded-[16px] border border-[#ebebeb]/40
```
- Reduce `rounded-[32px]` → `rounded-[16px]` (32px looks bubbly/toy-like, 16px looks refined)
- Make the border more subtle: `border-[#ebebeb]/40` or `border-[#e5e5e5]/50`
- Background should be barely distinguishable from the page: if page is white, container is `#f7f7f7` or `#f8f8f8`

**Fix (dark mode)**:
```
bg-[#141414] rounded-[16px] border border-white/[0.06]
```

---

## Rule 2: Text vs Mockup Width Ratio

Current code: `flex-1` (text) and `flex-[1.1]` (mockup) — roughly **48/52 split**.

What Cursor does: Looking at the screenshot, the text block (heading + description + link) occupies roughly **30-35%** of the container width. The mockup takes **65-70%**. The mockup dominates the section.

**Fix**:
- Text column: `flex-[0.45]` with `max-w-[420px]` and generous padding (`px-[48px] py-[80px]`)
- Mockup column: `flex-1` (takes remaining space)
- This means the text is a narrow strip on the left, and the big IDE mockup fills the right ~65%

---

## Rule 3: Mockup Card Size and Position

Current code: The mockup sits centered in its column with a max-width constraint.

What Cursor does: The mockup card is **large** — it fills most of its column and is pushed toward the **right edge and bottom edge** of the container. It may clip or sit flush with the container boundary. It's NOT floating in the center with equal margins.

**Fix**:
- Remove `max-w-[540px]` from FeatureGrid mockups — let them fill the available space
- In AgentFeatures, the mockup should be anchored to the bottom-right of the container
- The mockup card itself should be tall: `min-h-[550px]` to `min-h-[650px]`
- Mockup should have `rounded-[12px]` (its own, separate from the container's 16px)

---

## Rule 4: Overall Section Height

Current code: `min-h-[500px]` on the mockup area.

What Cursor does: Each feature section (container) is roughly **650-750px tall** on desktop.

**Fix**: The container itself should be at least `min-h-[640px]`. The mockup fills most of that height. The text column is vertically centered within that height using `justify-center`.

---

## Rule 5: Vertical Spacing Between Sections

Current code: `gap-12` (48px) between sections in AgentFeatures.

What Cursor does: There's roughly **24-32px** of gap between the feature section containers. They're close together — the breathing room comes from the internal padding of each container, not from gaps between them.

**Fix**: `gap-6` or `gap-8` (24-32px) between section containers. Each container has its own tall internal padding, so external gaps should be small.

---

## Rule 6: Text Block Internal Spacing

Current heading size: `text-[36px]`
Current description size: `text-[18px]`

What Cursor does (from the zoomed screenshot):
- Section heading ("Agents turn ideas into code"): roughly **24-28px**, `font-weight: 600`, tight line-height `1.2`
- Description text: roughly **15-16px**, `font-weight: 400`, color significantly muted, line-height `1.6`
- "Learn about..." link: roughly **14-15px**, the accent orange color

The heading is **smaller than you'd think**. It's not a big bold statement — it's understated. The mockup is the star, not the text.

**Fix**:
- Heading: `text-[26px]` or `text-[28px]`, `font-weight: 600`, `leading-[1.25]`
- Description: `text-[15px]` or `text-[16px]`, `leading-[1.6]`
- Link: `text-[14px]`, `font-weight: 500`
- Spacing: heading → description `mt-4` (16px), description → link `mt-6` (24px)

---

## Rule 7: Hero Section Proportions

Current hero heading: `text-[0.5rem]` to `text-[2rem]` responsive — this is WAY too small. At `2rem` (32px) on large screens, the hero text is tiny.

What Cursor does: The hero heading is roughly **48-56px** on desktop, left-aligned, medium weight (not bold).

**Fix**:
- Hero heading: `text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px]`
- `font-weight: 500` (medium)
- Left-aligned (already correct)
- Max-width ~`700px` so it wraps to 2-3 lines

The hero IDE mockup below should be **full width** of the content area and very tall (aspect ratio ~16:10). This is already close to correct in the current code.

---

## Rule 8: Mockup Internal Content — IDE Scale

Current mockup text sizes: `text-[13px]` to `text-[15px]` inside the IDE mockups.

What Cursor does: The text inside the IDE mockups is **small** — roughly `12-13px` for code, `11-12px` for sidebar labels, `13-14px` for headings inside the mockup. It looks like a real IDE at ~80% zoom.

**Fix**:
- Code text in mockups: `text-[12px]` or `text-[13px]`
- Sidebar items: `text-[12px]`
- Mockup headings (like "Plan Mission Control"): `text-[14px] font-semibold`
- The mockup title bar ("Cursor" label): `text-[11px]`
- Traffic light dots: `w-2.5 h-2.5` (10px, slightly smaller than current `w-3 h-3`)

---

## Rule 9: FeatureGrid Blocks (Tab, Chat, Agents)

These currently use the same wrapper-card pattern. Apply the same fixes:
- Container: subtle bg, `rounded-[16px]`, nearly invisible border
- Text/mockup split: 35/65 not 50/50
- Mockup should be larger and fill more of its space
- Remove `max-w-[540px]` from the mockup — let it breathe

For the dark mockup (Agents that write code, `bg-[#111111]`), the inner card styling is already close. Just make it bigger.

---

## Rule 10: Logo Wall

Current: logos are text with `text-xl md:text-2xl`, wrapped with `gap-x-12`.

What Cursor does: Logo bar is a single horizontal row, evenly spaced, with generous padding. Logos are at **reduced opacity** (~50%) and likely grayscale.

**Fix**: This is mostly fine. Ensure logos are evenly distributed across the full width (use `justify-between` not `justify-center` if there's enough). The section should have moderate vertical padding — `py-16` (64px) is enough. Don't overthink this section.
