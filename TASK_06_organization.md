# TASK 06 — Organization (`/dashboard/organization`)

## What This Page Is
Workspace-level management: team members, roles, billing, and plan information. This is typically used by admins, not everyday developers.

## Likely Current State
Tabbed layout with Members, Billing, and Plans tabs. Probably placeholder content.

## Design Philosophy
This page deals with real-world consequences (inviting people, managing billing). It needs to feel trustworthy and clear above all. Reference: GitHub's organization settings, Vercel's team page.

---

## Tab Structure
Three tabs: **Members** | **Billing** | **Plans**

---

## Tab 1: Members

### Layout
Full-width table of team members. Above the table, a header row with:
- Left: `N members` label in `--text-muted`
- Right: "Invite Member" button (filled, `--accent`)

### Members Table
Columns: Avatar + Name, Email, Role, Status, Joined, Actions

- **Avatar**: A small circle with the user's initials (not an image) — colour derived from name (consistent hashing). GitHub OAuth users show their real avatar if available.
- **Role**: Dropdown in-cell (if the viewing user has admin rights) — `Admin` / `Developer` / `Viewer`. Read-only label if not admin.
- **Status**: `Active` / `Pending` (invited but not accepted). Pending rows should be visually muted — lower opacity on name/email.
- **Actions**: A `...` menu (kebab) per row — options: "Change Role", "Remove from workspace". Removing yourself should be blocked with an inline error.

### Invite Member Flow
Clicking "Invite Member" opens a slide-in panel (not a modal — a right-side drawer):
- Email input
- Role selector
- A short message field (optional, placeholder: "Add a personal note...")
- "Send Invite" button
- Pending invites show in the main table immediately with `Pending` status

### Pre-populate with 3 fake members + the real logged-in user. Make it feel like a real team.

---

## Tab 2: Billing

### Layout
Two sections:

**Current Subscription**
A compact card (background `--bg-surface`) showing:
- Plan name: Free / Pro / Team / Enterprise
- Billing cycle: Monthly / Annual
- Next billing date
- Amount: $X/month
- A "Manage Billing" button (opens a simulated Stripe portal — just a toast: "Redirecting to billing portal...")
- "Upgrade Plan" CTA if on Free plan

**Usage This Period**
Three usage bars:
- PR Reviews Used: `142 / 200` — with a horizontal progress bar at `--accent` colour
- Repositories Connected: `3 / 5`
- Team Members: `4 / 10`
Each bar: label left, `used/limit` right, bar below spanning full width of the column. If usage > 80%, the bar and number should shift to amber-tinted.

**Invoice History**
A compact table: Date, Amount, Status (Paid/Pending), Download link
Pre-populate with 3–4 realistic past invoices.

---

## Tab 3: Plans

### Layout
Do NOT use a standard 3-column pricing table with centred cards. That looks like a landing page, not a dashboard.

Instead, use a **comparison layout**:
- Left column: feature list (row labels)
- Right columns: one column per plan tier (Free, Pro, Team)
- Current plan has a subtle highlighted background column (`--bg-elevated`)
- A simple checkmark / dash / value per cell

Features to compare: PR Reviews/month, Repositories, Team Members, Security Scanning, Custom Guidelines, Priority Support, SSO, Audit Logs, SLA

Below the comparison table: plan-specific CTA buttons in a horizontal row — "Current Plan" (disabled), "Upgrade to Pro", "Upgrade to Team". The upgrade buttons use `--accent` fill.

**Annual discount toggle** at the top: "Bill Annually (save 20%)" — a toggle that updates all the price displays.

---

## Evaluation Criteria
When done, check:
- [ ] Does the invite drawer open and close correctly?
- [ ] Does the pending invite appear in the member table?
- [ ] Does the role dropdown work for non-self rows?
- [ ] Does the kebab menu show the correct options?
- [ ] Do the usage bars render with the correct proportions?
- [ ] Does the annual toggle update the prices shown in the Plans tab?
- [ ] Does the comparison table render clearly with current plan highlighted?
- [ ] Does "Manage Billing" show a toast rather than navigating away?

---
*After completing all tasks, proceed to TASK_07_final_audit.md*
