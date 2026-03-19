# EVAL.md — Evaluator Agent Findings

## Round 1 — After Phase 1-5

### New User Agent (6/10)
- Welcome modal + setup checklist work well
- Many buttons are dead ends (banner, checklist items, Quick Setup, "View stats")
- Optibot shows hardcoded fake stats (142 PRs) to user with 0 reviews — misleading
- Recent Activity empty state is bare — needs EmptyState component
- Inconsistent naming (sidebar "Repo Insights" vs breadcrumb "Analytics")
- Settings toggles have no save button or auto-save indicator
- Asterisks on toggle labels unexplained

### Design Critic Agent (7/10)
- Solid design system, good component library, proper loading states
- FeatureCard illustrations too faint (circles at 30-50% opacity)
- Visual monotony — everything is same shade of bg-surface
- Need micro-accent borders for status cards (green=connected, accent=active)
- Header "Dashboard" label is static — should be dynamic
- Empty states all look identical
- Plans tab Pro card needs more visual prominence
- Repo list items need language dots and more metadata

### ElevenLabs Comparison Agent
- Feature cards close in structure but illustrations lack identity
- Recent Activity missing user avatars
- No plan/usage indicator in sidebar
- Integration feature cards use wrong icons (GitLab has duplicate Shield)
- Slack uses Check for all items instead of defined icons

## Priority Actions (Round 1)
1. ✅ Fix dead-end buttons → add navigation
2. ✅ Remove/fix fake Optibot stats
3. ✅ Add avatars to Recent Activity
4. ✅ Add language dots to GitHub repo list
5. ✅ Make header title dynamic
6. ✅ Increase FeatureCard illustration opacity + add shapes
7. ✅ Add micro-accent borders to status cards
8. ✅ Improve Recent Activity empty state
9. ✅ Fix integration page icons
10. ✅ Add save indicator to Settings

---

## Round 2 — After Header, Sidebar, FeatureCards, and Evaluator Fixes

### New User Agent (6.5/10)

**Top 3 things that work well:**
1. Visual hierarchy & design system — consistent dark purple, clear typography
2. Empty states are helpful with icons and CTAs
3. Navigation & command palette (⌘K) — clear sidebar, breadcrumbs

**Top 5 findings (actioned):**
1. ~~CRITICAL: Misleading "Connected/Active" on GitHub/Optibot~~ — Not fixable without backend; these show real GitHub API data
2. ✅ Setup checklist had "Connect GitHub" hardcoded as done:true → Fixed: all items start done:false, track completion via localStorage
3. ✅ Dead-end buttons (bell, Contact Support, Save Map, Slack connect, plan upgrades, form submits) → Fixed: added coming-soon states, mailto links, save feedback
4. ✅ Missing ARIA labels on bell, logout, sidebar buttons → Fixed: added aria-label attributes
5. ✅ Form submits logged to console silently → Fixed: GitLab/Jira show "saved — verification pending", Org shows "Saved"

### Design Critic Agent
- Rate limited, no results

### ElevenLabs Comparison Agent
- Rate limited, no results

## Round 2 Actions Completed
1. ✅ Checklist now tracks real completion via localStorage per-item
2. ✅ Removed misleading notification dot from bell icon
3. ✅ Added ARIA labels to interactive elements
4. ✅ Slack "Connect workspace" → disabled with "coming soon"
5. ✅ GitLab/Jira forms show save confirmation
6. ✅ Org General tab shows "Saved" on submit
7. ✅ Contact Support → mailto link
8. ✅ Contact Sales → mailto link
9. ✅ Save Map → disabled with "Coming soon" tooltip
10. ✅ Plan upgrade buttons show "coming soon" tooltip
