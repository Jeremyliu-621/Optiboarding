# TASK 02 — Repo Insights (`/dashboard/insights`)

## What This Page Is
Analytics and statistics for the repositories Optibot monitors. The goal is to make a developer feel like they understand the health and activity of their codebase at a glance.

## Likely Current State
Some stat blocks, possibly a chart (the merge time trend chart from the dashboard home), maybe a table. Probably functional but visually generic.

## What This Page Should Do
Answer three questions:
1. How active is my codebase? (PR volume, commit frequency)
2. How healthy is it? (security issues, review time, approval rates)
3. Where is Optibot having the most impact?

## Layout & Structure

### Header Row
- Page title: "Repo Insights" (already exists as breadcrumb — don't duplicate)
- **Repository selector**: A compact dropdown (or segmented control if ≤3 repos) letting the user switch between repos. This is the primary filter for the whole page. Placed in the top-right of the content header row.
- **Time range selector**: Last 7d / 30d / 90d — three small text buttons, active one has a `--bg-elevated` pill background. No dropdowns.

### Section 1 — Key Metrics Row (4 stat blocks)
Horizontal row of 4 compact metric blocks:
- PRs Merged (with trend: ↑ 12% vs previous period)
- Avg. Review Time
- Security Issues Found
- Code Churn (lines changed)

Each block: label top, large number middle, trend indicator bottom. No icons. No borders. Background `--bg-surface`. Tight and dense.

### Section 2 — Primary Chart (full width)
The merge time trend chart from the home page, expanded to full width here. Make it actually useful:
- X-axis: dates
- Y-axis: merge time in hours/days
- A vertical "Optibot Enabled" annotation line (already in the home version — keep it)
- Tooltip on hover showing exact values
- Use a real charting library (Recharts is already likely in the stack). Do NOT use a fake SVG path.

### Section 3 — Two Columns
**Left (~55%): PR Activity Table**
A data table showing recent PRs:
- Columns: PR title (truncated), Author, Status, Optibot verdict, Merge time, Date
- Sortable columns (at least by date and merge time)
- Status chips: same low-contrast style as Optibot page
- "Load more" at the bottom, not pagination — simpler

**Right (~45%): Issue Breakdown**
A breakdown of security/quality issues Optibot found:
- Simple horizontal bar chart or stacked list showing issue categories (SQL injection, dependency vulnerability, etc.)
- Each row: issue type, count, severity dot
- "View in Optibot" link per row

## Data
All data should be realistic mock data. Use React state, not hardcoded JSX. Make the time range selector actually filter/change the displayed data (even if just switching between two pre-built datasets — the interaction must work).

## What NOT to Do
- No pie charts — they're hard to read and look amateur
- No dashboard-within-a-dashboard (don't repeat the home page stats here in full)
- No empty bar chart placeholders — if no data, show a clear empty state with a note about connecting a repo

## Evaluation Criteria
When done, check:
- [ ] Does the repository selector actually change what's displayed?
- [ ] Does the time range filter work?
- [ ] Does the chart render properly with real axis labels and tooltips?
- [ ] Is the PR table sortable on at least one column?
- [ ] Does the page feel like a tool a developer would trust to make decisions with?

---
*After completing, proceed to TASK_03_integrations.md*
