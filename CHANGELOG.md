# CHANGELOG

Changes made overnight (2026-03-17).

---

## Deliverable 1: UI Doctor Pass

### Font consistency
- **AgentFeatures.tsx** — Both section h2s changed from `font-bold tracking-[-0.005em]` → `font-normal tracking-[-0.02em]`. Now matches the hero h1 (the declared reference) and the global CSS rule in globals.css.
- **Footer.tsx** — CTA h2 changed from `font-medium tracking-tight` → `font-normal tracking-[-0.02em]`. Same family as every other heading on the page.

### Hero compression
- **Hero.tsx** — Section top padding reduced from `pt-[100px]` → `pt-[80px]`. Heading is now 16px below the fixed navbar (was 36px).
- **Hero.tsx** — Hero h1 max size reduced from `lg:text-[52px]` → `lg:text-[42px]` (full scale: 26/32/38/42px). Benchmarked against cursor.com/home — Cursor's hero is 48-56px for a larger product; 42px is proportionate for Optiboarding's focused scope.
- **Hero.tsx** — Gap from text block to mockup card reduced from `mb-[60px] + mt-12` (108px total) → `mb-8` (32px). CTA-to-mockup density now matches Cursor's compressed hero rhythm.
- **Hero.tsx** — Mockup bottom margin reduced from `mb-32` → `mb-24` (96px). Still enough separation before LogoWall.

### Scroll animations removed
- **Hero.tsx** — Removed `motion.h1` entrance animation (opacity 0→1, y 20→0). Heading is now static and visible immediately.
- **Hero.tsx** — Removed `motion.div` entrance animation on CTA button. Button is visible immediately.
- **Hero.tsx** — Removed `motion.div` entrance animation on mockup card (opacity 0→1, y 100→0). Card appears immediately.
- **FeatureGrid.tsx** — Removed 2× `whileInView` / `initial` / `viewport` props from motion.div wrappers. Converted to plain div. Removed framer-motion import. Converted to server component (removed `"use client"` directive).
- **Testimonials.tsx** — Removed 6× `whileInView` / `initial` / `viewport` / `transition` props (one per testimonial card). Converted to plain div. Removed framer-motion import. Converted to server component (removed `"use client"` directive).

### Spacing consistency
- **Testimonials.tsx** — Changed grid `gap-4` → `gap-3` to match AgentFeatures `gap-3`. These are structurally equivalent element grids (one is a 2-block feature grid, the other a 6-card testimonial grid) and now use identical gap.

---

## Deliverable 2: Hero Mockup Animation

### Architecture
- **Hero.tsx** — Complete rewrite of mockup content. State machine with `useState<0|1|2|3|4>` and `useEffect` timer drives 5 sequential "beats."
- Beat timer: 2800ms per beat. Beat 4 (Merged) holds for an extra 1500ms before looping (total 4300ms) so the payoff moment is readable.
- `AnimatePresence mode="wait"` handles beat transitions: each beat fades out (opacity 0, y -8) before the next fades in (opacity 0, y +8 → 0). 0.3s duration with spring-like easing [0.16, 1, 0.3, 1].
- Status badge in PR header is independently animated via a separate `AnimatePresence`, keyed by status string ("open" / "changes" / "merged").

### Beat sequence
**Beat 0 — PR Opened** (badge: Open, green)
- Timeline event: "drmaeur opened this pull request · 2 minutes ago"
- Files changed table: 3 files with +/− diff counts in monospace

**Beat 1 — Optibot Reviewing** (badge: Open, green)
- Shows the code diff: getUserById → fetchUser rename
- GitHub-style "Checks" panel with animated pulse dots + Optibot avatar + "Analyzing cross-repo dependencies"

**Beat 2 — Breaking Change Detected** (badge: Changes requested, amber)
- Full Optibot bot comment: ⚠ "Breaking change detected"
- 3 downstream services listed in monospace (billing-service, notifications, admin-api)
- Timestamp "just now"

**Beat 3 — Security Finding + Summary** (badge: Changes requested, amber)
- Second Optibot comment view with structured summary: Risk level (Medium), Security finding (httpOnly missing), inline suggested diff fix

**Beat 4 — Merged** (badge: Merged, purple)
- Timeline of events: drmaeur committed → agent-optibot approved → agent-optibot merged
- Purple "Pull request successfully merged and closed" bar

### Visual design choices
- PR uses real details: `#924`, branch `feature/auth-cleanup → main`, user `drmaeur`, bot `agent-optibot`
- Real file paths, real commit messages, real line numbers throughout
- Color system matches real GitHub PR UI: green/amber/purple badges, red/green diff backgrounds, monospace for code
- Card chrome is unchanged from original (browser dots, PR header)

---

## Files Changed

| File | Change type |
|------|-------------|
| `src/components/Hero.tsx` | Full rewrite — animation + compression |
| `src/components/AgentFeatures.tsx` | 2 h2 font fixes |
| `src/components/Footer.tsx` | CTA h2 font fix |
| `src/components/FeatureGrid.tsx` | Scroll animation removal, server component |
| `src/components/Testimonials.tsx` | Scroll animation removal, gap fix, server component |
| `DESIGN-TOKENS.md` | Fully populated with all decisions |
| `PLAN.md` | Created — execution plan |
| `CHANGELOG.md` | This file |

---

## Build Status

`npm run build` — ✓ passes with zero errors.

TypeScript: clean. Static pages: 2 (/, /_not-found).
