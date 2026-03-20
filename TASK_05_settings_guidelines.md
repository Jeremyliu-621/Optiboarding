# TASK 05 — Configuration: Settings + Guidelines (`/dashboard/configuration`)

## What This Page Is
A tabbed configuration page. Two tabs: **Settings** (account/workspace/agent preferences) and **Guidelines** (custom instructions that Optibot follows when reviewing code).

## Likely Current State
Tabbed layout exists. Settings tab probably has some form fields. Guidelines tab is probably underdeveloped or placeholder-level.

## Design Philosophy
Settings pages are often the most neglected part of a product's UI. The goal here is a settings page that feels as considered as the rest of the dashboard. Reference: Linear's settings, Vercel project settings. Dense, grouped, clean.

---

## Tab 1: Settings

### Layout
Left sidebar navigation within the tab (not a second row of tabs) — narrow label column that highlights the active section:
- General
- Agent Behaviour  
- Notifications
- API & Webhooks
- Danger Zone

Main content area scrolls through each section. Clicking a sidebar label smooth-scrolls to that section. This is more scalable and professional than sub-tabs.

### Section: General
- Workspace name: text input (editable)
- Default repository: dropdown
- Timezone: dropdown
- Save button (scoped to section, or one global Save at bottom — pick one and be consistent)

### Section: Agent Behaviour
These are the core Optibot settings:
- Review thoroughness: a segmented control — `Fast` / `Balanced` / `Thorough` — with a short descriptor below each option explaining the tradeoff
- Focus areas: multi-select chips — `Security`, `Performance`, `Style`, `Logic`, `Tests` — tappable, toggleable
- Languages to review: multi-select from a predefined list
- Max comments per PR: a number input with increment/decrement controls (min 1, max 50)
- Skip files matching pattern: a text input that accepts glob patterns (e.g. `**/*.test.ts`)

### Section: Notifications
- Email notifications: master toggle
- If enabled: sub-options with individual toggles:
  - Review complete
  - Security flag found  
  - Weekly digest
- Notification email: text input (pre-filled with user's email)

### Section: API & Webhooks
- API key: displayed as a masked value `sk-opt-••••••••••••••` with a "Reveal" button and a "Regenerate" button
- Regenerate should show an inline confirmation before doing anything
- Webhook URL: text input
- Webhook secret: same masked treatment as API key
- A small code block showing a sample webhook payload (read-only, monospace, `--bg-deep` background)

### Section: Danger Zone
- Red-tinted section (use a very muted red/warm border — single left stripe, not a full card border)
- "Delete Workspace" — button styled in muted destructive style, shows a confirmation modal on click requiring the user to type the workspace name

---

## Tab 2: Guidelines

### What This Is
Guidelines are natural-language instructions that Optibot follows when reviewing code — similar to a system prompt or a contributing guide for the agent. E.g. "Always flag any SQL queries not using parameterized inputs" or "We use Prettier — do not comment on formatting".

### Layout
Split-pane layout:
- **Left (~35%): Guideline List**
  A list of saved guidelines. Each row:
  - A short title (editable inline on click)
  - A category tag (Security, Style, Performance, Custom)
  - An enabled/disabled toggle
  - A delete icon (appears on hover)
  - "Add Guideline" button at top of list

- **Right (~65%): Guideline Editor**
  When a guideline is selected from the list, this pane shows:
  - Title input (large, at the top)
  - Category selector (segmented control or dropdown)
  - Priority: Low / Medium / High (affects how prominently Optibot surfaces violations)
  - A **textarea for the guideline instructions** — this is the main field. It should be a proper styled textarea: monospace or near-monospace font, `--bg-deep` background, no visible border, focus ring in `--accent`, generous padding, min-height ~200px
  - "Save Guideline" button
  - A small "Preview" section below the textarea showing how Optibot would interpret and apply this guideline — mock a 1–2 sentence interpretation, shown in a muted italic style

### Pre-populate with 3–4 example guidelines so the page isn't empty. Make them realistic:
- "Flag any use of `eval()` or `Function()` constructor in JavaScript files"
- "Require JSDoc comments on all exported functions"
- "Do not comment on test files unless there are security issues"
- "Flag hardcoded API keys or secrets, even in comments"

## Evaluation Criteria
When done, check:
- [ ] Does the sidebar navigation in Settings scroll to the correct section?
- [ ] Are all form controls interactive?
- [ ] Does the API key reveal/mask toggle work?
- [ ] Does the Danger Zone confirmation modal require typing the workspace name?
- [ ] Does selecting a guideline in the list populate the right pane?
- [ ] Does adding a new guideline create an entry in the list?
- [ ] Does the enabled toggle on each guideline update the list item's visual state?

---
*After completing, proceed to TASK_06_organization.md*
