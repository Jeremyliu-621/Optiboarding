# TASK 04 — Codebase Map (`/dashboard/codebase-map`)

## What This Page Is
A visual representation of the user's repository structure — showing how files, modules, and directories relate to each other, with Optibot's review coverage and issue density overlaid. This is the most visually ambitious page on the dashboard.

## Likely Current State
A static grid of file/folder tiles. No interactivity, no real data relationships shown.

## What This Page Should Actually Be
Think of it as a **treemap + dependency graph hybrid**. The primary view is a treemap (nested rectangles) showing the codebase structure. The secondary view (toggle-able) is a simpler list/table for users who prefer data over visuals.

## Important Constraint
Do not attempt a full force-directed graph (too complex, too buggy to implement well without a proper library). Instead, use a **treemap layout** — it's visually interesting, clearly communicates file size/density, and can be implemented with D3 or a pure React layout algorithm without external dependencies.

## Layout & Structure

### Header Row
- Page title area (left)
- **View toggle**: `Treemap | List` — two buttons, segmented style
- **Colour by**: dropdown — `Coverage` / `Issue Density` / `File Size`
- **Repository selector**: same dropdown as Repo Insights page

### Treemap View (primary)

**Visual Design:**
- Rectangles represent directories at top level, subdivided into files
- Rectangle size = file size (lines of code, mocked)
- Rectangle colour = selected metric:
  - Coverage mode: dark green-ish to dark red-ish (low saturation — stays within design system palette)
  - Issue Density: dark purple (no issues) to amber (high issues)
  - File Size: uniform accent tint, lighter = smaller
- File name label inside rectangle if space allows (truncated with ellipsis)
- Directory labels displayed prominently, larger than file labels

**Interactions:**
- Hover on a file rectangle → tooltip showing: filename, directory path, lines of code, Optibot coverage %, open issues count
- Click on a directory rectangle → zoom in to show that directory's contents filling the full treemap area
- Breadcrumb below the header updates to show current zoom level: `my-repo / src / components`
- Clicking the breadcrumb navigates back up

**Colour Legend:**
A compact horizontal legend below the treemap. Just coloured squares with labels. No borders, no card background.

### List View (secondary)
A simple sortable table:
- Columns: Path, Type (file/dir), Size (LOC), Coverage, Issues
- Sortable by all columns
- Expandable directory rows (clicking a dir row expands its children inline)
- Same status chips as elsewhere in the dashboard

### Bottom Panel — Optibot Coverage Summary
Below the treemap/list, always visible:
- A horizontal progress-bar-style breakdown: `68% of files reviewed by Optibot`
- Three stats: Files Reviewed, Files with Issues, Files Never Reviewed
- A "Run Full Scan" CTA button that triggers a simulated scan (progress animation, then success toast)

## Mock Data
Generate mock data for a realistic-looking Next.js project structure:
- `src/app/` with 8–12 route files
- `src/components/` with 15–20 component files
- `src/lib/` with 5–6 utility files
- `public/` with static assets
- Root config files
Each file should have mocked LOC (5–800), coverage %, and issue count.

## What NOT to Do
- Do NOT attempt a force-directed graph — it won't work well without a proper library and significant tuning
- Do NOT make the treemap static — the click-to-zoom interaction is what makes this page worth having
- Do NOT use bright colours — stay within the muted palette
- Do NOT show a "coming soon" placeholder — implement the treemap even if simplified

## Evaluation Criteria
When done, check:
- [ ] Does the treemap render correctly with visible labels and proportional sizes?
- [ ] Does hover show the tooltip with correct mock data?
- [ ] Does clicking a directory zoom in, and does the breadcrumb update?
- [ ] Does clicking the breadcrumb navigate back up?
- [ ] Does the "Colour by" dropdown visually change the treemap colours?
- [ ] Does the List view render and sort correctly?
- [ ] Does the view toggle switch between Treemap and List?

---
*After completing, proceed to TASK_05_settings_guidelines.md*
