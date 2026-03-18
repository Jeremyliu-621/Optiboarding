# OVERNIGHT.md

You're running overnight. The human is asleep. When they wake up, two things must be perfect. Everything else is at your discretion.

---

## Deliverable 1: UI Doctor Pass

The site has inconsistencies. You are a senior product designer doing a QA pass. Fix everything.

### What's wrong (the human told you):  

**Font inconsistency.** The hero heading ("Code review that understands your entire codebase") uses a different visual style than other headings on the page. The human wants the hero heading font/weight to be the reference — all other headings should feel like they belong to the same family. The hero heading should also be **smaller** than it currently is. Look at cursor.com/home for reference on how large hero text should be relative to the page.

**Top-of-page compression.** The distance between elements at the top of the page (navbar → hero heading → button → mockup) is too spread out. On cursor.com/home, these elements are compressed — the heading, subtext, and CTA are tightly grouped, and the mockup starts sooner. Match that density. Fetch cursor.com/home and study the actual spacing.

**Spacing consistency throughout.** Some distances between elements should be consistent across the page. For example:
- The gap between the two AgentFeatures containers should match the gap between testimonial cards
- Section padding should follow a consistent rhythm
- Margins between heading → description → link should be the same in every feature section

You decide what the right consistent values are. Just make sure when two things are structurally equivalent (two feature containers, two cards, two text blocks), they use the same spacing.

### What else to look for:

Go through the entire page element by element. For each one, ask:
- Is the font size appropriate relative to its container and siblings?
- Is the spacing consistent with structurally similar elements elsewhere?
- Does the visual weight feel balanced?
- Would a senior designer at a top startup ship this, or would they tweak it?

Fix everything you find. You don't need permission.

### Reference: cursor.com/home

Fetch the live site. Study:
- How compressed the hero area is (navbar to heading to button to mockup)
- How section headings relate in size to their descriptions
- The rhythm of vertical spacing between sections
- How much breathing room exists inside cards vs between cards

Don't copy Cursor's design — we're not cloning it anymore. But use it as a benchmark for **quality**. Their spacing is intentional and consistent. Ours should be too.

---

## Deliverable 2: The Hero Mockup Animation

The hero mockup (the fake PR review card) needs to become a **strikingly realistic, animated demonstration** of how Optibot actually works. This is the centerpiece of the entire page. It's the first thing visitors see. It needs to make them think "oh shit, I want that."

### What it should show:

An animated timeline/sequence of a real Optibot code review flow. Think of it as a miniature movie playing inside the mockup card. Here's the actual flow Optibot performs:

1. A developer pushes a PR (e.g., "refactor: rename getUserById to fetchUser")
2. Optibot picks it up and starts reviewing
3. Optibot scans the diff, reads cross-repo dependencies
4. Optibot finds a breaking change — 3 downstream services import the renamed function
5. Optibot posts a review comment explaining the issue
6. Optibot flags a security concern (e.g., missing httpOnly on a session cookie)
7. Optibot posts a summary: what changed, risk level, files affected
8. The developer fixes the issue
9. Optibot approves and the PR is merged

You don't need to show ALL of these. Pick the most compelling 3-5 beats and animate between them. The animation should:

- **Feel real.** It should look like an actual GitHub PR review, not a cartoon illustration. Use realistic PR UI patterns — diff blocks, review comments, status badges, file trees, inline code.
- **Tell a story.** Each beat should flow into the next. The viewer should understand what Optibot does just by watching, without reading any other text on the page.
- **Be smooth.** Use Framer Motion. Transitions between beats should be subtle — fades, slides, or content appearing as if typed. Not flashy. Not bouncy. Just smooth.
- **Loop.** After the sequence completes, it should loop back to the start seamlessly.
- **Not look AI-generated.** No gradient cards. No floating orbs. No generic "AI is reviewing..." loading spinners. Make it look like a senior frontend engineer at GitHub built it.

### Reference for realism:

I've attached a screenshot (the dark-themed one with the timeline of events — "drmaeur contributed", "agent-optibot reviewed", "drmaeur committed", "agent-optibot approved and merged"). That's from the actual Optimal AI site. STUDY IT. That's the visual language — dark card backgrounds, GitHub-style event timeline, real usernames, real PR numbers, real commit hashes. Your animation should feel like that, but animated and interactive, inside the hero mockup card.

The current hero mockup already has good bones — a PR header, a diff block, and an Optibot review comment. Evolve it into the animated sequence. Keep the same card chrome (title bar with dots) but make the content inside come alive.

### Technical approach:

- Use Framer Motion's `AnimatePresence`, `motion.div`, and variants for the sequence
- Consider a state machine approach: define beats/stages, cycle through them on a timer
- Each beat can be a different "view" inside the mockup card — a diff view, a review comment view, a summary view, a merged view
- Use `opacity`, `y`, and `height` transitions — avoid transform scale (it looks cheap)
- Typing effects for review comments can be powerful but only if they're fast enough to not bore the viewer. 2-3 seconds per beat maximum.
- The loop delay should be ~1-2 seconds of pause before restarting

---

## Your Creative Authority

You have **unlimited creative authority** tonight. Some things you might choose to do:

- Rewrite components from scratch if they're messy
- Create new sub-components for better organization
- Add entirely new page sections if they serve the story
- Remove sections that don't carry their weight
- Change the page structure/order
- Create utility files, animation configs, shared constants
- Write yourself planning documents (PLAN.md, EVALUATION.md, etc.)

The only constraints:
- **No scroll-triggered animations.** No whileInView, no entrance animations, no elements fading/sliding in as you scroll. Remove any existing ones. The only animation on the entire site should be the hero mockup sequence. Everything else is static and visible immediately.
- Don't add heavy dependencies (Three.js, etc.). Framer Motion is only for the hero mockup animation.
- Don't add external images or fonts beyond what's already configured.
- `npm run build` must pass when you're done.
- Don't break mobile — things should at least not overflow. Perfect mobile isn't required tonight.

---

## Self-Evaluation Protocol

Before you consider yourself done, run this evaluation:

### Pass 1: The Squint Test
Squint at the page. Does the visual rhythm feel consistent? Are there any elements that jump out as too big, too small, too spaced, or too cramped? Fix them.

### Pass 2: The Consistency Audit
Go through every heading on the page. Are they all the same font family, weight, and relative scale? Go through every description. Same check. Go through every gap/margin between structurally similar elements. Are they the same?

### Pass 3: The Mockup Realism Check
Look at the hero animation. Does it look like it could be a real GitHub page? Or does it look like a dev demo? If you showed this to an engineering manager, would they immediately understand what Optibot does?

### Pass 4: The cursor.com Comparison
Fetch cursor.com/home one more time. Compare the overall spacing density, typography hierarchy, and polish level. Is yours at the same tier? Not the same design — the same *quality*.

### Pass 5: The AI-Slop Detector
Scan for these tells:
- Three equal-width cards with icon + heading + description? Fix or justify.
- Centered section headings with no variation? Add asymmetry somewhere.
- Generic verbs ("Accelerate", "Streamline", "Transform")? Replace with specifics.
- Decorative icons/emoji used as visual filler? Remove.
- Anything that looks like a template? Make it specific to Optimal AI.

### Pass 6: Build Verification
```
npm run build
```
Must pass. Zero errors.

---

## When You're Done

Write a CHANGELOG.md documenting every significant change you made, organized by deliverable. This helps the human understand what happened overnight.

Then stop. Don't over-iterate into diminishing returns. Two deliverables, both perfect, is better than ten deliverables at 80%.
