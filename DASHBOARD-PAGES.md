# DASHBOARD-PAGES.md — Migrate Old Dashboard Content Into New Dashboard

## Context

The old Optimal AI dashboard (screenshots provided) has ~10 sidebar pages with scattered content. The new dashboard (last screenshot) already has a working sidebar, auth, GitHub data, and an ElevenLabs-inspired home page. 

The job: take the content from the old dashboard and reorganize it into the new dashboard's cleaner structure. Consolidate where it makes sense. Every page should have good UI/UX — not a 1:1 copy of the old dashboard, but a thoughtful redesign using the same information.

Use the existing design system (CSS vars from globals.css, the dark purple palette). No new dependencies unless truly necessary. Every page uses the shared dashboard layout (sidebar + header).

---

## New Sidebar Structure

The new sidebar should have these items (replace whatever's currently there):

```
Dashboard          ← Home page (already built)
Optibot            ← AI agent overview + recent reviews  
Repo Insights      ← Analytics / repository statistics
Integrations       ← GitHub, GitLab, Slack, Jira (ALL in one page with tabs)
Documentation      ← External link to docs.getoptimal.ai
Configuration      ← Repo config + repository guidelines (merged)
Codebase Map       ← Visual repo relationship map
Organization       ← Org settings, members, billing, plans
```

User profile (avatar + name + @username) stays at the bottom of the sidebar, exactly as the old dashboard has it.

---

## Page-by-Page Spec

### 1. `/dashboard` — Home (ALREADY BUILT, minor tweaks)

Keep what's there. Just make sure the sidebar nav items match the new structure above. The feature cards (Review a PR, View Insights, Security Scan, Browse Repos, Team Activity, Release Notes) can stay — they're good quick-action entry points.

**Tweak**: The "Recent Activity" section should pull real GitHub events (PR opens, merges, reviews) — it already does this. Keep it.

---

### 2. `/dashboard/optibot` — Optibot Agent

This is the "Optibot" page from the old sidebar. It should show:

- **Header**: "Optibot" breadcrumb, subtitle: "AI-powered code review agent with full codebase context."
- **Status card**: Show whether Optibot is active/connected. A simple card with a green dot + "Active" or a setup prompt if not configured.
- **Recent Reviews**: A list of Optibot's recent review comments pulled from GitHub. For each:
  - PR title + number
  - Repository name
  - Review status (approved / changes requested / commented)
  - Timestamp
  - Truncated review summary (first ~100 chars of the comment)
- **Stats row**: 3 metric cards in a row:
  - "PRs Reviewed" (count)
  - "Avg Review Time" 
  - "Issues Caught"
  
  These can be placeholder/static numbers for now — we don't have a backend for Optibot stats yet. Use realistic placeholder data.

**Data source**: GitHub API — fetch recent PR review events where the reviewer is the bot account, or just fetch the user's recent PRs and show them. Use what's available.

---

### 3. `/dashboard/insights` — Repo Insights / Analytics

This maps to the old "Repo Insights" → "Repository Statistics" page (screenshot 1).

- **Header**: "Analytics > Repository Statistics" breadcrumb
- **Repo selector**: Dropdown to pick a repo from the user's connected repos (fetched from GitHub API). Show `username/repo-name` format.
- **Date picker**: A simple date range selector (can be a placeholder/static for now — just show the UI element).
- **Three stat cards in a row** (matching old dashboard layout):
  1. "Before Optibot" — Pull Requests count, Avg Cycle Time
  2. "With Optibot" — Pull Requests count, Avg Cycle Time, "Active" badge
  3. "Overall Improvement" — Total Cycle Time change, Improvement percentage
  
  These will show "No data" / "Insufficient data" for repos without Optibot history — that's fine, match the old dashboard's empty state.
- **Chart area below**: A large card with "No Historical Data" empty state (matching old dashboard), or a placeholder chart area. Use the same empty state pattern: centered icon, bold heading, descriptive subtitle.

**Design note**: The three stat cards in the old dashboard have a subtle purple-tinted border/glow. In the new design, use `var(--bg-surface)` background with the accent color for the card icon circles. No visible borders — background shift only per COLOR_DIRECTIVE.md.

---

### 4. `/dashboard/integrations` — All Integrations (CONSOLIDATED)

This is the big consolidation. The old dashboard had 4 separate pages: GitHub, GitLab, Slack, Jira. The new dashboard puts them ALL on one page with **tabs or sections**.

- **Header**: "Integrations" breadcrumb, subtitle: "Connect and manage your accounts to enable automated code reviews."
- **Tab bar or section navigation**: `GitHub | GitLab | Slack | Jira` — horizontal tabs at the top of the content area. Clicking a tab shows that integration's content below. Use the same tab styling as the old dashboard (active tab has accent underline).

#### GitHub tab (from screenshot 2):
- **Connection status card**: Show org name (from GitHub API), repo count, "Connected" badge with green dot. Or "Not connected" with a "Connect GitHub" button.
- **Two action cards**: "Repositories — View stats →" and "Manage — Open GitHub →" side by side.
- **Connected Repositories list**: Table/list of repos from GitHub API. Each row: repo icon, `owner/repo-name`, branch name (`main`), "Active" status badge. Use real data from the user's GitHub repos.

#### GitLab tab (from screenshot 3):
- **Connect GitLab card**: Form with fields:
  - GitLab Host (default: `https://gitlab.com`)
  - GitLab Token (password input)
  - GitLab Bot / User ID (text input)
  - "Connect GitLab" button (purple accent)
- **"Why Teams Use Optibot" feature cards** below the form (3-column grid):
  - "Every MR reviewed. Every time." — description
  - "Security & compliance." — description  
  - "CI breaks? Optibot fixes it." — description

  These are static informational cards. Match the old dashboard's card styling.

#### Slack tab (from screenshot 4):
- **Connect Slack card**: "Connect Slack" with description + "Connect workspace →" button
- **"What You Get With Slack"** — 2x2 grid of feature cards:
  - "PR review notifications" + description
  - "Review summaries" + description
  - "Slash command support" + description
  - "Customizable channels" + description

  Each card has a checkmark icon in accent color.

#### Jira tab (from screenshot 5):
- **"What You'll Get"** — 2x3 grid of feature cards:
  - "Automatic issue detection." + description
  - "AI alignment checks." + description
  - "Issue context in reviews." + description
  - "Browse accessible projects." + description
  - "Cloud & self-hosted." + description
  - "ADF description support." + description
- **Connect Jira form** below:
  - Jira Domain (`yourcompany.atlassian.net`)
  - Service Account Email
  - API Token
  - "Connect Jira" button

---

### 5. `/dashboard/configuration` — Configuration (CONSOLIDATED)

Merges the old "Configuration" (screenshot 6) and "Repository Guidelines" (screenshot 8) pages.

- **Header**: "Configuration" breadcrumb, subtitle: "Customize Optibot's behavior per repository."
- **Repo selector**: Dropdown in top-right corner (same as old dashboard): `username/repo-name`
- **Tab bar**: `Settings | Guidelines` (two tabs within this page)

#### Settings tab (from screenshot 6):
- **Form/JSON toggle**: "Form | JSON" tabs (just show Form view)
- **Reviews section** (collapsible, default open):
  - Toggle rows, each with label + description + toggle switch:
    - "Auto review*" — "Automatically review every PR on open." (ON by default)
    - "Auto review on draft" — "Include draft PRs in automatic reviews." (OFF)
    - "Auto review on push*" — "Trigger a new review whenever commits are pushed." (OFF)
    - "Auto review after workflow*" — "Trigger a review only after a CI workflow completes." (OFF)
    - "Allow approve" — "Approves PRs that pass all checks." (OFF)
    - "Code suggestions" — "Allows the agent to generate inline code suggestions during reviews when needed." (ON)
  
  Use proper toggle switch components. Active toggles use `var(--accent)` color.

#### Guidelines tab (from screenshot 8):
- **Empty state** (if no guidelines exist):
  - Centered icon, "No Guidelines Found" heading
  - "This repository doesn't have any review guidelines yet. You can generate them automatically using AI or write your own."
  - Two buttons: "Generate with AI" (accent) + "Write Manually" (outline)
- **Collapsible section below**: "About Repository Guidelines & Best Practices" (expandable text area)
- If guidelines exist: show them in an editable text area / markdown editor.

---

### 6. `/dashboard/codebase-map` — Codebase Map

From screenshot 7. This is the most visually complex page — a node-graph visualization of repository relationships.

- **Header**: "Configuration > Codebase Map" breadcrumb, subtitle: "Create a visual representation of your organization's repository connections."
- **"Save Map" button** in top-right corner (accent color)
- **Main content**: A large canvas area showing repository nodes in a grid layout.
  - Each node is a card with the repo name
  - Nodes have connection handles (small circles on edges) for dragging relationships
  - Nodes can be dragged/repositioned

**Implementation**: This is complex. For the initial build, create a **static visual representation** — show the user's repos as cards in a grid layout (fetched from GitHub API). Don't implement the full drag-and-drop graph editor. Just show the repos as positioned cards with placeholder connection dots. Add a "Tips" bar at the bottom explaining the feature.

If you want to go further, use a library like `reactflow` (it's lightweight). But a static grid of repo cards is fine as v1.

---

### 7. `/dashboard/organization` — Organization Settings

From screenshot 9. This page has **tabs**: General | Members & Access | Billing | Plans

- **Header**: "Organization > Organization Settings" breadcrumb, subtitle: "Manage your organization, members, and billing."
- **Tab bar**: `General | Members & Access | Billing | Plans`

#### General tab (from screenshot 9):
- **"Organization Details" section**:
  - Organization Name (read-only input, value from GitHub org)
  - Helper text: "Organization name is set by your GitHub or GitLab account and cannot be changed here."
  - Display Name (editable input)
  - Helper text: "A friendly name shown across the Optibot interface."
  - Description (textarea)
  - "Save Changes" button (accent color)

#### Members & Access tab:
- Placeholder: list of org members (can be fetched from GitHub API `/orgs/{org}/members` if the user belongs to an org, otherwise show "No organization found — connect a GitHub organization to manage members.")

#### Billing tab:
- Placeholder: "No billing information. Contact support for enterprise plans."

#### Plans tab:
- Placeholder: Show plan tiers (Free / Pro / Enterprise) as cards. Static content.

---

### 8. Documentation (external link)

This is just a link — clicking "Documentation" in the sidebar should open `https://docs.getoptimal.ai` in a new tab. No page needed.

---

## Shared Patterns

### Page layout
Every page follows the same pattern:
```
Breadcrumb: "Section > Page Title"
Subtitle: one line of descriptive text

[Page content]
```

The breadcrumb uses `var(--accent)` for the clickable parent and `var(--text-primary)` for the current page. The subtitle uses `var(--text-secondary)`.

### Empty states
When there's no data, show:
- A centered icon (use Lucide, 48px, `var(--text-muted)` colour, inside a 64px circle with `var(--bg-elevated)` background)
- Bold heading: "No [Thing] Found"
- Descriptive subtitle in `var(--text-secondary)`
- Action button(s) if applicable

### Form inputs
- Background: `var(--bg-surface)` or slightly lighter
- Border: `1px solid var(--border-subtle)`
- Border radius: `rounded-[6px]`
- Text colour: `var(--text-primary)`
- Placeholder colour: `var(--text-muted)`
- Focus: `border-color: var(--accent)`
- Height: `h-10` for single-line inputs, flexible for textareas

### Toggle switches
- Track: `var(--bg-elevated)` when off, `var(--accent)` when on
- Thumb: white circle
- Size: 40px wide, 22px tall

### Feature cards (used in integration pages)
- Background: `var(--bg-surface)`
- No visible border
- Rounded: `rounded-[8px]`
- Padding: `p-5`
- Icon: accent-coloured circle (32px) with Lucide icon inside
- Heading: `text-[14px] font-semibold text-[var(--text-primary)]`
- Description: `text-[13px] text-[var(--text-secondary)]`

### Stat cards
- Background: `var(--bg-surface)`
- No visible border
- Rounded: `rounded-[8px]`
- Icon: 40px circle with `var(--accent-muted)` bg and `var(--accent)` icon
- Big number: `text-[28px] font-bold text-[var(--text-primary)]`
- Label: `text-[13px] text-[var(--text-secondary)]`

### Tab bars
- Active tab: `text-[var(--text-primary)]` with `border-bottom: 2px solid var(--accent)`
- Inactive tab: `text-[var(--text-secondary)]`
- Font: `text-[14px]`
- Tab bar has a full-width bottom border: `border-b border-[var(--border-subtle)]`

---

## File Structure

```
src/app/dashboard/
├── page.tsx                    ← Home (already exists)
├── layout.tsx                  ← Shared layout (already exists)
├── optibot/page.tsx            ← Optibot agent page
├── insights/page.tsx           ← Analytics / repo stats
├── integrations/page.tsx       ← All integrations with tabs
├── configuration/page.tsx      ← Config + guidelines with tabs
├── codebase-map/page.tsx       ← Visual repo map
└── organization/page.tsx       ← Org settings with tabs

src/components/dashboard/
├── (existing components)
├── TabBar.tsx                  ← Reusable horizontal tab component
├── FormInput.tsx               ← Styled input component
├── Toggle.tsx                  ← Toggle switch component
├── StatCard.tsx                ← Metric stat card
├── FeatureCard.tsx             ← Icon + heading + description card
├── EmptyState.tsx              ← Centered empty state pattern
├── RepoSelector.tsx            ← Dropdown to pick a repo
└── Breadcrumb.tsx              ← Breadcrumb navigation
```

Build reusable components for patterns that repeat across pages (tabs, inputs, toggles, stat cards, feature cards, empty states). Don't duplicate styling.

---

## Rules

- Use existing design system — CSS vars, no new colours
- No visible card borders — background shift only (per COLOR_DIRECTIVE.md)
- Every page must be accessible via the sidebar
- Sidebar active state should update based on current route
- `npm run build` must pass
- Don't break the landing page or existing dashboard home page
- Loading skeletons for data-dependent content
- Graceful error handling for GitHub API failures
- Forms don't need to actually submit to a backend — just build the UI with proper form state management. Log to console on submit.
- The Codebase Map can be a static visual for v1 — no drag-and-drop required
- External "Documentation" link opens in new tab, no page needed
