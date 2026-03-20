# MARATHON.md — All-Night Build Session

You're running all night. The human is asleep. Token budget is large. Use all of it. Do not stop early. When you think you're done, you're not — find more to improve.

---

## The Problem

The dashboard is **boring**. It works. The data is real. The layout is correct. But it has no life. No personality. No moments of delight. It looks like a developer built it (because one did). It needs to look like a product designer obsessed over it for weeks.

Compare your dashboard to ElevenLabs (use ELEVENLABS-STUDY.md). ElevenLabs' dashboard feels alive — there are colours in the feature cards, illustrations, personality in the copy, thoughtful empty states, smooth interactions, visual hierarchy that guides your eye. Yours feels like a grey spreadsheet.

---

## What To Build (in priority order)

### 1. Onboarding Flow

New users who sign in for the first time should experience an onboarding flow. Not a boring tutorial. A guided, visually rich experience that makes them feel welcomed and helps them set up.

Ideas (pick what works, invent more):
- **Welcome modal** on first dashboard visit: "Welcome to Optimal AI, [name]" with their GitHub avatar, a brief explanation of what they can do, and a "Let's get started" button
- **Setup checklist** that persists on the dashboard until completed: "Connect GitHub ✓ | Add your first repo | Configure Optibot | Invite a teammate" — a horizontal progress bar or card-based checklist
- **Tooltip highlights** on first visit: subtle callouts pointing to key features ("This is where you'll see Optibot's reviews" etc.) — NOT a full walkthrough modal, just gentle nudges
- **Empty state personality**: When sections have no data, don't just say "No data." Say something with character. "Optibot hasn't reviewed anything yet — connect a repo to get started." Add an illustration or icon that makes the empty state feel intentional, not broken.

Store onboarding state in localStorage (has the user completed onboarding? which steps are done?). Check on dashboard load.

### 2. Visual Life in Feature Cards

The 6 feature cards on the dashboard home page are grey boxes with tiny icons. Look at ElevenLabs' cards — they have **large, colourful illustrations** that fill most of the card, with the label below. Each card has a distinct visual identity.

Your cards need:
- **Colour**. Each card should have a unique, subtle accent colour — not a full background flood, but enough to distinguish them. Think: a soft gradient at the top of the card, or a tinted icon area, or a coloured border-top accent line.
- **Larger icons or illustrations**. The icon area should be the dominant visual, not a tiny 24px icon lost in space. Make them 48-64px, or create simple SVG illustrations that relate to each feature.
- **Hover states that feel good**. Slight lift, subtle shadow change, maybe the icon area gets slightly brighter. Use CSS transitions, not Framer Motion (no scroll animations rule).
- **Visual distinction**. If I squint at the page, I should be able to tell the 6 cards apart by colour/shape, not just by reading the labels.

### 3. Dashboard Home Page Polish

Study ElevenLabs' home page (screenshot provided). Note:
- The **announcement banner** at the top ("Introducing Flows >") — add something similar: "NEW Introducing Optibot v2 >" with a dismiss X
- The **workspace label** above the greeting: "[Org]'s Workspace" in small muted text above "Good morning, [Name]"
- The **time-aware greeting**: "Good morning" / "Good afternoon" / "Good evening" based on time of day
- The **two-column bottom section** has clear visual separation and purpose

Make sure the dashboard home page has this level of thoughtfulness.

### 4. Page-Level Polish (Every Dashboard Page)

Go through EVERY page in the dashboard and polish it:

**Integrations page**: 
- The tab content areas should feel distinct. GitHub (connected) should feel different from GitLab/Slack/Jira (not connected). Connected integrations should have a subtle "active" visual — maybe a green accent or a checkmark.
- Feature cards on each integration tab should have their own brand colours (GitHub: subtle dark, GitLab: subtle orange, Slack: subtle purple/green, Jira: subtle blue)
- The connected repos list should be visually richer — not just a flat list. Each row should have hover states, maybe a subtle icon for the repo.

**Configuration page**:
- Toggle switches should feel satisfying — smooth transition, clear on/off states
- The form/JSON toggle should look like real tabs, not plain text
- Add subtle section dividers between groups of settings

**Insights page**:
- The three stat cards should have personality — maybe each has a unique icon colour
- The empty "No Historical Data" state should have a real illustration, not just an icon
- Add a subtle pattern or visual to the chart area background

