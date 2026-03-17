# TASKS.md

## Goal

Make this site's layout and proportions match cursor.com/home. Ignore colours (we're light mode, they're dark), ignore mockup card internals (placeholder), ignore content differences. Match the **spatial feel**: sizing, spacing, ratios, border radii, typography scale.

---

## Phase 1: Understand the Target

- [ ] Fetch https://cursor.com/home and study the HTML/CSS
- [ ] Note the actual values for: container border-radius, container background/border subtlety, text vs mockup width ratio, section heights, heading/description/link font sizes, spacing between elements
- [ ] Read `LAYOUT.md`, `COMPONENTS.md`, `PRINCIPLES.md`, `CHECKLIST.md` — these are starting-point specs from screenshot analysis. Where they conflict with what you find on the live site, **the live site wins**.

## Phase 2: Apply Changes

- [ ] Fix Hero heading — it's way too small (currently tops out at 2rem). Match Cursor's hero heading scale.
- [ ] Fix all section containers — border-radius, background subtlety, border visibility, min-height. Match Cursor's.
- [ ] Fix text/mockup width ratio in AgentFeatures and FeatureGrid — text should be a narrow column, mockup should dominate. Match Cursor's ratio.
- [ ] Fix typography scale — section headings, descriptions, links. Match Cursor's sizes relative to their containers.
- [ ] Fix spacing — margins between heading/description/link, padding inside containers, gaps between sections. Match Cursor's.
- [ ] Fix LogoWall and Footer proportions — less padding, less oversized text.
- [ ] Remove any `max-w` constraints on mockup areas that prevent them from filling their space.

## Phase 3: Verify and Iterate

- [ ] Run `npm run build` — must pass
- [ ] Compare the result against cursor.com/home again. For each feature section, check:
  - Does the text/mockup ratio feel the same?
  - Does the container prominence feel the same? (barely visible, or too obvious?)
  - Does the typography scale feel the same? (text small relative to container, or cramped?)
  - Does the section height feel the same?
  - Does the spacing feel the same?
- [ ] If anything is off, adjust and re-verify. Repeat until satisfied.
- [ ] Do one final `npm run build` to confirm clean build.

---

## Rules
- Do NOT change content/copy — only styling
- Do NOT change page structure or component hierarchy
- Do NOT add dependencies
- Do NOT spend time on mockup card internals — they're placeholder
- Do NOT worry about colour matching (light vs dark is intentional)
- DO fetch the live site and use it as ground truth
- DO iterate until the proportions genuinely match
