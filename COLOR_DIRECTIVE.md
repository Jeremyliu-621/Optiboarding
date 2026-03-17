# COLOR DIRECTIVE — Dark Purple Rebrand

## Mission
Recolor the entire site from its current light/white theme to a dark, desaturated purple-black palette. The reference point is Cursor's website — warm, muted, expensive-feeling dark UI. We're translating that same system into purple tones.

**The #1 rule: LOW SATURATION.** Most AI/tech sites that use purple crank saturation to 40-60%+. That's what makes them look like AI slop. We stay under 20% saturation across the entire palette. The purple should feel like cigarette smoke in a dark room, not a Twitch stream.

---

## The Palette (HSL values — use these exactly)

### Backgrounds
| Token | HSL | Hex (approx) | Usage |
|---|---|---|---|
| `--bg-deep` | `hsl(275, 15%, 7%)` | `#19131f` | Page body / deepest background |
| `--bg-surface` | `hsl(275, 12%, 11%)` | `#221b29` | Cards, sections, raised containers |
| `--bg-elevated` | `hsl(275, 10%, 15%)` | `#2c2533` | Hover states on cards, secondary panels |

### Text
| Token | HSL | Hex (approx) | Usage |
|---|---|---|---|
| `--text-primary` | `hsl(275, 8%, 82%)` | `#d2ccd8` | Headings, primary body text |
| `--text-secondary` | `hsl(275, 6%, 55%)` | `#8e8694` | Subtext, descriptions, metadata |
| `--text-muted` | `hsl(275, 5%, 38%)` | `#625c66` | Timestamps, footnotes, disabled states |

### Accents
| Token | HSL | Hex (approx) | Usage |
|---|---|---|---|
| `--accent` | `hsl(275, 35%, 55%)` | `#9b5fbf` | Primary CTA buttons, links, active states |
| `--accent-hover` | `hsl(275, 38%, 62%)` | `#af76cc` | Button hover states |
| `--accent-muted` | `hsl(275, 15%, 25%)` | `#3f3049` | Subtle highlights, tag backgrounds, pill fills |

### Borders & Dividers
| Token | HSL | Hex (approx) | Usage |
|---|---|---|---|
| `--border-subtle` | `hsl(275, 8%, 18%)` | `#302a34` | Section dividers, horizontal rules |

---

## Rules

### DO NOT
- **Give cards visible border colors.** Cards should be distinguished by background color shift only (`--bg-surface` on `--bg-deep`). No `border: 1px solid anything`. This is the single biggest tell of AI-generated UI.
- Use any saturation above 25% except on `--accent` and `--accent-hover` (which cap at 38%).
- Use pure white (`#fff`) anywhere. The brightest element on the page should be `--text-primary` at 82% lightness.
- Use pure black (`#000`). The darkest should be `--bg-deep` at 7% lightness.
- Add glows, box-shadows with color, or gradient overlays on the purple. No `background: linear-gradient(purple, blue)`. Ever.
- Use opacity/transparency tricks to fake depth. Use actual distinct background colors.

### DO
- Distinguish sections through **lightness steps only**: body is 7%, cards are 11%, hover is 15%. That's the entire depth system.
- Keep all hues within 270-280°. Nothing outside that 10° band except the accent, which can sit at exactly 275°.
- Use `--accent` sparingly — only for CTAs, active nav items, and interactive highlights. If more than 10% of visible pixels are accent-colored, you've used too much.
- Let the embedded GitHub PR screenshot / browser mockup keep its own natural colors (light GitHub UI). It should contrast against the dark background — that contrast is intentional and looks good.
- Make the "Get Started" button use `--accent` as background with `--text-primary` as text color.
- Make stat callouts ("2x more", "50% faster") use `--text-primary` for the number and `--text-secondary` for the label, no special color treatment.

### Typography Color Rules
- H1/H2 → `--text-primary`
- Body/paragraphs → `--text-secondary`
- Labels, captions, metadata → `--text-muted`
- Links → `--accent` (no underline by default, underline on hover)
- Nav items → `--text-secondary`, active state → `--text-primary`

### Subtle Texture (optional but recommended)
Add a very faint noise texture to `--bg-deep` to prevent it from looking like a flat void. CSS approach:
```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
}
```

---

## How to Verify You Did It Right
1. Screenshot the page and squint. It should look like a single dark mass with subtle depth — not striped or segmented.
2. No element should "pop" except the accent CTA button and interactive links.
3. The embedded browser mockup (GitHub PR) should be the brightest region on the page — it's the product hero, it should draw the eye naturally.
4. If you removed all the text, the page should still look like one cohesive surface, not a patchwork of different-colored boxes.
