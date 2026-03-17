# HERO-MOCKUP.md — Build the Hero PR Animation

This is the single most important visual on the entire site. It must look **strikingly real** — like someone screen-recorded a GitHub PR page and embedded it. Not "inspired by GitHub." Not "GitHub-ish." Actual GitHub PR UI, pixel-accurate, with an animated story playing inside it.

You have Chrome DevTools MCP and Puppeteer MCP installed. **USE THEM.** Open a real GitHub pull request page in the browser, inspect every element, read every computed style, and replicate them exactly. Do not guess. Do not approximate. Inspect and copy.

---

## Step 0: Study the Real Thing

Before writing a single line of code:

1. Open Chrome DevTools MCP
2. Navigate to any public GitHub pull request (e.g., https://github.com/vercel/next.js/pulls — pick one that's merged)
3. Inspect these elements and record their **exact computed styles** in DESIGN-TOKENS.md:
   - The PR title (font-family, font-size, font-weight, color, line-height)
   - The branch badge / "Merged" badge (background-color, border-radius, font-size, padding)
   - The metadata line ("feature/auth-cleanup → main · by drmaeur · #924")
   - The timeline event items (avatar size, text size, spacing between events)
   - The comment cards (border, border-radius, background)
   - The comment header bar (background-color, padding, font-size)
   - The "bot" badge next to bot names
   - The diff blocks (red/green lines, font-family, font-size, padding, border-left width and color)
   - The "Pull request successfully merged and closed" banner
   - The vertical timeline line connecting events

Record ALL of these values. You will use them to build the mockup.

---

## The Animation Sequence

The mockup shows an animated story of Optibot reviewing a PR. It plays inside a browser-chrome card (title bar with dots). The content inside transitions through **5 beats**, then loops.

### Beat 1: PR Opens (2.5s)

Show a GitHub PR page in its "just opened" state:

```
┌──────────────────────────────────────────────────────┐
│  ● ● ●                                              │
├──────────────────────────────────────────────────────┤
│                                                      │
│  refactor: rename getUserById to fetchUser    [Open] │
│  feature/auth-cleanup → main · by drmaeur · #924    │
│                                                      │
│  ─── Timeline ───────────────────────────────────    │
│                                                      │
│  (avatar) drmaeur opened this pull request    2m ago │
│           3 files changed · +47 -12                  │
│                                                      │
│  ─── Files Changed ──────────────────────────────    │
│                                                      │
│  auth-service/src/users.ts                           │
│  ┌────────────────────────────────────────────┐      │
│  │ - export async function getUserById(id) {  │      │
│  │ + export async function fetchUser(id) {    │      │
│  └────────────────────────────────────────────┘      │
│                                                      │
└──────────────────────────────────────────────────────┘
```

Key elements:
- Green "Open" badge (GitHub's exact green: `#238636` bg, white text, rounded-full, `font-size: 12px`, `padding: 2px 8px`)
- PR title: `font-size: 20px`, `font-weight: 600`, color `#1f2328` (light mode)
- Branch/meta line: `font-size: 14px`, `font-family: monospace`, color `#656d76`
- Timeline has a **vertical line** on the left connecting events (2px wide, `#d1d9e0`)
- Each timeline event has a small avatar circle (20px), bold username, action text, and relative timestamp on the right
- The diff block uses GitHub's exact diff styling:
  - Red line: `bg-[#ffebe9]`, `border-left: 3px solid #ff8182`, text color `#82071e`
  - Green line: `bg-[#e6ffec]`, `border-left: 3px solid #4ac26b`, text color `#116329`
  - Font: monospace, `font-size: 12px`, `line-height: 20px`, `padding: 1px 10px`

### Beat 2: Optibot Starts Reviewing (2s)

A new timeline event appears (animates in from below with opacity + y transition):

```
│  (optibot avatar) agent-optibot started reviewing   1m ago │
│                   Analyzing 3 files...                      │
```

Then a status indicator appears under the PR title, something like:
```
│  ⏳ Review in progress — agent-optibot                      │
```

The Optibot avatar should be a small circle with "O" or the orange brand color (`#e46a3d`).

### Beat 3: Optibot Posts Review Comment (3s) — THE HERO MOMENT

This is the money shot. A full review comment card appears, animated:

```
│  ┌─────────────────────────────────────────────────────┐ │
│  │ (optibot) agent-optibot  [Bot]          1m ago      │ │
│  ├─────────────────────────────────────────────────────┤ │
│  │                                                     │ │
│  │  ⚠️ Breaking change detected                        │ │
│  │                                                     │ │
│  │  `getUserById` is called by 3 downstream services:  │ │
│  │                                                     │ │
│  │    billing-service/src/charges.ts:42                 │ │
│  │    notifications/src/alerts.ts:17                    │ │
│  │    admin-api/src/users.ts:8                          │ │
│  │                                                     │ │
│  │  These imports will break after this rename.         │ │
│  │  Suggest updating all callers or adding a            │ │
│  │  deprecation alias.                                  │ │
│  │                                                     │ │
│  └─────────────────────────────────────────────────────┘ │
```

The comment card must look EXACTLY like a real GitHub review comment:
- Header bar: slightly different background (`#f6f8fa`), bottom border, contains avatar + name + "Bot" badge + timestamp
- The "Bot" badge: `font-size: 12px`, `border: 1px solid #d1d9e0`, `border-radius: 2em`, `padding: 0 6px`, color `#656d76`
- Body: `padding: 16px`, `font-size: 14px`, `line-height: 1.5`, color `#1f2328`
- Code references in backticks: `font-family: monospace`, `font-size: 13px`, `background: rgba(175,184,193,0.2)`, `border-radius: 6px`, `padding: 0.2em 0.4em`
- The file paths should look like links (blue, `#0969da`)
- Overall card: `border: 1px solid #d1d9e0`, `border-radius: 6px`

The comment text can use a **typing/reveal effect** — text appearing line by line, or word by word, fast enough to not be boring (whole thing revealed in ~1.5-2 seconds). Or just fade in the entire comment card. Your call on which looks better.

### Beat 4: Developer Fixes, Optibot Approves (2s)

Two new timeline events appear in quick succession:

```
│  (avatar) drmaeur committed                    30s ago │
│           fix: update downstream imports                │
│                                                         │
│  (✓ green) agent-optibot approved              10s ago │
│            All issues resolved. Ready to merge.         │
```

The approval event should have a green checkmark icon. The commit event should have a small "C" commit icon.

### Beat 5: Merged (2s)

The PR status changes:
- The "Open" badge transitions to a "Merged" badge (purple: `#8250df` bg, white text)
- A final timeline event appears:

```
│  (purple merge icon) agent-optibot merged       just now │
│                      main ← feature/auth-cleanup         │
│                      6 commits                           │
```

Then a bottom banner appears:

```
│  ┌──────────────────────────────────────────────────┐    │
│  │ ✅ Pull request successfully merged and closed    │    │
│  └──────────────────────────────────────────────────┘    │
```

The merged banner should match GitHub's exact style — green/purple tinted background, checkmark icon, bold text.

### Loop

Hold for 2 seconds on the merged state. Then fade/dissolve back to Beat 1 and restart. The transition back should be a smooth fade (300-500ms), not a hard cut.

---

## Colour Adaptation

Your site is **light mode**. The mockup should use light-mode GitHub colours. From the screenshots, GitHub light mode uses:
- Page background: `#ffffff`
- Card borders: `#d1d9e0`
- Header bar background: `#f6f8fa`
- Text primary: `#1f2328`
- Text secondary: `#656d76`
- Link blue: `#0969da`
- Green (open/approve): `#1a7f37` text, `#238636` badge bg
- Purple (merged): `#8250df` text, `#8250df` badge bg
- Red (diff deletion): `#82071e` text, `#ffebe9` bg
- Green (diff addition): `#116329` text, `#e6ffec` bg
- Code background: `rgba(175,184,193,0.2)`

BUT — check these against the actual live GitHub page using DevTools MCP. Don't trust my hex values blindly. The live page is ground truth.

Also: the overall mockup card sits on your site's white background. Make sure the mockup card border is visible but subtle against white — GitHub uses `#d1d9e0` for card borders which should work.

---

## Technical Implementation

### Component Structure

```
HeroMockup/
├── HeroMockup.tsx          — Main component, manages animation state
├── PRHeader.tsx             — PR title, badge, branch info (static shell)
├── TimelineEvent.tsx        — Reusable timeline event (avatar, text, timestamp)
├── ReviewComment.tsx         — The Optibot review comment card
├── DiffBlock.tsx            — Code diff display
├── MergedBanner.tsx         — "Pull request successfully merged" banner
└── useAnimationSequence.ts  — Custom hook managing beat timing
```

Or put it all in one file if that's cleaner. Up to you. The point is: the internal pieces should be composable so you can arrange them into different beats.

### Animation Approach

```typescript
// Pseudo-code for the animation state machine
const BEATS = [
  { id: 'opened', duration: 2500 },
  { id: 'reviewing', duration: 2000 },
  { id: 'comment', duration: 3000 },
  { id: 'approved', duration: 2000 },
  { id: 'merged', duration: 2000 },
  { id: 'pause', duration: 2000 },  // hold on merged state
];

// Total cycle: ~13.5 seconds

const [beat, setBeat] = useState(0);

useEffect(() => {
  const timer = setTimeout(() => {
    setBeat((prev) => (prev + 1) % BEATS.length);
  }, BEATS[beat].duration);
  return () => clearTimeout(timer);
}, [beat]);
```

Use Framer Motion's `AnimatePresence` with `mode="wait"` for transitions between beats. Each beat is a different component/view that fades in.

### What NOT to Do

- No loading spinners or "AI is thinking" animations. Real GitHub doesn't have those.
- No floating icons or decorative elements outside the card. It's a browser window, not an illustration.
- No gradient backgrounds on the card. GitHub's background is flat white.
- No bouncy spring animations. GitHub's UI is crisp and instant. Use `ease-out` with short durations (200-300ms).
- No text that's too small to read. If the viewer can't read the code and comments at a glance, make them bigger.
- Don't make the card too short. It should be tall enough to show the full PR context without feeling cramped. Minimum 500px tall on desktop.

---

## The Realism Checklist

Before you consider the mockup done, answer these questions:

1. If you screenshot the mockup and paste it into a Slack channel, would someone think it's a real GitHub page? If no, fix it.
2. Are the font sizes, families, and weights matching real GitHub? Inspect a real PR page and compare.
3. Are the badge styles (Open/Merged/Bot) matching real GitHub? Compare exact border-radius, padding, colours.
4. Are the diff blocks matching real GitHub? Compare exact line styling, background colours, border-left.
5. Do the timeline events have the correct vertical connecting line? GitHub uses a 2px line connecting event avatars.
6. Is the comment card's header bar the right shade of gray? Is the border the right colour?
7. Does the animation feel smooth and professional, or does it feel like a demo? Adjust timing until it feels polished.
8. At the merged state, does the purple badge and banner look like real GitHub? Compare.

If ANY of these fail, iterate. Use DevTools MCP to inspect the real GitHub page side-by-side with your mockup.
