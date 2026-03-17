# CLAUDE.md

## Project

This is a Next.js site that clones cursor.com/home. The structure and content are correct but the visual proportions are off — everything looks cramped and toy-like compared to the real site. The problem is **sizing, spacing, proportions, and border radii** — not colours, not content, not mockup card internals.

## Commands

- `npm run dev` — start dev server
- `npm run build` — verify build passes

## How to Work

1. **Read the design spec files first**: `LAYOUT.md`, `COMPONENTS.md`, `PRINCIPLES.md`, `CHECKLIST.md` contain starting-point values derived from screenshots. Use them as a starting point, not gospel.

2. **Verify against the live site**: Fetch https://cursor.com/home and inspect the actual HTML/CSS to check proportions, spacing, font sizes, border radii, and layout ratios. My spec files are based on eyeballing screenshots — the live site is the real source of truth. If the live site disagrees with my spec values, **the live site wins**.

3. **Ignore these differences** (they're intentional or will be changed later):
   - Dark mode vs light mode — our site is light, Cursor's is dark. Ignore colour differences.
   - Mockup card internals — the fake IDE content inside cards is placeholder. Don't refine it.
   - Content/copy differences — text will eventually be different for a different product.
   - Images and logos — we don't have their assets, placeholder is fine.

4. **Match these things exactly**:
   - Container border-radius (how rounded are the section cards?)
   - Container visual prominence (how visible is the card background/border vs the page?)
   - Text-to-mockup width ratio (how much space does the text take vs the mockup area?)
   - Section height (how tall are the feature sections?)
   - Typography scale (how large are headings, descriptions, links relative to the containers?)
   - Spacing between elements (margins, padding, gaps)
   - Overall feel: clean, balanced, minimal, not cramped

## Key Principle

The mockup area dominates each section. The text is a narrow annotation on the side. Containers are barely visible. When in doubt, make the mockup bigger and the text smaller.
