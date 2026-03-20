# TASK 00 — Dashboard Home: Fix Feature Cards

## Context
The 6 quick-action cards (Review a PR, View Insights, Security Scan, Browse Repos, Team Activity, Release Notes) look flat and interchangeable. They have uniform `--bg-surface` backgrounds with oversized centred icons and label text below. No visual hierarchy, no affordance that they're clickable, no sense of purpose.

## Problems to Fix
- Icons are too large, too centred, too symmetrical — classic AI-slop grid
- No hover state communicates interactivity
- No secondary detail (e.g. a short descriptor or a stat count) — cards feel content-empty
- All cards identical weight — nothing draws the eye or suggests priority
- The grid is 6 equal columns which collapses poorly on mid-width screens

## What to Do

### Layout
- Change from a 6-column equal grid to a **mixed-density layout**: two wider "primary action" cards on the left (Review a PR, View Insights) and four compact cards on the right, OR a 3-col grid where some cards span 2 rows. Pick what reads as intentional, not accidental.
- Cards should be **rectangular with more horizontal breathing room**, not tall squares.

### Card Anatomy
Each card should have:
1. A **small, left-aligned icon** (16–18px Lucide, at `--accent` colour or a per-card muted hue)
2. A **card title** (short, already good)
3. A **one-line descriptor** — e.g. "Review a PR" → "Run Optibot on open pull requests", "Security Scan" → "Detect vulnerabilities across your repos"
4. A **subtle right-arrow or chevron** that appears on hover only (signals navigation)

### Visual Treatment
- Background stays `--bg-surface` — do NOT add gradients
- On hover: shift to `--bg-elevated`, and show a **single-pixel left border** at `--accent` (4px, not full border — just a left accent stripe). This is the only border used.
- Add a very subtle `box-shadow: 0 1px 3px rgba(0,0,0,0.3)` on hover to lift the card slightly
- The icon should have a small square container background (`--bg-elevated`) that dims to transparent on hover

### Per-Card Colour Differentiation (subtle)
Give each card icon a distinct hue by using a separate CSS custom property or inline style — e.g. Review a PR gets `--accent`, Security Scan gets a warm amber-ish muted tone, Team Activity gets a cool blue-ish muted tone. Keep saturation under 30%. The goal is "distinct" not "colourful".

## Evaluation Criteria
When done, check:
- [ ] Does each card feel like a distinct action, not a template copy?
- [ ] Is the hover state clearly communicating clickability without being flashy?
- [ ] Does the layout feel considered — would a designer approve this?
- [ ] Do the descriptors add meaning, not noise?
- [ ] Does it still feel like the same design system (dark purple, no borders on idle state)?

---
*After completing, proceed to TASK_01_optibot.md*
