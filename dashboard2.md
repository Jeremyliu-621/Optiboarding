# Optimal AI Dashboard — Build Tasks

## Overview
This is a sequenced set of implementation tasks for Claude Code to execute autonomously. Each task covers one section of the dashboard. Read each task file in full before writing any code. Plan before implementing.

## Task Order
```
TASK_00_dashboard_home_cards.md   — Fix the 6 quick-action cards on the home page
TASK_01_optibot.md                — Build the Optibot agent control panel
TASK_02_repo_insights.md          — Build the Repo Insights analytics page
TASK_03_integrations.md           — Build the Integrations configuration page
TASK_04_codebase_map.md           — Build the Codebase Map treemap view
TASK_05_settings_guidelines.md    — Build Settings + Guidelines configuration
TASK_06_organization.md           — Build Organization (members/billing/plans)
TASK_07_final_audit.md            — Cross-page consistency + polish audit
```

## Ground Rules (Read These First)

### Design System
- Dark purple palette only. CSS vars in `globals.css` and `COLOR_DIRECTIVE.md`.
- No gradients. No borders on idle cards. No bright colours.
- Background shift (`--bg-surface` → `--bg-elevated`) communicates hover state.
- Only border used on cards: a 4px left accent stripe, `--accent` colour, on hover only.
- Icons: Lucide React, small (16–20px), left-aligned. No large centred icons.

### Code Quality
- TypeScript throughout. No `any` types unless absolutely necessary.
- All state managed in React — no localStorage.
- Mock data should be defined in a `const` at the top of the component or in a separate `mockData.ts` file, not inline in JSX.
- No `console.log` left in submitted code.
- Components that share patterns (stat blocks, verdict chips, section headers) should be extracted into reusable components.

### Interactions
- All interactive elements must work. No `onClick={() => {}}` placeholders.
- Loading states required for anything that simulates a network call (2s delay minimum).
- Forms must validate before submit.
- No `window.alert()` or `window.confirm()` — use inline confirmation UI.

### What NOT to Build
- No scroll-triggered animations
- No page transition animations  
- No notification dropdown
- No search modal
- No light mode

## How to Approach Each Task
1. Read the task file completely
2. Read the relevant existing source file(s) to understand what's already there
3. Plan the component structure and state before writing
4. Implement, then self-evaluate against the Evaluation Criteria checklist in each task file
5. Fix anything that fails the checklist before moving on

## File Locations
- `src/app/dashboard/` — page files
- `src/app/dashboard/layout.tsx` — sidebar + header (do not break this)
- `src/components/` — shared components
- `src/lib/` — utilities and mock data
- `globals.css` — CSS variables (do not modify the variable values)
