# CLAUDE.md

## Project

Optimal AI marketing site. Next.js + Tailwind + Framer Motion. The site has real content and decent layout. The hero mockup (the fake GitHub PR card) is currently terrible and needs to be rebuilt from scratch.

## Commands

- `npm run dev` — dev server on localhost:3000
- `npm run build` — must pass before you stop

## Your Tools

You have **Chrome DevTools MCP** and **Puppeteer MCP** installed. USE THEM AGGRESSIVELY.

- Open real GitHub PR pages and inspect every computed style
- Open localhost:3000 and inspect your own output
- Compare the two side by side
- Screenshot both and visually compare
- Read computed font-size, padding, margin, border, color, background, border-radius from real GitHub elements

Do not guess CSS values. Do not approximate. Inspect the real thing and copy.

## Tonight's Job

One deliverable: **Rebuild the hero mockup from scratch** to be a strikingly realistic, animated GitHub PR review sequence showing how Optibot works.

Read HERO-MOCKUP.md for the full spec. It has:
- The exact 5-beat animation sequence
- GitHub's actual CSS values for every element (verify these yourself using DevTools)
- The technical approach (state machine + Framer Motion)
- A realism checklist

## Working Method

1. Read HERO-MOCKUP.md completely.
2. Open a real GitHub PR page using DevTools MCP. Inspect every element listed in the spec. Record exact computed styles in DESIGN-TOKENS.md.
3. Build the mockup. Use the real GitHub values, not approximations.
4. Run the animation. Watch it loop 3-4 times. Does it look real? Does it tell the story? Is the timing right?
5. Screenshot a real GitHub PR page and your mockup side by side. Compare. Fix differences.
6. Run the realism checklist from HERO-MOCKUP.md. Fix anything that fails.
7. `npm run build` — must pass.
8. Write CHANGELOG.md documenting what you built.

## Rules

- You have FULL permission to do ANYTHING. Restructure files, create new components, delete old code, whatever.
- The ONLY animation on the site is the hero mockup. No scroll animations anywhere else. Strip any remaining whileInView or entrance animations from other components if they exist.
- Light mode only. The mockup should use GitHub's light mode colours.
- No external images. Everything is CSS/SVG/text.
- Don't break mobile layout — but perfect mobile is not required tonight.
- When in doubt, make it look more like real GitHub and less like a demo.