**Codebase Map**:
- If this is still a static grid, make the cards interactive — hover states, maybe click to expand with repo details
- Add visual connections between cards (CSS lines or SVG paths) even if they're static

**Organization Settings**:
- Forms should feel polished — proper focus states, validation states, smooth transitions
- Tab navigation should have a smooth active-state transition

**Optibot page**:
- The status card should feel alive — a subtle pulse or glow on the "Active" indicator
- Recent reviews should have visual status indicators (green for approved, yellow for changes requested, grey for comment)

### 5. Micro-interactions and Transitions

Add **page transitions** when navigating between dashboard pages. A simple fade or subtle slide. Use Framer Motion's `AnimatePresence` in the dashboard layout.

Add **hover states** to everything interactive. Every button, every card, every link, every list item should respond to hover with a visual change. Not dramatic — just enough to feel alive.

Add **focus states** to form elements that look intentional, not just browser defaults.

### 6. Typography and Spacing Audit

Go through the entire dashboard and check:
- Is the font hierarchy clear? Headings vs body vs labels vs captions — are there clear, consistent sizes?
- Is spacing consistent? Same padding in all cards, same gap between all list items, same margin between all sections?
- Is the colour hierarchy clear? Primary text vs secondary vs muted — are they used consistently?

Record everything in DESIGN-TOKENS.md.

### 7. Loading States

Every data-dependent section should have a **skeleton loading state** — not a spinner, not a blank space. Skeleton rectangles that pulse (Tailwind `animate-pulse`). They should match the shape of the final content.

### 8. Error States

Every API call should have a graceful error state. Not a crash. Not a blank page. A friendly message: "Something went wrong loading your repos. Try refreshing." with a retry button.

### 9. Responsive Polish

The dashboard should work on tablet widths (768px-1024px). The sidebar should collapse. The feature cards should reflow. Forms should stack. You don't need pixel-perfect mobile — but it shouldn't break.

### 10. Keep Going

When you've done all of the above, start over from the top and look for more. Compare against ElevenLabs again. Find gaps. Fix them.

Look at:
- Copy quality — is the text on every page clear, helpful, and written with personality?
- Visual consistency — do all pages feel like they're from the same product?
- Empty states — is every "no data" scenario handled gracefully?
- Edge cases — what happens with very long repo names? What about users with no repos? What about users with 100+ repos?

---

## Evaluator Agents

After every major change, pause and run these evaluations. Write the results in EVAL.md.

### The New User Agent
Pretend you are a developer who just signed up. You've never seen this dashboard before. Navigate through every page. For each page, answer:
- Do I immediately understand what this page does?
- Is there a clear action I should take?
- Does anything confuse me?
- Does anything look broken or unfinished?

### The Design Critic Agent  
Look at every page with the eye of a senior product designer at Stripe or Linear. For each page:
- Is the visual hierarchy clear? What draws my eye first, second, third?
- Is there enough visual variety, or does everything look the same?
- Are there any elements that feel "off" — wrong size, wrong spacing, wrong colour?
- Would I ship this? If not, what specifically needs to change?

### The ElevenLabs Comparison Agent
Open ElevenLabs' dashboard side by side with yours. For each equivalent page:
- What does ElevenLabs do that we don't?
- What visual techniques do they use that we're missing?
- Where do they add colour/personality that we haven't?
- What's their density level vs ours? (Do they pack more in, or use more whitespace?)

Write findings in EVAL.md. Then action on them.

---

## What NOT To Do

- No scroll-triggered entrance animations. Static content. The only animations are transitions, hovers, and the hero mockup on the landing page.
- No new colours outside the design system (CSS vars). You can use opacity variations and the accent colour at different opacities, but don't introduce new hues.
- No external images. SVG illustrations, Lucide icons, CSS shapes only.
- No heavy dependencies (no chart libraries beyond what's already there, no animation libraries beyond Framer Motion).
- Don't touch the landing page (`/`). Only the dashboard.
- Don't break existing functionality. Auth, GitHub data fetching, routing — all must keep working.

---

## The Mindset

You are not a developer finishing a task list. You are a product designer with unlimited time, obsessing over every detail of a product they care about. Every pixel matters. Every interaction should feel intentional. Every empty state should feel like someone thought about it.

When you look at a page and think "that's fine" — it's not fine. "Fine" is the enemy. Push past fine to "this feels really good."

Never stop. There is always more.
