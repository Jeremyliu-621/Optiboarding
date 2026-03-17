# PRINCIPLES.md — Design Principles (The "Why")

When making judgment calls not covered by the specific rules, follow these principles. They explain WHY Cursor's site looks better.

---

## 1. The Mockup Is the Hero, Not the Text

In every feature section, the IDE mockup card is the main attraction. The text (heading, description, link) is a small annotation on the side. Think of it like a museum label next to a painting — the label is small and positioned off to the side; the painting dominates.

**Ratio**: Text should be ~30-35% of the section width. Mockup ~65-70%.

If you're unsure about sizing, make the mockup bigger and the text smaller.

---

## 2. Containers Should Be Felt, Not Seen

The section containers exist to group content, not to be visually prominent. They should be **barely distinguishable** from the page background — a whisper of a different shade, not a visible card.

Think of it like this: if you squint, you should barely see the container boundaries. The content should stand on its own.

**Test**: If someone asks "is that in a card?", the answer should be "I think so? barely." If the answer is "obviously yes", the container is too prominent.

---

## 3. Smaller Text, Bigger Containers

The most common AI-coding mistake is making text too large relative to its container. Cursor's section headings are ~26-28px inside containers that are ~650px tall. That's a ratio of about 1:24.

If your heading is 36px in a 500px container, the ratio is 1:14 — the text feels cramped and dominant.

**Rule of thumb**: If the text feels like it's "filling up" the container, either shrink the text or grow the container (or both).

---

## 4. Tight Border Radius = Professional, Large Border Radius = Playful

- `rounded-[32px]` = playful, toy-like, consumer app (Notion, Arc)
- `rounded-[16px]` = clean, modern, professional (Cursor's section containers)
- `rounded-[12px]` = refined, tool-like (Cursor's mockup cards)
- `rounded-[8px]` = sharp, enterprise (code blocks, small UI elements)

Your current site uses `32px` everywhere. Cursor uses `12-16px`. This single change will shift the feel from "fun app" to "serious tool".

---

## 5. Asymmetric Anchoring, Not Centered Floating

Cursor's mockup cards are NOT centered in their containers with equal padding on all sides. They're pushed toward an edge — usually the bottom-right or bottom-left. This makes them feel like they're peeking out of a window, which creates depth and dynamism.

Centered-with-equal-margins looks like a PowerPoint slide. Edge-anchored looks like a product screenshot.

---

## 6. Internal Mockup Content Must Be Small

The text inside IDE mockups (code, sidebar labels, status bars) should be ~12-13px — significantly smaller than the page body text (15-16px). This makes the mockup feel like a real IDE window, not a blown-up illustration.

If the mockup text is the same size as the page text, the mockup loses its "window" illusion and just looks like styled content.

---

## 7. Whitespace Comes from Container Padding, Not from Gaps

The space between sections comes from each section container having tall internal padding (80px+ vertical), not from large gaps between containers. The containers themselves should be close together (24-32px gap).

This creates a rhythm where the content inside each section has lots of breathing room, but the sections themselves stack tightly, giving the page a sense of density and substance.

---

## 8. Borders Should Be Nearly Invisible

Borders serve a structural role (separating areas) not a decorative one. They should be the **minimum opacity** needed to perceive the separation.

- `border-[#ebebeb]` on white = too visible
- `border-black/[0.04]` on white = just right
- `border-white/[0.06]` on dark = just right

If you can clearly see the border from across the room, it's too strong.

---

## 9. One Level of Visual Hierarchy at a Time

Each section should have exactly ONE thing that draws attention: the mockup. Everything else (heading, description, link, container border) should be subordinate.

Don't add visual weight to the text (no extra-bold, no extra-large, no decorative elements). Don't add visual weight to the container (no visible bg, no strong border). Let the mockup card — with its realistic UI chrome — carry all the visual interest.
