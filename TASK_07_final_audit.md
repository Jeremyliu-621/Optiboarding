# TASK 07 — Final Audit: Cross-Page Consistency & Polish

## Purpose
This is the final pass after all individual pages are complete. The goal is to catch inconsistencies, elevate anything still looking underdeveloped, and verify the dashboard works as a coherent whole.

---

## 1. Design Consistency Audit

Go through every page and verify these rules are uniformly applied:

### Colour
- [ ] All backgrounds use only `--bg-deep`, `--bg-surface`, or `--bg-elevated`
- [ ] No gradients anywhere in the dashboard (landing page is exempt)
- [ ] `--accent` is used only for primary CTAs, active states, and the Optibot annotation line on charts
- [ ] No bright colours — all status chips, verdicts, and tags use muted, low-saturation tints
- [ ] No visible card borders except: left-accent stripe on hover, `--border-subtle` as section dividers

### Typography
- [ ] Section labels (e.g. "OPTIBOT INSIGHTS", "RECENT ACTIVITY") are uppercase, `--text-muted`, tracked, small — consistent size across all pages
- [ ] Page-level headings are consistent size and weight
- [ ] Monospace font is used consistently for: code, API keys, file paths, PR numbers
- [ ] No mixed font sizes within a single data row

### Interactive Elements
- [ ] All buttons in the same semantic category (primary, secondary, destructive) look identical across pages
- [ ] All toggle switches use the same component
- [ ] All dropdown selectors use the same component
- [ ] Hover states are consistent: `--bg-elevated` background, no colour change on text

### Spacing
- [ ] Consistent section gap (between major sections on a page)
- [ ] Consistent card padding
- [ ] Tables have consistent row height and cell padding

---

## 2. Functional Completeness Check

For each page, verify:

| Page | Key Interactions | Status |
|------|-----------------|--------|
| Dashboard Home | Cards navigate to correct routes | |
| Optibot | Manual review form validates + shows loading state | |
| Repo Insights | Time range filter changes displayed data | |
| Repo Insights | Repo selector changes displayed data | |
| Integrations | Tab switching works, forms are interactive | |
| Codebase Map | Treemap renders, click-to-zoom works | |
| Configuration / Settings | All form controls interactive, save works | |
| Configuration / Guidelines | List selection populates editor pane | |
| Organization / Members | Invite drawer opens, pending state appears | |
| Organization / Plans | Annual toggle updates prices | |

---

## 3. Edge Cases to Test

- **Empty states**: What shows when there are no PRs reviewed? No team members? No guidelines? Each should have a clean, text-only empty state with a clear CTA. No illustrations. No "Wow, so empty!" copy.
- **Loading states**: Any component that fetches data (or simulates it) should show a skeleton loader, not just a blank space. Use a simple CSS shimmer animation on a `--bg-elevated` rectangle.
- **Long content**: Test that PR titles, file paths, and usernames truncate correctly with ellipsis and don't break layouts.
- **Responsive**: The sidebar + main content layout should work at 1280px. Below 1024px is out of scope, but nothing should overflow or become unreadable at 1280px.

---

## 4. Final UI Quality Check

Read each page fresh, as if you've never seen it before, and ask:

- Does anything look unfinished or placeholder-level?
- Are there any components that look visually heavier or lighter than the rest of the page (out of visual hierarchy)?
- Are there any sections with too much whitespace that makes the page feel incomplete?
- Are there any sections with too little whitespace that makes the page feel cramped?
- Does every interactive element have a visible affordance (cursor change, hover state)?
- Does the sidebar navigation correctly highlight the active page on every route?

---

## 5. Things to NOT Add

Do not add any of the following in the name of "polish":
- Animated page transitions (Framer Motion between routes)
- A notification bell with a dropdown (the icon in the header can stay, but don't build the dropdown)
- A search overlay/modal — the search bar in the header can be decorative
- Dark/light mode toggle
- Onboarding tour overlays or product walkthroughs
- Any AI chat widget

These would add scope without adding coherence to the current build.

---

## Done
When this audit pass is complete, the dashboard should be presentable as a polished, functional product demo — not a prototype. Every page should feel like it belongs in the same product, and every interactive element should work as expected.
