# TASK 03 — Integrations (`/dashboard/integrations`)

## What This Page Is
Connection management for GitHub, GitLab, Slack, and Jira. Users connect these services to Optibot so it can pull PRs, post review comments, and file issues.

## Likely Current State
A tabbed layout with one tab per integration. Possibly just a "Connect" button on each tab, maybe a connection status indicator. Functional but likely underdeveloped.

## Design Philosophy
This page is a configuration surface — it should feel precise and trustworthy, not marketing-y. Think: Vercel's integrations panel or Linear's settings. Dense, informative, clear status communication.

## Layout & Structure

### Top Section — Connected Status Summary
Before the tabs, a compact summary row showing how many integrations are currently active. E.g.: `3 of 4 integrations connected`. Small label, no card, no hero treatment.

### Tab Structure
Keep the existing tab structure but make the tabs feel like the design system:
- Tabs sit on a borderless bar, active tab has a bottom border line in `--accent` (not a filled pill)
- Tab labels are just the service names: GitHub, GitLab, Slack, Jira

### Each Integration Tab — Anatomy
Every tab should follow the same layout pattern, adapted to the service:

**1. Connection Status Section**
- Left: service logo (use inline SVG or a Lucide equivalent — no external images) + service name + connection status
- Status: `● Connected as @jeremyliu` or `○ Not connected`
- Right: primary action button — "Disconnect" if connected (destructive, use a muted red-tinted style), "Connect with [Service]" if not (filled `--accent`)
- A `Last synced: 2 hours ago` timestamp below the status (if connected)

**2. Configuration Options (only shown if connected)**
These should be actual interactive settings, not read-only text. Use toggle switches and dropdowns:

**GitHub tab:**
- Which repositories Optibot monitors (multi-select list of repos — show the user's real repos if available via GitHub OAuth, otherwise mock 3–4 plausible ones)
- Auto-review on PR open: toggle
- Post review as: `Review Comments` / `PR Comment` — radio/segmented control
- Minimum PR size to trigger review: dropdown (Any, 50+ lines, 100+ lines, 200+ lines)

**GitLab tab:**
- GitLab instance URL: text input (for self-hosted)
- Same repo selection + auto-review toggle as GitHub

**Slack tab:**
- Channel to post notifications to: text input prefixed with `#`
- Notification triggers: checkboxes for "Review complete", "Security flag found", "PR approved by Optibot"
- Notification format: Verbose / Compact — segmented control

**Jira tab:**
- Project key: text input
- Auto-create Jira issue on security flag: toggle
- Issue priority mapping: a small table showing Optibot severity → Jira priority (editable via dropdowns per row)

**3. Save Button**
Each tab ends with a "Save Changes" button (not globally sticky — scoped to each tab). It should be disabled if nothing has changed (grey, no pointer). Enabled when the user edits something.

## Interaction Details
- Toggles should visually toggle (use a proper CSS toggle component, not a checkbox)
- "Connect with GitHub" should open a simulated OAuth flow — a modal or a toast saying "Redirecting to GitHub..." then simulating success after 1.5s
- "Disconnect" should show a confirmation dialog (inline, not a browser alert) before clearing
- Save button should show a brief "Saved ✓" confirmation state after click

## What NOT to Do
- Don't make the connection status a big coloured banner taking up 30% of the page
- Don't show all four integrations simultaneously — the tab structure exists for a reason
- Don't use a table for the configuration options — use form controls

## Evaluation Criteria
When done, check:
- [ ] Does each tab show the correct connected/disconnected state?
- [ ] Are all form controls interactive (toggles toggle, dropdowns open, inputs accept text)?
- [ ] Does the Save button enable/disable correctly based on change state?
- [ ] Does the Disconnect confirmation work without a browser alert()?
- [ ] Does the overall page feel like a professional settings interface?

---
*After completing, proceed to TASK_04_codebase_map.md*
