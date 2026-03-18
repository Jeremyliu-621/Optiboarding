# COMPARISON.md — Add a Comparison Section

## Where It Goes

Below the "Trusted by engineering teams at" logo wall. Above the current AgentFeatures sections.

## What It Communicates

Optibot is fundamentally different from other code review tools. The competitors (human reviewers, Claude Code, Cursor Bugbot) all miss the same thing: **cross-repo context**. They review files in isolation. Optibot understands the entire codebase.

Here's the actual content to convey — three comparisons:

### Human Review
- Shows a basic code review where the reviewer just says "LGTM" after skimming
- The human lacks context to see cross-repo dependencies
- Verdict: "Generic AI tools provide noise; humans lack the context to see cross-repo dependencies."

### Claude Code
- Shows Claude reviewing a file and flagging variable naming nits ("Variable name status is slightly ambiguous") and local syntax issues
- It finds a string-to-int type error but misses the upstream dependency break
- It generates a summary: "Changed to transaction_status for better readability. No architectural or cross-repo issues detected."
- Verdict: "Claude prioritizes variable naming and local syntax nits while missing the upstream dependency break that will crash your production build."

### Cursor Bugbot
- Shows Bugbot doing architectural linting: "ENFORCING ARCHITECTURAL LINTING: Subagent 'domain-model-enforcer' active. Analyzing file for primitive obsession and naming conventions."
- It runs automatic-code-review (19 tool uses, 18.0k tokens, 52s)
- It finds 3 violations related to domain modeling — things like "filePath is a bare string primitive representing a domain concept, should use a branded type"
- Verdict: "Bugbot focuses on file-level style and syntax but lacks the architectural context to catch breaking changes that span multiple repositories."

### Optibot (the winner)
- Shows Optibot reviewing a PR with full context
- It sees line numbers, understands the function signature change, and shows a "Suggested by Optibot" annotation on the exact lines
- The code shown: `applyDiscount = (user: User, price: number): number => {` with Optibot noting that `user.login` was renamed to `user.username` and flagging the downstream impact
- It imports `getDiscountTier` from `@org/shared-utils` — showing cross-repo awareness
- Verdict: "Optibot knows your business logic, catches breaking changes before they hit production, and understands every dependency across your entire codebase. **It's the review your most senior engineer would write. In 1-2 minutes.**"

## Creative Direction

**Do NOT** copy the layout from the screenshots I showed you (dark mode, side-by-side with VS and tabs). That's their current site. You're designing something better.

**Do NOT** use clickable tabs or buttons to switch between comparisons. No interactivity. The viewer should see the contrast without clicking anything.

**Do NOT** make it boring. Three equal cards in a row with text is boring. A table is boring. Think about what makes the comparison viscerally clear.

**DO** make it feel native to the rest of the site. Use the same container styles, typography, and spacing from DESIGN-TOKENS.md. Same light-mode aesthetic. Same subtle borders. Same font hierarchy.

**DO** make Optibot clearly win. The other tools should look limited. Optibot should look powerful. The visual design itself should communicate this — not just the words.

**DO** show actual code. The comparison is most convincing when you can see what each tool ACTUALLY outputs. Fake code blocks with realistic reviews are more persuasive than descriptions of what the tools do.

**DO** think about information hierarchy. The viewer should understand the key message ("Optibot catches what others miss") within 3 seconds of seeing this section. The details (specific examples) are there for people who want to read deeper.

Some layout ideas to consider (but you decide):
- A vertical stack where each competitor's review is shown briefly, then Optibot's review is shown in full — making it visually obvious that Optibot does more
- A two-column layout: "What they catch" (small, limited) vs "What Optibot catches" (large, comprehensive)
- A single mockup card showing the same PR, with annotations from different tools, where Optibot's annotation is the one that actually matters
- A "before/after" feel — the world without Optibot (shallow reviews) vs with Optibot (deep reviews)

Whatever layout you choose, the code examples should look realistic — use monospace font, proper syntax highlighting colours consistent with the rest of the site, realistic function names and file paths. Not pseudocode.

## Rules

- No animations, no interactivity, no tabs, no buttons
- Use existing site styling (check DESIGN-TOKENS.md for consistent values)
- Keep it light mode
- No external images
- The section should have a heading, but doesn't need to be "Comparisons" — pick something that sounds natural
- This section can be tall — it's a key selling point, give it room to breathe
