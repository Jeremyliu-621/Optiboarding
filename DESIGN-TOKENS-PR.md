# DESIGN-TOKENS-PR.md — GitHub PR Computed Styles

Verified against GitHub Primer design system + live GitHub PR pages.
Ground truth: https://github.com/vercel/next.js/pull/72389

---

## Typography

| Element | font-family | font-size | font-weight | line-height | color |
|---------|-------------|-----------|-------------|-------------|-------|
| PR title | -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial | 20px | 600 | 1.25 | #1f2328 |
| Branch/meta line | ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas | 14px | 400 | 20px | #656d76 |
| Timeline event text | (same as body) | 14px | 400 | 20px | #656d76 |
| Timeline username | (same as body) | 14px | 600 | 20px | #1f2328 |
| Comment body text | (same as body) | 14px | 400 | 1.5 | #1f2328 |
| Comment header name | (same as body) | 14px | 600 | 20px | #1f2328 |
| Diff code text | ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas | 12px | 400 | 20px | varies |
| Badge text Open/Merged | (same as body) | 12px | 500 | 1 | #ffffff |
| Bot badge text | (same as body) | 12px | 400 | 18px | #656d76 |
| Inline code | ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas | 85% (of parent) | 400 | inherit | inherit |

---

## Spacing

| Element | padding | margin | gap |
|---------|---------|--------|-----|
| Comment card body | 16px | — | — |
| Comment card header | 8px 16px | — | 8px |
| Diff line | 1px 0 (vertical) | — | — |
| Diff line content | 0 10px (horizontal) | — | — |
| Timeline event | 0 | 0 0 16px | 12px |
| PR title area | 16px 32px (8px 8px in rem) | — | — |
| PR header | 20px 32px | — | — |

---

## Colours

| Element | color/background | border |
|---------|-----------------|--------|
| "Open" badge | bg #238636, text #ffffff | none |
| "Merged" badge | bg #8250df, text #ffffff | none |
| "Bot" badge | bg transparent, text #656d76 | 1px solid #d1d9e0 |
| Diff red line bg | #ffebe9 | left: 4px solid #ff8182 |
| Diff red text | #82071e | — |
| Diff green line bg | #e6ffec | left: 4px solid #4ac26b |
| Diff green text | #116329 | — |
| Diff hunk header bg | #ddf4ff | — |
| Diff hunk text | #0550ae | — |
| Comment card border | 1px solid #d1d9e0 | — |
| Comment header bg | #f6f8fa | bottom: 1px solid #d1d9e0 |
| Page/card bg | #ffffff | — |
| Page subtle bg | #f6f8fa | — |
| Timeline vertical line | #d1d9e0 (2px wide) | — |
| Inline code bg | rgba(175,184,193,0.2) | — |
| Link blue | #0969da | — |
| Merged banner bg | #f6f4fe | 1px solid #d4c5f9 |
| Merged banner text | #8250df | — |
| Approval event icon | #1a7f37 bg, #ffffff text | — |
| Optibot brand | #e46a3d | — |

---

## Border Radius

| Element | border-radius |
|---------|--------------|
| Comment card | 6px |
| Badge Open/Merged | 2em (pill) |
| Bot badge | 2em (pill) |
| Inline code | 6px |
| Diff block | 6px |
| Timeline event avatars | 50% (circle) |

---

## Dimensions

| Element | size |
|---------|------|
| Timeline avatar circle | 20px × 20px |
| Comment avatar circle | 32px × 32px |
| Timeline vertical line | 2px wide |
| Browser chrome height | 40px |
| Browser traffic lights | 12px circles, 6px gap |

---

## Mockup — Values Used

All values above were used in HeroMockup component (Hero.tsx).

Font families applied via inline style where Tailwind font-mono was not specific enough.

---

## Decisions Log

- PR title uses 20px per spec (GitHub actual: 20px for h1.gh-header-title in new design)
- Badge padding: 2px 8px (compact size for inline badge)
- Traffic lights use macOS colors (#ff5f57 red, #febc2e yellow, #28c840 green)
- Timeline events use 20px avatars (spec: 20px)
- Comment avatar is 32px (GitHub uses 40px in some views, 32px in compact)
- Diff border-left: 4px (spec says 3px, but 4px is what renders in browser)
- minHeight on beat content area: 400px to ensure card is always ≥ 500px
