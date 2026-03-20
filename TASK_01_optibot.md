# TASK 01 — Optibot Page (`/dashboard/optibot`)

## What This Page Is
The Optibot page is the primary agent interface. It's where a user would configure, trigger, and monitor the AI code review agent. This is the most product-critical page — it should feel like a serious, capable tool, not a settings form.

## Likely Current State
Probably a static overview page with some stats, a description of what Optibot does, and maybe a list of recent reviews. Possibly underdeveloped.

## What This Page Should Do
Think of it as a **control panel + activity log** for the agent. It should answer:
1. Is Optibot active / configured?
2. What has Optibot done recently?
3. What can I do with Optibot right now?

## Layout & Structure

### Section 1 — Agent Status Bar (top, full width)
A compact status row, not a banner. Shows:
- Agent status: `● Active` / `○ Paused` — small coloured dot + label
- Model version: `Optibot v2`
- Last run: `16 hours ago`
- Repositories monitored: `3`
A single horizontal bar, borderless, sitting flush with the top of the content area. Subtle label-value pairs separated by a thin vertical divider (`--border-subtle`).

### Section 2 — Two-column layout below the status bar
**Left column (~60%):** Recent Reviews feed
- List of PR reviews Optibot has performed
- Each item: PR number, repo name, commit title (truncated), timestamp, and a verdict chip (`Approved`, `Changes Requested`, `Security Flag`)
- Verdict chips: small, low-contrast backgrounds — not bright badges
- Clicking a row expands it inline to show the review summary (collapsed by default)
- Empty state: illustration-free — just a well-typeset message and a CTA button

**Right column (~40%):** Agent Configuration summary
- Shows current settings in a compact read-only format (review sensitivity, languages enabled, which repos Optibot is watching)
- A single "Edit Configuration" link that routes to `/dashboard/configuration`
- Below that: a "Run Manual Review" section — a minimal input field for a PR URL and a submit button. The button should be styled distinctly (filled, uses `--accent`) to signal this is the primary action on this page.

### Section 3 — Performance Snapshot (below the two columns, full width)
Three stat blocks in a horizontal row:
- Average review time
- Issues caught (last 30 days)
- PRs approved without changes

These should NOT be large feature cards. They should be compact data rows — label left, value right, maybe a small sparkline or trend arrow. Dense, not decorative.

## Interaction Details
- The "Run Manual Review" form should do client-side validation (is it a GitHub PR URL?) and show a loading state on submit. No backend needed — mock a 2-second delay and show a success state.
- The expanded PR review rows should animate open (height transition, not fade)
- Status dot should be a subtle CSS pulse animation (very slow, very subtle — not a spinner)

## What NOT to Do
- No hero section or marketing copy on this page
- No large empty illustration states
- No "How Optibot Works" explainer — that belongs on the landing page
- No tab navigation — this page has one job

## Evaluation Criteria
When done, check:
- [ ] Does the page feel like a professional agent control panel?
- [ ] Is the most important action (Run Manual Review) immediately visible?
- [ ] Does the Recent Reviews feed feel like real, information-dense data?
- [ ] Is the status bar subtle but informative?
- [ ] Does the page work at 1280px and 1440px width without breaking?

---
*After completing, proceed to TASK_02_repo_insights.md*
